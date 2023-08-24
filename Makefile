
rmsd:
	bash scripts/getRMSD.sh

data2json:
	Rscript scripts/tsv2json.R data/accessions.tsv accession



sse-class1:
	cd superfamily/class1/Catalytic_domain/data && echo "Regenerating class 1 catalytic domain secondary structure alignment from primary sequence alignment";\
	Rscript ../../../../scripts/dssp2fasta.R


sse-class2:
	cd superfamily/class2/Catalytic_domain/data && echo "Regenerating class 2 catalytic domain secondary structure alignment from primary sequence alignment";\
	Rscript ../../../../scripts/dssp2fasta.R

align-class1:
	cd superfamily/class1/Catalytic_domain/data && echo "class 1 cat";\
	Rscript ../../../../scripts/addFamilyMembersToAlignment.R ../../../../class1/ Catalytic_domain structures.txt align.ali;\
	cd ../; \
	Rscript ../../../scripts/extractAlignments.R info.json extract;\


align-class2:
	cd superfamily/class2/Catalytic_domain/data && echo "class 2 cat";\
	Rscript ../../../../scripts/addFamilyMembersToAlignment.R ../../../../class2/ Catalytic_domain structures.txt align.ali;\
	cd ../; \
	Rscript ../../../scripts/extractAlignments.R info.json extract;\


ala:
	cd class2/ala && echo "ala"; \
	bash ../../scripts/align.sh

domain-ala:
	cd class2/ala && echo "ala"; \
	bash ../../scripts/makeDomains.sh


asn:
	cd class2/asn && echo "asn"; \
	bash ../../scripts/align.sh

domain-asn:
	cd class2/asn && echo "asn"; \
	bash ../../scripts/makeDomains.sh


asp:
	cd class2/asp1 && echo "asp"; \
	bash ../../scripts/align.sh

domain-asp:
	cd class2/asp1 && echo "asp"; \
	bash ../../scripts/makeDomains.sh


asx:
	cd class2/asp2 && echo "asx"; \
	bash ../../scripts/align.sh

domain-asx:
	cd class2/asp2 && echo "asx"; \
	bash ../../scripts/makeDomains.sh


gly1:
	cd class2/gly1 && echo "gly1"; \
	bash ../../scripts/align.sh

domain-gly1:
	cd class2/gly1 && echo "gly1"; \
	bash ../../scripts/makeDomains.sh


gly2:
	cd class2/gly2 && echo "gly2"; \
	bash ../../scripts/align.sh

domain-gly2:
	cd class2/gly2 && echo "gly2"; \
	bash ../../scripts/makeDomains.sh


gly3:
	cd class2/gly3 && echo "gly3"; \
	bash ../../scripts/align.sh

domain-gly3:
	cd class2/gly3 && echo "gly3"; \
	bash ../../scripts/makeDomains.sh


his:
	cd class2/his && echo "his"; \
	bash ../../scripts/align.sh

domain-his:
	cd class2/his && echo "his"; \
	bash ../../scripts/makeDomains.sh


lys1:
	cd class1/lys && echo "lys1"; \
	bash ../../scripts/align.sh

domain-lys1:
	cd class1/lys && echo "lys1"; \
	bash ../../scripts/makeDomains.sh



lys2:
	cd class2/lys && echo "lys2"; \
	bash ../../scripts/align.sh

domain-lys2:
	cd class2/lys && echo "lys2"; \
	bash ../../scripts/makeDomains.sh


phe1:
	cd class2/phe1 && echo "phe1"; \
	bash ../../scripts/align.sh

domain-phe1:
	cd class2/phe1 && echo "phe1"; \
	bash ../../scripts/makeDomains.sh


phe2:
	cd class2/phe2 && echo "phe2"; \
	bash ../../scripts/align.sh

domain-phe2:
	cd class2/phe2 && echo "phe2"; \
	bash ../../scripts/makeDomains.sh



phe3:
	cd class2/phe3 && echo "phe3"; \
	bash ../../scripts/align.sh

domain-phe3:
	cd class2/phe3 && echo "phe3"; \
	bash ../../scripts/makeDomains.sh



phe4:
	cd class2/phe4 && echo "phe4"; \
	bash ../../scripts/align.sh

domain-phe4:
	cd class2/phe4 && echo "phe4"; \
	bash ../../scripts/makeDomains.sh



phe5:
	cd class2/phe5 && echo "phe5"; \
	bash ../../scripts/align.sh

domain-phe5:
	cd class2/phe5 && echo "phe5"; \
	bash ../../scripts/makeDomains.sh


pro1:
	cd class2/pro1 && echo "pro1"; \
	bash ../../scripts/align.sh

domain-pro1:
	cd class2/pro1 && echo "pro1"; \
	bash ../../scripts/makeDomains.sh


pro2:
	cd class2/pro2 && echo "pro2"; \
	bash ../../scripts/align.sh

domain-pro2:
	cd class2/pro2 && echo "pro2"; \
	bash ../../scripts/makeDomains.sh



pro3:
	cd class2/pro3 && echo "pro3"; \
	bash ../../scripts/align.sh

domain-pro3:
	cd class2/pro3 && echo "pro3"; \
	bash ../../scripts/makeDomains.sh


pyl:
	cd class2/pyl && echo "pyl"; \
	bash ../../scripts/align.sh

domain-pyl:
	cd class2/pyl && echo "pyl"; \
	bash ../../scripts/makeDomains.sh



sep:
	cd class2/sep && echo "sep"; \
	bash ../../scripts/align.sh

domain-sep:
	cd class2/sep && echo "sep"; \
	bash ../../scripts/makeDomains.sh


ser1:
	cd class2/ser1 && echo "ser1"; \
	bash ../../scripts/align.sh

domain-ser1:
	cd class2/ser1 && echo "ser1"; \
	bash ../../scripts/makeDomains.sh


ser2:
	cd class2/ser2 && echo "ser2"; \
	bash ../../scripts/align.sh

domain-ser2:
	cd class2/ser2 && echo "ser2"; \
	bash ../../scripts/makeDomains.sh



thr:
	cd class2/thr && echo "thr"; \
	bash ../../scripts/align.sh

domain-thr:
	cd class2/thr && echo "thr"; \
	bash ../../scripts/makeDomains.sh




arg:
	cd class1/arg && echo "arg"; \
	bash ../../scripts/align.sh

domain-arg:
	cd class1/arg && echo "arg"; \
	bash ../../scripts/makeDomains.sh


cys:
	cd class1/cys && echo "cys"; \
	bash ../../scripts/align.sh

domain-cys:
	cd class1/cys && echo "cys"; \
	bash ../../scripts/makeDomains.sh


gln:
	cd class1/gln && echo "gln"; \
	bash ../../scripts/align.sh

domain-gln:
	cd class1/gln && echo "gln"; \
	bash ../../scripts/makeDomains.sh



glu3:
	cd class1/glu3 && echo "glu3"; \
	bash ../../scripts/align.sh

domain-glu3:
	cd class1/glu3 && echo "glu3"; \
	bash ../../scripts/makeDomains.sh

	

glu:
	cd class1/glu1 && echo "glu"; \
	bash ../../scripts/align.sh

domain-glu:
	cd class1/glu1 && echo "glu"; \
	bash ../../scripts/makeDomains.sh


glx:
	cd class1/glu2 && echo "glx"; \
	bash ../../scripts/align.sh

domain-glx:
	cd class1/glu2 && echo "glx"; \
	bash ../../scripts/makeDomains.sh


ile:
	cd class1/ile && echo "ile"; \
	bash ../../scripts/align.sh

domain-ile:
	cd class1/ile && echo "ile"; \
	bash ../../scripts/makeDomains.sh



met:
	cd class1/met && echo "met"; \
	bash ../../scripts/align.sh

domain-met:
	cd class1/met && echo "met"; \
	bash ../../scripts/makeDomains.sh


trp:
	cd class1/trp && echo "trp"; \
	bash ../../scripts/align.sh

domain-trp:
	cd class1/trp && echo "trp"; \
	bash ../../scripts/makeDomains.sh







tyr:
	cd class1/tyr && echo "tyr"; \
	bash ../../scripts/align.sh

domain-tyr:
	cd class1/tyr && echo "tyr"; \
	bash ../../scripts/makeDomains.sh




val:
	cd class1/val && echo "val"; \
	bash ../../scripts/align.sh

domain-val:
	cd class1/val && echo "val"; \
	bash ../../scripts/makeDomains.sh




leu1:
	cd class1/leu1 && echo "leu1"; \
	bash ../../scripts/align.sh

domain-leu1:
	cd class1/leu1 && echo "leu1"; \
	bash ../../scripts/makeDomains.sh


leu2:
	cd class1/leu2 && echo "leu2"; \
	bash ../../scripts/align.sh

domain-leu2:
	cd class1/leu2 && echo "leu2"; \
	bash ../../scripts/makeDomains.sh