db="TMP_DB1234"
indir="structures"

mkdir $db
cd $db
foldseek createdb ../$indir/*.pdb tmp
cd ../

tr < $db/tmp_ss -d '\000' > fs.txt


Rscript ../../../../../scripts/foldseek2fasta.R $db/tmp.lookup fs.txt align.ali 3di.fasta


# Cleanup
rm -r $db
rm fs.txt





