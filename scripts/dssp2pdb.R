library(stringr)


# Read dssp
args = commandArgs(trailingOnly=TRUE)

dssp = readLines(args[1])
pdb = readLines(args[2])
start = grep("#  RESIDUE AA STRUCTURE", dssp) + 1


out.file = gsub("[.]dssp", ".pdb", args[1])
out.file = gsub("[.]pdb[.]pdb", ".pdb", out.file)

if (length(grep("^HELIX", pdb) > 0)){
	# skip

	write(pdb, out.file)
	#cat(paste("dssp2pdb.R - do not need to produce sse for", args[2], " - copying pdb to ", out.file, "\n"))
	return("")
}




# Get secondary structural elements
sse.df = data.frame(start = numeric(0), stop = numeric(0), sse = character(0), chain = character(0))





prevSSE =  substr(dssp[start], 17, 17)
startsse = as.numeric(substr(dssp[start], 8, 10))
for (i in (start+1):length(dssp)){

	line = dssp[i]
	if (line == ""){
		next
	}




	res = substr(line, 14, 14)
	if (res == "!"){
		next;
	}

	
	sse = substr(line, 17, 17)
	chain = substr(line, 12, 12)

	
	if (sse != prevSSE){

		stopNr = as.numeric(substr(dssp[i-1], 8, 10))
		sse.df2 = data.frame(start = startsse, stop = stopNr, sse = prevSSE, chain = chain)
		sse.df = rbind(sse.df, sse.df2)


		prevSSE = sse
		startsse = as.numeric(substr(dssp[i], 8, 10))
		
	}
	

}

if (nrow(sse.df) == 0){
	write(pdb, out.file)
	#cat(paste("dssp2pdb.R - skipping", args[1], " because there are no SSEs \n"))
	return("")
}



sse.out = character(0)
helixNr = 1
sheetNr = 1
for (i in 1:nrow(sse.df)){


	sse = sse.df[i,"sse"]
	res1 = sse.df[i,"start"]
	res2 = sse.df[i,"stop"]
	chain = sse.df[i,"chain"]

	# Helix
	# http://www.bmsc.washington.edu/CrystaLinks/man/pdb/part_42.html
	if (sse == "H" | sse == "I" | sse == "G"){
		line = "HELIX  " # Column 1-6
		line = paste0(line, str_pad(helixNr, 3, side = "left", pad = " ")) # Column 8-10
		#line = paste0(line, " ") # Column 11 spacing
		line = paste0(line, str_pad(paste0("H", helixNr), 4, side = "left", pad = " ")) # Column 12-14
		line = paste0(line, " ") # Column 15 spacing
		line = paste0(line, "XXX ") # Column 16-19: residue name
		line = paste0(line, chain) # Column 20: chain name
		line = paste0(line, "	") # Column 21 spacing
		line = paste0(line, str_pad(res1, 4, side = "left", pad = " ")) # Column 22-25: start residue
		line = paste0(line, "  ") # Column 26-27 spacing
		line = paste0(line, "XXX ") # Column 28-31: residue name
		line = paste0(line, chain, " ") # Column 32-33: chain name
		line = paste0(line, str_pad(res2, 4, side = "left", pad = " ")) # Column 34-37: end residue
		line = paste0(line, "  ") # Column 38 spacing
		line = paste0(line, "1 ") # Column 39-40: helix code. TODO use other classes
		line = paste0(line, "                              ") # Column 41-71 spacing
		line = paste0(line, str_pad(res2-res1+1, 5, side = "left", pad = " ")) # Column 72-76: helix length

		# HELIX    1  A1 XXX A    1  XXX A   10  1                                  10
		sse.out = c(sse.out, line)
		  
		helixNr = helixNr + 1
	}


	# Sheet 
	# http://www.bmsc.washington.edu/CrystaLinks/man/pdb/part_44.html
	if (sse == "E"){

		sheetLen = res2-res1+1
		#for (pos in 1:sheetLen){


			sense = 0
			#sense = ifelse(pos == 1, 0, ifelse(pos == 2, 1, -1))

			line = "SHEET  " # Column 1-7
			line = paste0(line, str_pad(sheetNr, 3, side = "left", pad = " ")) # Column 8-10: strand number
			line = paste0(line, str_pad(paste0("E", sheetNr), 4, side = "left", pad = " ")) # Column 11-14: sheet identifier
			line = paste0(line, str_pad(sheetLen, 2, side = "left", pad = " ")) # Column 15-16: number of strands in sheet
			line = paste0(line, " XXX ") # Column 17-21: residue name
			line = paste0(line, chain) # Column 22: chain name
			line = paste0(line, str_pad(res1, 4, side = "left", pad = " ")) # Column 23-26: start residue num
			line = paste0(line, " XXX  ") # Column 27-32: residue name
			line = paste0(line, chain) # Column 33: chain name
			line = paste0(line, str_pad(res2, 4, side = "left", pad = " ")) # Column 34-37: end residue num
			line = paste0(line, str_pad(sense, 3, side = "left", pad = " ")) # Column 38-40: sense

		#}

		

		sse.out = c(sse.out, line)
		sheetNr = sheetNr + 1
		# SHEET    1   A 8 THR A  21  ARG A  22  0
		# SHEET    7   B 7 PHE A 160  GLN A 162 -1  N  TRP A 161   O  GLY A 170 
		# SHEET    1  E2 9 XXX A  58 XXX  A  66  0
		# SHEET    1 E2810 XXX A 689 XXX  A 698  0


	}


}


pdb.out = c(paste0(sse.out, collapse = "\n"), paste0(pdb, collapse = "\n"), collapse = "\n")



write(pdb.out, out.file)