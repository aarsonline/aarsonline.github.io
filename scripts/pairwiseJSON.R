library(rjson)
library(seqinr)


# Prepare a json file summarising the pairwise alignment
args = commandArgs(trailingOnly=TRUE)

if (length(args) != 2){
	stop(paste("Use: Rscript pairwiseJSON.R <json1> <json2>"))
}



json1 = fromJSON(file = args[1])
json2 = fromJSON(file = args[2])



# Output json
JSON = list()
JSON$fullName = paste(json1$name, "vs", json2$name, "pairwise comparison")
JSON$class = json1$class
JSON$icon = "/fig/icon_white.png"
JSON$family1 = json1$name
JSON$family2 = json2$name
JSON$fullName1 = json1$fullName
JSON$fullName2 = json2$fullName




# Introduction
href1 = paste0("<a href='/", json1$classID, "/", json1$id, "'>", json1$name, "</a>")
href2 = paste0("<a href='/", json2$classID, "/", json2$id, "'>", json2$name, "</a>")
JSON$description = paste0("Pairwise comparison of the ", JSON$class, " catalytic domains from the ", json1$fullName, " (", href1, ") and ", json2$fullName, " (", href2, ") families. 
	The cross-family RMSD is the average RMSD between pairs of structures from different families, and is
	 larger than the total RMSD, which compares structures both within- and between-families. TM scores are bound between 0 and 1. 
	 This alignment was generated automatically using 3DCOMB (Wang et al. 2011) and was not corrected with any manual adjustment.")



# README



# Total RMSD
rmsd = readLines("data/align.sco")
rmsdscore = as.numeric(strsplit(rmsd[2], " +")[[1]][3])
tmscore = as.numeric(strsplit(rmsd[3], " +")[[1]][3])
JSON$rmsd = rmsdscore
JSON$tm = tmscore

# Cross-family RMSD
pdb = readLines("data/align.pdb")
pdb = pdb[grep("^ATOM", pdb)] # Atoms only
fasta = read.fasta("data/align.ali")
chains_all = substr(pdb, 22, 22)
chains = unique(chains_all[chains_all != " "])
names(fasta) = chains

# Match chains to families
nstructures1 = length(readLines(gsub("info.json", "data/structures.txt", args[1])))
nstructures2 = length(readLines(gsub("info.json", "data/structures.txt", args[2])))
if (nstructures1 + nstructures2 != length(chains)){
	stop(paste("The number of structures in the families does not match the number of structures in the alignment.", nstructures1, "+", nstructures2, "!=", length(chains)))
}


# Pairwise rmsd within and between families
distance.mat = matrix(-1, nrow = length(chains), ncol = length(chains))
rownames(distance.mat) = chains
colnames(distance.mat) = chains 

for (s1 in rownames(distance.mat)){

	xyz_1 = pdb[chains_all == s1 & substr(pdb, 14, 15) == "CA"]
	x1 = as.numeric(substr(xyz_1, 32, 38))
	y1 = as.numeric(substr(xyz_1, 39, 46))
	z1 = as.numeric(substr(xyz_1, 47, 54))


	for (s2 in colnames(distance.mat)){


		if (s1 == s2){
			next
		}



		xyz_2 = pdb[chains_all == s2 & substr(pdb, 14, 15) == "CA"]
		x2 = as.numeric(substr(xyz_2, 32, 38))
		y2 = as.numeric(substr(xyz_2, 39, 46))
		z2 = as.numeric(substr(xyz_2, 47, 54))


		site_distance_sum = 0
		nsites = 0

		# Iterate through alignment positions
		seq1 = fasta[[s1]]
		seq2 = fasta[[s2]]
		pdb1_pos = 1
		pdb2_pos = 1
		for (aln_pos in 1:length(seq1)){


			site1 = seq1[aln_pos]
			site2 = seq2[aln_pos]
			if (site1 != "-" && site2 != "-"){


				x1_pos = x1[pdb1_pos]
				x2_pos = x2[pdb2_pos]
				y1_pos = y1[pdb1_pos]
				y2_pos = y2[pdb2_pos]
				z1_pos = z1[pdb1_pos]
				z2_pos = z2[pdb2_pos]


				site_distance = (x1_pos-x2_pos)^2 + (y1_pos-y2_pos)^2+  (z1_pos-z2_pos)^2
				site_distance_sum = site_distance_sum + site_distance
				nsites = nsites + 1

			}

			# Increment pdb positions if not gap
			if (site1 != "-"){
				pdb1_pos = pdb1_pos + 1
			}
			if (site2 != "-"){
				pdb2_pos = pdb2_pos + 1
			}


		}


		rmsd = sqrt(site_distance_sum / nsites)
		distance.mat[s1,s2] = rmsd


	}

}


# Pairwise rmsd within and between families
fam1 = chains[1:nstructures1]
fam2 = chains[(nstructures1+1):(nstructures1+nstructures2)]

# Within family 1
rmsd1 = unlist(distance.mat[fam1,fam1])
JSON$rmsd1 = signif(mean(rmsd1[rmsd1 >= 0]), 3)


# Within family 2
rmsd2 = unlist(distance.mat[fam2,fam2])
JSON$rmsd2 = signif(mean(rmsd2[rmsd2  >= 0]), 3)

# Cross families
rmsd12 = unlist(distance.mat[fam1,fam2])
JSON$crossFamilyRmsd = signif(mean(rmsd12), 3)


total  = unlist(distance.mat)
JSON$rmsdTotal = signif(mean(total[total >= 0]), 3)




# Adjust range of features so that the they are relative to the catalytic domain
adjustFeatures = function(json){

	featuresAdj = list()
	features = json$features
	for (f in names(features)){

		# Only consider sub-domain level features
		level = features[[f]]$level
		if (level >= 4){
			next
		}


		# Adjust range according to catalytic domain
		refSeq = features[[f]]$acc
		r = as.numeric(strsplit(features[[f]]$range, "-")[[1]])
		cd = features[["Catalytic domain"]]

		if (cd$acc == refSeq){

			cdStart = as.numeric(strsplit(cd$range, "-")[[1]][1])
			cdStop = as.numeric(strsplit(cd$range, "-")[[1]][2])
			cdLen = cdStop - cdStart + 1
			r = r - cdStart

			if (r[1] < 1 | r[1] > cdLen){
				next
			}


			features[[f]]$range = paste(r, collapse="-")
			featuresAdj[[f]] = features[[f]]

		}


	}


	featuresAdj

}


# Features
featuresAdj1 = adjustFeatures(json1)
featuresAdj2 = adjustFeatures(json2)
for (f in names(featuresAdj1)){
	featuresAdj2[[f]] = featuresAdj1[[f]]
}



JSON$features = featuresAdj2




cat(paste("saving to info.json\n" ))
exportJSON <- toJSON(JSON, indent=4)
write(exportJSON, "info.json")


# README
cat(paste("saving to README.md\n" ))
write(JSON$description, "README.md")
