IS_MOBILE = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		   			 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));



DATA = {};
FADE_TIME = 50;

HIDE_PROTOZYME = true;

PV_VIEWERS = {};
PV_PDBS = {};
PV_GEOMS = {};

SELECTED_SITES = {lower: -1, upper: -1};
SELECTED_ACCESSION = null;


COLOUR_BY_MAJORITY = false;


// Colour gradient
// https://colorbrewer2.org/#type=diverging&scheme=RdYlBu&n=10
ALPHAFOLD_CONFIDENCE_COLS = [
	{min:  0, max: 50, r: 165, g: 0, b: 38},
	{min: 50, max: 55, r: 215, g: 48, b: 39},
	{min: 55, max: 60, r: 244, g: 109, b: 67},
	{min: 60, max: 65, r: 253, g: 174, b: 97},
	{min: 65, max: 70, r: 254, g: 224, b: 144},
	{min: 70, max: 75, r: 224, g: 243, b: 248},
	{min: 75, max: 80, r: 171, g: 217, b: 233},
	{min: 80, max: 85, r: 116, g: 173, b: 209},
	{min: 85, max: 90, r: 69, g: 117, b: 180},
	{min: 90, max: 100, r: 49, g: 54, b: 149}
];


AA_COLS = {A: "#80a0f0", I: "#80a0f0", L: "#80a0f0", M: "#80a0f0", F: "#80a0f0", W: "#80a0f0", V: "#80a0f0",
          K: "#f01505", R: "#f01505",
          D: "#c048c0", E: "#c048c0",
          N: "#15c015", S: "#15c015", Q: "#15c015", T: "#15c015",
          C: "#f08080",
          G: "#f09048",
          P: "#c0c000",
          H: "#15a4a4", Y: "#15a4a4",
          X: "#ffffff"};


AA_FONT_COLS = {A: "#ffffff", I: "#ffffff", L: "#ffffff", M: "#ffffff", F: "#ffffff", W: "#ffffff", V: "#ffffff",
          K: "#ffffff", R: "#ffffff",
          D: "#ffffff", E: "#ffffff",
          N: "#ffffff", S: "#ffffff", Q: "#ffffff", T: "#ffffff",
          C: "#ffffff",
          G: "#ffffff",
          P: "#ffffff",
          H: "#ffffff", Y: "#ffffff",
          X: "#ffffff"};


_3DI_COLS = {A: "#df9a8c", I: "#609d7b", L: "#fe4c8b", M: "#12a564", F: "#d99e81", W: "#d1a368", V: "#fb7edd",
          K: "#d7a304", R: "#9487d0",
          D: "#b4a3d8", E: "#ff5701",
          N: "#d570fd", S: "#e842fe", Q: "#da8e99", T: "#42a299",
          C: "#fb72c5",
          G: "#7491c5",
          P: "#cb99c4",
          H: "#94abe1", Y: "#17a8fd",
          X: "#c0c0c0"};



// http://bioinformatica.isa.cnr.it/SUSAN/NAR2/dsspweb.html#:~:text=DSSP%20assigns%20seven%20different%20secondary,no%20secondary%20structure%20is%20recognized
AA_COLS_2 = {E: "#FFC20A", H: "#0C7BDC", G: "#08569a", I: "#043158", T:"#333333", S: "#696969",  B: "#d3d3d3",  N: "#ffffff"};
AA_FONT_COLS_2 = {E: "#222222", H: "#ffffff", G: "#ffffff", I: "#ffffff", T:"#ffffff", S: "#ffffff",  B: "#222222",  N: "#111111",};


IS_SUPERFAMILY = false;
PAIRWISE = false;

MIN_SSE_LEN = 2;


// Canonical ordering on 3dcomb
CHAIN_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
               "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
               "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];



NT_WIDTH = 10;
NT_HEIGHT = 13;
FEATURE_HEIGHT_ALN = 18;
FEATURE_HEIGHT_SEC = 30;
FEATURE_FONT_SIZE = 14;
SEC_WIDTH = 1.0;
SEC_HEIGHT = 20;
NT_FONT_SIZE = 11;
ALN_LABEL_WIDTH = 300;



SELECT_FONT_FADEOUT_TIME = 10000;

CATALYTIC_DOMAIN_WIDTH = 600;
CATALYTIC_DOMAIN_HEIGHT = 350;
CATALYTIC_DOMAIN_XPAD = 20;
CATALYTIC_DOMAIN_YPAD = 40;
CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_1 = 40;
CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_2 = 45;
CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP = 0.58;
CATALYTIC_DOMAIN_HELIX_WIDTH_PROP = 0.8;
CATALYTIC_DOMAIN_CUBIC_RIGHT_DX = 0;
CATALYTIC_DOMAIN_LOOP_WIDTH = 3;
CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS = 7;
CATALYTIC_DOMAIN_FONT_SIZE = 18;
CATALYTIC_DOMAIN_MOTIF_FONT_SIZE = 15;
CATALYTIC_DOMAIN_ARROW_BG_WIDTH = 4;


STRAND_ARROW_HEAD_LEN_1 = 5;
STRAND_ARROW_HEAD_LEN_2 = 6;
STRAND_ARROW_BASE_WIDTH = 7;
STRAND_ARROW_HEAD_WIDTH = 13;
HELIX_WIDTH = 11;
HELIX_CORNER_RADIUS = 1.75;

if (IS_MOBILE){
	
	let factor = 2;
	NT_WIDTH *= factor+0.5;
	NT_HEIGHT *= factor+0.5;
	NT_FONT_SIZE *= factor+0.5;
	SEC_WIDTH *= factor;
	SEC_HEIGHT *= factor;
	ALN_LABEL_WIDTH *= factor;
	FEATURE_HEIGHT_ALN *= factor;
	FEATURE_HEIGHT_SEC *= factor;
	FEATURE_FONT_SIZE *= factor;
	STRAND_ARROW_HEAD_LEN_1 *= factor;
	STRAND_ARROW_HEAD_LEN_2 *= factor;
	STRAND_ARROW_BASE_WIDTH *= factor;
	STRAND_ARROW_HEAD_WIDTH *= factor;
	HELIX_WIDTH *= factor;
	HELIX_CORNER_RADIUS *= factor;
	CATALYTIC_DOMAIN_WIDTH *= 1.25;
	CATALYTIC_DOMAIN_HEIGHT *= 1.25;
	CATALYTIC_DOMAIN_FONT_SIZE *= 1.25;
	CATALYTIC_DOMAIN_MOTIF_FONT_SIZE *= 1.25;
	CATALYTIC_DOMAIN_ARROW_BG_WIDTH *= 1.25;
}

LEVEL_1_COL = "#fa2a5599";
LEVEL_2_COL = "#a6a6a6";
LEVEL_3_COL = "#d3d3d3";
LEVEL_4_COL = "transparent";



function renderaaRS(isPairwise = false, isSuperfamily = false){




  PAIRWISE = isPairwise;
  IS_SUPERFAMILY = isSuperfamily
  


  // Initialise HTML
	$(".indexMetadata").remove();
$("#main").append(`
		<ul class="flexContainer">
				

				<li class="notes">
					
					
					<div id="introduction">


					</div>
					
				</li>
				
				<li class="summary">
					
				</li>
				
			</ul>
			

			<div class="svgDiv">
				<svg id="secondary" height=0 width=0 overflow="auto"></svg>
			</div>
			
			<div id="secondaryHelper" class="helperNote">
				
			</div>

			
			
			<div id="alignment" class="svgDiv">

			</div>


			<div id="alignment2" class="svgDiv">

			</div>


			<div style="display:none" id="alignment3" class="svgDiv">

			</div>


			
			<ul id="tertiaryTable" class="flexContainerMain">
				
					<li id="alphaFoldConfidenceCell">
							
					</li>

					<li class="structureCell">
							<div class="structureCellDiv" id="superposition"> </div>
					</li>

					<li class="structureCell">
							<div class="structureCellDiv" id="tertiary"> </div>
					</li>


					<li id="structureButtons">

					</li>

			</ul>
				

			
		<div class="flexContainerTrna">

				

				<li class="tRNA">
					
					<div id="tRNA_notes">


					</div>


					<div id="tRNA_div">
						 <svg id="tRNA_svg" height=0 width=0 overflow='auto'></svg>
			
					</div>

					<div id="tRNA_select_div">


					</div>
					
				</li>


				
				
				
			</div>

			
			
			<ul class="flexContainer">
				<li id="references">
					<h2>References</h2>
				</li>
			</ul>


			<div id="issues">

				<a target="_blank" id="GitHubLink">
					View on GitHub
				</a>
				
				<a target="_blank" id="IssuesLink">
					Report an Issue
				</a>

				<a target="_blank" href="https://github.com/aarsonline/aarsonline.github.io/discussions" id="DiscussLink">
					Discuss
				</a>

			</div>

	`);





	// Add loading wheel
	$("body").append(`<div id="mainloader" class='loader'><img src='/fig/loader.png'></img></div>`);
	$("#main").css("opacity", "50%");
	


	

	// Render the introduction
	fetch("README.md")      // The path to the raw Markdown file
  .then(response => response.blob())  // Unwrap to a blob...
  .then(blob => blob.text())          // ...then to raw text...
  .then(markdown => {                 // ...then pass the raw text into marked.parse
    document.getElementById("introduction").innerHTML = marked.parse(markdown);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
		$("#introduction").prepend("<h1 id='fullName'>Introduction</h1>");
  });


	// Render the references
	fetch("REF.md")      // The path to the raw Markdown file
  .then(response => response.blob())  // Unwrap to a blob...
  .then(blob => blob.text())          // ...then to raw text...
  .then(markdown => {                 // ...then pass the raw text into marked.parse
	document.getElementById("references").innerHTML = marked.parse(markdown);
	


	// Sort references alphabetically
	let refs = $("#references").find("p");
	
	
	let getSorted = function(elements) {
		console.log($(elements).toArray());
		return $($(elements).toArray().sort(function(a, b){
			let aVal = $(a).html();
			let bVal = $(b).html();
			return aVal.localeCompare(bVal);
		}));
	}
	


	// Footer information
	let loc = window.location.pathname;
	let wd = loc.substring(0, loc.lastIndexOf('/'));
	$("#GitHubLink").attr("href", "https://github.com/aarsonline/aarsonline.github.io/tree/main" + wd);

	
	refs = getSorted(refs);
	$("#references").html("");
	$("#references").append(refs);
	$("#references").prepend("<h2>References</h2>");
  });
  
  
  renderHeader();
  
  
	// Accession metadata dialog
	let metadata = $(`<div id="metadataDlg">
						<table>
						</table>
					</div>`);
	$("#main").append(metadata);
	if (IS_MOBILE) $("#metadataDlg").addClass("mobile");
	$("#metadataDlg").hide(0);
	
	// Click on anything to clear it...
  	$("#main")[0].addEventListener('click', function(evt) { 
		$("#metadataDlg").hide(0);
	});
	
	// ... except for the table itself
  	$("#metadataDlg")[0].addEventListener('click', function(evt) { 
		evt.stopPropagation();
	});

  


  
  

  loadAllFiles(function(){


	//$(".notes").show(100);

    //console.log(DATA);
    renderAlignment("alignment", 0, "data/align.ali");
    renderAlignment("alignment2", 1, "data/secondary.fasta");

    if (DATA.threedi == null){
    	$("alignment3").hide(0);
    }else{
    	$("#alignment3").before("<h2>FoldSeek 3Di structure</h2>");
    	renderAlignment("alignment3", 2, "data/3di.fasta");
    }
    


    renderSecondary($("#secondary"));



  
  
  
  // More section titles
  $("#alignment").before("<h2>Primary structure</h2>");
  $("#alignment2").before("<h2>Secondary structure</h2>");
  
  $("#secondary").before("<h2>Domain architecture</h2>");
  $("#secondary").before("<div class='helperNote'>Click on an accession or domain below, or drag a region, to select it. Right click on an accession for more information.</div>");
  let imgWidth = IS_MOBILE ? 30 : 15;
  $("#secondaryHelper").html(`
							
							<span><img src="/fig/Archaea.png"  height="` + imgWidth + `px"></img> - Archaea </span>
							<span><img src="/fig/Bacteria.png"  height="` + imgWidth + `px"></img> - Bacteria </span>
							<span><img src="/fig/Eukaryota.png"  height="` + imgWidth + `px"></img> - Eukaryota </span>
							<span><img src="/fig/Mitochondrial.png"  height="` + imgWidth + `px"></img> - Mitochondrion/chloroplast </span>
							<span><img src="/fig/Viruses.png"  height="` + imgWidth + `px"></img> - Virus </span>
							<span><img src="/fig/xray.png" height="` + imgWidth + `px"></img> - Solved structure </span>
							<span><img src="/fig/alphafold.png"  height="` + imgWidth + `px"></img> - Computational prediction </span>
							<span id="secondarySelectedSites"> </span>
							`);
  $("#tertiaryTable").before("<h2>Tertiary structure</h2>");

  
	
	



   // Footnote
   //$("#secondary").parent().before("<div class='footnote'>Extended strands and helices are displayed only if at least " + MIN_SSE_LEN + " residues in length.</div>");
  



	// Tertiary dropdowns
	$("#structureButtons").append("<span class='button' onClick='deselectSites(); deselectTaxa(true)'>Clear selection</span>");
	$("#structureButtons").append("<span class='dropdownDiv'>Accession: <select id='accessionSelect'></select></span>");
	$("#structureButtons").append("<span class='dropdownDiv domainSelect'>Domain: <select id='domainSelect'></select></span>");
	
	
	
	if (IS_MOBILE){
		$("#tertiaryTable").find("span").after("<br>");
		$("#tertiaryTable").find("span").css("display", "inline-block");
	}


	
	// Domain selection
    let dropdown = $("#domainSelect");
    dropdown.append("<option value='_full'> Full protein </option>");
    for (let f in DATA.features){
	  if (HIDE_PROTOZYME && f == "Protozyme") continue;
      if (DATA.features[f].level > 1){
        dropdown.append("<option value='" + f + "'>" + f + "</option>");
      }
      
    }
    $(dropdown).on("change", function(){
      $("#tertiary").html("");
      deselectSites();
      recolourTertiaries(true);
      dropdown.focus(); // Refocus on dropdown for easy selection using arrow keys
    });
	
		
	if (PAIRWISE || isSuperfamily) {
		$("#tertiaryTable .domainSelect").hide();
	}
	
	
	
	// Protein colouring
	$("#superposition").after("<div class='dropdownDiv colouring'> Color by: <select id='tertiaryColouringAln'></select></div>");
	$("#tertiary").after("<div class='dropdownDiv colouring'> Color by: <select id='tertiaryColouringSingle'></select></div>");


	// Colour selection dropdown
	let dropdowns = $("#tertiaryTable").find(".colouring");
	for (let d = 0; d < dropdowns.length; d ++){
		let dropdownCol = $(dropdowns[d]).find("select");
		dropdownCol.append("<option value='byChain'>Chain</option>");
		dropdownCol.append("<option value='rainbow'>Position</option>");
		dropdownCol.append("<option value='bySS'>SSE</option>");
		dropdownCol.append("<option value='ssSuccession'>SSE succession</option>");
		dropdownCol.append("<option value='confidence'>AlphaFold confidence</option>");

		dropdownCol.append("<option value='aa'>Amino acid</option>");
		if (DATA.threedi != null){
			dropdownCol.append("<option value='threedi'>3Di</option>");
		}
		
		$(dropdownCol).val("bySS");
		$(dropdownCol).on("change", function(){
			 recolourTertiaries();
			 
		});
	}

	// Draw alphafold confidence legend
	drawConfidenceLegend();


	renderTertiary("data/align.pdb", "superposition");


  // Synchronise scroll bars
  $("#alignment").scroll(function () { 
    $("#alignment2").scrollTop($("#alignment").scrollTop());
    $("#alignment2").scrollLeft($("#alignment").scrollLeft());
    $("#alignment3").scrollTop($("#alignment").scrollTop());
    $("#alignment3").scrollLeft($("#alignment").scrollLeft());
  });
  $("#alignment2").scroll(function () { 
    $("#alignment").scrollTop($("#alignment2").scrollTop());
    $("#alignment").scrollLeft($("#alignment2").scrollLeft());
    $("#alignment3").scrollTop($("#alignment2").scrollTop());
    $("#alignment3").scrollLeft($("#alignment2").scrollLeft());
  });
	$("#alignment3").scroll(function () { 
    $("#alignment").scrollTop($("#alignment3").scrollTop());
    $("#alignment").scrollLeft($("#alignment3").scrollLeft());
    $("#alignment2").scrollTop($("#alignment3").scrollTop());
    $("#alignment2").scrollLeft($("#alignment3").scrollLeft());
  });



		// Accession select
		let accessionSelect = $("#accessionSelect");
    for (let f in DATA.accessions){
    	let acc = getNameOfAccession(DATA.accessions[f]);
    	//let icon = " style='background-image:url(/fig/" + getLifeDomainOfAccession(DATA.accessions[f]) + ".png)'";
    	let domain = getLifeDomainOfAccession(DATA.accessions[f]);
    	if (domain == "Mitochondrial"){
    		acc = acc + " | organelle";
    	}
    	//console.log(acc, icon)
    	accessionSelect.append("<option value='" + DATA.accessions[f] + "'>" + acc + "</option>");
    	
    }
    $(accessionSelect).on("change", function(){
      console.log("selected", $(accessionSelect).val());
      deselectTaxa();
      SELECTED_ACCESSION = $(accessionSelect).val();
      let directory = getDirectoryOfAccession(SELECTED_ACCESSION);
      renderTertiary(directory, "tertiary");
      selectSites(true);
      accessionSelect.focus(); // Refocus on dropdown for easy selection using arrow keys
    });
    renderTertiary(getDirectoryOfAccession($(accessionSelect).val()), "tertiary");



	  // Delete loader
	  $("#mainloader").remove();
	  $("#main").css("opacity", "100%");


	  // Render the first tRNA structure
	  console.log("trna", DATA.tRNA);
	  if (DATA.tRNA != null){




			// Render the tRNA section of it exists
			fetch("tRNA.md")      // The path to the raw Markdown file
		  .then(response => response.blob())  // Unwrap to a blob...
		  .then(blob => blob.text())          // ...then to raw text...
		  .then(markdown => {                 // ...then pass the raw text into marked.parse
		    document.getElementById("tRNA_notes").innerHTML = marked.parse(markdown);
		    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
			$("#tRNA_notes").prepend("<h2>tRNA Structure</h2>");
		  });


	  	
	   	// Dropdown
	   	$("#tRNA_notes").after("<span class='dropdownDiv'>Show tRNA: <select id='tRNASelect'></select></span>");
	   	let tRNASelect = $("#tRNASelect");
    	for (let f in DATA.tRNA){
    		let acc = DATA.tRNA[f].seqname; 
    		let name = getNameOfAccession(DATA.tRNA[f].acc) + ": " + DATA.tRNA[f].anticodon + "";
    		tRNASelect.append("<option value='" + acc + "'>" + name + "</option>");
    	}

    	$(tRNASelect).on("change", function(){
	      console.log("selected", $(tRNASelect).val());
	      renderTRNA("trna/" + $(tRNASelect).val() + ".json", "tRNA_svg");
	      tRNASelect.focus(); // Refocus on dropdown for easy selection using arrow keys
	    });

    	for (let f in DATA.tRNA){
    		let acc = DATA.tRNA[f].seqname; 
    		$(tRNASelect).val(acc);
    		renderTRNA("trna/" + $(tRNASelect).val() + ".json", "tRNA_svg");
    		break;
    	}
	    

	  }
	

  })

	
}



// Draw the legend scale for alphafold confidence
function drawConfidenceLegend(){


	let ele = $("#alphaFoldConfidenceCell");
	ele.hide();

	// Draw a legend table
	let table = $(`<table class='colourLegend'></table>`);

	for (let step = ALPHAFOLD_CONFIDENCE_COLS.length-1; step >= 0 ; step --){

		let range = ALPHAFOLD_CONFIDENCE_COLS[step];
		let colour = "rgb(" + range.r + "," + range.g + "," + range.b + ")";
		let height = (range.max - range.min) / 5;
		let row = $(`<tr >
									<td style="height:` + height + `em; background-color:` + colour + `">

									</td>
									<td style="height:` + height + `em" class="labelCell">
										` + range.max + `%
									</td>
								</tr>`);
		table.append(row);

	}

	let row = $(`<tr >
									<td colspan='2'">
										pLDDT
									</td>
								</tr>`);
	table.append(row);

	ele.append(table);

}



// Get pdb directory of an accession
function getDirectoryOfAccession(acc){

      let directory = DATA.directories[acc];
      directory = directory.replaceAll("structures/", "dssp/")
      if (directory.substr(0, 4) == "dssp"){
      	directory = "data/" + directory;
      }

      return directory;

}


// Return the official name of a sequence, indepenedent of its file name
function getNameOfAccession(acc){



	
	acc = acc.replace(".pdb", "");
	let metadata = DATA.metadata[acc];
	//console.log(acc, metadata);
	if (metadata == null){
		
		// Try to match by gene name
		let geneName = acc.split("_");
		geneName = geneName[geneName.length-1];
		for (let d in DATA.metadata){
			let dgeneName = d.split("_");
			dgeneName = dgeneName[dgeneName.length-1];
			if (dgeneName == geneName){
				metadata = DATA.metadata[d];
				break;
			}
		}
		
		if (metadata == null){
			console.log("cannot find", acc);
			return "error";
		}
	}
	
	let isPDB = metadata.pdb != "" && metadata.pdb != "NA";
	
	if (isPDB){
		//return metadata.name + "_" + metadata.species;
	}else{
		//return metadata.name + "_" + metadata.species;
	}
	
	let species = metadata.species.split("_");
	if (species.length > 1){
		species = species[0] + " " + species[1];
	}else{
		species = metadata.species;
	}
	
	// Capitalise first letter
	species = species[0].toUpperCase() + species.substr(1);
	
	let str = species + " (" + metadata.name + ")";
	return str;
	
	
}


// Return the domain (of life) for a sequence
function getLifeDomainOfAccession(acc){
	
	acc = acc.replace(".pdb", "");
	let metadata = DATA.metadata[acc];
	if (metadata == null){
		
		// Try to match by gene name
		let geneName = acc.split("_");
		geneName = geneName[geneName.length-1];
		for (let d in DATA.metadata){
			let dgeneName = d.split("_");
			dgeneName = dgeneName[dgeneName.length-1];
			if (dgeneName == geneName){
				metadata = DATA.metadata[d];
				return metadata.domain;
			}
		}
		
		
		console.log("cannot find", acc, geneName);
		return null;
	}

	return metadata.domain;
	
	
}



// Is the structure wet-lab experimental (ie. on rcsb) or is it alphafold
function accessionIsExperimental(acc){
	
	acc = acc.replace(".pdb", "");
	let metadata = DATA.metadata[acc];
	if (metadata == null){
		console.log("cannot find", acc);
		return null;
	}

	let isPDB = metadata.pdb != "" && metadata.pdb != "NA";
	return isPDB;
	
	
}


/*
* Render meta info stored in json file onto page
*/
function renderInfo(text, resolve=function() { }){
	
	text = text.replaceAll("\n", "").replaceAll("\r", "");
	var json = JSON.parse(text);


	// Page title
	$("title").html(json.fullName);

	// Page icon
	$("link[rel='icon']").attr("href", json.icon);
	
	// Page main header
	 $("#fullName").html(json.fullName);
	 
	 
	 if (json.hide != null && json.hide == true){
		$(".summary").hide(0);
	 }

	$(".summary").append("<table></table>");



	// Draw a tree?
	if (json.tree != null){
		
		let scriptEle = document.createElement("script");
		scriptEle.setAttribute("src", "/js/drawTree.js");
		document.body.appendChild(scriptEle);
		scriptEle.addEventListener("load", () => {
			console.log("File loaded");
			let treeDiv = $(`<ul id="treeDiv" class="flexContainerTrna"></ul>`);
			$("#tertiaryTable").after(treeDiv);

			drawTree(json.leafFamily == null ? json.name : json.leafFamily, treeDiv, json.tree, DATA.metadata, json.treeDescription, json.fullTree, json.addToClade);
		});
	}




	// GitHub issue link
	let issueLabel = json.issuePage == null ? json.id : json.issuePage;
	if (issueLabel == null) {
		$("#IssuesLink").attr("href", "https://github.com/aarsonline/aarsonline.github.io/issues/");
	}else{
		$("#IssuesLink").attr("href", "https://github.com/aarsonline/aarsonline.github.io/labels/" + issueLabel);
	}
	


	// Summary table for superfamily alignments
	if (IS_SUPERFAMILY){



        $(".summary table").append(`<tr>
                  <th>Class</th>
                  <td>` + json.class + `</td>
                </tr>`);
        $(".summary table").append(`<tr title="Amino acids attached to tRNA">
  								<th>Activated substrates</th>
  								<td>` + json.substrate + `</td>
  							</tr>`);
      $(".summary table").append(`<tr title="Amino acids incorporated onto protein">
                  <th>Incorporates</th>
                  <td>` + json.incorporates + `</td>
                </tr>`);
      	$(".summary table").append(`<tr>
  								<th>Oligomerization</th>
  								<td>` + json.oligo + `</td>
  							</tr>`);


	}


  // Summary table for pairwise alignments
  else if (PAIRWISE) {

        $(".summary table").append(`<tr>
                  <th>Class</th>
                  <td>` + json.class + `</td>
                </tr>`);
        $(".summary table").append(`<tr>
                <th>Family 1</th>
                  <td>` + json.family1 + `</td>
                </tr>`);
        $(".summary table").append(`<tr>
                <th>Family 2</th>
                  <td>` + json.family2 + `</td>
                </tr>`);
         $(".summary table").append(`<tr>
                  <th>Family 1 RMSD</th>
                  <td>` + json.rmsd1 + ` &#8491;</td>
                </tr>`);
          $(".summary table").append(`<tr>
                  <th>Family 2 RMSD</th>
                  <td>` + json.rmsd2 + ` &#8491;</td>
                </tr>`);
           $(".summary table").append(`<tr>
                  <th>Cross-family RMSD</th>
                  <td>` + json.crossFamilyRmsd + ` &#8491;</td>
                </tr>`);
        $(".summary table").append(`<tr>
                  <th>Total RMSD</th>
                  <td>` + json.rmsdTotal + ` &#8491;</td>
                </tr>`);
        $(".summary table").append(`<tr>
                  <th>TM score</th>
                  <td>` + json.tm + `</td>
                </tr>`);



  }


  // Summary table for families
  else {
  	$(".summary table").append(`<tr>
  								<th>Family</th>
  								<td>` + json.name + `</td>
  							</tr>`);
  	$(".summary table").append(`<tr>
  								<th>Class</th>
  								<td>` + json.class + `</td>
  							</tr>`);
    $(".summary table").append(`<tr>
                  <th>Subclass</th>
                  <td>` + json.subclass + `</td>
                </tr>`);
  	$(".summary table").append(`<tr title="Amino acid attached to tRNA">
  								<th>Activated substrate</th>
  								<td>` + json.substrate + `</td>
  							</tr>`);
      $(".summary table").append(`<tr title="Amino acid incorporated onto protein">
                  <th>Incorporates</th>
                  <td>` + json.incorporates + `</td>
                </tr>`);
  	$(".summary table").append(`<tr>
  								<th>Oligomerization</th>
  								<td>` + json.oligo + `</td>
  							</tr>`);

  	$(".summary table").append(`<tr title="Codons in the standard genetic code">
  								<th>Codons</th>
  								<td>` + json.codons + `</td>
  							</tr>`);	
  	$(".summary table").append(`<tr title="Editing is a translational-error prevention mechanism which removes misactivated or mischarged amino acids. It can occur at the pre-transfer level (by removing misactivated resiudes from the active site) or at the post-transfer level (by removing mischarged residues from the tRNA).">
  								<th>Editing</th>
  								<td>` + json.editing + `</td>
  							</tr>`);
  	if (json.PAD != null){
  		let linktext = json.PAD.split("/");
  		linktext = linktext[linktext.length-1];
  		$(".summary table").append(`<tr title="A database of AARS HMM motifs">
  								<th>Prokaryotic AARS Database</th>
  								<td><a target="_blank" href="` + json.PAD + `">` + linktext + `</a></td>
  							</tr>`);
  	}

  	if (json.misynpat != null){
  		let linktext = json.misynpat.split("=");
  		linktext = linktext[linktext.length-1];
  		$(".summary table").append(`<tr title="Mitochondrial Aminoacyl-tRNA Synthetases & Pathologies">
  								<th>MiSynPat</th>
  								<td><a target="_blank" href="` + json.misynpat + `">` + linktext + `</a></td>
  							</tr>`);
  	}


  	if (json.ECnum != null){
  		let linktext = "https://www.brenda-enzymes.org/enzyme.php?ecno=" + json.ECnum;
  		$(".summary table").append(`<tr title="Enzyme commission number">
  								<th>Enzyme commission</th>
  								<td><a target="_blank" href="` + linktext + `">EC ` + json.ECnum + `</a></td>
  							</tr>`);
  	}
  	

  }
  
  
  if (json.fig != null && json.fig != ""){
	  $(".summary table").after(`<div title="` + json.substrate + `" class="aafig"><img src="` + json.fig + `"/></div>`);
	  
  }



  DATA.features = json.features;
  DATA.tRNA = json.tRNA;


  
  //// Load accessions
  //fetch("/data/accessions.json").then(response => response.text()).then(text => loadAcccessionMetadata(text, resolve));
  
	// Load alignment
	fetch("data/align.ali").then(response => response.text()).then(text => loadAlignment(text, resolve));



}



function isElementInViewport (ele) {


		ele = ele[0];
    let rect = ele.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function renderTertiary(pdb = null, id = "tertiary") {


	
	var options = {
	  width: IS_MOBILE ? 750 : 500,
	  height: IS_MOBILE ? 750 : 500,
	  antialias: !IS_MOBILE,
	  quality : 'high'
	};
	
	// Hide and show again to prevent the annoying scrolling activity, unless already in viewport
	let hideAndShow = !isElementInViewport($("#" + id)); //true;// $('#' + id).isInViewport();

	if (hideAndShow){
		$("#" + id).parent().hide(0);
	}else{
		$("#" + id).parent().show(0);
	}
  

  // Reset canvas
  $("#" + id).html("");


  // Try to load it
  if (pdb == null){
    pdb = PV_PDBS[id];
  }

  // Which protein domain?
  var domain = $("#domainSelect").val();
  var domainDir = domain.replaceAll(" ", "_");
  if (domain != "_full"){
    pdb = pdb.replace("data/", "")
    pdb = "data/domains/" + domainDir + "/" + pdb ;
  }
  PV_PDBS[id] = pdb;


  // Load/save viewer
  var viewer = null;
  if (PV_VIEWERS[id] == null){
    viewer = pv.Viewer(document.getElementById(id), options);
  }else{
    viewer = PV_VIEWERS[id];
    viewer.rm("");
    viewer = pv.Viewer(document.getElementById(id), options);
    
  }
  PV_VIEWERS[id] = viewer;

  //console.log(pdb);


  
  if (hideAndShow){
	  setTimeout(function(){
		$("#" + id).parent().show(0);
	  }, 1);
  }
	
	// https://pv.readthedocs.io/en/v1.8.1/intro.html
 // asynchronously load the PDB file for the dengue methyl transferase from the server and display it in the viewer.
  pv.io.fetchPdb(pdb, function(structure) {

   

	  
    // Display the protein as cartoon
	  if (id == "tertiary"){
		var method = $("#tertiaryColouringSingle").length == 0 ? "color.ssSuccession" : "color." + $("#tertiaryColouringSingle").val();
		  PV_GEOMS[id] = viewer.cartoon('protein', structure, { color : colourSelected(id, method) });
	  }else{
		var method = $("#tertiaryColouringAln").length == 0 ? "color.bySS" : "color." + $("#tertiaryColouringAln").val();
		 PV_GEOMS[id] = viewer.cartoon('protein', structure, { color : colourSelected(id, method) });
	  }
	 
    viewer.centerOn(structure);
	  viewer.setZoom(150);
    //viewer.autoZoom();

    let acc = pdb.split("/");
    acc = acc[acc.length-1];
    let accPlusImg = "";
    if (id == "superposition"){
    	acc = "Superposition";
    	accPlusImg = acc;
    }else{
    	
    	let domain = getLifeDomainOfAccession(acc);
    	let isPDB = accessionIsExperimental(acc);
		  let pdbImg = isPDB ? "xray" : "alphafold";
    	accPlusImg = `<img class="imgIcon" src="/fig/` + domain + `.png" /> ` + `<img class="imgIcon" src="/fig/` + pdbImg + `.png" /> ` + getNameOfAccession(acc);
    }

	  $("#" + id).append(`<div class='pdblabel'>` + accPlusImg + `</div>`);


    // Back to top
	  //$('html,body').scrollTop(0);


  });
  

	
}






 // Update tertiary colours
function recolourTertiaries(override = false){



	// Show colour scale if one of the proteins are showing confidence
	if ($("#tertiaryColouringSingle").val() == "confidence" || $("#tertiaryColouringAln").val() == "confidence"){
		$("#alphaFoldConfidenceCell").show(100);
	}else{
		$("#alphaFoldConfidenceCell").hide(100);
	}


  // Full only
  var redraw = false;
  if ($("#domainSelect").val() != "_full" && SELECTED_SITES.lower != -1){
    redraw = true;
    $("#domainSelect").val("_full");
  }

    for (var id in PV_VIEWERS){

      if (redraw || (override)){
        let pdb = PV_PDBS[id].split("/");
        pdb = pdb[pdb.length-1];
        
        if (id == "superposition"){
          pdb = "data/" + pdb;
        }else{
          pdb = getDirectoryOfAccession($("#accessionSelect").val());
        }
        
        renderTertiary(pdb, id);

      }

      else {
        if (id == "tertiary"){
		  var method = "color." + $("#tertiaryColouringSingle").val();
          PV_GEOMS[id].colorBy(colourSelected(id, method ));
        }else{
		  var method = "color." + $("#tertiaryColouringAln").val();
          PV_GEOMS[id].colorBy(colourSelected(id, method ));
        }
        PV_VIEWERS[id].requestRedraw();
      }
    }


}

// Colour pdb structure by highlighting selected residues
function colourSelected(id, defaultFn) {




	console.log(defaultFn)

  // Default colouring
  if (SELECTED_SITES.lower == -1 && defaultFn != "color.confidence" && defaultFn != "color.aa" && defaultFn != "color.threedi") {
  	let fn = eval(defaultFn);
    return fn();
  }


  // Colour function
  var colorFunc = function(atom, out, index) {

  	

    var chainName = atom.residue().chain().name();
    var chain1Name = atom.residue().chain().structure().chains()[0].name();
    //console.log(atom.residue().chain().structure().chains())


    // Get accession
    var pdb = PV_PDBS[id];
    var acc = null;
    if (id == "tertiary"){


      // Main chain only
      if (chainName != chain1Name) {
        out[index+0] = 0; out[index+1] = 0;
        out[index+2] = 0; out[index+3] = 0;
        return;
      }

      // Single structure
      acc = pdb.split("/");
      acc = acc[acc.length-1];


    }else{

      // Alignment
      var chainNum = 0;
      for (var chainNum = 0; chainNum < CHAIN_NAMES.length; chainNum++){
        if (CHAIN_NAMES[chainNum] == chainName){
          acc = DATA.accessions[chainNum];
          break;
        }
      }

    }




    // Colour by confidence
    if (defaultFn == "color.confidence" && SELECTED_SITES.lower == -1){


    	// Hide PDB structures
    	if (accessionIsExperimental(acc)){
    		out[index+0] = 0; out[index+1] = 0;
      	out[index+2] = 0; out[index+3] = 0;
      	return;
    	}

    	//console.log(index, atom.tempFactor());
    	let confidence = atom.tempFactor();
    	let rgb = [1,1,1,1];
    	for (let step = 0; step < ALPHAFOLD_CONFIDENCE_COLS.length; step++){
    		let range = ALPHAFOLD_CONFIDENCE_COLS[step];
    		if (confidence >= range.min && confidence < range.max){
    			rgb = [range.r/255, range.g/255, range.b/255];
    			break;
    		}
    	}

    	
  		out[index+0] = rgb[0]; out[index+1] = rgb[1];
    	out[index+2] = rgb[2]; out[index+3] = 1;


    	return;
    	

    }


    // Colour by 3di
    if ((defaultFn == "color.aa" || defaultFn == "color.threedi") && SELECTED_SITES.lower == -1){


    	let seq = defaultFn == "color.aa" ? DATA.alignment[acc] : DATA.threedi[acc];
    	if (seq == null){
    		 out[index+0] = 0; out[index+1] = 0;
      	 out[index+2] = 0; out[index+3] = 0;
      	 return;
    	}
    	let nsites = seq.length;
    	let resNum = atom.residue().index();
      let pdbIndex = 0;
    	for (var siteNum = 0; siteNum < nsites; siteNum++){

	      if (seq[siteNum] == "-"){

	      }else{

	        if (pdbIndex == resNum){



	          // Colour
	          let character = seq[siteNum];
	          let col = defaultFn == "color.aa" ? AA_COLS[character] : _3DI_COLS[character];
	          //console.log(acc, col, character);
	          let rgb = hexToRGB(col);
	          out[index+0] = rgb[0]; out[index+1] = rgb[1];
      			out[index+2] = rgb[2]; out[index+3] = 1.0;

	          return;
	        }
	        pdbIndex++;
	      }

	    }

	    out[index+0] = 0; out[index+1] = 0;
    	out[index+2] = 0; out[index+3] = 0;
    	return;

    }


    // Colour by selected site



    // Get site in alignment
    var siteAln = -1;
    var seq = DATA.alignment[acc];
    var nsites = seq.length;
    var resNum = atom.residue().index();
    var pdbIndex = 0;
    for (var siteNum = 0; siteNum < nsites; siteNum++){

      if (seq[siteNum] == "-"){

      }else{

        if (pdbIndex == resNum){
          siteAln = siteNum;
          break;
        }
        pdbIndex++;
      }

    }





 

    // index + 0, index + 1 etc. are the positions in the output array
    // at which the red (+0), green (+1), blue (+2) and  alpha (+3)
    // components are to be written.
    if (siteAln >= SELECTED_SITES.lower && siteAln <= SELECTED_SITES.upper){
      out[index+0] = 0.0; out[index+1] = 0.549;
      out[index+2] = 0.729; out[index+3] = 1.0;
    }else{
      out[index+0] = 0.6; out[index+1] = 0.6;
      out[index+2] = 0.6; out[index+3] = 0.7;
    }

  	


  }

  return new pv.color.ColorOp(colorFunc);


}


function hexToRGB(h) {

	let r = 0, g = 0, b = 0;
	if (h == null){
		return [r, g, b];
	}

  

  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];
    
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
    
  r = +(r / 255).toFixed(1);
  g = +(g / 255).toFixed(1);
  b = +(b / 255).toFixed(1);
  
  return [r, g, b]
}


/*
* A domain architecture map in svg
*/
function renderSecondary(svg){


    // Number of sequences
    let alignment = DATA.secondary;
    let accessions = DATA.accessions;
    let nseq = accessions.length;
    let nsites = alignment[accessions[0]].length;
    let features = DATA.features;


    console.log("rendering alignment with", nseq, nsites)


    svg.hide();
    svg.html("");
    svg.height(SEC_HEIGHT*(nseq+1) + FEATURE_HEIGHT_SEC*5);
    svg.width(SEC_WIDTH*(nsites+100) + ALN_LABEL_WIDTH);


    // Groups
    var svgAnnotation = $(drawSVGobj(svg, "g", {class: "annotation"}));
    var svgHighlight = $(drawSVGobj(svg, "g", {class: "highlight"}))
    var svgContent = $(drawSVGobj(svg, "g", {class: "content"}));


    // Colour gradients
    let defs = $(drawSVGobj(svg, "defs", {} ));
    let helixGradient = $(drawSVGobj(defs, "linearGradient", {id: "helixGradient"} ));
    $(drawSVGobj(helixGradient, "stop", {offset: "0%", stop_color: AA_COLS_2["H"] + "aa"} ));
    $(drawSVGobj(helixGradient, "stop", {offset: "100%", stop_color: AA_COLS_2["H"] + "ee"} ));
    let strandGradient = $(drawSVGobj(defs, "linearGradient", {id: "strandGradient"} ));
    $(drawSVGobj(strandGradient, "stop", {offset: "0%", stop_color: AA_COLS_2["E"] + "99"} ));
    $(drawSVGobj(strandGradient, "stop", {offset: "100%", stop_color: AA_COLS_2["E"] + "ee"} ));
    let helixBgCol  = "url(#helixGradient)";
    let strandBgCol  = "url(#strandGradient)";


    // Residue selection dragger
    const eleSvg = $(svg).get(0); //document.getElementById(svg.attr("id"));
    eleSvg.addEventListener('mousedown', ({clientX, clientY}) => {

		  
		var x1 = clientX - svg.offset().left;
		var y1 = clientY - svg.offset().top;
		if (x1 < ALN_LABEL_WIDTH) return;
		if (y1 >= SEC_HEIGHT*(nseq+1)) return;



      var clearing = false;

      // Clear selection and draw new rectangle
      if (SELECTED_SITES.lower != -1 || svgHighlight.find(".selectionRect").length > 0){
        clearing = true;
      }


       deselectSites();
      
      
      let res1 = Math.floor((x1 - ALN_LABEL_WIDTH) / SEC_WIDTH) + 1;

      let rect = drawSVGobj(svgHighlight, "rect", {x: x1-SEC_WIDTH, y: 0, width: 0, height: SEC_HEIGHT*(nseq+1), class: "selectionRect", style: "stroke-width:1px; stroke:black; fill:#008cba55"} )
      let text = $("#secondarySelectedSites"); //drawSVGobj(svgHighlight, "text", {x: SEC_WIDTH*5, y: svg.height() - SEC_WIDTH*5, class: "selectionRect", style: "text-anchor:start; dominant-baseline:auto; font-size:12px"}, "" )



      let mouseMove = function({clientX, clientY}){

        $(svgContent).find("text").attr("class", "");

        let x1_ = x1;
        let x2 = clientX - svg.offset().left;


        if (x1_ > x2){
          let tmp = x1_;
          x1_ = x2;
          x2 = tmp;
        }
		
		let maxX = SEC_WIDTH*(nsites) + ALN_LABEL_WIDTH;
        if (x1_ <= ALN_LABEL_WIDTH+1) x1_ = ALN_LABEL_WIDTH+1;
        if (x2 <= ALN_LABEL_WIDTH+1) x2 = ALN_LABEL_WIDTH+1;
        if (x1_ >= maxX) x1_ = maxX;
        if (x2 >= maxX) x2 = maxX;


        // What are the residue numbers?
        let res1_ = Math.floor((x1_ - ALN_LABEL_WIDTH) / SEC_WIDTH);
        let res2 = Math.floor((x2 - ALN_LABEL_WIDTH) / SEC_WIDTH);

        x1_ = res1_ * SEC_WIDTH + ALN_LABEL_WIDTH;
        x2 = res2 * SEC_WIDTH + ALN_LABEL_WIDTH;


        $(rect).attr("x", x1_);
        $(rect).attr("width", x2-x1_);
        $(text).html("Selected sites " + res1_ + "-" + res2);

        return {x1: x1_, x2: x2, res1: res1_, res2: res2};

      }

      var mouseUp = function({clientX, clientY}){


        var coords = mouseMove({clientX, clientY});


        SELECTED_SITES.lower = coords.res1;
        SELECTED_SITES.upper = coords.res2;

        // Clear selection
        if (clearing && SELECTED_SITES.upper - SELECTED_SITES.lower < 3){
				deselectTaxa();
		    deselectSites();
        }
		if (coords.x1 == coords.x2){
			deselectTaxa();
			deselectSites();
		}
		

        selectSites();

        eleSvg.removeEventListener('mouseup', mouseUp);
        eleSvg.removeEventListener('mouseleave', mouseUp);
        eleSvg.removeEventListener('mousemove', mouseMove);


      }


      eleSvg.addEventListener('mouseup', mouseUp);
      eleSvg.addEventListener('mouseleave', mouseUp);
      eleSvg.addEventListener('mousemove', mouseMove);


    });



    


     // Features
    for (var feature in features){


	  if (HIDE_PROTOZYME && feature == "Protozyme") continue;

      let range = features[feature].range;
      let level = features[feature].level;
      let textAlign = features[feature].align;
      if (textAlign == "right"){
      	textAlign = "end";
      }else{
      	textAlign = "start";
      }
      let featureCount = features[feature].count; 
      let featureDY = features[feature].dy; 
      if (range == "") continue;
      range = range.split("-")
      var y = SEC_HEIGHT*(nseq+1) + FEATURE_HEIGHT_SEC*(level-0.5);
      var lower = getAlignmentPosFromUngapped(features[feature].acc, range[0]);
      var upper = lower;
      var x1 = SEC_WIDTH*(lower) + ALN_LABEL_WIDTH;
      var x2 = x1 + NT_WIDTH;
      if (range.length == 2){
        upper = getAlignmentPosFromUngapped(features[feature].acc, range[1]);
        x2 = SEC_WIDTH*(upper + 1) + ALN_LABEL_WIDTH;
      }






      var textCol = "black";
      var col = level == 1 ? LEVEL_1_COL : level == 2 ? LEVEL_2_COL : level == 3 ? LEVEL_3_COL : LEVEL_4_COL;
      var txt = feature;
		  var lw = 0; //0.7;
		  if (level == 4){
	       lw = 0.7;
      }
	  
	  	let textX = textAlign == "left" ? x1 : x1;

	  	let textFeature = null;
	  	let featureBg = null;
      if (level == 0){
        continue;
      }else if (featureCount != null){

      	// Only draw around a few sequences
      	let yAcc = -1;
      	for (let seqNum = 0; seqNum < nseq; seqNum++){
		      let accSeq = accessions[seqNum];
		      if (accSeq == features[feature].acc){
		      	yAcc = (seqNum+1)*SEC_HEIGHT;
		      	if (featureDY != null) {
		      		yAcc= (seqNum+1+featureDY)*SEC_HEIGHT;
		      	}
		      	break;
		      }

		    }



		    if (yAcc != -1){



      		drawSVGobj(svgAnnotation, "rect", {x: x1-SEC_WIDTH, y: yAcc, width: x2-x1, height:SEC_HEIGHT*featureCount, style:"stroke-width:" +  lw + "px; stroke:black; fill:" + "white"});
					featureBg = drawSVGobj(svgAnnotation, "rect", {x: x1-SEC_WIDTH, y: yAcc, width: x2-x1, height:SEC_HEIGHT*featureCount, style:"stroke-width:" +  lw + "px; stroke:black; fill:" + col});

	      	// Triangle
	      	let yBtm = yAcc + SEC_HEIGHT*(featureCount+0.5);
					let points = (x1-NT_WIDTH/4) + "," + (yBtm-SEC_HEIGHT/8) + " " + (x1+NT_WIDTH/4) + "," + (yBtm-SEC_HEIGHT/8) + " " + x1 + "," + (yBtm-SEC_HEIGHT/2);
	  	  	drawSVGobj(svgContent, "polygon", {points: points, style: "stroke-width:0px; stroke:black; fill:" + "white"} ) // Triangle
	  	  	drawSVGobj(svgContent, "polygon", {points: points, style: "stroke-width:0.7px; stroke:black; fill:" + col} ) // Triangle


	  	  	// Text
	  	  	textFeature = drawSVGobj(svgContent, "text", {lower: lower, upper:upper,  x: textX, y: yBtm-SEC_HEIGHT/20, style: "cursor:pointer; text-anchor:" + textAlign + "; dominant-baseline:hanging; font-size:" + FEATURE_FONT_SIZE*0.8 + "px; fill:" + textCol}, value=txt)
	  	  



      	}
      }else {
		    drawSVGobj(svgAnnotation, "rect", {x: x1-SEC_WIDTH, y: SEC_HEIGHT, width: x2-x1, height:SEC_HEIGHT*nseq + FEATURE_HEIGHT_SEC*(level-1), style:"stroke-width:" +  lw + "px; stroke:black; fill:" + "white"});
				featureBg = drawSVGobj(svgAnnotation, "rect", {x: x1-SEC_WIDTH, y: SEC_HEIGHT, width: x2-x1, height:SEC_HEIGHT*nseq + FEATURE_HEIGHT_SEC*(level-1), style:"stroke-width:" +  lw + "px; stroke:black; fill:" + col});
      

      	// Triangle
				let points = (x1-NT_WIDTH/4) + "," + (y-SEC_HEIGHT/8) + " " + (x1+NT_WIDTH/4) + "," + (y-SEC_HEIGHT/8) + " " + x1 + "," + (y-SEC_HEIGHT/2);
  	  	drawSVGobj(svgContent, "polygon", {points: points, style: "stroke-width:0px; stroke:black; fill:" + "white"} ) // Triangle
  	  	drawSVGobj(svgContent, "polygon", {points: points, style: "stroke-width:0.7px; stroke:black; fill:" + col} ) // Triangle
  	  	


  	  	// Text
		textFeature = drawSVGobj(svgContent, "text", {lower: lower, upper:upper,  x: textX, y: y-SEC_HEIGHT/20, style: "cursor:pointer; text-anchor:" + textAlign + "; dominant-baseline:hanging; font-size:" + FEATURE_FONT_SIZE + "px; fill:" + textCol}, value=txt)
	  	  



      }



      // Click on rect to go to link?
	  	let href = features[feature].href;
	  	if (href != null){
	  		$(featureBg).css("cursor", "pointer");
	  		$(featureBg).css("stroke-width", "0.5px");
	  		drawSVGobj(featureBg, "title", {}, "View alignment of " + txt);
	  		$(featureBg).bind("click", function(event){var u = $(this).attr("url");
  	  		let e = window.event;
  	  		if (e.ctrlKey){
  	  			window.open(href, '_blank');
  	  		}else{
   				 window.location.href = href;
  	  		}
	  		});

	  	}

  	 
 

      // Click on a feature to select residues
      if (textFeature != null){
	      $(textFeature).click(function(){
			  
			  
	        var ele = $(this);

	        if (ele.attr("class") == "selected"){
	          deselectSites(true);
	          return;
	        }

	        deselectSites();

	        $(ele).attr("class", "selected");
	        SELECTED_SITES.lower = parseFloat(ele.attr("lower"));
	        SELECTED_SITES.upper = parseFloat(ele.attr("upper"));
	        selectSites();


	      });
	     
	    }
  	}


		// Site numbering
    for (var site = 0; site < nsites; site++){
       
        var x = SEC_WIDTH*(site) + ALN_LABEL_WIDTH;

      if (site == 0 || (site+1) % 50 == 0){
      	var y = SEC_HEIGHT*0.5;
        drawSVGobj(svgContent, "text", {x: x + 2, y: y, style: "text-anchor:start; dominant-baseline:central; font-family:Raleway; font-size:" + NT_FONT_SIZE + "px"}, value=site+1)
				drawSVGobj(svgContent, "line", {x1:x, x2:x, y1:SEC_HEIGHT*0.25, y2:SEC_HEIGHT, style:"stroke:black;stroke-width:1px"})
   
	  	}else if((site+1) % 25 == 0){
	  		//drawSVGobj(svgContent, "line", {x1:x, x2:x, y1:SEC_HEIGHT, y2:SEC_HEIGHT*0.5, style:"stroke:black;stroke-width:1px"})
	  	}
    }

    // Sequence labels
    for (let seqNum = 0; seqNum < nseq; seqNum++){
      let acc = accessions[seqNum];
	  	let accPrint = getNameOfAccession(acc);
      let y = SEC_HEIGHT*(seqNum+1.5)
      let x = ALN_LABEL_WIDTH - 5*NT_FONT_SIZE;
      let url = DATA.urls[acc];
	  
	  
	  // Domain image
	  let domainOfLife = getLifeDomainOfAccession(acc);
	  if (domainOfLife != null){
		   let domainEle = drawSVGobj(svgContent, "image", {href:"/fig/" + domainOfLife + ".png", x: x+NT_FONT_SIZE, y: y-NT_FONT_SIZE/2, pdb: acc, height:SEC_HEIGHT*0.9})
		   drawSVGobj(domainEle, "title", {}, domainOfLife);
		   
		   
		   // PDB / alphafold 
		   let isPDB = accessionIsExperimental(acc);
		   let pdbImg = isPDB ? "xray" : "alphafold";
		   let pdbtitle = isPDB ? "Structure was determined experimentally (eg. x-ray or NMR)" : "Structure was predicted computationally using AlphaFold";
		   let methodEle = drawSVGobj(svgContent, "image", {href:"/fig/" + pdbImg + ".png", x: x+NT_FONT_SIZE*3, y: y-NT_FONT_SIZE/2, pdb: acc, height:SEC_HEIGHT*0.7})
		   drawSVGobj(methodEle, "title", {}, pdbtitle);
		   
	  }
	 

		// Click on an accession to select it
		let ele = drawSVGobj(svgContent, "text", {x: x, y: y, pdb: acc, style: "text-anchor:end; cursor:pointer; fill:#366BA1; dominant-baseline:central; font-size:" + NT_FONT_SIZE + "px"}, value=accPrint)
		$(ele).bind("click", function(event){
			var a = event.target.getAttribute("pdb");
			var directory = DATA.directories[a];
			directory = directory.replace("structures/", "dssp/");
			
			let sln = directory.split("/");
			sln = sln[sln.length-1];
			
			
			// Already selected. Deselect it
			if (SELECTED_ACCESSION == sln){
				deselectTaxa(true);
				return;
			}
			
			deselectTaxa();
			SELECTED_ACCESSION = sln;
			selectSites(false);


			if (!PAIRWISE) directory = "data/" + directory;
  			renderTertiary(directory);
  		});


    ele.addEventListener('contextmenu', function(evt) { 
			  
				let metadata = DATA.metadata[acc.replace(".pdb", "")];
			  
		        //console.log("right click", acc, metadata);
				if (metadata == null){
					$("#metadataDlg").hide(0);
					return;
				}
				
				let dlgTop = y + svg.offset().top;
				let dlgLeft = ALN_LABEL_WIDTH + svg.offset().left + 5;
				if (IS_MOBILE){
					dlgTop += NT_FONT_SIZE;
					dlgLeft = svg.offset().left;
				}
				$("#metadataDlg").css({top: dlgTop, left: dlgLeft});
				$("#metadataDlg table").html("");
				
				
				let species = metadata.species.replaceAll("_", " ");
				let domain = metadata.domain == "Mitochondrial" ? "Mitochondrion/chloroplast" : metadata.domain;
				let domainImg =  "/fig/" + metadata.domain + ".png";
				   
				let isPDB = metadata.pdb != "" && metadata.pdb != "NA";
				let methodImg =  "/fig/" + (isPDB ? "xray" : "alphafold") + ".png";
				let imgWidth = IS_MOBILE ? 28 : 14;
				$("#metadataDlg table").append(`<tr>
		  								<td colspan="2">
											<div style="text-align:center">` + getNameOfAccession(acc) + `</div>
											
										</td>
		  							</tr>`);
									//<div>` + metadata.desc + `</div>
				
				$("#metadataDlg table").append(`<tr>
		  								<th>Family</th>
		  								<td>` + metadata.name + `</td>
		  							</tr>`);
									
				$("#metadataDlg table").append(`<tr>
		  								<th>Length</th>
		  								<td>` + DATA.alignment[acc].replaceAll("-", "").length + ` aa</td>
		  							</tr>`);

				$("#metadataDlg table").append(`<tr>
		  								<th>Domain</th>
		  								<td>` + domain + ` <img src="` + domainImg + `" height="` + imgWidth + `px" style="vertical-align:middle"></img></td>
		  							</tr>`);
									
				$("#metadataDlg table").append(`<tr>
		  								<th>Phylum</th>
		  								<td>` + metadata.phylum + `</td>
		  							</tr>`);
									
				$("#metadataDlg table").append(`<tr>
		  								<th>Species</th>
		  								<td><i>` + species + `</i></td>
		  							</tr>`);

				
									
				if (isPDB){
					
					$("#metadataDlg table").append(`<tr>
											<th>Structure</th>
											<td><a target="_blank" href="https://www.rcsb.org/structure/` + metadata.pdb + `">` + metadata.pdb.toUpperCase() + `</a> 
												<img src="` + methodImg + `" height="` + imgWidth + `px" style="vertical-align:middle"></img></td>
										</tr>`);
										
										
				}else{
											
					$("#metadataDlg table").append(`<tr>
											<th>Nucleotide</th>
											<td><a target="_blank" href="https://www.ncbi.nlm.nih.gov/nuccore/` + metadata.genbank + `">` + metadata.genbank + `</a></td>
										</tr>`);
									

					if (metadata.gene != null && metadata.gene != "" && metadata.gene != "NA"){
						$("#metadataDlg table").append(`<tr>
												<th>Gene</th>
												<td><a target="_blank" href="https://www.ncbi.nlm.nih.gov/gene/` + metadata.gene + `">` + metadata.gene + `</a></td>
											</tr>`);
					}

					if (metadata.protein != null && metadata.protein != "" && metadata.protein != "NA"){
						$("#metadataDlg table").append(`<tr>
												<th>Protein</th>
												<td><a target="_blank" href="https://www.ncbi.nlm.nih.gov/protein/` + metadata.protein + `">` + metadata.protein + `</a></td>
											</tr>`);
					}
										
					$("#metadataDlg table").append(`<tr>
											<th>Genetic code</th>
											<td><a target="_blank" href="https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi#SG` + metadata.transl_table + `">` + metadata.transl_table + `</a></td>
										</tr>`);
										
					$("#metadataDlg table").append(`<tr>
											<th>Structure</th>
											<td><a target="_blank" href="data/dssp/` + acc + `">Download AlphaFold</a> 
													<img src="` + methodImg + `" height="` + imgWidth + `px" style="vertical-align:middle"></img></td>
										</tr>`);

									
							
		}
							
	

  
		
		$("#metadataDlg").show(100);
        evt.preventDefault();
		evt.stopPropagation()
      }, false);
	  
	  


    }
	
	// Disable right clicks on svg
	svg[0].addEventListener('contextmenu', function(evt) { 
		evt.preventDefault();
	}, false);


    // Secondary structure
    for (var seqNum = 0; seqNum < nseq; seqNum++){
      var acc = accessions[seqNum];
      var seq = alignment[acc];
      var y = SEC_HEIGHT*(seqNum+1.5)


      let sseGroup = drawSVGobj(svgContent, "g", { accession: acc, class: "domainSeq", select: "na" });


      // Find contiguous regions of helix, strand, loop, or gap
      var SSEs = [];
      var symbol = seq[0];
  	  if (symbol == "I" || symbol == "G") symbol = "H"; // Helix
  	  if (symbol == "S" || symbol == "B" || symbol == "T") symbol = "N"; // Loop etc
      var start = 0;
      for (var site = 1; site < nsites; site++){

          var symbol2 = seq[site];
      		if (symbol2 == "I" || symbol2 == "G") symbol2 = "H"; // Helix
      		if (symbol2 == "S" || symbol2 == "B"  || symbol2 == "T") symbol2 = "N"; // Loop etc




      		// Ignore all gaps / loops of length 1 within an sse for asthetic purposes

      		if (site < nsites-1 && (symbol2 == "-" || symbol2 == "N")){
      				let symbolNext = seq[site+1];
      				if (symbolNext == "I" || symbolNext == "G") symbolNext = "H"; // Helix
      				if (symbolNext == "S" || symbolNext == "B"  || symbolNext == "T") symbolNext = "N"; // Loop etc
      				if (symbol == symbolNext){
      					symbol2 = symbolNext;
      				}
      				
      		}

          if (symbol != symbol2){
              var sse = {seqNum: seqNum, start: start, stop: site-1, element: symbol};
              symbol = symbol2;
              start = site;
              SSEs.push(sse);
          }




      }


      // Plot them
      for (let i = SSEs.length-1; i >= 0; i --){



        let sse = SSEs[i];


        

        let startX = (sse.start)*SEC_WIDTH + ALN_LABEL_WIDTH;
        let endX = (sse.stop+1)*SEC_WIDTH + ALN_LABEL_WIDTH;
        let sseLen = sse.stop - sse.start + 1;

        let colourModifier = "";


        // Gap - do nothing
        if (sse.element == "-"){
          //console.log(acc, "gaps", sse);

        }

        // Helix
        else if ((sse.element == "H")  && sseLen >= MIN_SSE_LEN){

          //console.log(acc, "helix", sse);

          // Cylinder if long, rect if short
          if (sseLen > 1){


          	startX = startX + HELIX_CORNER_RADIUS/2;
          	endX = endX - HELIX_CORNER_RADIUS/2;



          	// Right circle
          	drawSVGobj(sseGroup, "ellipse", {cx: endX, cy: y, rx: HELIX_CORNER_RADIUS, ry: HELIX_WIDTH/2, style: "stroke-width:1px; stroke:black; fill:" + "white"} );
          	drawSVGobj(sseGroup, "ellipse", {cx: endX, cy: y, rx: HELIX_CORNER_RADIUS, ry: HELIX_WIDTH/2, style: "stroke-width:1px; stroke:black; fill:" + AA_COLS_2["H"]} );
       

       			// Rect
       			drawSVGobj(sseGroup, "rect", {x: startX, y: y-HELIX_WIDTH/2, width: endX-startX, height: HELIX_WIDTH, style: "stroke-width:0px; fill:" + AA_COLS_2["H"]} );
         

         		// Border around rect
	         	drawSVGobj(sseGroup, "line", {x1: startX, x2: endX, y1: y-HELIX_WIDTH/2, y2: y-HELIX_WIDTH/2, style: "stroke-width:1px; stroke: black"} );
	         	drawSVGobj(sseGroup, "line", {x1: startX, x2: endX, y1: y+HELIX_WIDTH/2, y2: y+HELIX_WIDTH/2, style: "stroke-width:1px; stroke: black"} );
         

         		// Left circle
	          drawSVGobj(sseGroup, "ellipse", {cx: startX, cy: y, rx: HELIX_CORNER_RADIUS, ry: HELIX_WIDTH/2, style: "stroke-width:0px; fill:white"} );

          	drawSVGobj(sseGroup, "ellipse", {cx: startX, cy: y, rx: HELIX_CORNER_RADIUS, ry: HELIX_WIDTH/2, style: "stroke-width:1px; stroke:black; fill:" + helixBgCol} );
         
          }else{
          	 drawSVGobj(sseGroup, "rect", {rx: HELIX_CORNER_RADIUS, x: startX, y: y-HELIX_WIDTH/2, width: endX-startX, height: HELIX_WIDTH, style: "stroke-width:1px; stroke:black; fill:" + helixBgCol} );
         
          }

        }

        // Strand
        else if (sse.element == "E" && sseLen >= MIN_SSE_LEN){

          // Arrow
          var x2 = endX - STRAND_ARROW_HEAD_LEN_1;
          var x3 = endX - STRAND_ARROW_HEAD_LEN_2;


          // To avoid a tiny arrow head
          if (sse.stop - sse.start + 1 < 4){
            x2 = x2 + STRAND_ARROW_HEAD_LEN_1/2;
            x3 = x3 + STRAND_ARROW_HEAD_LEN_1/2;
          }


          var points = startX + "," + (y-STRAND_ARROW_BASE_WIDTH/2);
          points += " " + x2 + "," + (y-STRAND_ARROW_BASE_WIDTH/2);
          points += " " + x3 + "," + (y-STRAND_ARROW_HEAD_WIDTH/2);
          points += " " + endX + "," + y;
          points += " " + x3 + "," + (y+STRAND_ARROW_HEAD_WIDTH/2);
          points += " " + x2 + "," + (y+STRAND_ARROW_BASE_WIDTH/2);
          points += " " + startX + "," + (y+STRAND_ARROW_BASE_WIDTH/2);

          drawSVGobj(sseGroup, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:" + "white"} )
          drawSVGobj(sseGroup, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )

        }

        // Loop etc
        else{


          //console.log(acc, "loop", sse);

          drawSVGobj(sseGroup, "line", {x1: startX, x2: endX, y1: y, y2: y, style: "stroke-linecap:round; stroke-width:1px; stroke:#000000" + colourModifier} )

        }

      }


      //console.log("SSE", SSEs);


    }



    svg.show();


}


// Clear selection 
function deselectTaxa(refresh = false){
	
	// Clear domain selection text
	$("#secondary g.domainSeq").attr("select", "na");
	SELECTED_ACCESSION = null;
	if (refresh) selectSites();
	
}

// Clear selection 
function deselectSites(refresh = false){
	
	console.log("deselectSites");
	
	// Clear selecting rectangle
	$("svg").find(".selectionRect").remove();
	$("#secondarySelectedSites").html("");
	
	
	// Hide accession dialog
	$("#metadataDlg").hide(0);
	
	
	// Clear domain selection text 
	$("svg").find("text").attr("class", "deselected");
	
	
				
	// Clear selection on catalytic table / svg
	$('table.maptable td').removeClass("selected");
	$('table.maptable th').removeClass("selected");
	$('table.maptable td').removeClass("deselected");
	$('table.maptable th').removeClass("deselected");
	$("#catalyticSVG").children("g").children("g").attr("class", "");
	
	// Clear selection
	SELECTED_SITES.lower = -1;
	SELECTED_SITES.upper = -1;
	
	
	if (refresh) selectSites();
	
	
}


function selectSites(rescroll = true){
	
		// Domain architecture fade out other sequences
    if (SELECTED_ACCESSION != null){
      $("#secondary g.domainSeq").attr("select", "false");
      $(`#secondary g.domainSeq[accession="` + SELECTED_ACCESSION + `"]`).attr("select", "true");
      let accessionSelect = $("#accessionSelect");
      accessionSelect.val(SELECTED_ACCESSION);
      console.log("setting to deselected");
    }

		// Update canvas colours async
    setTimeout(function(){
		
		renderAlignment("alignment", 0, "data/align.ali");
		renderAlignment("alignment2", 1, "data/secondary.fasta");
		if (DATA.threedi == null){

    }else{
    	renderAlignment("alignment3", 2, "data/3di.fasta");
    }

		// Rescroll
		if (SELECTED_SITES.lower != -1 && rescroll){
		  var xpos = ALN_LABEL_WIDTH + NT_WIDTH*(SELECTED_SITES.lower) - $("#alignment").parent().width()/2;
		  $("#alignment").scrollLeft(xpos);
		  $("#alignment2").scrollLeft(xpos);
		  $("#alignment3").scrollLeft(xpos);
		}
    
	}, 1);


    // Update tertiary colour async
    setTimeout(function(){
      recolourTertiaries();
    }, 1);

}




var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}

//Create canvas with the device resolution.
//var myCanvas = createHiDPICanvas(500, 250);



/*
	Find the position in alignment from ungapped position within one sequence
*/
function getAlignmentPosFromUngapped(accession, accPos){


	accPos = parseFloat(accPos);




	let accessions = DATA.accessions;
	let alignment = DATA.alignment;
	let nsites = alignment[accessions[0]].length;
	let siteSeq = 0;


	if (alignment[accession] == null){
		console.log("cannot find", accession, "in alignment");
	}


	for (let siteAln = 0; siteAln < nsites; siteAln++){


		if (siteSeq == accPos){
			return siteAln;
		}

		let symbol = alignment[accession][siteAln];
		if (symbol != "-"){
			siteSeq++;
		}

	}

	return nsites;


}




/*
* Draw a canvas of primary/secondary as an alignment 
*/
function renderAlignment(divID, datatype = 0, downloadHref = ""){
	

	// Number of sequences
  var alignment = datatype == 1 ? DATA.secondary : datatype == 2 ? DATA.threedi : DATA.alignment;
  var accessions = DATA.accessions;
  if (alignment == null ||  alignment[accessions[0]] == null) return;
  var nseq = accessions.length;
  var nsites = alignment[accessions[0]].length;

  var features = DATA.features;
	
	
	
	
	// Canvas size
	var w = NT_WIDTH*(nsites+2) + ALN_LABEL_WIDTH;
	var h = NT_HEIGHT*(nseq+1) + FEATURE_HEIGHT_ALN*4.1;
  var maxCanvasWidth = 20000;
  var ratio = Math.min(maxCanvasWidth / w, 2.5); 
	var canvas;
  if ($("#" + divID).find("canvas").length > 0){
    canvas = $("#" + divID).find("canvas").get(0);
  } else{
    canvas = createHiDPICanvas(w, h, ratio);
    $("#" + divID).append(canvas);
  }
	
	//var canvas = document.getElementById(canvasID);
	//Create canvas with a custom resolution.
	
	//canvas.width  = w;
	//canvas.height = h;
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.textBaseline = "middle";
	
	
	// Sequence labels
    for (var seqNum = 0; seqNum < nseq; seqNum++){
      let acc = accessions[seqNum];
	  	let accPrint = getNameOfAccession(acc);
      let y = NT_HEIGHT*(seqNum+1.5)
      let x = ALN_LABEL_WIDTH - 10;


      let cls = DATA.isAlpha[[acc]] ? "alpha" : "pdb";
  
  	  ctx.font = NT_FONT_SIZE + "px Raleway";
  	  ctx.textAlign = "end";
      ctx.fillStyle = "#366BA1";
  	  ctx.fillText(accPrint, x, y);


    }
	
	 // Site numbering
    for (var site = 0; site < nsites; site++){
      if ((site+1) % 10 == 1){
        var y = NT_HEIGHT*0.5;
        var x = NT_WIDTH*(site+0.25) + ALN_LABEL_WIDTH;
      	
      	//ctx.font = NT_FONT_SIZE + "px Courier New";
      	ctx.textAlign = "start";
        ctx.fillStyle = "black";
      	ctx.fillText(site+1, x, y);


        // Stroke
        ctx.beginPath();
        ctx.moveTo(x-NT_WIDTH/4, y+NT_HEIGHT/2);
        ctx.lineTo(x-NT_WIDTH/4, y-NT_HEIGHT/2);
        ctx.stroke();

      }
    }
	
	
	 // Draw the alignment
    for (var seqNum = 0; seqNum < nseq; seqNum++){

      var acc = accessions[seqNum];
      var seq = alignment[acc];
      var y = NT_HEIGHT*(seqNum+1.5)
      //console.log(acc, seq);
      for (var site = 0; site < nsites; site++){
        var x = NT_WIDTH*(site+0.5) + ALN_LABEL_WIDTH;
        var aa = seq[site];




      // Rect
      let col = "";
      let textCol = "#000000";
      if (aa == "-"){
        col = "#ffffff";
      }else if (datatype == 0){
      	textCol = AA_FONT_COLS[aa];
        col = AA_COLS[aa];
      }else if (datatype == 2){
      	textCol = "black";
        col = _3DI_COLS[aa];
      }else{
				textCol = AA_FONT_COLS_2[aa];
        col = AA_COLS_2[aa];
      }




      // Majority colouring?
      if (COLOUR_BY_MAJORITY){


      	// What is majority group?
      	let countAA = 0;
      	for (var seqNum2 = 0; seqNum2 < nseq; seqNum2++){
      		let acc2 = accessions[seqNum2];
      		let seq2 = alignment[acc2];
      		let aa2 = seq2[site];
      		if (aa == aa2){
      			countAA++;
      		}
      	}

      	if (countAA > nseq/2){

      	}else{
      		col = col + "34";
      		textCol = "black";
      	}




      }

	

      // Selected site?
      if (SELECTED_SITES.lower != -1){
        if (site+1 < SELECTED_SITES.lower || site+1 > SELECTED_SITES.upper ){
            //textCol = "white";
            if (aa != "-") {
              col = col + "33";
              textCol = textCol + "aa";
            }
        }
      }

      // Selected accession?
      if (SELECTED_ACCESSION != null){
        if (acc != SELECTED_ACCESSION && col != null && col.length != 9){
          col = col + "33";
          textCol = textCol + "aa";
        }
      }
      
	  
		
		  
		ctx.beginPath();
		ctx.fillStyle = col;
		ctx.fillRect(x-NT_WIDTH/2, y-NT_HEIGHT/2, NT_WIDTH+0.5, NT_HEIGHT+0.5);
		ctx.stroke();
          
        


        // Text
        if (aa != "-"){
        	ctx.textAlign = "center";
        	ctx.fillStyle = textCol;
        	ctx.fillText(aa, x, y);
        }



      }


    }



	 // Rect around selected sites / taxon
	 if (SELECTED_SITES.lower != -1 || SELECTED_ACCESSION != null){
		 
		 
		 let x1 = 0;
		 let x2 = ALN_LABEL_WIDTH + NT_WIDTH*nsites;
		 let y1 = NT_HEIGHT;
		 let h = NT_HEIGHT*(nseq);
		 
		 
		 // Width of rect
		 if (SELECTED_SITES.lower != -1){
			 x1 = NT_WIDTH*(SELECTED_SITES.lower-1) + ALN_LABEL_WIDTH;
		     x2 = NT_WIDTH*(SELECTED_SITES.upper) + ALN_LABEL_WIDTH;
		 }
		 
		 
		 // Height of rect
		 if (SELECTED_ACCESSION != null){
			 
			 
			 let selectedSeqNr = -1;
			  for (let seqNum = 0; seqNum < nseq; seqNum++){
				if (accessions[seqNum] == SELECTED_ACCESSION){
				  selectedSeqNr = seqNum;
				  break;
				}
			  }
					 
			 y1 = (selectedSeqNr+1)*NT_HEIGHT;
			 h = NT_HEIGHT;
		 }

	  
		  ctx.beginPath();
		  ctx.fillStyle = col;
		  ctx.strokeRect(x1, y1, x2-x1, h);
		 
	 }




    // Features
    for (var feature in features){

    	if (HIDE_PROTOZYME && feature == "Protozyme"){
    		continue;
    	}

      var range = features[feature].range;
      var level = features[feature].level;
      if (range == "") continue;
      range = range.split("-")
      let lowerRange = getAlignmentPosFromUngapped(features[feature].acc, range[0]);
      var y = NT_HEIGHT*(nseq+1) + FEATURE_HEIGHT_ALN*(level-0.5);
      var x1 = NT_WIDTH*(lowerRange) + ALN_LABEL_WIDTH;
      var x2 = x1 + NT_WIDTH;
      if (range.length == 2){
      	let upperRange = getAlignmentPosFromUngapped(features[feature].acc, range[1]);
        x2 = NT_WIDTH*(upperRange + 1) + ALN_LABEL_WIDTH;
      }


      var textCol = level == 1 || level >= 3 ? "black" : "white";
      var col = level == 1 ? LEVEL_1_COL : level == 2 ? LEVEL_2_COL : level == 3 ? LEVEL_3_COL : LEVEL_4_COL;
      var txt = feature;
      if (level == 0){
        txt = "*";
        textCol = "black";
        y = y + FEATURE_HEIGHT_ALN;
      }else{
		  
		  
		  ctx.beginPath();
		  ctx.fillStyle = col;
		  ctx.fillRect(x1-NT_WIDTH, y-FEATURE_HEIGHT_ALN/2, x2-x1, FEATURE_HEIGHT_ALN);
		  ctx.stroke();
		  ctx.strokeRect(x1-NT_WIDTH, y-FEATURE_HEIGHT_ALN/2, x2-x1, FEATURE_HEIGHT_ALN);

      }



  		// Text
  		ctx.fillStyle = textCol;
  		ctx.font = FEATURE_FONT_SIZE + "px Raleway";
  		ctx.fillText(txt, x1-NT_WIDTH + (x2-x1)/2, y);


    }


	if (!IS_MOBILE) {
		
		let aars = accessions[0].split("_");
		let downloadFileName = aars[0] + (datatype == 0 ? ".primary" : datatype == 1 ? ".secondary" : ".3di") + ".fasta";

		// Toolbar after alignment
		if ($(`[for="` + divID + `"].alignmentToolBar`).length == 0){
		  $("#" + divID).after($("<div class='alignmentToolBar' for='" + divID + "'></div>"));
		}
		let toolbar = $(`[for="` + divID + `"].alignmentToolBar`);
		toolbar.html("");
	//	toolbar.append($(`<span><a href="` + downloadHref + `" download="` + downloadFileName + `">Download fasta</a> </span>`));

		toolbar.append($(`<span class="hyperlink" onClick="downloadProtein('` + downloadFileName + `', ` + (datatype == 1) + `)">Download fasta</span>`));

		if (datatype == 0){
			let geneFileName = aars[0] + ".gene.fasta";
			toolbar.append($(`<span class="hyperlink" onClick="downloadGene('` + geneFileName + `', false)">Download gene fasta</span>`));
			toolbar.append($(`<span class="hyperlink devHidden" onClick="downloadGene('MBP.` + geneFileName + `', true)">Download MBP fasta</span>`));
		}
		toolbar.append($(`<span> Site: <span class="fader siteSel"></span> </span>`));
		toolbar.append($(`<span> Ungapped: <span class="fader ungappedSel"></span> </span>`));
		toolbar.append($(`<span> Accession: <span class="fader taxonSel"></span> </span>`));
		
		// SSE legend
		if (datatype == 1){
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["N"] + `; background-color:` + AA_COLS_2["N"] + `">N</span> - none </span>`));
			
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["T"] + `; background-color:` + AA_COLS_2["T"] + `">T</span> - H-bonded turn </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["S"] + `; background-color:` + AA_COLS_2["S"] + `">S</span> - bend </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["B"] + `; background-color:` + AA_COLS_2["B"] + `">B</span> - b-bridge </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["I"] + `; background-color:` + AA_COLS_2["I"] + `">I</span> - p-helix </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["G"] + `;background-color:` + AA_COLS_2["G"] + `">G</span> - 310 helix </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["H"] + `;background-color:` + AA_COLS_2["H"] + `">H</span> - &alpha; helix </span>`));
			toolbar.append($(`<span class="sseLegend" > <span style="color:` + AA_FONT_COLS_2["E"] + `;background-color:` + AA_COLS_2["E"] + `">E</span> - extended &beta; strand </span><br>`));
			
		}



		$("#" + divID).after(toolbar);


		// Canvas mouse hover events
		canvas.onmousemove = function (e) {



			let rect = this.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top,
					i = 0, r;


			// Too far up/down
			if (y <= NT_HEIGHT || y > NT_HEIGHT*(nseq+1)) {
			  $("body").css("cursor", "auto");
			  toolbar.find(".fader").animate({ opacity: 0 }, SELECT_FONT_FADEOUT_TIME)
			  return;
			}      


			// Hover over accession
			if (x <= ALN_LABEL_WIDTH){
			  toolbar.find(".fader").animate({ opacity: 0 }, SELECT_FONT_FADEOUT_TIME)
			  $("body").css("cursor", "pointer");
			  return;
			}

			$("body").css("cursor", "crosshair");


			// Stop the fade out animation and bring back the opacity
			toolbar.find(".fader").stop(true);
			toolbar.find(".fader").css("opacity", 1);

			let siteNum = Math.floor((x - ALN_LABEL_WIDTH) / NT_WIDTH) + 1;
			let seqNum = Math.floor(y / NT_HEIGHT) - 1;
			let accHover = accessions[seqNum];
			let accHoverName = getNameOfAccession(accHover);
			let siteNumUngapped = alignment[accHover].substring(0, siteNum).replaceAll("-", "").length;
		   // console.log(accessions[seqNum], siteNum);


			  toolbar.find(".siteSel").html(siteNum);
			  toolbar.find(".ungappedSel").html(siteNumUngapped);
			  toolbar.find(".taxonSel").html(accHoverName);


			
			//toolbar.html("Site " + siteNum + " ungapped: " + siteNumUngapped + " of " + accHover.replace(".pdb", ""));


		};


		// Click on accession to select it
		canvas.onmousedown = function (e) {


			let rect = this.getBoundingClientRect(),
					x = e.clientX - rect.left,
					y = e.clientY - rect.top,
					i = 0, r;


			// Click on accession
			if (x <= ALN_LABEL_WIDTH){


			  let seqNum = Math.floor(y / NT_HEIGHT) - 1;
			  let a = accessions[seqNum];

			  var directory = DATA.directories[a];
			  directory = directory.replace("structures/", "dssp/");
			  
			  let sln = directory.split("/");
			  sln = sln[sln.length-1];
			  
			  // Already selected? Deselect it
				if (SELECTED_ACCESSION == sln){
					deselectTaxa(true);
					return;
				}
			  
			  // Select it
			  deselectTaxa();
			  SELECTED_ACCESSION = sln;
			  selectSites(false);
			  if (!PAIRWISE) directory = "data/" + directory;
			  renderTertiary(directory);

			}else{
			   deselectSites();
			  deselectTaxa(true);
			}




		}

		canvas.onmouseleave = function (e) {
			$("body").css("cursor", "auto");
			toolbar.find(".fader").animate({ opacity: 0 }, SELECT_FONT_FADEOUT_TIME)
		};

	}

}



/**
 * Convert the protein sequence into its gene and download the file XXXXX
 **/
function downloadProtein(outFileName, isSecondary){
console.log("Downloading fasta in to file " + outFileName);

//console.log(DATA);

//let geneAlignment = {};
let outFasta = "";
for (let i in DATA.accessions){

	let acc = DATA.accessions[i];
	let accTidy = acc.replaceAll(".pdb", "")
	let metadata = DATA.metadata[accTidy];
	if (isSecondary) accTidy = accTidy + ".secondary";

	let gappedProtein = DATA.alignment[acc];


	// Metadata
	
	if (metadata == null){
		console.log("Warning: cannot find metadata for", acc);
		continue;
	}


	let sequence = isSecondary ? DATA.secondary[acc] : DATA.alignment[acc];
	outFasta += ">" + accTidy + "\n" + sequence + "\n";
}

	// Write gene alignment to file
	const link = document.createElement("a");
	const file = new Blob([outFasta], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = outFileName;
	link.click();
	URL.revokeObjectURL(link.href);


	

}

/**
 * Convert the protein sequence into its gene and download the file XXXXX
 **/
function downloadGene(outFileName, MBPonly){
	console.log("Downloading gene in to file " + outFileName);

	//console.log(DATA);

	//let geneAlignment = {};
	let geneFasta = "";
	for (let i in DATA.accessions){

		let acc = DATA.accessions[i];
		let accTidy = acc.replaceAll(".pdb", "")
		let gappedProtein = DATA.alignment[acc];


		// Metadata
		let metadata = DATA.metadata[accTidy];
		if (metadata == null){
			console.log("Warning: cannot find metadata for", acc);
			continue;
		}

		// Gene sequence
		let gene = metadata.sequence;
		if (gene == null || gene == ""){
			console.log("Warning: cannot find gene for", acc);
			continue;
		}
		

		// Add gaps into the gene sequence so it matches the protein alignment
		let genePos = 0;
		let gappedGene = "";
		for (let pos = 0; pos < gappedProtein.length; pos++){

			if (genePos >= gene.length){
				console.log("Unexepected error: gene is shorter than protein");
				break;
			}

			let aa = gappedProtein[pos];
			let nt = null;
			if (aa == "-"){
				if (MBPonly){
					nt = "-";
				}else{
					nt = "---";
				}
			}else{
				if (MBPonly){
					nt = gene[genePos+1];
				}else{
					nt = gene[genePos] + gene[genePos+1] + gene[genePos+2];
				}
				
				genePos += 3;
			}



			gappedGene += nt;


		}

		//console.log(gappedProtein);
		//console.log(gappedGene);

		geneFasta += ">" + accTidy + "\n" + gappedGene + "\n";
		//geneAlignment[acc] = gappedGene;
		
	}


	// Write gene alignment to file
	const link = document.createElement("a");
	const file = new Blob([geneFasta], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = outFileName;
	link.click();
	URL.revokeObjectURL(link.href);

}



function loadAllFiles(resolve = function() { }){

  DATA = {};


	// Load accessions
	fetch("/data/accessions.json").then(response => response.text()).then(text => loadAcccessionMetadata(text, resolve));
	



}


function loadAcccessionMetadata(text, resolve = function() { }){
	
	
	
	text = text.replaceAll("\n", "").replaceAll("\r", "");
	let json = JSON.parse(text);
	console.log(json);
	DATA.metadata = json;
	
	// features[feature] = {range: range, level: level};
	
	
		
	// Read info json
	fetch("info.json").then(response => response.text()).then(text => renderInfo(text, resolve));

	
}



function loadAlignment(fasta, resolve = function() { }){

  //console.log("loading alignment", fasta)
  var lines = fasta.split("\n");
  var sequences = {};
  var acc = "seq";
  var dir = "";
  var accessions = [];
  var directories = {};
  var isAlpha = {};
  var urls = {};
  for (var i = 0; i < lines.length; i ++){

    var line = lines[i];

    if (line.trim() == "") continue;

    if (line[0] == ">"){
      dir = line.substring(1, line.length).trim();
      var acc_split = dir.split("/");
      //acc = acc.replace("structures/", "");
      acc = acc_split[acc_split.length -1];
    }else{
      sequences[acc] = line;
      directories[acc] = dir;
      accessions.push(acc);

      // PDB or genbank?
      var accSplit = acc.split(".");
      var url = "";
      if (accSplit.length >= 4 && accSplit[1].length == 1){

        // Genbank
         var accession = accSplit[3];
         //url = "https://www.ncbi.nlm.nih.gov/nuccore/" + accession;
         url = "data/structures/" + acc;
         isAlpha[acc] = true;

      }else{

        // PDB
        var pdb = acc.split("_")[2];
        url = "https://www.rcsb.org/structure/" + pdb;
        isAlpha[acc] = false;

      }
      urls[acc] = url;


    }

  }


  DATA.isAlpha = isAlpha;
  DATA.urls = urls;
  DATA.accessions = accessions;
  DATA.directories = directories;
  DATA.alignment = sequences;


  // Load secondary structure alignment
  fetch("data/secondary.fasta").then(response => response.text()).then(text => loadSecondaryStructureAlignment(text, resolve));


}



function loadSecondaryStructureAlignment(fasta, resolve = function() { }){

  var lines = fasta.split("\n");
  var sequences = {};
  var acc = "seq";
  var dir = "";
  for (var i = 0; i < lines.length; i ++){

    var line = lines[i];

    if (line.trim() == "") continue;

    if (line[0] == ">"){
      dir = line.substring(1, line.length).trim();
      var acc_split = dir.split("/");
      acc = acc_split[acc_split.length -1];
    }else{
      sequences[acc] = line;
    }

  }

  DATA.secondary = sequences;

   // Load 3di structure alignment
  //fetch("data/3di.fasta").then(response => response.text()).then(text => load3diAlignment(text, resolve));
  
  
    // All done
	DATA.threedi = null;
	resolve();



}



function load3diAlignment(fasta, resolve = function() { }){


	
	if (fasta == null || fasta == ""){
		DATA.threedi = null;
		resolve();
		return;
	}

  var lines = fasta.split("\n");
  var sequences = {};
  var acc = "seq";
  var dir = "";
  for (var i = 0; i < lines.length; i ++){

    var line = lines[i];

    if (line.trim() == "") continue;

    if (line[0] == ">"){
      dir = line.substring(1, line.length).trim();
      var acc_split = dir.split("/");
      acc = acc_split[acc_split.length -1];
    }else{
      sequences[acc] = line;
    }

  }

  DATA.threedi = sequences;


  // All done
  resolve();

}





// Recursively load a list of pdb structures in dssp
function loadStructure(structures, resolve = function() { } ){

  if (structures.length == 0){
    resolve();
    return;
  }

  var fileName = structures.pop();


  fetch(fileName).then(response => response.text()).then(text => {

    console.log("loading pdb", fileName);



    // Find the table
    var lines = text.split("\n");
    var firstLine = -1;
    for (var i = 0; i < lines.length; i ++){

      var line = lines[i];
      if (line.match("#  RESIDUE AA STRUCTURE")){
        //console.log("line 1 is", line);
        firstLine = i;
        break;
      }

    }

    if (firstLine != -1){


      //var acc = fileName.replace("data/dssp/", "").replace(".dssp", "");
      var acc_split = fileName.split("/");
      //acc = acc.replace("structures/", "");
      var acc = acc_split[acc_split.length -1];
      acc = acc.replace(".dssp", "");

      console.log(acc);

      // Put secondary stucture into alignment
      var sequence = "";
      var alignmentSequence = DATA.alignment[acc];
      var siteNum = 0;
      var nMissingRegions = 0; // Missing regions of pdb residues result in an addition line inserted, with symbol '!'
      for (var alnSiteNum = 0; alnSiteNum < alignmentSequence.length; alnSiteNum++){

        var alnChar = alignmentSequence[alnSiteNum];
        if (alnChar == "-"){

          sequence += "-";
        }else{


          var line = lines[firstLine + siteNum + nMissingRegions];
          var aa = line.substring(13, 14);
          while (aa == "!"){
            nMissingRegions ++;
            line = lines[firstLine + siteNum + nMissingRegions];
            aa = line.substring(13, 14);
          }
          var ss = line.substring(16, 17);
          if (ss == " ") ss = "N";
          sequence += ss;
          siteNum ++;

        }
      }


      DATA.secondary[acc] = sequence;

      //console.log(acc, "has 2nd structure", sequence);


    }else{
      console.log("warning cannot load dssp table for", fileName)
    }


    loadStructure(structures, resolve);

  });



}



// Draw a class I or II catalytic domain layout
function renderCatalyticDomainInserts(text, classNr){

	var json = null;
    //if (text == null || text == "") return;

	
	if (text != null && text != "" && text[0] != "<"){
		text = text.replaceAll("\n", "").replaceAll("\r", "");
		json = JSON.parse(text);
		console.log(json);
	}
   
	
	let className = classNr == 1 ? "I" : "II";

    // Prepare html and svg
    $("#tertiaryTable").after("<div id='catalyticDomainDIV'></div>");
    $("#catalyticDomainDIV").append("<h2>Catalytic domain</h1>")
    $("#catalyticDomainDIV").append("<ul class='flexContainer'></ul>");
    $("#catalyticDomainDIV .flexContainer").append(`<li>
                                                      <div>
														                            <div style='text-align:center'><b>Fig:</b> Map of the class ` + className + ` catalytic domain. Click on an element to select it. Figure is not to scale.</div>
                                                        <svg id='catalyticSVG' height=0 width=0 overflow='auto'></svg>
                                                      </div>
                                                    </li>`);
    


   

    // Populate the table
	if (json != null){
		
		
		 refSeqLink = classNr == 1 ? '<a href="/class1/trp">TrpRS</a>' :  '<a href="/class2/gly2">tetrameric GlyRS</a>';
		
		$("#catalyticDomainDIV .flexContainer").append(`<li>
													<div id='tableDiv' class='svgDiv'>
													  <div style='text-align:center'><b>Table:</b> The size (aa) of each element in the catalytic domain relative to the ` + refSeqLink + ` reference sequence.</div>
													  <div style='overflow:auto;'>
							  <table class='maptable' id='catalyticTable'></table>
							</div>
												  </div>
												</li>`);


		// Header
		let tr = $("<tr></tr>")
		$(tr).append("<th class='accession'>Sequence</th>");
		for (let eleNr = 0; eleNr < json.elements.length; eleNr++){
		  let ele = json.elements[eleNr];
		  let eleType = ele.substring(0, 1);
		  $(tr).append("<th ele='" + ele + "' type='" +eleType + "'>" + ele + "</th>");
		}
		$("#catalyticTable").append(tr);



		 // Body
		 for (var seqNum = 0; seqNum < json.accessions.length; seqNum++){
		  let acc = json.accessions[seqNum];
		  let accTidy = getNameOfAccession(acc);
		  let trAcc = $("<tr></tr>")


		  // Reference sequence row?
		  let isRef = false;
		  if (acc == json.refSeq){
			  continue;
		  }
		  $(trAcc).append("<td class='accession'>" + accTidy + "</td>");
		  for (let eleNr = 0; eleNr < json.elements.length; eleNr++){
			let ele = json.elements[eleNr];
			let eleType = ele.substring(0, 1);
			var dlen = json[[acc + "_" + ele + ".dlength"]];
			if (dlen > 0) dlen = "+" + dlen;
			if (dlen == 0) dlen = "";
			$(trAcc).append("<td ele='" + ele + "' type='" +eleType + "'>" + dlen + "</td>");
		  }
		  $("#catalyticTable").append(trAcc);
		  
		 }
		  
		  // Ref seq at bottom
		  for (var seqNum = 0; seqNum < json.accessions.length; seqNum++){
			  
			let acc = json.accessions[seqNum];
			if (acc == json.refSeq){
				
				let accTidy = getNameOfAccession(acc);
				let trAcc = $("<tr></tr>")
				$(trAcc).append("<td  class='accession'>" + accTidy + "</td>");
				trAcc.addClass("refSeq");
				trAcc.attr("title", "Reference structure");
				for (let eleNr = 0; eleNr < json.elements.length; eleNr++){
					let ele = json.elements[eleNr];
					let eleType = ele.substring(0, 1);
					var len = json[[acc + "_" + ele + ".length"]];
					$(trAcc).append("<td ele='" + ele + "' type='" + eleType + "'>" + len + "</td>");
				}
				$("#catalyticTable").append(trAcc);
			}
			


		}


		$("#tableDiv").hide(0);
		
		
	}


    // Populate the svg
    let svg = $("#catalyticSVG");
    svg.width(CATALYTIC_DOMAIN_WIDTH);
    svg.height(CATALYTIC_DOMAIN_HEIGHT);


		let motifColBase = "#ba2e00"; //LEVEL_1_COL.substr(0, 7);
		let highlightColBase = "#008cba"; 


    // Define colour gradients
    let defs = $(drawSVGobj(svg, "defs", {} ));
    let helixGradient = $(drawSVGobj(defs, "linearGradient", {id: "helixGradient"} ));
    $(drawSVGobj(helixGradient, "stop", {offset: "0%", stop_color: AA_COLS_2["H"] + "99"} ));
    $(drawSVGobj(helixGradient, "stop", {offset: "100%", stop_color: AA_COLS_2["H"] + "cc"} ));
    let helixBackgroundGradient = $(drawSVGobj(defs, "linearGradient", {id: "helixBackgroundGradient"} ));
    $(drawSVGobj(helixBackgroundGradient, "stop", {offset: "0%", stop_color: "#111111aa"} ));
    $(drawSVGobj(helixBackgroundGradient, "stop", {offset: "100%", stop_color: "#111111bb"} ));
    let strandGradient = $(drawSVGobj(defs, "linearGradient", {id: "strandGradient"} ));
    $(drawSVGobj(strandGradient, "stop", {offset: "0%", stop_color: AA_COLS_2["E"] + "77"} ));
    $(drawSVGobj(strandGradient, "stop", {offset: "100%", stop_color: AA_COLS_2["E"] + "cc"} ));
    let strandBackgroundGradient = $(drawSVGobj(defs, "linearGradient", {id: "strandBackgroundGradient"} ));
    $(drawSVGobj(strandBackgroundGradient, "stop", {offset: "0%", stop_color: "#111111aa"} ));
    $(drawSVGobj(strandBackgroundGradient, "stop", {offset: "100%", stop_color: "#111111ee"} ));
    let motifGradient = $(drawSVGobj(defs, "linearGradient", {id: "motifGradient"} ));
    $(drawSVGobj(motifGradient, "stop", {offset: "0%", stop_color: motifColBase + "99"} ));
    $(drawSVGobj(motifGradient, "stop", {offset: "100%", stop_color: motifColBase + "ee"} ));
    let highlightGradient = $(drawSVGobj(defs, "linearGradient", {id: "highlightGradient"} ));
    $(drawSVGobj(highlightGradient, "stop", {offset: "0%", stop_color: highlightColBase + "11"} ));
    $(drawSVGobj(highlightGradient, "stop", {offset: "100%", stop_color: highlightColBase + "44"} ));


    let helixCol = "url(#helixGradient)";
    let strandCol = "url(#strandGradient)";
    let motifCol = "url(#motifGradient)";
    let highlightCol = "url(#highlightGradient)";
    let helixBgCol  = "url(#helixBackgroundGradient)";
    let strandBgCol  = "url(#strandBackgroundGradient)";

    // Ele width and height
    let nElementsHorizontal = classNr == 1 ? 9 : 9;
    let nElementsVertical = 3;
    let eleWidth = (CATALYTIC_DOMAIN_WIDTH-CATALYTIC_DOMAIN_XPAD) / (nElementsHorizontal+1) - CATALYTIC_DOMAIN_XPAD;
    
	


	// Top and bottom layers
	let bottomLayer = $(drawSVGobj(svg, "g", {style:""} )); 
	let topLayer = $(drawSVGobj(svg, "g", {style:""} )); 
	


	if (classNr == 1){

		let eleHeight = (CATALYTIC_DOMAIN_HEIGHT-4*CATALYTIC_DOMAIN_YPAD);

  		// Crossover 1
		let crossover_ly = CATALYTIC_DOMAIN_YPAD*0.7;
		let c1_x1 = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*2.7;
		let c1_x2 = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*5.3;
		drawSVGobj(bottomLayer, "rect", {rx: 2, x: c1_x1, width: c1_x2-c1_x1, y: crossover_ly, height: eleHeight+CATALYTIC_DOMAIN_YPAD*2.7, style: "fill:" + highlightCol + "; stroke:black; stroke-width:1px;"});
		drawSVGobj(bottomLayer, "text", {x: (c1_x1+c1_x2)/2, y: crossover_ly+eleHeight+CATALYTIC_DOMAIN_YPAD*3.0, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:middle; "}, "Crossover 1");
	

		// Crossover 2
		let c2_x1 = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*6.7;
		let c2_x2 = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*9.3;
		drawSVGobj(bottomLayer, "rect", {rx: 2, x: c2_x1, width: c2_x2-c2_x1, y: crossover_ly, height: eleHeight+CATALYTIC_DOMAIN_YPAD*2.7, style: "fill:" + highlightCol + "; stroke:black; stroke-width:1px;"});
		drawSVGobj(bottomLayer, "text", {x: (c2_x1+c2_x2)/2, y: crossover_ly+eleHeight+CATALYTIC_DOMAIN_YPAD*3.0, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:middle; "}, "Crossover 2");
	



	  // 5 parallel strands and 4 helices
    let odd = true;
	  let oddLoop = false;
    for (let i = 0; i <= 9 ; i++){
		  
		  
			
			let x = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*i;
	    let y = CATALYTIC_DOMAIN_YPAD*2;
		
		
		 // Loop
		if (i <= 9){
			let nr = i;
			if (i == 4) nr = 1;
			if (i == 3) nr = 2;
			if (i == 2) nr = 3;
			if (i == 1) nr = 4;
			if (i == 0) nr = 5;
			let eleName = "L" + nr;
			
			let xMid = x;
			let yLoop = y;
			let endPoint, control1, control2 = [];
			let ylab = y;
			let xlab = x;
			let onTop = false;
			
			if (i == 5) oddLoop = !oddLoop;


			let loopCol = "black";
			
			// N term
			if (i == 5){
				eleName = "N";
				yLoop = y+eleHeight;
				endPoint = [xMid, yLoop+3*CATALYTIC_DOMAIN_YPAD/4];
				control1 = [xMid-CATALYTIC_DOMAIN_XPAD/3, yLoop+1*(CATALYTIC_DOMAIN_YPAD)/4];
				control2 = [xMid+CATALYTIC_DOMAIN_XPAD/3, yLoop+2*(CATALYTIC_DOMAIN_YPAD)/4];	
				xlab = xMid;
				ylab = yLoop+CATALYTIC_DOMAIN_YPAD + 5;
			}
			
			// C term
			else if (i == 9){
				eleName = "C";
				endPoint = [xMid, yLoop-3*CATALYTIC_DOMAIN_YPAD/4];
				control1 = [xMid-CATALYTIC_DOMAIN_XPAD/3, yLoop-1*(CATALYTIC_DOMAIN_YPAD)/4];
				control2 = [xMid+CATALYTIC_DOMAIN_XPAD/3, yLoop-2*(CATALYTIC_DOMAIN_YPAD)/4];	
				xlab = xMid;
				ylab = yLoop-CATALYTIC_DOMAIN_YPAD - 5;
				loopCol = motifColBase;
				onTop = true;
			}
			
			
			// Long loop between S3 and H3
			else if (i == 0){
				xMid = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*1;
				endPoint = [CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*6, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-2.5*CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-2.5*CATALYTIC_DOMAIN_YPAD];
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				ylab = yLoop-2*CATALYTIC_DOMAIN_YPAD+20;
				onTop = true;
				

			
			// Top loop
			}else if (oddLoop){
				endPoint = [xMid + CATALYTIC_DOMAIN_XPAD+eleWidth, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-CATALYTIC_DOMAIN_YPAD];
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				ylab = yLoop-CATALYTIC_DOMAIN_YPAD-3;
				onTop = true;
			}
			
			// Bottom loop
			else{
				yLoop = y+eleHeight;
				endPoint = [xMid + CATALYTIC_DOMAIN_XPAD+eleWidth, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+CATALYTIC_DOMAIN_YPAD];
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				ylab = yLoop+CATALYTIC_DOMAIN_YPAD+3;
			}
			
			
			
			// Start and stop positions in alignment
			let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
			let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
			if (eleStart == null) eleStart = -1;
			if (eleStop == null) eleStop = -1;
			
				
			let d = "M " + xMid + " " + yLoop  + " C " + control1[0] + " " + control1[1] + ", " + control2[0] + " " + control2[1] + ", " + endPoint[0] + " " + endPoint[1];
			let group;
			if (eleName == "N" || eleName == "C"){
				group = $(drawSVGobj(onTop ? topLayer : bottomLayer, "g", {element: eleName, style:""} )); // No click events
			}else{
				group = $(drawSVGobj(onTop ? topLayer : bottomLayer, "g", {element: eleName, start:eleStart, end: eleStop, style:"cursor:pointer"} ));
			}
			drawSVGobj(group, "path", {d: d, style: "stroke-width:" + CATALYTIC_DOMAIN_LOOP_WIDTH + "px; stroke:" + loopCol + "; fill:transparent; stroke-linecap:round"} );
			drawSVGobj(group, "text", {x: xlab, y: ylab, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);


			// L9 C-terminal: KMSKS
			if (i == 9){
				drawSVGobj(group, "text", {x: xlab - CATALYTIC_DOMAIN_MOTIF_FONT_SIZE*2, y: y - CATALYTIC_DOMAIN_FONT_SIZE/2, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px;  font-weight: bold; fill:" + motifColBase + "; text-anchor:middle; dominant-baseline:end; "}, "KMSKS");
			}


			if (i == 0) continue;
			oddLoop = !oddLoop;

		}
		
		
		
		
		// Helix
		if (i % 2 == 0){
			
			
			let nr = i;
			if (i == 4) nr = 1;
			if (i == 2) nr = 2;
			if (i == 6) nr = 3;
			if (i == 8) nr = 4;
			var eleName = "H" + nr;
			
			
			// Start and stop positions in alignment
			let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
			let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
			if (eleStart == null) eleStart = -1;
			if (eleStop == null) eleStop = -1;
			
			let group = $(drawSVGobj(bottomLayer, "g", {element: eleName, start:eleStart, end:eleStop, style:"cursor:pointer"} ));
			let helixY = y;
			let eleHeightHelix = eleHeight;


			let thisCol = helixCol;

			// Bottom circle
			drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:0px; fill:white"} );
			drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:1px; stroke:black; fill:" + thisCol} );
		

			// Rectangle
			drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix, style: "stroke-width:0px; fill:white"} );
			drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix, style: "stroke-width:0px; fill:" + helixCol} );
			




			// HIGH motif on H1
			if (eleName == "H1"){

				thisCol = motifCol;


				//drawSVGobj(group, "rect", {rx: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix/4, style: "stroke-width:0px; fill:" + motifCol + "; stroke:black"} );
				//drawSVGobj(group, "rect", {rx: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix/4, style: "stroke-width:1px; stroke:black; fill:transparent"} );
				

				// Bottom circle
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix/4, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:0px; fill:white"} );
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix/4, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:1px; stroke:black; fill:" + thisCol} );
		
				// Rectangle
				drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix/4, style: "stroke-width:0px; fill:white"} );
				drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix/4, style: "stroke-width:0px; fill:" + thisCol} );
				

				// Text
				drawSVGobj(group, "text", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2 - CATALYTIC_DOMAIN_FONT_SIZE/2, y: y - CATALYTIC_DOMAIN_FONT_SIZE/2, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:end; font-weight:bold; fill:" + motifColBase + "; "}, "HIGH");
	


			}


			// Rect border lines
			drawSVGobj(group, "line", {x1: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, x2: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y1: helixY, y2: helixY+eleHeightHelix, style: "stroke-width:1px; stroke: black;"} );
			drawSVGobj(group, "line", {x1: x+eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, x2: x+eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y1: helixY, y2: helixY+eleHeightHelix, style: "stroke-width:1px; stroke: black;"} );

						
			// Top circle
			drawSVGobj(group, "ellipse", {cx: x, cy: helixY, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:0px; fill:white"} );
			drawSVGobj(group, "ellipse", {cx: x, cy: helixY, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:1px; stroke:black; fill:" + helixBgCol } );
		


	
			

			// Text label
			drawSVGobj(group, "text", {x: x, y: helixY+eleHeightHelix/2, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);
	

			
		}
		
		
		
		// Strand
		else if (i % 2 == 1){
			
		
			x = x - CATALYTIC_DOMAIN_ARROW_BG_WIDTH/2;


			var y1, y2, y3, ybg1, ybg2, ybg3;
			if (odd){

			  // Up arrow
			  y1 = y+eleHeight;
			  y2 = y+CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_1;
			  y3 = y+CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_2;
			  y4 = y;

				ybg1 = y1 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg2 = y4 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg3 = y3 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;


			}else{

			  // Down arrow
			  y1 = y;
			  y2 = y+eleHeight-CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_1;
			  y3 = y+eleHeight-CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_2;
			  y4 = y+eleHeight;


			  ybg1 = yStrand - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg2 = y4 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg3 = y3 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;

			}

			var points =    (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
			points += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			points += " " + (x-eleWidth/2) + "," + (y3);
			points += " " + x + "," + y4;
			points += " " + (x+eleWidth/2) + "," + (y3);
			points += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			points += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);


		

			// Strand nr
			let nr = i;
			if (i == 5) nr = 1;
			if (i == 3) nr = 2;
			if (i == 1) nr = 3;
			if (i == 7) nr = 4;
			if (i == 9) nr = 5;
			var eleName = "S" + nr;
			
			
			// Start and stop positions in alignment
			let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
			let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
			if (eleStart == null) eleStart = -1;
			if (eleStop == null) eleStop = -1;



			let group = $(drawSVGobj(bottomLayer, "g", {element: eleName, start: eleStart, end: eleStop, style:"cursor:pointer"} ));




			// Background of arrow side
			let pointsBG =    (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (y2);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )


			// Background of arrow head
			pointsBG =    (x) + "," + (y4);
			pointsBG += " " + (x + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg2);
			pointsBG += " " + (x+eleWidth/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg3);
			pointsBG += " " + (x+eleWidth/2+(odd ? 1 : 0)) + "," + (y3+(odd ? 1 : 0) );
			drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )
			

			if (!odd){

				// Top of arrow (the rectangular base)
				pointsBG =    (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
				pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
				pointsBG += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
				pointsBG += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
				drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )

			}




			// The main arrow strand
			drawSVGobj(group, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:white"} )
			drawSVGobj(group, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:" + strandCol} )
			drawSVGobj(group, "text", {x: x, y: y+eleHeight/2, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);
			



		
		}



		
		odd = !odd;
		  
		  
	  }




    }else if (classNr == 2){


      // 6 antiparallel strands and 3 helices
      let odd = false;
	  	let oddLoop = false;
      for (let i = 0; i <= 9 ; i++){

		let eleHeight = (CATALYTIC_DOMAIN_HEIGHT-4*CATALYTIC_DOMAIN_YPAD);

        var x = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*i;
        var y = CATALYTIC_DOMAIN_YPAD*2;
		

		// Loop
		if (i <= 9){
			
			
			let nr = i;
			if (i == 5) nr = 8;
			if (i == 6) nr = 7;
			if (i == 7) nr = 6;
			if (i == 8) nr = 5;
			
			let eleName = "L" + nr;
			let xMid = x;
			let yLoop = y;
			

			let endPoint, control1, control2 = [];
			let ylab = y;
			let xlab = x;
			let onTop = false;

			let pathCol = "black";

			// N term
			if (i == 0){
				eleName = "N";
				yLoop = y+eleHeight;
				xMid = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*1
				endPoint = [xMid, yLoop+3*CATALYTIC_DOMAIN_YPAD/4];
				control1 = [xMid-CATALYTIC_DOMAIN_XPAD/3, yLoop+1*(CATALYTIC_DOMAIN_YPAD)/4];
				control2 = [xMid+CATALYTIC_DOMAIN_XPAD/3, yLoop+2*(CATALYTIC_DOMAIN_YPAD)/4];	
				xlab = xMid;
				ylab = yLoop+CATALYTIC_DOMAIN_YPAD + 5;
			}
			
			// C term
			else if (i == 9){
				eleName = "C";
				yLoop = y;
				xMid = CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*5
				endPoint = [xMid, yLoop-3*CATALYTIC_DOMAIN_YPAD/4];
				control1 = [xMid-CATALYTIC_DOMAIN_XPAD/3, yLoop-1*(CATALYTIC_DOMAIN_YPAD)/4];
				control2 = [xMid+CATALYTIC_DOMAIN_XPAD/3, yLoop-2*(CATALYTIC_DOMAIN_YPAD)/4];	
				xlab = xMid;
				ylab = yLoop-CATALYTIC_DOMAIN_YPAD - 5;
				onTop = true;
				
			}
			
			// Long loop from S2 to H3
			else if (i == 4){
				yLoop = y+eleHeight;
				endPoint = [CATALYTIC_DOMAIN_XPAD + (CATALYTIC_DOMAIN_XPAD+eleWidth)*9, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+2.5*CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+2.5*CATALYTIC_DOMAIN_YPAD];	
				ylab = yLoop+2*CATALYTIC_DOMAIN_YPAD-20;
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				oddLoop = !oddLoop;
				
			}
			
			
			// Standard odd loop (top)
			else if (oddLoop){
				endPoint = [xMid + CATALYTIC_DOMAIN_XPAD+eleWidth, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop-CATALYTIC_DOMAIN_YPAD];
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				ylab = yLoop-CATALYTIC_DOMAIN_YPAD-3;
				onTop = true;
			}
			
			// Standard even loop (bottom)
			else{
				yLoop = y+eleHeight;
				endPoint = [xMid + CATALYTIC_DOMAIN_XPAD+eleWidth, yLoop];
				control1 = [xMid-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+CATALYTIC_DOMAIN_YPAD];
				control2 = [endPoint[0]-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX, yLoop+CATALYTIC_DOMAIN_YPAD];
				xlab = (xMid+endPoint[0])/2-CATALYTIC_DOMAIN_CUBIC_RIGHT_DX;
				ylab = yLoop+CATALYTIC_DOMAIN_YPAD+3;
			}
			

			// Start and stop positions in alignment
			let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
			let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
			if (eleStart == null) eleStart = -1;
			if (eleStop == null) eleStop = -1;
			
			let d = "M " + xMid + " " + yLoop  + " C " + control1[0] + " " + control1[1] + ", " + control2[0] + " " + control2[1] + ", " + endPoint[0] + " " + endPoint[1];
			let group;
			if (eleName == "N" || eleName == "C"){
				group = $(drawSVGobj(onTop ? topLayer : bottomLayer, "g", {element: eleName, style:""} )); // No click events
			}else {
				group = $(drawSVGobj(onTop ? topLayer : bottomLayer, "g", {element: eleName, start:eleStart, end:eleStop, style:"cursor:pointer"} ));
			}


			// L1 is motif 1
			if (eleName == "L1"){
				pathCol = motifColBase;
				drawSVGobj(group, "text", {x: xlab, y: yLoop, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; font-weight:bold; fill:" + motifColBase + "; "}, "M1");
			}


			drawSVGobj(group, "path", {d: d, style: "stroke-width:" + CATALYTIC_DOMAIN_LOOP_WIDTH + "px; stroke:" + pathCol + "; fill:transparent; stroke-linecap:round"} );
			drawSVGobj(group, "text", {x: xlab, y: ylab, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);
			


			
		
			
		}
	

		let group;



		// Strand
		if (i > 2 && i < 9){

			x = x - CATALYTIC_DOMAIN_ARROW_BG_WIDTH/2;
			let yStrand = y;
			
			// The final short strand
			if (i == 5){
				eleHeight = eleHeight/2;
				yStrand = CATALYTIC_DOMAIN_YPAD*2 + eleHeight;
			}

			var y1, y2, y3, ybg1, ybg2, ybg3;
			if (odd){

			  // Up arrow
			  y1 = yStrand+eleHeight;
			  ybg1 = y1 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  y2 = yStrand+CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_1;
			  y3 = yStrand+CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_2;
			  y4 = yStrand;
			  ybg2 = y4 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg3 = y3 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;


			}else{

			  // Down arrow
			  y1 = yStrand+CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg1 = yStrand - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  y2 = yStrand+eleHeight-CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_1;
			  y3 = yStrand+eleHeight-CATALYTIC_DOMAIN_STRAND_ARROW_HEAD_LEN_2;
			  y4 = yStrand+eleHeight;
			  ybg2 = y4 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;
			  ybg3 = y3 - CATALYTIC_DOMAIN_ARROW_BG_WIDTH;

			}

			let points =    (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
			points += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			points += " " + (x-eleWidth/2) + "," + (y3);
			points += " " + x + "," + y4;
			points += " " + (x+eleWidth/2) + "," + (y3);
			points += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			points += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);


		

			// Strand nr
			let nr = i-2;
			if (i == 6) nr = 5;
			if (i == 7) nr = 4;
			if (i == 8) nr = 3;
			var eleName = "S" + nr;

			let thisCol = strandCol;

	     // Special case: SH1 
      if (i == 5){
      	thisCol = motifCol;
      	eleName = "";
      }


  
			let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
			let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
			if (eleStart == null) eleStart = -1;
			if (eleStop == null) eleStop = -1;
		  
      group = $(drawSVGobj(bottomLayer, "g", {element: eleName, start:eleStart, end: eleStop, style:"cursor:pointer"} ));


 
      
		


			// Background of arrow side
			let pointsBG =    (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (y2);
			pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
			drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )


			// Background of arrow head
			pointsBG =    (x) + "," + (y4);
			pointsBG += " " + (x + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg2);
			pointsBG += " " + (x+eleWidth/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg3);
			pointsBG += " " + (x+eleWidth/2+(odd ? 1 : 0)) + "," + (y3+(odd ? 1 : 0) );
			drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )
			

			if (!odd){

				// Top of arrow (the rectangular base)
				pointsBG =    (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
				pointsBG += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
				pointsBG += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2 + CATALYTIC_DOMAIN_ARROW_BG_WIDTH) + "," + (ybg1);
				pointsBG += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y1);
				drawSVGobj(group, "polygon", {points: pointsBG, style: "stroke-width:1px; stroke:black; fill:" + strandBgCol} )

			}

			// Arrow
			drawSVGobj(group, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:white"} )
			drawSVGobj(group, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:" + thisCol} )



			// S1 is motif 2
			if (eleName == "S1"){


				let S2_y1 = yStrand+3*eleHeight/4;

				let pointsS2 =    (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (S2_y1);
				pointsS2 += " " + (x-eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
				pointsS2 += " " + (x-eleWidth/2) + "," + (y3);
				pointsS2 += " " + x + "," + y4;
				pointsS2 += " " + (x+eleWidth/2) + "," + (y3);
				pointsS2 += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (y2);
				pointsS2 += " " + (x+eleWidth*CATALYTIC_DOMAIN_STRAND_ARROW_BASE_WIDTH_PROP/2) + "," + (S2_y1);


				drawSVGobj(group, "polygon", {points: pointsS2, style: "stroke-width:0px; fill:white"} )
				drawSVGobj(group, "polygon", {points: pointsS2, style: "stroke-width:0px; fill:" + motifCol} )
				drawSVGobj(group, "polygon", {points: points, style: "stroke-width:1px; stroke:black; fill:transparent"} )
				drawSVGobj(group, "text", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/3 - CATALYTIC_DOMAIN_MOTIF_FONT_SIZE, y: yStrand+eleHeight/2, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; font-weight:bold; fill:" + motifColBase + "; "}, "M2");
	

			}



			drawSVGobj(group, "text", {x: x, y: yStrand+eleHeight/2, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);
			


		
		}

		
		
		
		// Helix
		if (i > 0 && i < 10 && (i <= 2 || i == 5 || i == 9)){
			
				let helixY = y;
				let eleHeightHelix = eleHeight;
				let thisCol = helixCol;
				let bgCol = helixBgCol;

				
				let nr = i;
				if (i == 5) nr = 4;
				if (i == 9) nr = 3;
				var eleName = "H" + nr;

				// Special case: SH1
				if (i == 5){
					eleName = "SH1";
					thisCol = motifCol;
					//bgCol = motifCol;
					group = group;


					// Motif 3 label
					drawSVGobj(group, "text", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/3 - CATALYTIC_DOMAIN_MOTIF_FONT_SIZE, y: helixY+eleHeightHelix, style: "font-size:" + CATALYTIC_DOMAIN_MOTIF_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; font-weight:bold; fill:" + motifColBase + "; "}, "M3");
		


				}else{

					let eleStart = json == null ? -1 : json["median_" + eleName + ".start"];
					let eleStop = json == null ? -1 : json["median_" + eleName + ".end"];
					if (eleStart == null) eleStart = -1;
					if (eleStop == null) eleStop = -1;
					

					group = $(drawSVGobj(bottomLayer, "g", {element: eleName, start: eleStart, end: eleStop, style:"cursor:pointer"} ));
					


				}
				
				

				
				
				
				
				// The final helix
				if (i == 5){
					//eleHeightHelix = eleHeightHelix;
				}




				// Cylinder

				// Bottom circle
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:0px; fill:white"} );
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY+eleHeightHelix, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:1px; stroke:black; fill:" + thisCol} );
			

				// Rectangle
				drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix, style: "stroke-width:0px; fill:white"} );
				drawSVGobj(group, "rect", {x: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y: helixY, width: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP, height: eleHeightHelix, style: "stroke-width:0px; fill:" + thisCol} );
				

				// Rect border lines
				drawSVGobj(group, "line", {x1: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, x2: x-eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y1: helixY, y2: helixY+eleHeightHelix, style: "stroke-width:1px; stroke: black;"} );
				drawSVGobj(group, "line", {x1: x+eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, x2: x+eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, y1: helixY, y2: helixY+eleHeightHelix, style: "stroke-width:1px; stroke: black;"} );
				


				// Top circle
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:0px; fill:white"} );
				drawSVGobj(group, "ellipse", {cx: x, cy: helixY, rx: eleWidth*CATALYTIC_DOMAIN_HELIX_WIDTH_PROP/2, ry: CATALYTIC_DOMAIN_HELIX_CORNER_RADIUS, style: "stroke-width:1px; stroke:black; fill:" + bgCol } );
			
				// Text label
				drawSVGobj(group, "text", {x: x, y: helixY+eleHeightHelix/2, style: "font-size:" + CATALYTIC_DOMAIN_FONT_SIZE + "px; text-anchor:middle; dominant-baseline:central; "}, eleName);
	


			
		}
		
		
		oddLoop = !oddLoop;
		odd = !odd;
		

      }

    }
	
	// Select an element
	svg.children("g").children("g").click(function(){
		
		let ele = $(this);
		var sse = $(ele).attr("element");
		if (sse == "N" || sse == "C") return;
		console.log( sse);
		
		
		// Clear site selection
		if ($(ele).attr("class") == "selected"){
			deselectSites(true);
			return;
		}


		deselectSites(false);
		
		$(svg).children("g").children("g").attr("class", "deselected");
		$('table.maptable td').addClass("deselected");
		$('table.maptable th').addClass("deselected");
		$('table.maptable td[ele="' + sse + '"]').addClass("selected");
		$('table.maptable th[ele="' + sse + '"]').addClass("selected");
		
		$(ele).attr("class", "selected");
		
		
		let start = parseFloat($(ele).attr("start"));
		let end = parseFloat($(ele).attr("end"));
		
		// Residues to select
		SELECTED_SITES.lower = start;
    SELECTED_SITES.upper = end;
		
		selectSites();
		


		
	});
	
	


  }



  function drawSVGobj(svg, type, attr, val = null){

    //console.log("attr", attr);
    var newObj = document.createElementNS('http://www.w3.org/2000/svg', type);


    for (var a in attr){
      if (a == "text_anchor") newObj.setAttribute("text-anchor", attr[a]);
      else if (a == "stop_color") newObj.setAttribute("stop-color", attr[a]);
      else if (a == "alignment_baseline") newObj.setAttribute("alignment-baseline", attr[a]);
      else if (a == "stroke_dasharray") newObj.setAttribute("stroke-dasharray", attr[a]);
      else newObj.setAttribute(a, attr[a]);
    }
    if (val != null) newObj.innerHTML = val;
    newObj.setAttribute("animatable", "true");


    // Set some of the styles as attributes because safari and IE do not like styles for svgs
    var styles = getComputedStyle(newObj);
    //if (styles.fill != null) newObj.setAttribute("fill", styles.fill);
    if (styles.stroke != null) newObj.setAttribute("stroke", styles.stroke);
    if (styles["stroke-width"] != null) newObj.setAttribute("stroke-width", styles["stroke-width"]);
    //console.log(styles["stroke-width"]);

    //window.requestAnimationFrame(function() {
    svg.append(newObj);
    $(newObj).hide().fadeIn(FADE_TIME); 
    
    
    
    
    return newObj;

  } 



function keyPressHandler(e) {
      var evtobj = window.event ? window.event : e;

      // Shift + d
      if (evtobj.shiftKey && evtobj.keyCode == 68) {
      		console.log("dev mode");
          $(".devHidden").show(300);
      }
}

window.addEventListener('keydown', keyPressHandler);

