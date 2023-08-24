


MATRIX_PADDING = 10;
MATRIX_FONT_SIZE = 11;
FAMILY_MATRIX_SIZE = 45;

// RMSD colour brewer

RMSD_COLS = [ {min: 0.00, max:0.05, col:"#081d58", fontCol: "white"},
              {min: 0.05, max:0.10, col:"#253494", fontCol: "white"},
              {min: 0.10, max:0.15, col:"#225ea8", fontCol: "white"},
              {min: 0.15, max:0.20, col:"#1d91c0", fontCol: "white"},
              {min: 0.20, max:0.25, col:"#41b6c4", fontCol: "black"},
              {min: 0.25, max:0.30, col:"#7fcdbb", fontCol: "black"},
              {min: 0.30, max:0.35, col:"#c7e9b4", fontCol: "black"},
              {min: 0.35, max:0.40, col:"#edf8b1", fontCol: "black"},
              {min: 0.40, max:Infinity, col:"#ffffd9", fontCol: "black"}];





/*
RMSD_COLS = [ {min: 0.0, max:1.0, col:"#08306b", fontCol: "white"},
              {min: 1.0, max:1.5, col:"#08519c", fontCol: "white"},
              {min: 1.5, max:2.0, col:"#2171b5", fontCol: "white"},
              {min: 2.0, max:2.5, col:"#4292c6", fontCol: "white"},
              {min: 2.5, max:3.0, col:"#6baed6", fontCol: "black"},
              {min: 3.0, max:3.5, col:"#9ecae1", fontCol: "black"},
              {min: 3.5, max:4.0, col:"#c6dbef", fontCol: "black"},
              {min: 4.0, max:5.0, col:"#deebf7", fontCol: "black"},
              {min: 5.0, max:Infinity, col:"#f7fbff", fontCol: "black"}];

*/


// Makes a pairwise distance matrix with hyperlinks to the comparison pages
renderPairwiseMatrix = function(){



  // Read info json
  fetch("info.json").then(response => response.text()).then(text => plotMatrix(text));





}



// Draw the matrix from json text
plotMatrix = function(text){

  text = text.replaceAll("\n", "").replaceAll("\r", "");
  var json = JSON.parse(text);
  console.log(json);





  // Make an svg
  var nfamilies = json.families.length;
  var svg = $("#pairwiseSVG");
  svg.width(nfamilies*FAMILY_MATRIX_SIZE + 2*MATRIX_PADDING);
  svg.height(nfamilies*FAMILY_MATRIX_SIZE + 2*MATRIX_PADDING);



  // Border
  drawSVGobj(svg, "rect", {x:MATRIX_PADDING, y:MATRIX_PADDING, width:nfamilies*FAMILY_MATRIX_SIZE, height:nfamilies*FAMILY_MATRIX_SIZE, style: "fill:#00000000; stroke-width:2px; stroke:black;"})




  // Plot
  for (var i = 0; i < nfamilies; i ++){



    var family_i = json.families[i];
    let familyTidyName = json.familyNames[family_i];

    var y = (i)*FAMILY_MATRIX_SIZE + MATRIX_PADDING;
    drawSVGobj(svg, "rect", {x:y, y:y, width:FAMILY_MATRIX_SIZE, height:FAMILY_MATRIX_SIZE, style: "fill:white; stroke-width:0.5px; stroke:black;"})
    drawSVGobj(svg, "text", {x: y+FAMILY_MATRIX_SIZE/2, y: y+FAMILY_MATRIX_SIZE/2, style: "text-anchor:middle; dominant-baseline:central;font-size:" + MATRIX_FONT_SIZE + "px"}, familyTidyName)

    
    for (var j = i+1; j < nfamilies; j ++){


      // Get pairwise data from json
      var family_j = json.families[j];
      var key = family_i + "_" + family_j;
      if (json["d_" + key] == null){
        key = family_j + "_" + family_i;
      }

      var rmsd = json["d_" + key];
      var url = json["url_" + key];
      var name = json["name_" + key];





      // Colour of rmsd
      var col = "white";
      var fontCol = "black";
      for (let r = 0 ; r < RMSD_COLS.length; r++){
        var obj = RMSD_COLS[r];
        if (rmsd >= obj.min && rmsd < obj.max){
          col = obj.col;
          fontCol = obj.fontCol;
          break;
        }
      }

      var x = (j)*FAMILY_MATRIX_SIZE + MATRIX_PADDING;
      var group = $(drawSVGobj(svg, "g", {url:url, title: name, class:"matrixcell", style: "cursor:pointer;" }));
      let rect1 = drawSVGobj(group, "rect", {x: x, y:y, width:FAMILY_MATRIX_SIZE, height:FAMILY_MATRIX_SIZE, style: "fill:" + col + "; stroke-width:0.5px; stroke:black;"})
      let rect2 = drawSVGobj(group, "rect", {x: y, y:x, width:FAMILY_MATRIX_SIZE, height:FAMILY_MATRIX_SIZE, style: "fill:" + col + "; stroke-width:0.5px; stroke:black;"})


      let rmsdPrint = Math.round((1-rmsd) * 100) / 100;
      var text1 = drawSVGobj(group, "text", {x: x+FAMILY_MATRIX_SIZE/2, y: y+FAMILY_MATRIX_SIZE/2, url:url, style: "text-anchor:middle; dominant-baseline:central; fill:" + fontCol + ";font-size:" + MATRIX_FONT_SIZE + "px"}, rmsdPrint)
      var text2 = drawSVGobj(group, "text", {x: y+FAMILY_MATRIX_SIZE/2, y: x+FAMILY_MATRIX_SIZE/2, url:url, style: "text-anchor:middle; dominant-baseline:central; fill:" + fontCol + ";font-size:" + MATRIX_FONT_SIZE + "px"}, rmsdPrint)


      $(group).click(function(){
        let href = $(this).attr("url");
        let e = window.event;
        if (e.ctrlKey){
          window.open(href, '_blank');
        }else{
         window.location.href = href;
        }
      });


    }
  }

}







function drawSVGobj(svg, type, attr, val = null){

  //console.log("attr", attr);
  var newObj = document.createElementNS('http://www.w3.org/2000/svg', type);


  for (var a in attr){
    if (a == "text_anchor") newObj.setAttribute("text-anchor", attr[a]);
    else if (a == "alignment_baseline") newObj.setAttribute("alignment-baseline", attr[a]);
    else if (a == "stroke_dasharray") newObj.setAttribute("stroke-dasharray", attr[a]);
    else if (a == "title") {
      var title = document.createElementNS('http://www.w3.org/2000/svg', "title");
      title.innerHTML += attr[a];
      newObj.append(title);
    }
    else newObj.setAttribute(a, attr[a]);
  }
  if (val != null) newObj.innerHTML = val;



  // Set some of the styles as attributes because safari and IE do not like styles for svgs
  var styles = getComputedStyle(newObj);
  //if (styles.fill != null) newObj.setAttribute("fill", styles.fill);
  if (styles.stroke != null) newObj.setAttribute("stroke", styles.stroke);
  if (styles["stroke-width"] != null) newObj.setAttribute("stroke-width", styles["stroke-width"]);
  //console.log(styles["stroke-width"]);

  //window.requestAnimationFrame(function() {
  svg.append(newObj);
  $(newObj).hide().fadeIn(20); 
  
  
  
  
  return newObj;

} 
