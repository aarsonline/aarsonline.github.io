library(rjson)



# What class is this
aaClass = strsplit(getwd(), "/")[[1]]
aaClass = aaClass[length(aaClass)]


# Prepare a json file summarising the distance matrix
args = commandArgs(trailingOnly=TRUE)


# All directories
dirs = list.dirs(".", recursive=F)
aa = unique(unlist(strsplit(gsub("./", "", dirs), "_")))
aa.names = character(length(aa))
names(aa.names) = aa


# Prepare distance matrix
distance.mat = matrix(0, nrow = length(aa), ncol = length(aa))
rownames(distance.mat) = aa
colnames(distance.mat) = aa


# Output json
JSON = list()


# Get rmsds etc
for (d in dirs){


	aa1 = strsplit(gsub("./", "", d), "_")[[1]][1]
	aa2 = strsplit(gsub("./", "", d), "_")[[1]][2]
	json = fromJSON(file = paste0(d, "/info.json"))


	dist = 1-json$tm # json$crossFamilyRmsd

	distance.mat[aa1,aa2] = dist
	distance.mat[aa2,aa1] = dist

	key = paste0(aa1, "_", aa2)
	JSON[paste0("url_", key)] = paste0("/pairwise/", aaClass, "/", aa1, "_", aa2)
	JSON[paste0("name_", key)] = json$fullName
	JSON[paste0("d_", key)] = dist


	# get the full name of each 
	aa.names[aa1] = json$family1
	aa.names[aa2] = json$family2


}


# Heatmap to get ordering of families
map = heatmap(distance.mat, symm=T)
ordered = aa[map$rowInd]



JSON$families = ordered
JSON$familyNames = aa.names


exportJSON <- toJSON(JSON, indent=4)
write(exportJSON, paste0("../../", aaClass, "/info.json"))
