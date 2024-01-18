library(rjson)
library(Biostrings)



args = commandArgs(trailingOnly=TRUE)

if (length(args) != 2){
	stop("Use: Rscript tsv2json.R <file.tsv> <idCol>")
}

in.df = read.table(args[1], sep="\t", header=T, quote="`")
idCol = args[2]
if (!any(colnames(in.df) == idCol)){
	stop(paste("Cannot find column", idCol))
}


translate.seqs = any(colnames(in.df) == "sequence") & any(colnames(in.df) == "transl_table")
if (translate.seqs){
	in.df$proteinSeq = ""
}


JSON = list()
for (id in in.df[,idCol]){

	


	# Translate protein sequence?
	if (translate.seqs){


		gene = in.df[in.df[,idCol] == id,"sequence"]
		transl_table = in.df[in.df[,idCol] == id,"transl_table"]

		gene = unique(gene)
		transl_table = unique(transl_table)
		#print(paste(id, gene))

		if (length(gene) == 1 & !is.na(gene) & nchar(gene) > 0 & length(gene) == 1 & !is.na(gene) & nchar(gene) > 0){
			ptn = seqinr::translate(strsplit(as.character(gene), "")[[1]], numcode=as.numeric(transl_table))
			ptn = paste(ptn, collapse="")
			ptn = gsub("[*].*", "", ptn)
			in.df[in.df[,idCol] == id,"proteinSeq"] = ptn

			if (is.na(ptn)){
				print(id)
			}
		}


	}


	JSON[[id]] = in.df[in.df[,idCol] == id,]


}








exportJSON <- toJSON(JSON, indent=4)
outfile = gsub("[.]tsv", ".json", args[1])
if (outfile == args[1]){
	outfile = paste0(args[1], ".json")
}
cat(paste("Saving to", outfile, "\n"))
write(exportJSON, outfile)

