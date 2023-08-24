library(seqinr)



# List of dssp files
#dssp.files = list.files(path = "dssp", pattern = "[.]dssp$")

structures = readLines("structures.txt")
dssp.files = paste0(gsub("structures/", "dssp/", structures), ".dssp")



# Load alignment
fasta = read.fasta("align.ali")
nsites = length(fasta[[1]])

output.seq = character(0)



for (f in dssp.files){


	print(f)


	given.warning = FALSE

	acc = gsub("[.]dssp$", "", f)
	acc = gsub("dssp/", "structures/", acc)
	file = f
	fasta.seq = fasta[[acc]]

	dssp = readLines(file)
	start = grep("#  RESIDUE AA STRUCTURE", dssp) + 1
	dssp = dssp[start:length(dssp)]



	# Get secondary structural elements
	seq = ""
	dssp.pos = 1
	for (i in 1:nsites){


		# If gap, then skip
		aln.char = toupper(fasta.seq[i])
		if (length(aln.char) == 0){
			if (!given.warning){
				cat(paste("Warning - proceeding to the end of", gsub(".+/", "", f), "\n"))
				#given.warning = TRUE
				print(i)
			}
			
			sse = "N"
		}
		else if (aln.char == "-"){
			sse = "-"

		}else{

			line = dssp[dssp.pos]
			dssp.pos = dssp.pos + 1


			# If there is a region of missing residues in the pdb structrue then an extra line with '!' is inserted into the dssp file
			res = substr(line, 14, 14)
			if (res == "!"){
				line = dssp[dssp.pos]
				dssp.pos = dssp.pos + 1
			}

			else if (i > 1){

				# To correct for a weird mismatch between dssp and 3dcomb on missing residues
				ssePrev = fasta.seq[i-1]
				if (res == "X" && ssePrev == "-" && aln.char != "X"){
					line = dssp[dssp.pos]
					dssp.pos = dssp.pos + 1
				}

				
			}

			sse = substr(line, 17, 17)
			if (sse == " ") sse = "N"

		}


		seq = paste0(seq, sse)
		

	}



	output.seq[acc] = seq



}


# Write to fasta
write( paste(paste0(">", names(output.seq), "\n", as.character(output.seq)), collapse="\n"), "secondary.fasta")

