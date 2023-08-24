library(rjson)
library(seqinr)


MIN.LOCAL.ALIGNMENT.SIZE = 35
GAP.RMSD = 5

# Truncate a pdb file according to start and stop positions
truncatePDBFile = function(pdbFile, startPos, stopPos){



	pdb = readLines(pdbFile)

	# Load a pdb file
	atomLines = grep("^ATOM", pdb)
	atoms = pdb[atomLines]


	pdb.df = data.frame(line = atomLines, chain = substr(atoms, 22, 22), residue = substr(atoms, 18, 20), pos.pdb = as.numeric(substr(atoms, 24, 26)), include = FALSE)
	firstChain = sort(unique(pdb.df$chain))[1]
	pdb.df = pdb.df[pdb.df$chain == firstChain,]
	positions = unique(pdb.df$pos.pdb)
	pdb.df$seq.pos = sapply(pdb.df$pos.pdb, function(pos) which(pos == positions))

	#cat(paste(pdbFile, "using chain", unique(pdb.df$chain), "\n"))
	
	if (nrow(pdb.df) == 0){
		cat(paste("Skipping", pdbFile, "\n"))
		next
	}
	


	# Subset sites
	pdb.df$include = pdb.df$seq.pos >= startPos & pdb.df$seq.pos < stopPos
	atomLinesInclude = pdb.df[pdb.df$include,"line"]
	
	if (length(unique(pdb.df[pdb.df$include,"pos.pdb"])) < 12){
		return (NA)
	}



	# Return target structure to save as file
	pdb.lines = numeric(0)
	if (atomLines[1] > 1){
		pdb.lines = 1:(atomLines[1]-1)
	}
	pdb.lines = c(pdb.lines, atomLinesInclude)
	if (atomLines[length(atomLines)] < length(pdb)){
		pdb.lines = c(pdb.lines, (atomLines[length(atomLines)]+1):length(pdb))
	}
	pdb.truncated = pdb[pdb.lines]



	# Remove TER lines
	pdb[grep("^TER ", pdb)] = ""

	# Remove secondary structure
	sse = grep("^(HELIX|SHEET)", pdb.truncated)
	if (length(sse) > 0){
		pdb.truncated = pdb.truncated[-sse]
	}


	pdb.truncated


}



# Prepare one directory per hinge region 
args = commandArgs(trailingOnly=TRUE)

# args = c("../../info.json", 2)

if (length(args) != 2){
	stop(paste("Use: Rscript pairwiseJSON.R <info.json> <pass.nr>"))
}


json = fromJSON(file = args[1])
pass.nr = as.numeric(args[2])

cat(paste("prepareHinges.R pass", pass.nr, "\n"))


wd = strsplit(args[1], "/")[[1]]
if (length(wd) == 1){
	wd = "data/"
}else{
	wd = paste0(paste(wd[-length(wd)], collapse="/"), "/data/")
}



# Look for a hinge structure
if (is.null(json[["hinge_str"]]) | is.null(json[["hinges"]])){
	stop(paste("Cannot find hinge structure!"))
}



# Read in hinges and hinge structure
hinge_str = paste0(wd, json[["hinge_str"]])
hinges = json[["hinges"]]

if (!file.exists(hinge_str)){
	stop(paste("Cannot find", hinge_str))
}
if (length(hinges) == 0){
	stop(paste("There are no hinges!"))
}
hinges = sort(hinges)


if (pass.nr == 1) {

	# Make one directory per region
	for (i in 1:(length(hinges)+1)){

		newdir = paste0("region", i)
		dir.create(newdir, showWarnings = FALSE)
		
		# Truncate the pdb file and move it here
		startPos = ifelse(i == 1, 1, hinges[i-1]+1)
		stopPos = ifelse(i == length(hinges)+1, Inf, hinges[i])
		pdb = truncatePDBFile(hinge_str, startPos, stopPos)
		write(pdb, paste0(newdir, "/hinge_str.pdb"))
		
	}


}else if (pass.nr == 2){


	# List of structures
	structures = readLines("region1/structuresAll.txt")
	
	
	# Hinge points of each structure
	regions.df = data.frame(structure = structures, hinge0 = 1)
	for (i in 1:(length(hinges))){
		regions.df[,paste0("hinge", i)] = -1
	}
	regions.df[,paste0("hinge", length(hinges)+1)] = Inf


	# Refine the stop point of each region. The final region has a stop point of Inf
	for (i in 1:(length(hinges))){



		# Start and stop per structure
		for (s in structures){


			# Read in all local alignments of this structure
			rmsd.list = list()
			local.start = numeric(0)
			local.stop = numeric(0)
			for (j in 1:(length(hinges)+1)){
				local.file = strsplit(s, "/")[[1]]
				local.file = paste0("region", j, "/", local.file[length(local.file)], ".local")
				local = readLines(local.file)
				startPos = as.numeric(strsplit(local[5], " +")[[1]][2])
				stopPos = as.numeric(strsplit(local[length(local) - 2], " +")[[1]][4])

				# RMSD per site, or NA if gap
				rmsd = local[seq(from = 4, by = 7, length = length(local)/7)]
				rmsd = suppressWarnings(as.numeric(strsplit(paste(substring(rmsd, 21, 100), collapse=""), "")[[1]]))


				rmsd.list[[j]] = rmsd
				local.start[j] = startPos
				local.stop[j] = stopPos

			}


			
			candidate = i
			focal.start = local.start[candidate]
			focal.stop = local.stop[candidate]
			hingePoint = focal.stop
			is.overlap = FALSE


			# Which local alignments overlap with the focal alignment? Take the one with the smallest overlapping rmsd
			for (j in 1:length(rmsd.list)){

				if (i == j || candidate == j){
					next
				}

				start.target =  local.start[j]
				stop.target = local.stop[j]



				# If the target alignment is a subset of the focal one, use the focal one
				if (focal.start < start.target && focal.stop > stop.target){
					is.overlap = TRUE
					next
				}


				# Overlapping?
				overlap.start = max(start.target, focal.start)
				overlap.stop = min(stop.target, focal.stop)


				# Need to compare its rmsd with the candidate alignment
				if (overlap.stop > overlap.start){


					
					# Don't want any small trivial local alignments which yield high scores (e.g. a helix)
					if (stop.target - start.target < MIN.LOCAL.ALIGNMENT.SIZE){
						is.overlap = TRUE
						next
					}



					focal.rmsd.vals = rmsd.list[[candidate]]
					focal.rmsd.vals = focal.rmsd.vals[(overlap.start - focal.start + 1):(overlap.stop - focal.start + 1)]
					#focal.rmsd.vals[is.na(focal.rmsd.vals)] = GAP.RMSD
					focal.rmsd = mean(focal.rmsd.vals, na.rm=T)

					target.rmsd.vals = rmsd.list[[j]]
					target.rmsd.vals = target.rmsd.vals[(overlap.start - start.target + 1):(overlap.stop - start.target + 1)]
					#target.rmsd.vals[is.na(target.rmsd.vals)] = GAP.RMSD
					target.rmsd = mean(target.rmsd.vals, na.rm=T)

					if (is.na(target.rmsd)){
						next
					}


					# Very small overlap: skip
					if (sum(!is.na(target.rmsd.vals)) < MIN.LOCAL.ALIGNMENT.SIZE){
						next
					}



					is.overlap = TRUE
					

					# If 	a) this alignment is a subset of another alignment, 
					#   or  b) this alignment overlaps another one and the other one has a smaller rmsd in the overlap, 
					# then use the other alignment
					if ((start.target < focal.start && stop.target > focal.stop) || is.na(focal.rmsd[1]) || target.rmsd < focal.rmsd) {
						

						# Aligning with a region upstream or downstream
						if (j < i) {
							hingePoint = stop.target
						}else{
							hingePoint = start.target
						}

						candidate = j
						focal.start = local.start[candidate]
						focal.stop = local.stop[candidate]

					}
				

				}

			}


			# If this is the final region, and it gets matched to the focal region, then extend the hinge point to the end of the sequence
			if (is.overlap && i == length(hinges) && candidate == i){
				hingePoint = Inf
			}
			


			# Double check this hinge point is not before the previous one 
			prevHinge = regions.df[regions.df$structure == s,paste0("hinge",i-1)]
			if (hingePoint < prevHinge + MIN.LOCAL.ALIGNMENT.SIZE){
				hingePoint = prevHinge
			}
			regions.df[regions.df$structure == s,paste0("hinge",i)] = hingePoint
			

	
		}
		
		
	
	
	}


	print(regions.df)





	# Truncate structures
	for (i in 1:(length(hinges)+1)) {
	
		slist = character(0)
		
		# Start and stop per structure
		for (s in structures){
		
			
			s2 = strsplit(s, "/")[[1]]
			s2 = s2[length(s2)]
			s_dir = paste0(wd, "dssp/", s2)
		
			startPos = regions.df[regions.df$structure == s, paste0("hinge",i-1)]
			stopPos = regions.df[regions.df$structure == s, paste0("hinge",i)]
			
			if (stopPos < startPos){
				cat(paste("Warning: skipping", s2, "for region", i, "because it has negative length\n"))
				next
			}
			
			pdb = truncatePDBFile(s_dir, startPos, stopPos)
			if (is.na(pdb[1])){
				cat(paste("Warning: skipping", s2, "for region", i, "truncation is NA\n"))
				next
			}
			write(pdb, paste0("region", i, "/", s2))
			slist = c(slist, s2)
		}
		
		
		# For 3DCOMB
		write(paste(slist, collapse="\n"), paste0("region", i, "/structures.txt"))
	
	}
	
	
	
	

}else if (pass.nr == 3){


	# List of all structures
	structures = readLines("region1/structuresAll.txt")
	structures.names = strsplit(structures, "/")
	structures.names = sapply(structures.names, function(ele) ele[length(ele)])
	
	full.aln = character(length(structures))
	names(full.aln) = paste0("structures/", structures.names)
	


	# Glue sequence alignments back together
	for (i in 1:(length(hinges)+1)){
		structures.region = readLines(paste0("region", i, "/structures.txt"))
		
		
		aln = read.fasta(file=paste0("region", i, "/align.ali"))
		nsites = length(aln[[1]])
		for (s in structures.names){
			
			

			if (any(s == structures.region)){
				seq = toupper(paste0(aln[[s]], collapse=""))
			
			}else{
				seq = paste0(rep("-", nsites), collapse="")
			
			}
			
			full.aln[paste0("structures/", s)] = paste0(full.aln[paste0("structures/", s)], seq)
		
		
		}
		
	
	}


	write(paste0(paste0(">", names(full.aln), "\n", as.character(full.aln)), collapse="\n"), paste0(wd, "align.ali"))


}











