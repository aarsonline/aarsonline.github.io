#!/bin/sh



# Prepare all family alignments (but not pairwise alignments)
for c in class1;
do

	cd $c
	for a in */;
	do

		cd $a
		bash ../../scripts/align.sh

		cd ../


	done
	cd ../


done




