



for c in class*/;
do

	echo $c
	cd $c
	for d in */;
	do
		echo $d
		cd $d/data
		bash ../../../scripts/foldseek2fasta.sh


		echo "___________________________"
		echo $d 
		echo "___________________________"
		cd domains/Catalytic_domain
		bash ../../../../../scripts/foldseek2fastaDomain.sh 
		cd ../../

		cd ../../

	done
	cd ../


done

