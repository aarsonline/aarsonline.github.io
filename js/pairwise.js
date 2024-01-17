IS_MOBILE = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		   			 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));



MATRIX_PADDING = 10;
MATRIX_FONT_SIZE = 11;
FAMILY_MATRIX_SIZE = 45;


if (IS_MOBILE){
	MATRIX_PADDING *= 1.8;
	MATRIX_FONT_SIZE *= 1.8;
	FAMILY_MATRIX_SIZE *= 1.8;
	
}

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
    let textMain = drawSVGobj(svg, "text", {x: y+FAMILY_MATRIX_SIZE/2, y: y+FAMILY_MATRIX_SIZE/2, transform:"rotate(45," + (y+FAMILY_MATRIX_SIZE/2) + "," + (y+FAMILY_MATRIX_SIZE/2) + ")", style: "text-anchor:middle; dominant-baseline:central;font-size:" + MATRIX_FONT_SIZE + "px"}, familyTidyName)
    
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
