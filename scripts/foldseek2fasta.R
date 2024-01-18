library(seqinr)




args =commandArgs(trailingOnly = TRUE)

if (length(args) < 4) {
    cat("Usage: Rscript script.R <PDB directory> <foldseek file> <reference alignment> <output.fasta>\n")
    quit(status = 1)
}

pdb_directory <- args[1]
sequence_file <- args[2]
ref_fasta <- args[3]
output_fasta <- args[4]

# Read PDB files and sequences
pdb_structures <- readLines(pdb_directory)
sequences <- readLines(sequence_file)
ref.fasta = read.fasta(ref_fasta)




# Filter out duplicate chains
pdb_structures = sapply(strsplit(pdb_structures, "\t"), function(ele) ele[2])
keep = c(grep("[.]pdb$", pdb_structures), grep("[.]pdb_A$", pdb_structures))
pdb_structures = pdb_structures[keep]
sequences = sequences[keep]
pdb_structures = paste0("structures/", pdb_structures)
pdb_structures = gsub("[.]pdb_A$", ".pdb", pdb_structures)


# Check that the number of PDB files and sequences match
if (length(pdb_structures) != length(sequences)) {
    cat("Error: Number of PDB files and sequences do not match. " , length(pdb_structures), "!=", length(sequences), "\n")
    quit(status = 1)
}
if (length(ref.fasta) != length(sequences)) {
    cat("Error: Number of ref and target sequences do not match.\n")
    quit(status = 1)
}

# Write sequences with PDB names to a FASTA file
fasta_lines <- character(0)

for (i in 1:length(pdb_structures)) {
    pdb_name <- pdb_structures[i]
    sequence <- sequences[i]
    fasta_lines[pdb_name] = sequence
}



# Match it with the gap scheme of the reference alignment
seq_3di_gapped.aln = list()
for (i in 1:length(fasta_lines)) {

    acc = names(fasta_lines)[i]
    seq_3di = fasta_lines[acc]
    seq_ref = ref.fasta[acc]

    if (is.null(seq_ref)){
        cat(paste("Cannot find", acc, "!\n"))
        stop()
    }




    seq_ref = paste(as.character(seq_ref[[1]]), collapse="")
    n1 = nchar(gsub("-", "", seq_3di))
    n2 = nchar(gsub("-", "", seq_ref))
    if (n1 != n2){
        cat(paste(acc, "seqlen", n1, "vs", n2, "\n"))
    }
    

    seq_3di_gapped = character(0)
    threedi_pos = 1
    for (pos in 1:nchar(seq_ref)){

        char = substr(seq_ref, pos, pos)
        if (char == "-"){
            seq_3di_gapped = c(seq_3di_gapped, "-")
        }else{
            threedi = substr(seq_3di, threedi_pos, threedi_pos)
            seq_3di_gapped = c(seq_3di_gapped, threedi)
            threedi_pos = threedi_pos + 1
        }

    }
    seq_3di_gapped = paste0(as.character(seq_3di_gapped), collapse="")
    seq_3di_gapped.aln[[acc]] = seq_3di_gapped

}



write.fasta(seq_3di_gapped.aln, names(seq_3di_gapped.aln), output_fasta)
cat("FASTA file generated: ", output_fasta, "\n")











