library(seqinr)
library(rjson)

# Make truncated domain files
#features.df = read.table("features.tsv", sep="\t", header=F, comment="#")
#colnames(features.df) = c("domain", "range", "level")




#Find the position in alignment from ungapped position within one sequence
getAlignmentPosFromUngapped = function(accession, accPos, alignment){


	names(alignment) = gsub(".+/", "", names(alignment))

	nsites = length(alignment[[1]])
	siteSeq = 1
	for (siteAln in 1:nsites){


		if (siteSeq == accPos){
			return(siteAln)
		}

		symbol = alignment[[accession]][siteAln]
		if (symbol != "-"){
			siteSeq = siteSeq + 1
		}

	}

	-1

}




# All structures
pdbFiles = readLines("structures.txt")

# Fasta
fasta = read.fasta(file="align.ali")


# Json: parse domains
json = fromJSON(file = "../info.json")
features = json$features
features.df = data.frame(domain = character(0), lower = numeric(0), upper = numeric(0))
for (d in names(features)){

	if (features[[d]]$level <= 1){
		next
	}


	refSeq = features[[d]]$acc
	lower = as.numeric(strsplit(features[[d]]$range, "-")[[1]][1])
	upper = as.numeric(strsplit(features[[d]]$range, "-")[[1]][2])


	# Convert from ungapped pos to alignment pos
	lower = getAlignmentPosFromUngapped(refSeq, lower, fasta)
	upper = getAlignmentPosFromUngapped(refSeq, upper, fasta)


	if (lower == -1 | upper == -1){
		cat(paste("Unexpected: domain boundary is -1 for", d, "\n"))
	}else{
		features.df2 = data.frame(domain = d, lower = lower, upper = upper)
		features.df = rbind(features.df, features.df2)
	}


}


nsites = length(fasta[[1]])
for (domain in features.df$domain){


	domainRange = features.df[features.df$domain == domain, "lower"]:features.df[features.df$domain == domain, "upper"]


	cat(paste(domain, "\n"))



		

	if (!dir.exists("domains/")){
		dir.create("domains/")
	}

	dirName = paste0("domains/", gsub(" ", "_", domain))
	if (!dir.exists(dirName)){
		dir.create(dirName)
	}
	
	dirName2 = paste0(dirName, "/structures")
	if (!dir.exists(dirName2)){
		dir.create(dirName2)
	}



	nStructures = 0
	for (pdbFile in pdbFiles){


		if (pdbFile == "structures/*.pdb" ){
			next
		}

		pdb = readLines(pdbFile)

		# Load a pdb file
		atomLines = grep("^(ATOM|HETATM  .........MSE)", pdb)
		atoms = pdb[atomLines]



		pdb.df = data.frame(line = atomLines, chain = substr(atoms, 22, 22), residue = substr(atoms, 18, 20), pos.pdb = as.numeric(substr(atoms, 23, 26)), include = TRUE)
		pdb.df2 = pdb.df[pdb.df$chain == "A",]
		if (nrow(pdb.df2) == 0){
			pdb.df2 = pdb.df[pdb.df$chain == "B",]
		}
		if (nrow(pdb.df2) == 0){
			pdb.df2 = pdb.df[pdb.df$chain == "C",]
		}
		if (nrow(pdb.df2) == 0){
			cat(paste("Skipping", pdbFile, "\n"))
			next
		}
		pdb.df = pdb.df2

		# Find matching sequence
		seq = fasta[[pdbFile]]
		pdb.site.nums = unique(pdb.df$pos.pdb)

		s=1
		for (site in 1:nsites){


			
			targetChar = seq[site]
			if (targetChar == "-"){



			}else{


				pdbTargetSite = pdb.site.nums[s]
				if (is.na(pdbTargetSite)){
					next
				}

				#print(paste(s, site, pdbTargetSite, length(pdb.site.nums)))

				# Keep the site if in range
				chars.ref = as.character(sapply(names(fasta), function(n) fasta[[n]][site] ))
				if (any(site == domainRange)){

					# Keep this residue
					pdb.df[pdb.df$pos.pdb == pdbTargetSite,"include"] = TRUE

				}else{

					# Discard this residue
					pdb.df[pdb.df$pos.pdb == pdbTargetSite,"include"] = FALSE

				}

				s = s + 1

			}




		}



		nres = unique(pdb.df[pdb.df$include,"pos.pdb"])
		if (length(nres) < 12){
			cat(paste(pdbFile, "DOES NOT HAVE", domain, "\n"))
			next
		}

		atomLinesInclude = pdb.df[pdb.df$include,"line"]
		cat(paste(pdbFile, "HAS", domain, "\n"))




		# Write target structure to file
		pdb.lines = numeric(0)
		if (atomLines[1] > 1){
			pdb.lines = 1:(atomLines[1]-1)
		}
		pdb.lines = c(pdb.lines, atomLinesInclude)
		if (atomLines[length(atomLines)] < length(pdb)){
			pdb.lines = c(pdb.lines, (atomLines[length(atomLines)]+1):length(pdb))
		}
		pdb.truncated = pdb[pdb.lines]


		# Remove secondary structure
		sse = grep("^(HELIX|SHEET)", pdb.truncated)
		if (length(sse) > 0){
			pdb.truncated = pdb.truncated[-sse]
		}



		file.name = gsub(".+/", "", pdbFile)
		write(paste(pdb.truncated, collapse="\n"), paste0(dirName2, "/", file.name))


		nStructures = nStructures + 1


	}


	if (nStructures < 2){


		#unlink(dirName, recursive = TRUE)
	}


}
