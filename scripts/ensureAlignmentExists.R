

aa.names = list()
aa.names[["A"]] = "ALA"
aa.names[["L"]] = "LEU"
aa.names[["V"]] = "VAL"
aa.names[["I"]] = "ILE"

aa.names[["M"]] = "MET"
aa.names[["F"]] = "PHE"
aa.names[["W"]] = "TRP"
aa.names[["G"]] = "GLY"

aa.names[["K"]] = "LYS"
aa.names[["R"]] = "ARG"
aa.names[["D"]] = "ASP"
aa.names[["E"]] = "GLU"

aa.names[["S"]] = "SER"
aa.names[["T"]] = "THR"
aa.names[["N"]] = "ASN"
aa.names[["Q"]] = "GLN"

aa.names[["C"]] = "CYS"
aa.names[["P"]] = "PRO"
aa.names[["H"]] = "HIS"
aa.names[["Y"]] = "TYR"





# If there is no alignment file, then create one with just one sequence 
if (!file.exists("align.ali")){


	str = readLines("structures.txt")

	file.copy(str, "align.pdb", overwrite=T)


	pdb = readLines(str)
	atomLines = pdb[grep("^ATOM", pdb)]
	atomLines = atomLines[substr(atomLines, 14, 15) == "CA"]
	aa.3 = substr(atomLines, 18, 20)
	aa.1 = as.character(sapply(aa.3, function(ele) names(which(aa.names == ele))))
	seq = paste(aa.1, collapse="")
	write(paste0(">", str, "\n", seq), "align.ali")


}
