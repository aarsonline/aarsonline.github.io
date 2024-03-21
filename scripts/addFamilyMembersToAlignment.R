library(rjson)
library(seqinr)





# args=c("../../../../class1/", 'Catalytic_domain', "structures.txt", "align.ali", "align.ali", "combined.fasta")

# Add family members to the alignment by using the exissing alignment to their reference structure
args = commandArgs(trailingOnly=TRUE)

wd = args[1]
domain = args[2]
structuresFile = args[3]
alignmentFile = args[4]
familyAlignmentFile = args[5]
outfile = args[6]


refStructures = readLines(structuresFile)

fasta = read.fasta(alignmentFile)


# Amino acids
out.fasta = toupper(sapply(fasta, function(seq) paste(seq, collapse="")))
names(out.fasta) = gsub(".+/", "", names(out.fasta))
nsites = as.numeric(nchar(out.fasta)[1])




structures = character(0)

dirs = list.dirs(path=wd, recursive=T)
dirs = dirs[grep(paste0(wd, "/.+/data$"), dirs)]



#dirs = dirs[grep(paste0(wd, "/.+/data$"), dirs)]


for (d in dirs){

	structuresD = readLines(paste0(d, "/structures.txt"))

	json = fromJSON(file = paste0(d, "/../info.json"))
	ref_str = json$ref_str


	print(ref_str)



	# Does the domain exist?
	domainDir = paste0(d, "/domains/", domain)
	if (dir.exists(domainDir)){


		# Family alignment
		#fam.fasta = read.fasta(paste0(domainDir, "/align.ali"))
		fam.fasta = read.fasta(paste0(domainDir, "/", familyAlignmentFile))
		fam.fasta = toupper(sapply(fam.fasta, function(seq) paste(seq, collapse="")))
		names(fam.fasta) = gsub(".+/", "", names(fam.fasta))


		# Save the file to structures.txt
		fileDir = paste0(domainDir, "/", structuresD)




		# Reference sequence in both alignments
		ref_str.tidy = gsub(".+/", "", ref_str)
		if (!any(names(fam.fasta) == ref_str.tidy)){
			cat(paste("Warning: cannot find ref seq", ref_str, "in alignment. Skipping family\n"))
			next
		}
		refSeqFamily = fam.fasta[[ref_str.tidy]]
		refSeqSuperfamily = out.fasta[[gsub(".+/", "", ref_str)]]


		# Confirm they are the same sequence
		refSeqFamily.nogap = gsub("-", "", refSeqFamily)
		refSeqSuperfamily.nogap = gsub("-", "", refSeqSuperfamily)
		if (refSeqFamily.nogap != refSeqSuperfamily.nogap){
			cat(paste0("WARNING! Mismatching family and superfamily sequences for ", ref_str, "\n"))
			cat(paste0("\t", refSeqFamily.nogap, "\n"))
			cat(paste0("\t", refSeqSuperfamily.nogap, "\n"))
			#next
		}

				


		# Add gaps to main alignment whenever there is a gap in family ref
		posSuperFamily = 1
		posFamily = 1
		while (TRUE){

			charRefF = substr(refSeqFamily, posFamily, posFamily)
			charRefSF = substr(refSeqSuperfamily, posSuperFamily, posSuperFamily)


			#print(paste(posFamily, posSuperFamily, charRefF, charRefSF))

			if (charRefSF == "" && charRefF == ""){
	 			break
	 		}



			if (charRefF == "-"){
				

				# Ref is gap in the family alignment. We need to add an insertion into the main alignment and fill it with gaps (unless already done so)
				for (s in names(out.fasta)){


					oldSeq = out.fasta[[s]]
					newSeq = paste0(substr(oldSeq, 1, posSuperFamily-1), "-", substr(oldSeq, posSuperFamily, nsites))
					out.fasta[[s]] = newSeq


				}
				#cat(paste("Adding a gap at position", posSuperFamily, posFamily, ref_str, "\n"))
				refSeqSuperfamily = out.fasta[[gsub(".+/", "", ref_str)]]
				#posSuperFamily = posSuperFamily + 1
				nsites = nsites + 1
				posFamily = posFamily + 1
				next


			}


	 		if (charRefSF == "-"){
	 			posSuperFamily = posSuperFamily + 1
	 			next
	 		}





			posSuperFamily = posSuperFamily + 1
			posFamily = posFamily + 1



	 	}


		# Append family alignment to superfamily alignment
	 	fileDir = names(fam.fasta)
		fileDir = fileDir[fileDir != ref_str]
		if (length(fileDir) == 0){
			next
		}

		for (f in fileDir){

			print(f)


			# Target sequence in family alignment
			fSeq = ""
			fAcc = f
			fSeqFamily = paste0(fam.fasta[[fAcc]], collapse="")


			# For each position in superfamily alignment
			posFamily = 1
			for (posSuperFamily in 1:nsites){


				charRefF = substr(refSeqFamily, posFamily, posFamily)
				charRefSF = substr(refSeqSuperfamily, posSuperFamily, posSuperFamily)
				targetRefF = substr(fSeqFamily, posFamily, posFamily)

				#print(paste(posFamily, posSuperFamily, charRefF, charRefSF))



				if (charRefSF == "-" & charRefF != "-"){
					fSeq = paste0(fSeq, "-")
				}else{
					fSeq = paste0(fSeq, targetRefF)
					posFamily = posFamily + 1
				}


				

			}

			out.fasta[[fAcc]] = fSeq


		}



		

	}else{
		cat(paste0("Warning cannot find", domainDir, "\n"))
	}

	

}





# Secondary and 3di structures



#out.fasta = out.fasta[order(names(out.fasta))]
write(paste(paste0(">", names(out.fasta), "\n", as.character(out.fasta)), collapse="\n"), outfile)









