


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
	let width = 600;
	let height = 650;
	let NODE_SIZE = 8;
	let FONT_SIZE = 12;
	let LABEL_FONT_SIZE = 16;
	let FORCE_DISTANCE = 22;
	let LABEL_FORCE_DISTANCE = 30;
	let REPULSION_DISTANCE = 1.0;
	let BOUNDARY_MARGIN = 0;

	//let NT_COLS = {A: "#8da0cb77", C: "#fc8d6277", G: "#66c2a577", U: "#e78ac377"};
	let NT_COLS = {A: "#fefefe", C: "#fefefe", G: "#fefefe", U: "#fefefe"};
	let FONT_COL = "black";
	let STRONG_COL = "#008cba";
	let WEAK_COL = "#8cba00";

	let STRONG_FONT_COL = "white";
	let WEAK_FONT_COL = "white";

	let BACKBONE_LWD = 2;
	let BP_LWD = 1;
	let BG_LWD_CG = 5;
	
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
		.attr("class", "node")
		.call(
			d3
			  .drag()
			  .on("start", dragStart)
			  .on("drag", drag)
			  .on("end", dragEnd)
		);
	

	// Node bg circle
	nodeSelection.append("circle")
		.attr("r", NODE_SIZE)
		.attr("x", d => d.x )
		.attr("y", d => d.y )
		.attr("fill", "white");


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
				return "#00000000";
			}
			
		})
		.attr("stroke", function(d) {
			if (d.type == "base"){
				return "black";
			}else{
				return "#00000000";
			}
			
		})


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


/*
	
	let data = FileAttachment("trna.json").json();
	let chart = {
			
	  // Specify the dimensions of the chart.
	  const width = 928;
	  const height = 600;

	  // Specify the color scale.
	  const color = d3.scaleOrdinal(d3.schemeCategory10);

	  // The force simulation mutates links and nodes, so create a copy
	  // so that re-evaluating this cell produces the same result.
	  const links = data.links.map(d => ({...d}));
	  const nodes = data.nodes.map(d => ({...d}));

	  // Create a simulation with several forces.
	  const simulation = d3.forceSimulation(nodes)
		  .force("link", d3.forceLink(links).id(d => d.id))
		  .force("charge", d3.forceManyBody())
		  .force("center", d3.forceCenter(width / 2, height / 2))
		  .on("tick", ticked);

	  // Create the SVG container.
	  const svg = d3.create("svg")
		  .attr("width", width)
		  .attr("height", height)
		  .attr("viewBox", [0, 0, width, height])
		  .attr("style", "max-width: 100%; height: auto;");

	  // Add a line for each link, and a circle for each node.
	  const link = svg.append("g")
		  .attr("stroke", "#999")
		  .attr("stroke-opacity", 0.6)
		.selectAll()
		.data(links)
		.join("line")
		  .attr("stroke-width", d => Math.sqrt(d.value));

	  const node = svg.append("g")
		  .attr("stroke", "#fff")
		  .attr("stroke-width", 1.5)
		.selectAll()
		.data(nodes)
		.join("circle")
		  .attr("r", 5)
		  .attr("fill", d => color(d.group));

	  node.append("title")
		  .text(d => d.id);

	  // Add a drag behavior.
	  node.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	  // Set the position attributes of links and nodes each time the simulation ticks.
	  function ticked() {
		link
			.attr("x1", d => d.source.x)
			.attr("y1", d => d.source.y)
			.attr("x2", d => d.target.x)
			.attr("y2", d => d.target.y);

		node
			.attr("cx", d => d.x)
			.attr("cy", d => d.y);
	  }

	  // Reheat the simulation when drag starts, and fix the subject position.
	  function dragstarted(event) {
		if (!event.active) simulation.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	  }

	  // Update the subject (dragged node) position during drag.
	  function dragged(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	  }

	  // Restore the target alpha so the simulation cools after dragging ends.
	  // Unfix the subject position now that it’s no longer being dragged.
	  function dragended(event) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	  }

	  // When this cell is re-run, stop the previous simulation. (This doesn’t
	  // really matter since the target alpha is zero and the simulation will
	  // stop naturally, but it’s a good practice.)
	  invalidation.then(() => simulation.stop());

	  return svg.node();
	}
	
	
}
*/


