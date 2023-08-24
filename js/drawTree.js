

TREE_SVG_WIDTH = 650;
TREE_SVG_X_PADDING = 400;
TREE_SVG_LINE_HEIGHT = 20;
TREE_SVG_FONT_SIZE = 15;

if (IS_MOBILE){
	let multipler = 1.8;
	TREE_SVG_WIDTH *= multipler;
	TREE_SVG_X_PADDING *= multipler;
	TREE_SVG_LINE_HEIGHT *= multipler;
	TREE_SVG_FONT_SIZE *= multipler;
	
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
				let svg = $(`<svg id="treeSVG" height=0 width=0 overflow="auto"></svg>`);
				treeDiv.append(svg);
				if (desc == null) desc = "";
				treeDiv.append(`<div>` + desc + ` <span><a href="` + treeFile + `" >Download tree</a></span></div>`);
				
				let success = plotTree(family, tree, svg, metadata, fullTree, addToClade);
				if (!success) treeDiv.hide();
			
			
		   })
		  .catch((e) => console.error(e));
				
		});

}



// Draw a tree
function plotTree(family, tree, svg, metadata, fullTree, addToClade){
	
	
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
		clade.getLeafList()[i].y = (i+1)*TREE_SVG_LINE_HEIGHT;
	}
	

	

	// Prepare svg size
	let ntaxa = clade.getLeafList().length;
	let svgHeight = (ntaxa+2)*TREE_SVG_LINE_HEIGHT;
	console.log("ntaxa=", ntaxa);
	svg.hide();
    svg.html("");
    svg.height(svgHeight);
    svg.width(TREE_SVG_WIDTH);
	
	
	let lengthScale = (TREE_SVG_WIDTH - TREE_SVG_X_PADDING - TREE_SVG_LINE_HEIGHT) /  clade.root.height;
	drawBranch(svg, clade.root, TREE_SVG_LINE_HEIGHT, lengthScale);
	
	
	svg.show();
	
	return true;
	
}





// Recursively draw a tree
function drawBranch(svg, node, x, lengthScale){
	
	
	
	
	
	if (node.isLeaf()){
		
		let leafG = drawSVGobj(svg, "g");
		let y = node.y;
		
		// Domain figure
		let domainOfLife = getLifeDomainOfAccession(node.label);
		if (domainOfLife != null){
			drawSVGobj(leafG, "image", {href:"/fig/" + domainOfLife + ".png", x: x, y: y-TREE_SVG_FONT_SIZE/2, height:TREE_SVG_FONT_SIZE*1.3});
			x += 1.52*TREE_SVG_FONT_SIZE;
		}



		// Xray / alphafold
		let isExperimental = accessionIsExperimental(node.label);
		if (isExperimental != null && isExperimental){

			//let rect = textSVG.getBoundingClientRect(); 
			x -= 0.2*TREE_SVG_FONT_SIZE;
			drawSVGobj(leafG, "image", {href:"/fig/" + (isExperimental ? "xray" : "alphafold") + ".png", x: x, y: y-TREE_SVG_FONT_SIZE/2, height:TREE_SVG_FONT_SIZE*0.85});
			x += 1.1*TREE_SVG_FONT_SIZE;
		}

		
		// Text
		let label = getNameOfAccession(node.label);
		//if (label == "error") label = node.label;
		let textSVG = drawSVGobj(leafG, "text", {x: x, y: y, style: "text-anchor:start; dominant-baseline:middle; font-size:" + TREE_SVG_FONT_SIZE + "px; fill:black"}, value=label)






		return y;
	}
	
	
	// Children
	let child1X = x + lengthScale*(node.children[0].branchLength);
	let child2X = x + lengthScale*(node.children[1].branchLength);
	let child1Y = drawBranch(svg, node.children[0], child1X, lengthScale);
	let child2Y = drawBranch(svg, node.children[1], child2X, lengthScale);



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