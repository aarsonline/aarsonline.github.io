
# Realign some regions of the alignment using secondary structure, manually set in json file

library(msa)
library(seqinr)
library(rjson)


args = commandArgs(trailingOnly=TRUE)


if (length(args) != 3){
	stop(paste("Use: Rscript refineMSA.R <primary.fasta> <secondary.fasta> <info.json>"))
}


# Load alignments
aln.1 = read.fasta(file=args[1])
aln.2 = read.fasta(file=args[2])
json = fromJSON(file = args[3])
nsites = length(aln.2[[1]])
if (length(aln.1[[1]]) != nsites){
	stop(paste("Mismatching site count", length(aln.1[[1]]), "!=", nsites))
}

outfile = "realigned.fasta"




# Realign any regions which were manually requested to be realigned
regions = json[["refine"]]
if (!is.null(regions) && length(regions) > 0) {

	for (r in regions[1]){

		nsites.orig = length(aln.1[[1]])

		startPos = ifelse(is.null(r$start), 1, as.numeric(r[["start"]]))
		stopPos = ifelse(is.null(r$stop), nsites.orig, as.numeric(r[["stop"]]))
		stopPos = min(stopPos, nsites.orig)
		cat(paste("Realigning from", startPos, "to", stopPos, "\n"))


		aln.2.simple = sapply(aln.2, function(s) paste(s, collapse=""))

		# Helix
		aln.2.simple = gsub("i", "h", aln.2.simple)
		aln.2.simple = gsub("g", "h", aln.2.simple)


		# Turns / bridges
		aln.2.simple = gsub("b", "s", aln.2.simple)
		aln.2.simple = gsub("t", "s", aln.2.simple)


		aln.2.simple = substr(aln.2.simple, startPos, stopPos)
		aln.2.simple = gsub("-", "", aln.2.simple)


		aln.2.simple = toupper(aln.2.simple[nchar(aln.2.simple) > 0])

		# Write to fasta and read it back in
		write(paste(paste0(">", names(aln.2.simple), "\n", as.character(aln.2.simple)), collapse="\n"), "tmp.fasta")
		file.in = readAAStringSet(filepath="tmp.fasta")
		f = file.remove("tmp.fasta")


		# Realign
		realigned = as.character(msa(file.in, type="protein", method="ClustalW"))


		nsites.realn = as.numeric(nchar(realigned[1]))


		# Reappend to the full alignment
		aln.1.realigned = character(length(aln.1))
		aln.2.realigned = character(length(aln.2))
		names(aln.1.realigned) = names(aln.1)
		names(aln.2.realigned) = names(aln.2)
		for (taxon in names(aln.2)){

			newSeq.1 = ""
			newSeq.2 = ""

			# Before the realignment
			if (startPos > 1){
				newSeq.1 = paste0(as.character(aln.1[taxon][[1]])[1:(startPos-1)], collapse="")
				newSeq.2 = paste0(as.character(aln.2[taxon][[1]])[1:(startPos-1)], collapse="")
			}	


			# Realigned region: restore original sequence using gap positions
			orig.seq.1 = as.character(aln.1[taxon][[1]])[startPos:stopPos]
			orig.seq.2 = as.character(aln.2[taxon][[1]])[startPos:stopPos]
			orig.seq.1 = orig.seq.1[orig.seq.1 != "-"]
			orig.seq.2 = orig.seq.2[orig.seq.2 != "-"]
			realigned.seq = tolower(strsplit(realigned[taxon], "")[[1]])
			orig.pos = 1
			if (!is.na(realigned.seq[1])) {
				for (i in 1:length(realigned.seq)){

					symbol = realigned.seq[i]
					if (symbol == "-"){
						newSeq.1 = paste0(newSeq.1, symbol)
						newSeq.2 = paste0(newSeq.2, symbol)
					}else{
						newSeq.1 = paste0(newSeq.1, orig.seq.1[orig.pos])
						newSeq.2 = paste0(newSeq.2, orig.seq.2[orig.pos])
						orig.pos = orig.pos + 1
					}



				}

			}else{
				newSeq.1 = paste0(newSeq.1, paste0(rep("-", nsites.realn), collapse=""))
				newSeq.2 = paste0(newSeq.2, paste0(rep("-", nsites.realn), collapse=""))
			}

			# After the realignment
			if (stopPos < nsites.orig){
				newSeq.1 = paste0(newSeq.1, paste0(as.character(aln.1[taxon][[1]])[(stopPos+1):nsites.orig], collapse=""))
				newSeq.2 = paste0(newSeq.2, paste0(as.character(aln.2[taxon][[1]])[(stopPos+1):nsites.orig], collapse=""))
			}	


			aln.1.realigned[taxon] = toupper(newSeq.1)
			aln.2.realigned[taxon] = toupper(newSeq.2)

		}
		

		aln.1 = aln.1.realigned
		aln.2 = aln.2.realigned


	}



	write(paste(paste0(">", names(aln.1), "\n", as.character(aln.1)), collapse="\n"), outfile)
	#write(paste(paste0(">", names(aln.2), "\n", as.character(aln.2)), collapse="\n"), outfile)



}else{

	aln.1 = toupper(sapply(aln.1, function(s) paste(s, collapse="")))
	write(paste(paste0(">", names(aln.1), "\n", as.character(aln.1)), collapse="\n"), outfile)

}



