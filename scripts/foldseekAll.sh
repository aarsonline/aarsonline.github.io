



for c in class*/;
do

	echo $c
	cd $c
	for d in */;
	do
		echo $d
		cd $d/data
		bash ../../../scripts/foldseek2fasta.sh
		cd ../../

	done
	cd ../


done

