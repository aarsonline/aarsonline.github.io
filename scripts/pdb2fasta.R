

# Read in a list of pdb structures and output their sequences
args = commandArgs(trailingOnly=TRUE)

structures = readLines(args[1])
out.file = args[2]



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

seqs = character(length(structures))
names(seqs) = structures
for (str in structures){
	pdb = readLines(str)
	atomLines = pdb[grep("^ATOM", pdb)]
	atomLines = atomLines[substr(atomLines, 14, 15) == "CA"]
	aa.3 = substr(atomLines, 18, 20)
	aa.1 = as.character(sapply(aa.3, function(ele) names(which(aa.names == ele))))
	seqs[str] = paste(aa.1, collapse="")

}



write(paste(paste0(">", names(seqs), "\n", as.character(seqs)), collapse="\n"), out.file)

