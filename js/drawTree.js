

TREE_SVG_WIDTH = 700;
TREE_SVG_X_PADDING = 400;
TREE_SVG_LINE_HEIGHT = 20;
FAMILY_TREE_SVG_LINE_HEIGHT = 30;
TREE_SVG_FONT_SIZE = 15;

if (IS_MOBILE){
	let multipler = 1.8;
	TREE_SVG_WIDTH *= multipler;
	TREE_SVG_X_PADDING *= multipler;
	TREE_SVG_LINE_HEIGHT *= multipler;
	TREE_SVG_FONT_SIZE *= multipler;
	FAMILY_TREE_SVG_LINE_HEIGHT *= multipler;
	
}


// Adds a header to the top of the page and a footer to the bottom
function drawTree(family, treeDiv, treeFile, metadata, desc, fullTree, addToClade){


	fullTree = (fullTree == null ? false : fullTree);
	if (addToClade == null) addToClade = [];

	console.log("drawing tree");
	prepareTreeParser(function(){
		
		console.log("loading from " + treeFile);
		
		// Read in tree file as string
		fetch(treeFile)
		  .then((res) => res.text())
		  .then((text) => {
			
				let trees = getTreesFromString(text);
				let tree = trees[0];
				console.log(tree);
				
				
				// Make SVG
				
				if (desc == null) desc = "";
				//treeDiv.append(`<li>` + desc + ` <span><a href="` + treeFile + `" >Download tree</a></span></li>`);
				let svg = $(`
					<li>
						<h2>Phylogeny</h2>
						<svg id="treeSVG" height=0 width=0 overflow="auto"></svg>
						<div>` + desc + ` <a href="` + treeFile + `" >Download tree</a></div>
					</li>`);
				treeDiv.append(svg);
				
				let success = plotTree(family, tree, $("#treeSVG"), metadata, fullTree, addToClade);
				if (!success) treeDiv.hide();
			
			
		   })
		  .catch((e) => console.error(e));
				
		});

}



// Draw a tree
function plotTree(family, tree, svg, metadata, fullTree, addToClade, isFamilyTree=false, classNr=null){
	
	
	// Only consider taxa with the right family
	let familyLeaves = [];
	let leaves = tree.getLeafList();
	if (fullTree){
		familyLeaves = leaves;
	}else{
		for (let i = 0; i < leaves.length; i++){
			let node = leaves[i];
			let nodeFamily = node.label.split("_")[0];
			if (nodeFamily == family || addToClade.includes(nodeFamily)){
				familyLeaves.push(node);
			}
		}
		
		
	}

	let lineHeight = isFamilyTree ? FAMILY_TREE_SVG_LINE_HEIGHT : TREE_SVG_LINE_HEIGHT;
	
	if (familyLeaves.length == 0){
		console.log("Did not find any leaves");
		return false;
	}
		
	// Get MRCA
	let mrca = getMRCA(tree, familyLeaves);
	let clade = new Tree(mrca);
	console.log(clade);
	
	// Number the leaves
	for (let i = 0; i < clade.getLeafList().length; i++){
		clade.getLeafList()[i].y = (i+1)*lineHeight;
	}
	

	

	// Prepare svg size
	let ntaxa = clade.getLeafList().length;
	let svgHeight = (ntaxa+2)*lineHeight;
	console.log("ntaxa=", ntaxa);
	svg.hide();
    svg.html("");
    svg.height(svgHeight);
    svg.width(TREE_SVG_WIDTH);
	
	
	let lengthScale = (TREE_SVG_WIDTH - TREE_SVG_X_PADDING - lineHeight) /  clade.root.height;
	drawBranch(svg, clade.root, lineHeight, lengthScale, isFamilyTree);
	
	


	// Subclasses
	if (isFamilyTree) annotateSubclasses(tree, classNr, svg);


	svg.show();
	
	return true;
	
}





// Recursively draw a tree
function drawBranch(svg, node, x, lengthScale, isFamilyTree){
	
	
	
	
	
	if (node.isLeaf()){
		

		let y = node.y;
		let leafG = drawSVGobj(svg, "g", {taxon: node.label, yVal: y});
		
		
		// Domain figure
		let domainOfLife = isFamilyTree ? getImageOfFamily(node.label) : getLifeDomainOfAccession(node.label);
		if (domainOfLife != null){
			let iconHeight = isFamilyTree ? TREE_SVG_FONT_SIZE*1.6 : TREE_SVG_FONT_SIZE*1.3;
			drawSVGobj(leafG, "image", {href:"/fig/" + domainOfLife + ".png", x: x, y: y-TREE_SVG_FONT_SIZE/2, height:iconHeight});

			x += 1.52*TREE_SVG_FONT_SIZE;
		}



		// Xray / alphafold
		let isExperimental = isFamilyTree ? false : accessionIsExperimental(node.label);
		if (isExperimental != null && isExperimental){

			//let rect = textSVG.getBoundingClientRect(); 
			x -= 0.2*TREE_SVG_FONT_SIZE;
			drawSVGobj(leafG, "image", {href:"/fig/" + (isExperimental ? "xray" : "alphafold") + ".png", x: x, y: y-TREE_SVG_FONT_SIZE/2, height:TREE_SVG_FONT_SIZE*0.85});
			x += 1.1*TREE_SVG_FONT_SIZE;
		}

		
		// Text
		let label = isFamilyTree ? node.label : getNameOfAccession(node.label);
		//if (label == "error") label = node.label;
		let textSVG = drawSVGobj(leafG, "text", {x: x, y: y, style: "text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value=label)






		return y;
	}
	
	
	// Children
	let child1X = x + lengthScale*(node.children[0].branchLength);
	let child2X = x + lengthScale*(node.children[1].branchLength);
	let child1Y = drawBranch(svg, node.children[0], child1X, lengthScale, isFamilyTree);
	let child2Y = drawBranch(svg, node.children[1], child2X, lengthScale, isFamilyTree);



	// Branch to children
	drawSVGobj(svg, "line", {x1: x, y1: child1Y, x2: child1X, y2: child1Y, style: "stroke-linecap:round; stroke-width:2px; stroke: black"});
	drawSVGobj(svg, "line", {x1: x, y1: child2Y, x2: child2X, y2: child2Y, style: "stroke-linecap:round; stroke-width:2px; stroke: black"});
	
	
	// Shoulder
	drawSVGobj(svg, "line", {x1: x, y1: child1Y, x2: x, y2: child2Y, style: "stroke-linecap:round; stroke-width:2px; stroke: black"});
	
	
	let y = (child1Y + child2Y) / 2;
	


	// Posterior support
	let p = node.annotation.posterior;
	if (p != null){
		p = parseFloat(p);
		p = roundToSF(p, 1);
		drawSVGobj(svg, "circle", {cx: x, cy: y, r: TREE_SVG_FONT_SIZE/6, style: "fill: black"});
		drawSVGobj(svg, "text", {x: x + TREE_SVG_FONT_SIZE/4, y: y, style: "text-anchor:start; dominant-baseline:middle; font-size:" + (TREE_SVG_FONT_SIZE*0.7) + "px; fill:black"}, p);
	}

	
	
	return y;
	
}



function getMRCA(tree, leaves){
	
	let candidateMRCA = leaves[0].getAncestors();
	for (let i = 1; i < leaves.length; i++){
		let leaf = leaves[i];
		let ancestors = leaf.getAncestors();
		
		// Remove any candidates that are not an ancestor of this node
		let newCandidates = [];
		for (let j = 0; j < candidateMRCA.length; j++){
			
			if (ancestors.includes(candidateMRCA[j])){
				newCandidates.push(candidateMRCA[j]);
			}
		}
		candidateMRCA = newCandidates;
		
	}
	
	
	// MRCA is the youngest of the candidates
	let mrca = candidateMRCA[0];
	return mrca;
	

	
}


// Load the IcyTree parser
function prepareTreeParser(resolve = function() { }){
	
	let scriptEle = document.createElement("script");
	scriptEle.setAttribute("src", "/js/icytree/tree.js");
	document.body.appendChild(scriptEle);
	scriptEle.addEventListener("load", () => {
		
		scriptEle = document.createElement("script");
		scriptEle.setAttribute("src", "/js/icytree/treeparsing.js");
		document.body.appendChild(scriptEle);
		
		
		scriptEle.addEventListener("load", () => {
			resolve();
		});
		
	});
}



/**
 * Return the picture of this family
 **/
function getImageOfFamily(familyName){

	let shortName = familyName.substring(0, 5);
	if (shortName == "SerRS" || shortName == "ThrRS" || shortName == "AsnRS" || shortName == "GlnRS"){
		return "icon_polar";
	}

	if (shortName == "ProRS"){
		return "icon_pro";
	}

	if (shortName == "GlyRS"){
		return "icon_gly";
	}

	if (shortName == "LysRS" || shortName == "ArgRS" || shortName == "PylRS"){
		return "icon_basic";
	}


	if (shortName == "AspRS" || shortName == "AsxRS" || shortName == "GluRS" || shortName == "GlxRS"){
		return "icon_acidic";
	}

	if (shortName == "CysRS" || shortName == "SepRS"){
		return "icon_cys";
	}


	if (shortName == "TyrRS" || shortName == "HisRS"){
		return "icon_aromatic";
	}

	if (shortName == "IleRS" || shortName == "MetRS" || shortName == "LeuRS" || shortName == "ValRS" || shortName == "AlaRS" || shortName == "PheRS" || shortName == "TrpRS"){
		return "icon_hydrophobic";
	}

	return "icon_white";

}



// Add svg to page and annotate with hyperlinks
function drawFamilyTree(classNr,  treeEle){


	let treeSVGFile = "/data/class" + classNr + "_family.nexus";
	console.log("loading", treeSVGFile);


	prepareTreeParser(function(){
		
		console.log("loading from " + treeSVGFile);
		
		// Read in tree file as string
		fetch(treeSVGFile)
		  .then((res) => res.text())
		  .then((text) => {
			
				let trees = getTreesFromString(text);
				let tree = trees[0];
				console.log(tree);
				
				
				// Make SVG
				let svg = $(`<svg id="treeSVG" height=0 width=0 overflow="auto"></svg>`);
				treeEle.append("<h2>Catalytic domain phylogeny</h2>");
				treeEle.append(svg);
				treeEle.append("<div>Clade posterior support indicated on internal nodes. Branch lengths are proportional to substitutions per site.</div>");
				

				let success = plotTree(null, tree, svg, {}, true, [], true, classNr);
				if (!success) {
					treeEle.hide();
					return;
				}




			
			
		   })
		  .catch((e) => console.error(e));
				
		});




}



function addCurlyBrace(svg, x, y, w, h){


	let worig = 5;
	let horig = 16;
	let scaleX = w / worig;
	let scaleY = h / horig; 


	let transform = "translate(" + x + " " + (y-h/2) + ") scale(" + scaleX + " " + scaleY + ")";
	let brace = drawSVGobj(svg, "path", {fill:"#444", transform: transform, d:"M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z"});





}

// Put subclasses on tree
function annotateSubclasses(tree, classNr, svg){

	
	let SUBCLASS_LINE_X1 = TREE_SVG_WIDTH - TREE_SVG_X_PADDING + 6.5*TREE_SVG_FONT_SIZE;
	let SUBCLASS_LINE_X2 = TREE_SVG_WIDTH - TREE_SVG_X_PADDING + 8.2*TREE_SVG_FONT_SIZE;
	let yVal, topY, btmY = 0;

	if (classNr == 1){



		// 1a
		let metRS = $(svg).find(`[taxon="MetRS"]`);
		let cysRS = $(svg).find(`[taxon="CysRS"]`);
		topY = parseFloat(cysRS[0].getAttribute("yVal")); 
		btmY = parseFloat(metRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass Ia")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		

		//addCurlyBrace(svg, brace_x, yVal, BRACE_WIDTH, Math.abs(btmY-topY))


		// 1b
		let glnRS = $(svg).find(`[taxon="GlnRS"]`);
		let glxRS = $(svg).find(`[taxon="GlxRS-B"]`);
		topY = parseFloat(glnRS[0].getAttribute("yVal")); 
		btmY = parseFloat(glxRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass Ib")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		

		// 1c
		let trpRS = $(svg).find(`[taxon="TrpRS"]`);
		let tyrRS = $(svg).find(`[taxon="TyrRS"]`);
		topY = parseFloat(trpRS[0].getAttribute("yVal")); 
		btmY = parseFloat(tyrRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass Ic")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		


		// 1d: LysRS
		let argRS = $(svg).find(`[taxon="LysRS-I"]`);
		yVal = argRS[0].getAttribute("yVal"); 
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass Id")
		


		// 1e: ArgRS
		let lysRS = $(svg).find(`[taxon="ArgRS"]`);
		yVal = lysRS[0].getAttribute("yVal"); 
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass Ie")
		//addCurlyBrace(svg, brace_x, yVal, BRACE_WIDTH, TREE_SVG_FONT_SIZE)


	

		console.log(yVal);



	}else{




		// 2a
		let glyRS = $(svg).find(`[taxon="GlyRS-A"]`);
		let serRS = $(svg).find(`[taxon="SerRS-A"]`);
		topY = parseFloat(glyRS[0].getAttribute("yVal")); 
		btmY = parseFloat(serRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass IIa")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		

		// 2b
		let asnRS = $(svg).find(`[taxon="AsnRS"]`);
		let lysRS = $(svg).find(`[taxon="LysRS-II"]`);
		topY = parseFloat(asnRS[0].getAttribute("yVal")); 
		btmY = parseFloat(lysRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass IIb")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		


		// 2c
		let hisRS = $(svg).find(`[taxon="HisRS"]`);
		let pheRS = $(svg).find(`[taxon="PheRS-M"]`);
		topY = parseFloat(hisRS[0].getAttribute("yVal")); 
		btmY = parseFloat(pheRS[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass IIc")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		


		// 2d
		let alaRS = $(svg).find(`[taxon="AlaRS"]`);
		let glyRSB = $(svg).find(`[taxon="GlyRS-Bα"]`);
		topY = parseFloat(alaRS[0].getAttribute("yVal")); 
		btmY = parseFloat(glyRSB[0].getAttribute("yVal")); 
		yVal = (topY + btmY) / 2;
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass IId")
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: topY, y2: yVal-TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		drawSVGobj(svg, "line", {x1: SUBCLASS_LINE_X1, x2: SUBCLASS_LINE_X2, y1: btmY, y2: yVal+TREE_SVG_FONT_SIZE/2, style:"stroke-linecap: round; stroke-width: 2px; stroke: #696969; display: inline;" })
		

		// 2e: PylRS
		let pylRS = $(svg).find(`[taxon="PylRS"]`);
		yVal = pylRS[0].getAttribute("yVal"); 
		drawSVGobj(svg, "text", {x: SUBCLASS_LINE_X2, y: yVal, style: "font-style:italic; text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value="Subclass IIe")
		//addCurlyBrace(svg, brace_x, yVal, BRACE_WIDTH, TREE_SVG_FONT_SIZE)






	}



}