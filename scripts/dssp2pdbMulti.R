library(stringr)


# Read a list of structures which are contained within an alignment. Loads the sse from the structures into the alignment
# Assumes that structure 1 is chain A, structure 2 is chain B etc.
structures = readLines("structures.txt")
pdb = readLines("align.pdb")



# Remove existing structural annotatios
sse = grep("^(HELIX|SHEET)", pdb)
if (length(sse) > 0){
	pdb = pdb[-sse]
}

# Chain nrs
chainNrs = substr(pdb, 22, 22)
chains = unique(chainNrs[!is.na(chainNrs) & chainNrs != " " & chainNrs != ""])
structures = structures[structures != ""]
if (length(chains) != length(structures)){
	stop(paste("The number of structures is not the same as the number of chains in the alignment ", length(chains), "!=", length(structures)))
}

names(chains) = structures
names(structures) = chains



# Copy all sse info from the pdb files to this one, but change the chain name
sse.out = character(0)
for (chain in chains){

	# Read in pdb file
	fileName = gsub("structures", "dssp", structures[chain])
	pdb_chain = readLines(fileName)

	helices = pdb_chain[grep("^(HELIX)", pdb_chain)]
	strands = pdb_chain[grep("^(SHEET)", pdb_chain)]

	helices = paste0(substr(helices, 1, 19), chain, substr(helices, 21, 31), chain, substr(helices, 33, nchar(helices)))
	strands = paste0(substr(strands, 1, 21), chain, substr(strands, 23, 32), chain, substr(strands, 34, nchar(strands)))
	helices	= gsub("\t", "", helices)
	sse.out = c(sse.out, helices, strands)

}



pdb.out = c(paste0(sse.out, collapse = "\n"), paste0(pdb, collapse = "\n"), collapse = "\n")


out.file = "align.pdb"
write(pdb.out, out.file)

