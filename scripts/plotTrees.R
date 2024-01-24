if (!require(ape, quietly = T)) install.packages("ape")
library(ape)
library(phyloch)
if (!require(phylotate, quietly = T)) install.packages("phylotate")
library(phylotate)
if (!require(seqinr, quietly = T)) install.packages("seqinr")
library(seqinr)






getDescendants<-function(tree,node,curr=NULL){
  if(is.null(curr)) curr<-vector()
  daughters<-tree$edge[which(tree$edge[,1]==node),2]
  curr<-c(curr,daughters)
  w<-which(daughters>=length(tree$tip))
  if(length(w)>0) for(i in 1:length(w))
    curr<-getDescendants(tree,daughters[w[i]],curr)
  return(curr)
}








tree.files = c("class1", "class2")

for (tr in tree.files){


	file.dir = paste0("data/", tr, "_family.nexus")


	# Read in tree and delete the translate section
	tree1 = readLines(file.dir)
	start = grep("Translate", tree1) 
	end = grep(";", tree1)
	end = end[end > start][1] 
	write(paste(tree1[-(start:end)], collapse = "\n"), "tmp.nexus")
	labels = substr(tree1[(start+1):(end-1)], 10, 10000)
	labels = gsub(",", "", labels)

	## Load tree
	tree = read_annotated("tmp.nexus", format="nexus")
	tree$tip.label = labels
	file.remove("tmp.nexus")


	svg(paste0("fig/", tr, "_family.svg"), width=7, height=7)
	par(mar=c(5,5,5,5))
	plot.phylo(tree, type="fan", no.margin=T, edge.width=5, cex=1, show.tip.label=F)
	dev.off()

}








