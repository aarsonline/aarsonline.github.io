


/*
* Render a d3 plot of a tRNA structure, using node information stored in a json file
*/
function renderTRNA(jsonFile, svgID){
	
	console.log("drawing trna from", jsonFile);
	$("#" + svgID).html("");
	fetch(jsonFile).then(response => response.text()).then(text => renderTRNAFromJSON(text, svgID));

	
}


function renderTRNAFromJSON(jsonText, svgID){
	
	
	
	jsonText = jsonText.replaceAll("\n", "").replaceAll("\r", "");
	let json = JSON.parse(jsonText);
	
	//console.log("Received json", json);
	
	let nodes = json.nodes;
	let links = json.edges;
	let width = 700;
	let height = 700;
	let NODE_SIZE = 12;
	let FONT_SIZE = 16;
	let LABEL_FONT_SIZE = 16;
	let FORCE_DISTANCE = 30;
	let LABEL_FORCE_DISTANCE = 30;
	let REPULSION_DISTANCE = 2;
	let BOUNDARY_MARGIN = 0;

	//let NT_COLS = {A: "#8da0cb77", C: "#fc8d6277", G: "#66c2a577", U: "#e78ac377"};
	//let NT_COLS = {A: "#fefefe", C: "#fefefe", G: "#fefefe", U: "#fefefe"};
	let NT_COLS = {A: "#ffffffff", C: "#ffffffff", G: "#ffffffff", U: "#ffffffff"};
	let FONT_COL = "black";
	let STRONG_COL = "#F86F03";
	let WEAK_COL = "#008cba";

	let STRONG_FONT_COL = "white";
	let WEAK_FONT_COL = "white";

	let BACKBONE_LWD = 2;
	let BP_LWD = 1;
	let BG_LWD_CG = 5;


	if (IS_MOBILE){
		let multipler = 1.4;
		width *= multipler;
		height *= 1.7;
		NODE_SIZE *= multipler;
		FONT_SIZE *= 1.4;
		LABEL_FONT_SIZE *= 1.4;
		FORCE_DISTANCE *= 1.2;
		LABEL_FORCE_DISTANCE *= multipler;
		REPULSION_DISTANCE = 12;
		BOUNDARY_MARGIN *= multipler;

	}

	
	//console.log(nodes);
	

		
	let svg = d3
	  .select("#" + svgID)
	  .attr("width", width)
	  .attr("height", height);

	let linkSelection = svg
	  .selectAll("line")
	  .data(links)
	  .enter()
	  .append("line")
	  .attr("stroke", "black")
	  .attr("stroke-width", function(d) {
			if (d.type == "backbone"){
				return BACKBONE_LWD;
			}else if (d.type == "bp" && d.CG){
				return BG_LWD_CG;
			}else if (d.type == "bp" && d.UX){
				return BP_LWD;
			}else{
				return 0;
			}
	  });
	  
	  
	let nodeSelection = svg.selectAll(".node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "node");
		// .call(
		// 	d3
		// 	  .drag()
		// 	  .on("start", dragStart)
		// 	  .on("drag", drag)
		// 	  .on("end", dragEnd)
		// );
	

	// // Node bg circle
	// nodeSelection.append("circle")
	// 	.attr("r", NODE_SIZE)
	// 	.attr("x", d => d.x )
	// 	.attr("y", d => d.y );
	// 	.attr("stroke-width", function(d)  return 0);
	// 	//.attr("fill", "white");


	// Node circle
	nodeSelection.append("circle")
		.attr("r", NODE_SIZE)
		.attr("x", d => d.x )
		.attr("y", d => d.y )
		.attr("fill", function(d) {
			if (d.type == "base"){
				if (d.is_strong){
					return STRONG_COL;
				}else if (d.is_weak){
					return WEAK_COL;
				}else{
					return NT_COLS[d.label];
				}	
				
			}else{
				return "#ffffffff";
			}
			
		})
		.attr("stroke", function(d) {
			if (d.type == "base"){
				return "#ffffffff";
			}else{
				return "#00000000";
			}
			
		}).attr("stroke-width", function(d) {
			return 0;
			
		});


	// Text inside node
	nodeSelection.append("text")
		.attr("dy", ".35em")
		.attr("text-anchor", function(d) {
			if (d.align == null){
				return "middle";
			}else{
				return "top";
			}
		})
		.attr("font-size", function(d) {
			if (d.type == "base"){
				return FONT_SIZE;
			}else{
				return LABEL_FONT_SIZE;
			}
		})
		.attr("fill", function(d) {
			if (d.type == "base"){
				if (d.is_strong){
					return STRONG_FONT_COL;
				}else if (d.is_weak){
					return WEAK_FONT_COL;
				}else{
					return FONT_COL;
				}	
			}else{
				return "black";
			}
		})
		.text(function(d) { return d.label });


	// Title of node
	nodeSelection.append("title")
		.text(function(d) { return d.title });

	let simulation = d3.forceSimulation(nodes);

	//.force("nodes", d3.forceManyBody())  .alphaDecay(0.5)
	simulation
	  .force("center", d3.forceCenter(width / 2, height / 2))
	  .force("charge", d3.forceManyBody().strength(-REPULSION_DISTANCE))
	  .force(
		"links",
		d3
		  .forceLink(links)
		  .id(d => d.id)
		  .distance(function(d) {
		  	if (d.type == "label"){
				return LABEL_FORCE_DISTANCE;
			}else{
				return FORCE_DISTANCE;
			}
		  })
	  )
	  .on("tick", ticked);

	function ticked() {
	  // console.log(simulation.alpha());

	  //nodeSelection.attr("cx", d => d.x).attr("cy", d => d.y);
	  nodeSelection.attr("transform", function(d) { 
	  
		let x = Math.max(NODE_SIZE+BOUNDARY_MARGIN, Math.min(width - NODE_SIZE - BOUNDARY_MARGIN, d.x));
		let y = Math.max(NODE_SIZE+BOUNDARY_MARGIN, Math.min(height - NODE_SIZE - BOUNDARY_MARGIN, d.y));
		return "translate(" + x + "," + y + ")"; }
	);



	  linkSelection
		.attr("x1", d => d.source.x)
		.attr("y1", d => d.source.y)
		.attr("x2", d => d.target.x)
		.attr("y2", d => d.target.y);
	}

	function dragStart(d) {
	  // console.log('drag start');
	  simulation.alphaTarget(0.5).restart();
	  d.fx = d.x;
	  d.fy = d.y;
	}

	function drag(d) {
	  // console.log('dragging');
	  // simulation.alpha(0.5).restart()
	  d.fx = d3.event.x;
	  d.fy = d3.event.y;
	}

	function dragEnd(d) {
	  // console.log('drag end');
	  simulation.alphaTarget(0);
	  d.fx = null;
	  d.fy = null;
	}

	
}


