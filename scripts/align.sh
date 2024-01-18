#!/bin/sh

# sudo apt-get install dssp

cd data

rm -f structures.txt
touch structures.txt


rm -r -f dssp
mkdir -p dssp
cd structures/
for f in *.pdb;
do

	echo $f
	echo "structures/$f" >> ../structures.txt
	mkdssp -i $f -o $f.dssp
	mv $f.dssp ../dssp/.
	Rscript ../../../../scripts/dssp2pdb.R ../dssp/$f.dssp $f

done
cd ../

# Structural alignment
~/DeepAlign/3DCOMB -i structures.txt -o align


# Hinge alignment
rm -rf hinges
mkdir hinges
cd hinges
Rscript ../../../../scripts/prepareHinges.R ../../info.json 1


# Pairwise alignment each structure with the ref hinge to get the hinge position in every sequence
if [ -d "region1" ] 
then

	for r in region*;
	do
		echo $r
		cd $r
		touch structuresAll.txt
		for f in ../../dssp/*.pdb;
		do
			#echo $f
			~/DeepAlign/DeepAlign hinge_str.pdb $f -o $f &> out.err

			mv $f.pdb .
			mv $f.local .
			mv $f.fasta .
			mv $f.score .
			
			# Extract start position
			#line=$(sed '5!d' alignment.local)
			#startPos=${line:13:5}
			echo "$f" >> structuresAll.txt
			
			#rm alignment*
			#rm out.err
			
		done
		cd ../

	done



	#exit


	# Truncate all pdb files to fit in the hinges
	Rscript ../../../../scripts/prepareHinges.R ../../info.json 2


	# Multiple alignment
	for r in region*;
	do
		echo $r
		cd $r
		~/DeepAlign/3DCOMB -i structures.txt -o align
		
		cd ../
	done


	# Glue the alignments back together
	Rscript ../../../../scripts/prepareHinges.R ../../info.json 3

fi



cd ../
rm -rf hinges


# DSSP
Rscript ../../../scripts/dssp2pdbMulti.R


# Make a secondary structure fasta file from dssp and alignment
Rscript ../../../scripts/dssp2fasta.R




# Refine the alignment
Rscript ../../../scripts/refineMSA.R align.ali secondary.fasta
mv align.ali unrefined.fasta
mv refined.fasta align.ali
Rscript ../../../scripts/dssp2fasta.R


# Realign some regions?
Rscript ../../../scripts/realignRegions.R align.ali secondary.fasta ../info.json
mv align.ali refined.fasta
mv realigned.fasta align.ali
Rscript ../../../scripts/dssp2fasta.R


rm -f unrefined.fasta
rm -f align.rms
rm -f align.rmt


bash ../../../scripts/foldseek2fasta.sh

#exit

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


	

	~/DeepAlign/3DCOMB -r -i structures.txt -o align
	Rscript ../../../../../scripts/dssp2pdbMulti.R


	# Make a secondary structure fasta file from dssp
	Rscript ../../../../../scripts/dssp2fasta.R


	# Refine the alignment
	Rscript ../../../../../scripts/refineMSA.R align.ali secondary.fasta
	mv align.ali unrefined.fasta
	mv refined.fasta align.ali
	Rscript ../../../../../scripts/dssp2fasta.R

	cd ../


done
