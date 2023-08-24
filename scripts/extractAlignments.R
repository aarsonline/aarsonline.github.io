library(rjson)
library(seqinr)


# Extract features from an alignment
args = commandArgs(trailingOnly=TRUE)



if (length(args) != 2){
	stop(paste("Use: Rscript extractAlignments.R <info.json> <outputDir>"))
}


json = fromJSON(file = args[1])
outputDir = args[2]



# Remove all sequences from alignment if they have too many gaps
removeShortSequences = function(aln, minLength=5, showWarning=T){

	lengths = nchar(gsub("-", "", aln))
	remove = which(lengths < minLength)
	if (length(remove) > 0){
		aln = aln[-remove]
		cat(paste("Removing", length(remove), "sequences because they are too gappy:", paste0(unique(substr(names(aln)[remove], 1, 8)), collapse=", "), "\n"))
	}
	
	aln

}



# Extraction
if (is.null(json[["extract"]])){
	stop(paste("Please ensure that", args[1], "contains an 'extract' element\n"))
}
if (is.null(json[["features"]])){
	stop(paste("Please ensure that", args[1], "contains an 'features' element\n"))
}
extract = json[["extract"]]



# Prepare output folder
if (!dir.exists(outputDir)){
	dir.create(outputDir)
}


fullAlignDir = paste0("data/combined.fasta")
aln = read.fasta(fullAlignDir)
all.sites.included = numeric(0)


# One alignment per object
for (element in names(extract)){

	cat(paste(element, "\n"))
	out.fasta = paste0(outputDir, "/", element, ".fasta")

	
	
	aln.out = character(length(aln))
	names(aln.out) = names(aln)



	# For all features
	for (feature in extract[[element]][["features"]]){

		# Ref seq
		f = json[["features"]]
		featureObj = f[names(f) == feature][[1]]
		refSeq = featureObj$acc
		refSeqRange = as.numeric(strsplit(featureObj$range, "-")[[1]])


		# Get range in full alignment
		match = which(names(aln) == refSeq)
		if (length(match) == 0){
			stop(paste("Cannot find refseq", refSeq, "in alignment\n"))
		}
		fullSeq = aln[match]
		alignmentRange = c(0, 0)
		ungappedPos = 1
		for (i in 1:length(fullSeq[[1]])){
			char = fullSeq[[1]][i]
			if (char != "-"){
				if (ungappedPos == refSeqRange[1]){
					alignmentRange[1] = i
				}
				if (ungappedPos == refSeqRange[2]){
					alignmentRange[2] = i
				}
				ungappedPos = ungappedPos + 1	
			}
		}

		if (alignmentRange[1] == 0 | alignmentRange[2] == 0){
			stop(paste("Unexpected error finding boundaries for", feature, alignmentRange[1], alignmentRange[2], "\n"))
		}

		if (element != "common"){

			# Ensure that none of the sites are used in more than 1 alignment ie. no double dipping
			alreadyUsed = sapply(alignmentRange[1]:alignmentRange[2], function(ele) any(ele == all.sites.included))
			if (sum(alreadyUsed) > 0){
				duplicates = (alignmentRange[1]:alignmentRange[2])[alreadyUsed]
				cat(paste("Warning: Duplicate sites detected for", feature, ":", paste(duplicates, collapse=","), "\n"))
			}
			all.sites.included = c(all.sites.included, alignmentRange[1]:alignmentRange[2])

		}


		# Subsequences
		for (acc in names(aln.out) ){
			seq = toupper(paste0(aln[[acc]], collapse=""))
			subseq = substr(seq, alignmentRange[1], alignmentRange[2])
			aln.out[acc] = paste0(aln.out[acc], subseq)

		}



	}


	if (is.null(extract[[element]][["dir"]])) {


			
		aln.out = removeShortSequences(aln.out)
		
	
		# Output
		cat(paste0(element, ": extracting from alignment ", fullAlignDir, "\n"))
		write(paste0(paste0(">", names(aln.out), "\n", aln.out), collapse="\n"), out.fasta)


	}else{


		dir = paste0(extract[[element]][["dir"]], "/data/combined.fasta")
		
		aln.short = read.fasta(dir)
		aln.short.seq = as.character(sapply(names(aln.short), function(acc) toupper(paste0(aln.short[[acc]], collapse=""))))
		names(aln.short.seq) = names(aln.short)


		is.alphafold = sapply(strsplit(gsub(".+/", "", names(aln.short.seq)), "_"), function(ele) ele[2] == "AF")

		# Use all
		is.alphafold = rep(T, length(aln.short.seq))

		aln.short.seq = aln.short.seq[is.alphafold]

		aln.short.seq = removeShortSequences(aln.short.seq)

		cat(paste0(element, ": using alignment at ", dir, "\n"))
		write(paste0(paste0(">", names(aln.short.seq), "\n", aln.short.seq), collapse="\n"), out.fasta)


	}


}



