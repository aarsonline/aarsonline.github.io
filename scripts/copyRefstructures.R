library(rjson)



# Put the directory of all reference structures into the output file eg. structures.txt 


args = commandArgs(trailingOnly=TRUE)
wd = args[1]
domain = args[2]
outfile = args[3]
outfileJSON = args[4]
classNr = args[5]


classNr = as.numeric(gsub("[a-z]", "", tolower(classNr)))
classNr = ifelse(classNr == 1, "Class I", "Class II")


output_small = character(0)
output_full = character(0)



nfamilies = 0
dirs = list.dirs(wd, recursive=F)
for (d in dirs){

	json = fromJSON(file = paste0(d, "/info.json"))
	ref_str = json$ref_str




	# Does the domain exist?
	domainDir = paste0(d, "/data/domains/", domain)
	if (dir.exists(domainDir)){

		fileDir = paste0(domainDir, "/", ref_str)

		if (!file.exists(fileDir)){

			# Use a different structure
			s = readLines(paste0(domainDir, "/structures.txt"))[1]
			fileDir = paste0(domainDir, "/", s)

		}


		nfamilies = nfamilies + 1

		# Ref str
		output_small = c(output_small, fileDir)

		# All structures
		structuresD = readLines(paste0(domainDir, "/structures.txt"))
		#is.alphafold = sapply(strsplit(gsub(".+/", "", structuresD), "_"), function(ele) ele[2] == "AF")
		#structuresD = structuresD[is.alphafold]
		structuresD = paste0(domainDir, "/", structuresD)
		output_full = c(output_full, structuresD)

			


		

	}else{
		#cat(paste0("Warning cannot find", domainDir, "\n"))
	}

	

}


set.seed(1234)
if (nfamilies >= 4){
	write(paste(output_small, collapse="\n"), outfile)
}else{
	if (length(output_full) > 30){
		#output_full = sample(output_full, 30)
	}
	write(paste(output_full, collapse="\n"), outfile)
}






