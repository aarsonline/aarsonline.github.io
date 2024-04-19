#!/bin/sh


c="class8"
d="WHEP"

# Prepare one superfamily per domain

echo "$c $d"


mkdir -p data
cd data

# Put all reference structures into structures.txt
Rscript ../../../scripts/copyRefstructures.R ../../../$c/ $d structures.txt ../info.json $c 

# Align the reference structures
~/DeepAlign/3DCOMB -i structures.txt -o align



# Make a secondary structure fasta file from dssp
Rscript ../../../scripts/dssp2pdbMulti.R
Rscript ../../../scripts/dssp2fasta.R


# Refine the alignment
Rscript ../../../scripts/refineMSA.R align.ali secondary.fasta
mv align.ali unrefined.fasta
mv refined.fasta align.ali
Rscript ../../../scripts/dssp2fasta.R



# Add the remaining family members to the alignment by aligning them to their reference structure
Rscript ../../../scripts/addFamilyMembersToAlignment.R ../../../$c $d structures.txt align.ali align.ali combined.fasta # Warnings are vital to fix
Rscript ../../../scripts/addFamilyMembersToAlignment.R ../../../$c $d structures.txt secondary.fasta secondary.fasta combined.secondary.fasta  # Warnings are vital to fix
#Rscript ../../../../scripts/addFamilyMembersToAlignment.R ../../../../$c $d structures.txt align.ali 3di.fasta 3di.secondary.fasta # Disregard warnings if the other two pass









