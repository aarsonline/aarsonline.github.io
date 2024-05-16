library(clipr)
library(seqinr)



getNumFromConfidence = function(conf){


  result = ifelse(is.na(conf), 0,
                  ifelse(conf < 50, 1,
                  ifelse(conf < 60, 2,
                  ifelse(conf < 70, 3,
                  ifelse(conf < 75, 4,
                  ifelse(conf < 80, 5,
                  ifelse(conf < 85, 6,
                  ifelse(conf < 90, 7,
                  ifelse(conf < 95, 8, 9)))))))))

  result


}



metadata.df = read.table("data/accessions.tsv", sep="\t", header=T, quote="`")
keep.metadata = rep(FALSE, nrow(metadata.df))


lower.confidence = numeric(0)
median.confidence = numeric(0)
all.confidence = numeric(0)
for (cla in c("class1", "class2")){



  families = list.dirs(cla, recursive=F)
  for (fam in families){


    #wd = paste0(fam, "/data/domains/Catalytic_domain/")
    wd = paste0(fam, "/data/")
    fasta = read.fasta(paste0(wd, "/align.ali"))
    nsites = length(fasta[[1]])


    # For each position
    site.confidence.df = data.frame(siteNum = 1:nsites, mean.confidence = 0)
    for (f in names(fasta)){
      site.confidence.df[,f] = NA
    }


     for (f in names(fasta)){




        # Read PDB
        pdb = readLines(paste0(wd, f))
        pdb = pdb[grep("^ATOM", pdb)]
        pdb = pdb[substr(pdb, 14, 16) == "CA "]
        #siteNum = as.numeric(substr(pdb, 24, 26))
        confidence = as.numeric(substr(pdb, 62, 66))


        # Find match
        match = which(metadata.df$accession == gsub("[.]pdb", "", gsub("structures/", "", f)))
        keep.metadata[match] = TRUE


        if (length(grep("_AF_", f)) == 0){
          confidence = rep(100, length(confidence))
        }


        # sequence in alignment
        aln.seq = as.character(fasta[[f]])
        pdb.pos = 1
        for (i in 1:nsites){

          char = aln.seq[i]
          if (char != "-"){
            conf = confidence[pdb.pos]
            site.confidence.df[site.confidence.df$siteNum == i,f] = conf
            pdb.pos = pdb.pos + 1
          }


        }

        if (pdb.pos != length(confidence)+1){
          cat(paste("warning: pdb.pos", "=", pdb.pos, "but should be", length(confidence)+1, f, "\n"))
        }else{

        }



     }


     


     # Mean confidence
     site.confidence.df[,"mean.confidence"] = apply(site.confidence.df, 1, function(row) mean(row[-1], na.rm=T))
     all.confidence = c(all.confidence, site.confidence.df$mean.confidence)


     # Write fasta of confidence
     fasta.conf = character(length(fasta))
     names(fasta.conf) = names(fasta)
     for (f in names(fasta.conf)){
      fasta.conf[f] = paste0(getNumFromConfidence(site.confidence.df[,f]), collapse="")
     }

     #write.fasta(lapply(fasta.conf, function(ele) ele), names(fasta.conf), "confidence.fasta")
     #write.table(site.confidence.df, "confidence.tsv", sep="\t", quote=F, row.names=F)





     site.confidence.df2 = site.confidence.df[,grep("_AF_", colnames(site.confidence.df))]

     x = unlist(site.confidence.df2[,-c(1,2)])
     x = as.numeric(x[!is.na(x)])
     summary(x)


     m = signif(median(x), 2)
     lower = signif(as.numeric(quantile(x, probs=0.1)[1]), 2)


     median.confidence[fam] = m 
     lower.confidence[fam] = lower 

    cat("\n")
    cat(paste0(fam, ": the median score was ", m, "%, and 90% of all scores were greater than ", lower, "%.\n"))
    cat("\n")


  }

}

median.confidence
lower.confidence


metadata.df = metadata.df[keep.metadata,]



# How many are experimental vs alphafold?
n.exp = sum(metadata.df$pdb != "")
n.alpha = sum(metadata.df$pdb == "")
cat(paste(n.exp, "structures are experimental and", n.alpha, "are AlphaFold\n"))



# How many phyla?
n.phyla = length(unique(metadata.df[,"phylum"]))
cat(paste("Total of", n.phyla, "phyla\n"))


# How many bacterial?
n.bact = sum(metadata.df$domain == "Bacteria")
n.bact.phyla = length(unique(metadata.df[metadata.df$domain == "Bacteria","phylum"]))
cat(paste(n.bact, "bacterial samples from", n.bact.phyla, "phyla\n"))




# How many archaeal?
n.bact = sum(metadata.df$domain == "Archaea")
n.bact.phyla = length(unique(metadata.df[metadata.df$domain == "Archaea","phylum"]))
cat(paste(n.bact, "archaea samples from", n.bact.phyla, "phyla\n"))



# How many cytosolic?
n.bact = sum(metadata.df$domain == "Eukaryota")
n.bact.phyla = length(unique(metadata.df[metadata.df$domain == "Eukaryota","phylum"]))
cat(paste(n.bact, "cytosolic samples from", n.bact.phyla, "phyla\n"))


# How many mito?
n.bact = sum(metadata.df$domain == "Mitochondrial")
n.bact.phyla = length(unique(metadata.df[metadata.df$domain == "Mitochondrial","phylum"]))
cat(paste(n.bact, "mitochondrial samples from", n.bact.phyla, "phyla\n"))


# How many virus?
n.bact = sum(metadata.df$domain == "Viruses")
n.bact.phyla = length(unique(metadata.df[metadata.df$domain == "Viruses","phylum"]))
cat(paste(n.bact, "viral samples from", n.bact.phyla, "phyla\n"))

