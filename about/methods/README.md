


# Methods


## Protein structure prediction

Protein structures were predicted with AlphaFold v2.3.0 (Jumper et al. 2021).
Some of these AlphaFold calls were executed using ColabFold through Tamarind Bio (Mirdita et al. 2022).



## Alignments

Pairwise structural alignments were  generated using DeepAlign (Wang et al. 2013) and multiple alignments using 3DCOMB (Wang et al. 2011).
This was followed by a refinement algorithm that realigned contiguous regions of at least 3 sites lacking secondary structure, using ClustalW (Thompson et al. 2003) based on primary sequence. 
As existing structural alignment tools were not always reliable at delineating homologous insertions, alignments were treated to manual adjustment. 



## Protein secondary structure

All protein secondary structures are classified using DSSP v3.0.0 (Kabsch et al. 1983, Joosten et al. 2010). 



## Tertiary structure visualization


Tertiary structures are displayed using Protein Viewer (PV), which can be found at https://biasmv.github.io/pv/.



## Phylogenetics


All phylogenetic analyses were performed using BEAST v2.7 (Bouckaert et al. 2019).
The phylogenies on the family pages are subtrees of the full trees presented in Douglas et al. 2023.
Whereas the trees presented on protein-domain pages were built using the optimized relaxed clock (v1.2.0) (Douglas et al. 2021), 
the OBAMA substitution model (v1.1.1) (Bouckaert 2020)
and the Yule Skyline tree prior from the BICEPS package (v1.1.1) (Bouckaert et al. 2022), 
trees were summarized using the maximum clade credibility tree (Heled and Bouckaert 2013).



