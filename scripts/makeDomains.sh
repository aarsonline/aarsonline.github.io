#!/bin/sh

# sudo apt-get install dssp

cd data

# Features
rm -r -f domains
mkdir domains
Rscript ../../../scripts/mkdomains.R
cd domains


for d in *;
do
	echo "aligning feature: $d"
	cd $d
	rm -r -f dssp
	mkdir -p dssp

	rm -f structures.txt
	touch structures.txt

	cd structures/
	for f in *.pdb;
	do

		mkdssp -i $f -o $f.dssp
		mv $f.dssp ../dssp/.
		echo "structures/$f" >> ../structures.txt
		Rscript ../../../../../../scripts/dssp2pdb.R ../dssp/$f.dssp $f

	done
	cd ../


	
	rm -f align.ali
	~/DeepAlign/3DCOMB -i structures.txt -o align
	Rscript ../../../../../scripts/ensureAlignmentExists.R
	Rscript ../../../../../scripts/dssp2pdbMulti.R


	# Make a secondary structure fasta file from dssp
	Rscript ../../../../../scripts/dssp2fasta.R


	# Refine the alignment
	Rscript ../../../../../scripts/refineMSA.R align.ali secondary.fasta
	mv align.ali unrefined.fasta
	mv refined.fasta align.ali
	Rscript ../../../../../scripts/dssp2fasta.R

	bash ../../../../../scripts/foldseek2fastaDomain.sh
	
	rm -f unrefined.fasta
	rm -f align.rms
	rm -f align.rmt

	cd ../


done
