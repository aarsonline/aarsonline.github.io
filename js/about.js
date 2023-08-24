IS_MOBILE = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		   			 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));

DATA = {};

function renderAbout(){
	
	
	$(".indexMetadata").remove();
  // Initialise HTML
$("#main").append(`
		


	
					
				<ul class="flexContainer">
				<li class="summary">
				</li>

				<li class="notes">
					
					<div id="introduction">


					</div>
					
				</li>
				
			</ul>


				
			
			

			<ul class="flexContainer">
				<li id="references">
					<h2>References</h2>
				</li>
			</ul>


			<div id="issues">

				<a id="GitHubLink">
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

  
  $(".notes").show(0);
  renderHeader();
  
  
  if (IS_MOBILE){
	 
  }else{
	   
  }
  
  
  // Render the introduction
	fetch("README.md")      // The path to the raw Markdown file
  .then(response => response.blob())  // Unwrap to a blob...
  .then(blob => blob.text())          // ...then to raw text...
  .then(markdown => {                 // ...then pass the raw text into marked.parse
    document.getElementById("introduction").innerHTML = marked.parse(markdown);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
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



	// Load metadata
	fetch("/data/accessions.json").then(response => response.text()).then(text => loadAcccessionMetadata(text));
   
	
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
	

	 
	 
	 if (json.hide != null && json.hide == true){
		$(".summary").hide(0);
	 }

	$(".summary").append("<table></table>");




	// GitHub issue link
	let issueLabel = json.issuePage == null ? json.id : json.issuePage;
	$("#IssuesLink").attr("href", "https://github.com/aarsonline/aarsonline.github.io/labels/" + issueLabel);

	// Figure
	  if (json.fig != null && json.fig != ""){
		  $(".summary").html(`<div title="` + json.substrate + `" class="aafig"><img src="` + json.fig + `"/></div>`);
		  
	  }




}


