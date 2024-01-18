
library(seqinr)









families = 1:3


sf.fasta = read.fasta("sf.fasta")
out.fasta = toupper(sapply(sf.fasta, function(seq) paste(seq, collapse="")))
names(out.fasta) = gsub(".+/", "", names(out.fasta))
nsites = as.numeric(nchar(out.fasta)[1])

for (fam in families){


	
	ref_str = paste0("ref", fam)
	fasta.file = paste0("family", fam, ".fasta")


	print(fasta.file)


	# Family alignment
	fam.fasta = read.fasta(fasta.file)
	fam.fasta = toupper(sapply(fam.fasta, function(seq) paste(seq, collapse="")))
	names(fam.fasta) = gsub(".+/", "", names(fam.fasta))


	insertPositions = numeric(0)
	cumulativeFamilyAccessions = character(0)


	# Reference sequence in both alignments
	if (!any(names(fam.fasta) == ref_str)){
		stop(paste("Warning: cannot find ref seq", ref_str, "in alignment. Skipping family\n"))
		
	}
	refSeqFamily = fam.fasta[[ref_str]]
	refSeqSuperfamily = out.fasta[[gsub(".+/", "", ref_str)]]


	# Confirm they are the same sequence
	refSeqFamily.nogap = gsub("-", "", refSeqFamily)
	refSeqSuperfamily.nogap = gsub("-", "", refSeqSuperfamily)
	if (refSeqFamily.nogap != refSeqSuperfamily.nogap){
		cat(paste0("WARNING! Mismatching family and superfamily sequences for ", ref_str, "\n"))
		cat(paste0("\t", refSeqFamily.nogap, "\n"))
		cat(paste0("\t", refSeqSuperfamily.nogap, "\n"))
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

 }



write(paste(paste0(">", names(out.fasta), "\n", as.character(out.fasta)), collapse="\n"), "combined.fasta")

# Compare to expected result
expected.fasta = read.fasta("expectedResult.fasta")
expected.fasta = toupper(sapply(expected.fasta, function(seq) paste(seq, collapse="")))

for (s in names(expected.fasta)){

	sTrue = expected.fasta[s]
	sEst = out.fasta[s]

	if (sTrue != sEst){
		cat(paste0("   Error:\t", s, "\n"))
		cat(paste0("Expected:\t", sTrue, "\n"))
		cat(paste0("     Got:\t", sEst, "\n"))
		quit()
	}


}

