


args = commandArgs(trailingOnly=TRUE)
yvar = tolower(args[1])


families = list.files(pattern = "rmsd.csv", recursive=TRUE)



all_structures = character(0)

within_pdb = numeric(0)
within_af = numeric(0)
between = numeric(0)



get.alignment.type = function(str1, str2){

	is.pdb1 = as.logical(length(grep("_PDB_", str1) == 1))
	is.pdb2 = as.logical(length(grep("_PDB_", str2) == 1))

	if (is.pdb1 && is.pdb2){
		1 # Within pdb
	}else if (!is.pdb1 && is.pdb2){
		2 # Between
	}else if (is.pdb1 && !is.pdb2){
		2 # Between
	}else{
		3 # Within AF
	}

}

pdb.list = character(0)
for (f in families){


	f.name = strsplit(f, "/")[[1]][2]
	if (f.name == "phe2" | f.name == "phe4"){
		next
	}


	df = read.csv(f, header=T)

	str.fam = unique(c(df$str1, df$str2))
	pdb.fam = grep("_PDB_", str.fam)
	if (length(pdb.fam) < 2){
		next
	}


	
	pdbs = tolower(gsub(".pdb", "", gsub(".+_", "", str.fam[pdb.fam])))
	print(paste(f, "has", length(pdb.fam), "pdbs", paste0(pdbs, collapse=", ")))
	pdb.list = c(pdb.list, paste0(f.name, ":", paste0(pdbs, collapse=", ")))

	all_structures = unique(c(all_structures, df$str1, df$str2))

	for (row in 1:nrow(df)){

		aln.type = get.alignment.type(df$str1[row], df$str2[row])
		rmsd = ifelse(yvar == "rmsd", df$rmsd[row], df$tm[row])

		if (aln.type == 1){
			within_pdb = c(within_pdb, rmsd)
		}else if (aln.type == 2){
			between = c(between, rmsd)
		}else if (aln.type == 3){
			within_af = c(within_af, rmsd)
		}


	}


}


print(paste(pdb.list, collapse="; "))


npdb = length(grep("_PDB_", all_structures))
naf = length(all_structures) - npdb	


png(paste0(yvar, ".png"), width=1000, height=614, res=120)
par(mar=c(3,4,3,2))

ymax = ifelse(yvar == "rmsd", 7, 1.5)

ylab = ymax*6/7
ylabel = ifelse(yvar == "rmsd", "RMSD (\u212b)", "TM score")


boxplot(within_pdb, within_af, between, xlim=c(0, 4), ylim=c(0, ymax), axes=F, ylab=ylabel, xaxs="i", yaxs="i", 
	main="Structural pairwise alignments within families", col="#2ca25f", pch=16)
mtext(paste(npdb, "experimental structures,", naf, "AlphaFold structures"))



tt1 = t.test(within_pdb, within_af)
p1 = paste0("p=", signif(tt1$p.value, 3))

tt2 = t.test(within_pdb, between)
p2 = paste0("p=", signif(tt2$p.value, 3))


text(1, ylab, "-")
text(2, ylab, p1)
text(3, ylab, p2)

axis(1, at=c(0:4), labels=c("", "Within-experimental", "Within-AlphaFold", "Between", ""))
axis(2)

dev.off()
