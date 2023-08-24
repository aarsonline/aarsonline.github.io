NT_COLS = 			{A: "#56B4E9", C: "#E69F00", G: "#009E73", T: "#D55E00", U: "#D55E00"};
NT_FONT_COLS = 	{A: "#000000", C: "#000000", G: "#000000", T: "#000000", U: "#000000"};





MBP = {A: "C", S: "C", P: "C", T: "C",
			F: "T", L: "T", I: "T", M: "T", V: "T",
			Y: "A", H: "A", Q: "A", N: "A", K: "A", D: "A", E: "A",
			C: "G", W: "G", R: "G", G: "G"};


SHOW_MBP = false;








MBP_CUTOFF = 0.5;
MIN_SEQ_THRESH = 10;

// Render bidirectional gene information
function renderRO(){





  // Initialise HTML
  if ($("#main").children().length == 0){
  	$("#main").append(`
		  	<ul id="flexContainer">
					<li class="summary">
					</li>

					<li class="notes">
						
						
						<div id="introduction">


						</div>
						
					</li>
					
				</ul>
				

				<div class="svgDiv">
					<svg id="secondary" height=0 width=0 overflow="auto"></svg>
				</div>

				
				
				<div id="alignment" class="svgDiv">

				</div>


				<div id="alignment2" class="svgDiv">

				</div>

				
				
				<div id="references">
				</div>
		`);
  }
  
  
  if (IS_MOBILE){
	  let row = $(`<tr><td><div id="tertiary"> </div></td></tr>`)
	  $("#superpositionRow").after(row);
  }else{
	   let cell = $(`<td><div id="tertiary"> </div></td>`)
	   $("#superpositionRow").append(cell)
  }

   

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
	$("#introduction").prepend("<h1>Introduction</h1>");
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
	
	
	refs = getSorted(refs);
	$("#references").html("");
	
	
	$("#references").append(refs);
	
	
	$("#references").prepend("<h1>References</h1>");
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

  

  // Section titles
  $(".summary").prepend("<h1>Summary</h1>");
  $("#references").prepend("<h1>References</h1>");
  
  
   // More section titles
  $("#alignment").before("<h2>Amino acid sequence</h2>");
  $("#alignment2").before("<h2>Nucleotide sequence</h2>");




  // Synchronise scroll bars
  $("#alignment").scroll(function () { 
    $("#alignment2").scrollTop($("#alignment").scrollTop());
    $("#alignment2").scrollLeft($("#alignment").scrollLeft());
  });
  $("#alignment2").scroll(function () { 
    $("#alignment").scrollTop($("#alignment2").scrollTop());
    $("#alignment").scrollLeft($("#alignment2").scrollLeft());
  });




  loadROFiles(function(){

  	$(".notes").show(100);
  	console.log(DATA);


  	renderAlignmentRO("alignment", true, "data/align.ali");
  	renderAlignmentRO("alignment2", false, "data/align.ali");


	  // Delete loader
	  $("#mainloader").remove();
	  $("#main").css("opacity", "100%");
	

  });

	
}



// Return the domain (of life) for a sequence
function getClassOfAccession(acc){
	
	acc = acc.replace(".pdb", "");
	let metadata = DATA.metadata[acc];
	if (metadata == null){

		// tmp hack
		console.log("cannot find", acc);
		if (acc.substring(0, 1) == "2") return 2;
		return 1;
		
	}

	return parseFloat(metadata.class);
	
	
}





/*
* Draw a canvas of primary/secondary as an alignment 
*/
function renderAlignmentRO(divID, isPrimary = true, downloadHref = ""){

		// Number of sequences
  var alignment = isPrimary ? DATA.alignment : DATA.secondary;
  var accessions = DATA.accessions;
  var nseq = accessions.length;
  var nsites = alignment[accessions[0]].length;

  var features = DATA.features;


		// Toolbar after alignment
		if ($(`[for="` + divID + `"].alignmentToolBar`).length == 0){
		  $("#" + divID).after($("<div class='alignmentToolBar' for='" + divID + "'></div>"));
		}
		let toolbar = $(`[for="` + divID + `"].alignmentToolBar`);

	if (!IS_MOBILE) {
		
		let aars = accessions[0].split("_");
		let downloadFileName = aars[0] + (isPrimary ? ".primary" : ".secondary") + ".fasta";


		toolbar.html("");
		toolbar.append($(`<span><a href="` + downloadHref + `" download="` + downloadFileName + `">Download fasta</a> </span>`));
		toolbar.append($(`<span> Site: <span class="fader siteSel"></span> </span>`));
		toolbar.append($(`<span> Ungapped: <span class="fader ungappedSel"></span> </span>`));
		toolbar.append($(`<span> Accession: <span class="fader taxonSel"></span> </span>`));


		if (!isPrimary){
			toolbar.append($(`<span> Total Score: <span id="scoreSpan"></span> </span>`));
			//toolbar.append($(`<span> Total Score (GU): <span id="scoreSpanGU"></span> </span>`));
			toolbar.append($(`<span> MBP Score: <span id="mbpScoreSpan"></span> </span>`));
			//toolbar.append($(`<span> MBP Score (GU): <span id="mbpScoreSpanGU"></span> </span>`));
		}else{

			toolbar.append($(`<span> Total Score: <span id="scoreSpanAA"></span> </span>`));

		}
	}
	


	
	
	let unitWidth = isPrimary ? NT_WIDTH*3 : NT_WIDTH;
	
	
	// Canvas size
	var w = unitWidth*(nsites+2) + ALN_LABEL_WIDTH;
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
  
  	  ctx.font = NT_FONT_SIZE + "px Source sans pro";
  	  ctx.textAlign = "end";
      ctx.fillStyle = "#366BA1";
  	  ctx.fillText(accPrint, x, y);


    }
	
	 // Site numbering
    for (var site = 0; site < nsites; site++){

    	let siteToPrint = site;
    	if (isPrimary){
    		siteToPrint = siteToPrint * 3;
    	}


      if ((siteToPrint+1) % 10 == 1){
        var y = NT_HEIGHT*0.5;
        var x = unitWidth*(site+0.25) + ALN_LABEL_WIDTH;
      	
      	//ctx.font = NT_FONT_SIZE + "px Courier New";
      	ctx.textAlign = "start";
        ctx.fillStyle = "black";
      	ctx.fillText(siteToPrint+1, x, y);


        // Stroke
        ctx.beginPath();
        ctx.moveTo(x-unitWidth/4, y+NT_HEIGHT/2);
        ctx.lineTo(x-unitWidth/4, y-NT_HEIGHT/2);
        ctx.stroke();

      }
    }
	



    let conservedSites = [];

    let totalScore = 0;
    let mbpScore = 0;
    let totalScoreGU = 0;
    let mbpScoreGU = 0;
    let nscoredSites = 0;
    let nScoresMBPSites = 0;


    // MBP conservation
    for (let site = 0; site < nsites; site++){

    	

    	let y = NT_HEIGHT*(nseq+1.5)
    	let x = unitWidth*(site+0.5) + ALN_LABEL_WIDTH;

    	// How many characters at this site?
    	let charsAtSite_class1 = {A: 0, C: 0, G: 0, T: 0};
    	let charsAtSite_class2 = {A: 0, C: 0, G: 0, T: 0};
    	let nonGaps = 0;
    	let nClass1NonGaps = 0;
    	let nClass2NonGaps = 0;
    	for (let seqNum = 0; seqNum < nseq; seqNum++){
    		let acc = accessions[seqNum];
      	let seq = alignment[acc];
      	let isClass2 = getClassOfAccession(acc) == 2;
      	let aa = seq[site];

	      if (isClass2){
        	aa = seq[nsites-site-1]; // Reverse sequence for Class II
        }


      

      	if (aa == "-"){
					continue;
				}


        if (isPrimary){
        	aa = MBP[aa];
        }


				if (isClass2){
					charsAtSite_class2[aa] = charsAtSite_class2[aa] + 1;
					nClass2NonGaps++;
				}else{
					charsAtSite_class1[aa] = charsAtSite_class1[aa] + 1;
				  nClass1NonGaps++;
				}

				
				nonGaps ++;


    	}



			// Normalise
			for (let aa in charsAtSite_class1){
				charsAtSite_class1[aa] = charsAtSite_class1[aa] / nClass1NonGaps
			}
			for (let aa in charsAtSite_class2){
				charsAtSite_class2[aa] = charsAtSite_class2[aa] / nClass2NonGaps
			}



			console.log(site, charsAtSite_class1, charsAtSite_class2);
    
    	

    	let consensus = null;
    	let consensusGU = null;
    	if (nClass1NonGaps > MIN_SEQ_THRESH && nClass2NonGaps > MIN_SEQ_THRESH){
	    	for (aa in charsAtSite_class1){
	    		let freq1 = charsAtSite_class1[aa];

	    		let aa2 = (aa == "A") ? "T" : (aa == "T") ? "A" : (aa == "C") ? "G" : (aa == "G") ? "C" : "-"; // Complement
	    		let freq2 = charsAtSite_class2[aa2];

	    		if (freq1 >= MBP_CUTOFF && freq2 >= MBP_CUTOFF){
	    			consensus = aa;
	    		}


	    		// Include GU basepairing
	    		let freq3 = 0;
	    		if (aa == "G"){
	    			if (freq1 >= MBP_CUTOFF && (freq2+charsAtSite_class2["T"]) >= MBP_CUTOFF){
	    				consensusGU = aa;
	    			}

	    		}else if (aa == "C"){
	    			if ( (freq1+charsAtSite_class1["T"]) >= MBP_CUTOFF && (freq2) >= MBP_CUTOFF){
	    				consensusGU = aa;
	    			}
	    		}



	    	}
	    }


	    conservedSites[site] = (consensus == null) ? null : NT_COLS[consensus];


	    console.log("site" , site, consensus, charsAtSite_class1, charsAtSite_class2);

    	

    	// Rectangles only on middle basepairs
    	if (site % 3 == 1 || isPrimary) {

    		
	    	ctx.beginPath();

	    	// Print a symbol to denote if there is a consensus
	    	
	    	if (consensus == null && consensusGU == null){
	    		ctx.fillStyle = "#d3d3d3";
	    	}else if (consensus == null && consensusGU != null){
	    		ctx.fillStyle = "#696969";
	    	}else {
	    		ctx.fillStyle = "#222222";
	    	}


	    
				
				ctx.fillRect(x-unitWidth/2, y-NT_HEIGHT/2, unitWidth+0.5, NT_HEIGHT+0.5);
				ctx.stroke();



			}


			if (consensus != null){


	    	// Text
	    	ctx.textAlign = "center";
	    	ctx.fillStyle = (site % 3 == 1 || isPrimary) ? "white" : "black";
	    	let toPrint = consensus;
	    	toPrint = "✓"
	    	ctx.fillText(toPrint, x, y);


    	}



    	// Scoring
    	if (nClass1NonGaps != 0 && nClass2NonGaps != 0) {

    		nscoredSites ++;
    		if (site % 3 == 1) {
						nScoresMBPSites++;
				}


    		if (consensus != null) {
    			if (site % 3 == 1) {
						mbpScore++;
					}else{
						totalScore ++;
					}
    		}

    		if (consensus != null || consensusGU != null) {
    			totalScoreGU ++;
    			if (site % 3 == 1) {
						mbpScoreGU++;
					}
    		}

    	}


    }



    if (isPrimary){

     mbpScore = roundToSF(100 * totalScore / (nscoredSites), 3);
	   // bugged $("#scoreSpanAA").html(mbpScore + "%");


    }else{

	   totalScore = roundToSF(100 * totalScore / (nscoredSites), 3);
	   mbpScore = roundToSF(100 * mbpScore / (nScoresMBPSites), 3);
	   $("#scoreSpan").html(totalScore + "%");
	   $("#mbpScoreSpan").html(mbpScore + "%");


	   totalScoreGU = roundToSF(100 * totalScoreGU / (nscoredSites), 3);
	   mbpScoreGU = roundToSF(100 * mbpScoreGU / (nScoresMBPSites), 3);
	   $("#scoreSpanGU").html(totalScoreGU + "%");
	   $("#mbpScoreSpanGU").html(mbpScoreGU + "%");


    }



	
	 // Draw the alignment
    for (var seqNum = 0; seqNum < nseq; seqNum++){

      var acc = accessions[seqNum];
      var seq = alignment[acc];
      var y = NT_HEIGHT*(seqNum+1.5)

      let isClass2 = getClassOfAccession(acc) == 2;

      //console.log(acc, seq);
      for (var site = 0; site < nsites; site++){
        var x = unitWidth*(site+0.5) + ALN_LABEL_WIDTH;


        let aa = seq[site];
        if (isClass2){
        	aa = seq[nsites-site-1]; // Reverse sequence for Class II

        	if (!isPrimary){
        		//aa = (aa == "A") ? "T" : (aa == "T") ? "A" : (aa == "C") ? "G" : "C";
        	}

        }



        if (isPrimary && SHOW_MBP && aa != "-"){
        	aa = MBP[aa];
        }
        


        //if (aa == "-" && !isPrimary) continue;
        //if (aa == "-") continue;


      // Rect
      let col = "";
      let textCol = "#000000";
      if (aa == "-"){
        	col = "#ffffff";
      }else if (isPrimary && SHOW_MBP && aa != "-"){
        	col = NT_COLS[aa];
       }else if (isPrimary){
        	col = AA_COLS[aa];
      }else{

      	if (conservedSites[site] != null){
      		textCol = "white"; //NT_FONT_COLS[aa];
        	col = conservedSites[site];
      	}else{
      		textCol = NT_FONT_COLS[aa];
        	col = NT_COLS[aa] + "33";
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
        if (acc != SELECTED_ACCESSION && col.length != 9){
          col = col + "33";
          textCol = textCol + "aa";
        }
      }
      
	  
		
		  
		ctx.beginPath();
		ctx.fillStyle = col;
		ctx.fillRect(x-unitWidth/2, y-NT_HEIGHT/2, unitWidth+0.5, NT_HEIGHT+0.5);
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
		 let x2 = ALN_LABEL_WIDTH + unitWidth*nsites;
		 let y1 = NT_HEIGHT;
		 let h = NT_HEIGHT*(nseq);
		 
		 
		 // Width of rect
		 if (SELECTED_SITES.lower != -1){
			 x1 = unitWidth*(SELECTED_SITES.lower-1) + ALN_LABEL_WIDTH;
		     x2 = unitWidth*(SELECTED_SITES.upper) + ALN_LABEL_WIDTH;
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

      var range = features[feature].range;
      var level = features[feature].level;
      if (range == "") continue;
      range = range.split("-")
      let lowerRange = getAlignmentPosFromUngapped(features[feature].acc, range[0]);
      var y = NT_HEIGHT*(nseq+1) + FEATURE_HEIGHT_ALN*(level-0.5);
      var x1 = unitWidth*(lowerRange) + ALN_LABEL_WIDTH;
      var x2 = x1 + unitWidth;
      if (range.length == 2){
      	let upperRange = getAlignmentPosFromUngapped(features[feature].acc, range[1]);
        x2 = unitWidth*(upperRange + 1) + ALN_LABEL_WIDTH;
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
		  ctx.fillRect(x1-unitWidth, y-FEATURE_HEIGHT_ALN/2, x2-x1, FEATURE_HEIGHT_ALN);
		  ctx.stroke();
		  ctx.strokeRect(x1-unitWidth, y-FEATURE_HEIGHT_ALN/2, x2-x1, FEATURE_HEIGHT_ALN);

      }



  		// Text
  		ctx.fillStyle = textCol;
  		ctx.font = FEATURE_FONT_SIZE + "px Source sans pro";
  		ctx.fillText(txt, x1-unitWidth + (x2-x1)/2, y);


    }



if (!IS_MOBILE) {
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

			let siteNum = Math.floor((x - ALN_LABEL_WIDTH) / unitWidth) + 1;
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



		canvas.onmouseleave = function (e) {
			$("body").css("cursor", "auto");
			toolbar.find(".fader").animate({ opacity: 0 }, SELECT_FONT_FADEOUT_TIME)
		};

	}

}




function loadROFiles(resolve = function() { }){

  DATA = {};


	// Load accessions
	fetch("/data/accessions.json").then(response => response.text()).then(text => loadAcccessionMetadataRO(text, resolve));
	



}



function loadAcccessionMetadataRO(text, resolve = function() { }){
	
	
	
	text = text.replaceAll("\n", "").replaceAll("\r", "");
	let json = JSON.parse(text);
	console.log(json);
	DATA.metadata = json;
	
	// features[feature] = {range: range, level: level};
	
	
		
	// Read info json
	fetch("info.json").then(response => response.text()).then(text => renderInfoRO(text, resolve));

	
}



/*
* Render meta info stored in json file onto page
*/
function renderInfoRO(text, resolve=function() { }){
	
	text = text.replaceAll("\n", "").replaceAll("\r", "");
	var json = JSON.parse(text);


	// Page title
	$("title").html(json.fullName);

	// Page icon
	$("link[rel='icon']").attr("href", json.icon);
	
	// Page main header
	 $("#main").prepend("<h1>" + json.fullName + "</h1>");
	 
	 
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
			let treeDiv = $(`<div id="treeDiv"><h2>Phylogeny</h2></div>`);
			$("#tertiaryTable").after(treeDiv);

			drawTree(json.leafFamily == null ? json.name : json.leafFamily, treeDiv, json.tree, DATA.metadata, json.treeDescription, json.fullTree, json.addToClade);
		});
	}



  // Summary table for families
	$(".summary table").append(`<tr>
								<th>Family</th>
								<td>` + json.name + `</td>
							</tr>`);





  DATA.features = json.features;


  
  //// Load accessions
  //fetch("/data/accessions.json").then(response => response.text()).then(text => loadAcccessionMetadata(text, resolve));
  
	// Load alignment
	fetch("data/align.ali").then(response => response.text()).then(text => loadAlignmentRO(text, resolve));



}


function reverseString(str) {

    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}


function loadAlignmentRO(fasta, resolve = function() { }){



  //console.log("loading alignment", fasta)
  var lines = fasta.split("\n");
  var sequences = {};
  let sequencesNt = {};
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


    	let isClass2 = getClassOfAccession(acc) == 2;
      if (isClass2){
      	line = reverseString(line); // Reverse sequence for Class II
      }

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



  // Gene from protein sequences 
  for (let i = 0; i < accessions.length; i ++){
  	let acc = accessions[i];

  	if (DATA.metadata[acc] != null){

	  	let fullPtn = DATA.metadata[acc].proteinSeq;
	  	let fullGene = DATA.metadata[acc].sequence;

	  	// Substring of gene that corresponds to protein
	  	let ptnAln = sequences[acc];
	  	let pos = fullPtn.search(ptnAln.replaceAll("-", ""));
	  	let posGapped = 0;


	  	console.log(acc, posGapped, "has seq", ptnAln.substr(posGapped));




	  	let gappedGene = "";
	  	if (pos == -1){
	  		console.log("Error: cannot find protein aln for", acc)
	  	}else{


				// Get the gapped gene alignment
				let ntPos = pos;
				for (let j = posGapped; j < ptnAln.length; j++){

					let aa = ptnAln.substr(j, 1);

					//console.log(j, aa, pos, ntPos);

					if (aa == "-"){
						gappedGene += "---";
					}else{
						gappedGene += fullGene.substring(ntPos*3, ntPos*3 + 3)
						ntPos ++;
					}
					

				}


	  		//geneSubSeq = fullGene.substring(posGapped*3, posGapped*3 + ptnAln.length*3)
	  	}


	  	sequencesNt[acc] = gappedGene;
	  }else{
	  	console.log("Cannot find", acc);
	  }


  }


  DATA.isAlpha = isAlpha;
  DATA.urls = urls;
  DATA.accessions = accessions;
  DATA.directories = directories;
  DATA.alignment = sequences;
  DATA.secondary = sequencesNt;






   // All done
  resolve();


}
