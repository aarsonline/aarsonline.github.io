library(rjson)
library(seqinr)



# args=c("../../../../class2", 'Catalytic_domain', "structures.txt", "align.ali")

# Add family members to the alignment by using the exissing alignment to their reference structure
args = commandArgs(trailingOnly=TRUE)
wd = args[1]
domain = args[2]
structuresFile = args[3]
alignmentFile = args[4]


refStructures = readLines(structuresFile)

fasta = read.fasta(alignmentFile)
out.fasta = toupper(sapply(fasta, function(seq) paste(seq, collapse="")))
names(out.fasta) = gsub(".+/", "", names(out.fasta))

nsites = as.numeric(nchar(out.fasta)[1])

structures = character(0)

dirs = list.dirs(path=wd, recursive=T)
#dirs = dirs[grep(paste0(wd, "/class./.+/data$"), dirs)]
dirs = dirs[grep(paste0(wd, "/.+/data$"), dirs)]
for (d in dirs){

	structuresD = readLines(paste0(d, "/structures.txt"))

	json = fromJSON(file = paste0(d, "/../info.json"))
	ref_str = json$ref_str


	print(ref_str)



	# Does the domain exist?
	domainDir = paste0(d, "/domains/", domain)
	if (dir.exists(domainDir)){


		# Family alignment
		fam.fasta = read.fasta(paste0(domainDir, "/align.ali"))
		fam.fasta = toupper(sapply(fam.fasta, function(seq) paste(seq, collapse="")))
		names(fam.fasta) = gsub(".+/", "", names(fam.fasta))


		# Save the file to structures.txt
		fileDir = paste0(domainDir, "/", structuresD)


		insertPositions = numeric(0)
		cumulativeFamilyAccessions = character(0)




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
		}

				

		for (f in fileDir){

			if (file.exists(f)){

				structures = c(structures, f)




				# Add to alignment: if it's not a reference structure and it's not a pdb structure
				is.alphafold = strsplit(gsub(".+/", "", f), "_")[[1]][2] == "AF"
				is.alphafold = TRUE
				if (is.alphafold && !any(refStructures == f)){


					# Target sequence in family alignment
					fSeq = ""
					fAcc = gsub(".+/", "", f)
					fSeqFamily = paste0(fam.fasta[[gsub(".+/", "", fAcc)]], collapse="")


					posFamily = 1
					for (posSuperFamily in 1:1e6){


						if (posSuperFamily > nsites){
							break
						}


						charRefF = substr(refSeqFamily, posFamily, posFamily)
						charRefSF = substr(refSeqSuperfamily, posSuperFamily, posSuperFamily)
						targetRefF = substr(fSeqFamily, posFamily, posFamily)

						
						insertAtPositionInFamily = any(posFamily == insertPositions)

						if (insertAtPositionInFamily){
							fSeq = paste0(fSeq, targetRefF)
							posFamily = posFamily + 1
						}else if (charRefSF == "-"){

							# Ref is gap in superfamily alignment -> gap here (unless this gap comes from an insertion specific to this family...)
							fSeq = paste0(fSeq, "-")
						}else{


							# Ref is non-gap in both alignments -> add to alignment
							if (charRefF != "-"){
								fSeq = paste0(fSeq, targetRefF)
							}else{


								# Ref is gap in the family alignment. We need to add an insertion into the main alignment and fill it with gaps (unless already done so)
								fSeq = paste0(fSeq, targetRefF)

								for (s in names(out.fasta)){

									if (!any(s != cumulativeFamilyAccessions)){

										oldSeq = out.fasta[[s]]
										newSeq = paste0(substr(oldSeq, 1, posSuperFamily-1), "-", substr(oldSeq, posSuperFamily, nsites))
										out.fasta[[s]] = newSeq


									}

								}
								#cat(paste("Adding a gap at position", posSuperFamily, posFamily, fAcc, "\n"))
								refSeqSuperfamily = out.fasta[[gsub(".+/", "", ref_str)]]
								posSuperFamily = posSuperFamily + 1
								insertPositions = c(insertPositions, posFamily)
								nsites = nsites + 1


							}


							posFamily = posFamily + 1

						}

						


					}




					cumulativeFamilyAccessions = c(cumulativeFamilyAccessions, fAcc)
					out.fasta[[fAcc]] = fSeq

				}



			}else{
				cat(paste0("Warning cannot find", fileDir, "\n"))
			}

		}


	}else{
		cat(paste0("Warning cannot find", domainDir, "\n"))
	}

	

}



# Remove all gap-only columns, which can arise from gaps induced by pdb structures (which are omitted from alignment)


# Save all structures to structure file
#write(paste(structures, collapse="\n"), structuresFile)


#out.fasta = out.fasta[order(names(out.fasta))]
write(paste(paste0(">", names(out.fasta), "\n", as.character(out.fasta)), collapse="\n"), "combined.fasta")









