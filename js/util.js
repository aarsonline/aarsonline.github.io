IS_MOBILE = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		   			 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));


// Adds a header to the top of the page and a footer to the bottom
function renderHeader(includeFooter = true){

	if (IS_MOBILE){
			$("body").addClass("mobile");
	}

  
  // Header, footer
  $("body").prepend("<div id='header'><span class='title'><a title='AARS Online' class='mainLogo'  href='/'><img src='/fig/logo.png' height='100%'/><a></span></div>")

  if (includeFooter){
    $("body").append("<div id='footer'></div>")
  }

					   
  $("#header").append(`<div id='class2Selector' class='dropdown'>
						<button class='dropbtn'>Class II</button>
							<div class='dropdown-content'>
							</div>
						</button>
					   </div>`);
					   
	$("#header").append(`<div id='class1Selector' class='dropdown'>
						<button class='dropbtn'>Class I</button>
							<div class='dropdown-content'>
							</div>
						</button>
					   </div>`);
					   
  
	$("#header").append(`<div id='helpMenu' class='dropdown'>
						<button class='dropbtn'>About</button>
							<div class='dropdown-content'>
							</div>
						</button>
					   </div>`);

	// Help
	$("#helpMenu div").append(`<a href='/'><b>Home</b></a>`);
	$("#helpMenu div").append(`<a href='/about/methods'>Methods</a>`);
	$("#helpMenu div").append(`<a href='/about/organisms'>Organisms</a>`);
	

	// Class 1
	

	$("#class1Selector div").append(`<a href='/class1/'><b>Home</b></a>`);

	// $("#class1Selector div").append(`<br>`);
	// $("#class1Selector div").append(`<b>Families</b>`);
	$("#class1Selector div").append(`<a href='/class1/arg'>ArgRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/cys'>CysRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/gln'>GlnRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/glu1'>GluRS-B</a>`);
	$("#class1Selector div").append(`<a href='/class1/glu3'>GluRS-E</a>`);
	$("#class1Selector div").append(`<a href='/class1/glu2'>GlxRS-A</a>`);
	$("#class1Selector div").append(`<a href='/class1/ile'>IleRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/leu2'>LeuRS-A</a>`);
	$("#class1Selector div").append(`<a href='/class1/leu1'>LeuRS-B</a>`);
	$("#class1Selector div").append(`<a href='/class1/lys'>LysRS-I</a>`);
	$("#class1Selector div").append(`<a href='/class1/met'>MetRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/trp'>TrpRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/tyr'>TyrRS</a>`);
	$("#class1Selector div").append(`<a href='/class1/val'>ValRS</a>`);

	// $("#class1Selector div").append(`<br>`);
	// $("#class1Selector div").append(`<b>Domains</b>`);
	// $("#class1Selector div").append(`<a href='/d/crimvl'>ABD-CRIMVL</a>`);
	// $("#class1Selector div").append(`<a href='/d/ek'>ABD-EK</a>`);
	// $("#class1Selector div").append(`<a href='/d/eq'>ABD-EQ</a>`);
	// $("#class1Selector div").append(`<a href='/d/wy'>ABD-WY</a>`);
	// $("#class1Selector div").append(`<a href='/d/iv'>CTD-IV</a>`);
	// $("#class1Selector div").append(`<a href='/d/edit1a'>Edit Ia</a>`);
	// $("#class1Selector div").append(`<a href='/d/gst'>GST</a>`);
	// $("#class1Selector div").append(`<a href='/d/dnk'>EMAP</a>`);
	// $("#class1Selector div").append(`<a href='/d/cat1'>Catalytic</a>`);


	// Class 2
	$("#class2Selector div").append(`<a href='/class2/'><b>Home</b></a>`);

	// $("#class2Selector div").append(`<br>`);
	// $("#class2Selector div").append(`<b>Families</b>`);
	$("#class2Selector div").append(`<a href='/class2/ala'>AlaRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/asn'>AsnRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/asp1'>AspRS-B</a>`);
	$("#class2Selector div").append(`<a href='/class2/asp2'>AspRS-E</a>`);
	$("#class2Selector div").append(`<a href='/class2/gly1'>GlyRS-A</a>`);
	$("#class2Selector div").append(`<a href='/class2/gly2'>GlyRS-B</a>`);
	$("#class2Selector div").append(`<a href='/class2/gly3'>GlyRS-E</a>`);
	$("#class2Selector div").append(`<a href='/class2/his'>HisRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/lys'>LysRS-II</a>`);
	$("#class2Selector div").append(`<a href='/class2/phe3'>PheRS-A&alpha;</a>`);
  $("#class2Selector div").append(`<a href='/class2/phe4'>PheRS-A&beta;</a>`);
	$("#class2Selector div").append(`<a href='/class2/phe1'>PheRS-B&alpha;</a>`);
	$("#class2Selector div").append(`<a href='/class2/phe2'>PheRS-B&beta;</a>`);
	$("#class2Selector div").append(`<a href='/class2/phe5'>PheRS-M</a>`);
	$("#class2Selector div").append(`<a href='/class2/pro1'>ProRS-A</a>`);
	$("#class2Selector div").append(`<a href='/class2/pro2'>ProRS-B</a>`);
	$("#class2Selector div").append(`<a href='/class2/pyl'>PylRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/sep'>SepRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/ser1'>SerRS</a>`);
	$("#class2Selector div").append(`<a href='/class2/ser2'>SerRS-A</a>`);
	$("#class2Selector div").append(`<a href='/class2/thr'>ThrRS</a>`);



	// $("#class2Selector div").append(`<br>`);
	// $("#class2Selector div").append(`<b>Domains</b>`);
	// $("#class2Selector div").append(`<a href='/d/dnk'>ABD-DNK</a>`);
	// $("#class2Selector div").append(`<a href='/d/hgpt'>ABD-HGPT</a>`);
	// $("#class2Selector div").append(`<a href='/d/f'>ABD-F</a>`);
	// $("#class2Selector div").append(`<a href='/d/atl'>ATL</a>`);
	// $("#class2Selector div").append(`<a href='/d/editat'>Edit AT</a>`);
	// $("#class2Selector div").append(`<a href='/d/cat2'>Catalytic</a>`);


}



function roundToSF(val, sf=2, ceilOrFloor = "none", precise = true){

	return Number( val.toPrecision(sf+1) );

	// if (val == 0) return 0;
	
	// var magnitude = Math.floor(Math.log(val, 10));

	// if (val < 0 && ceilOrFloor == "ceil") ceilOrFloor = "floor";
	// else if (val < 0 && ceilOrFloor == "floor") ceilOrFloor = "ceil";

	// var num = val * tenToThePowerOf(sf-magnitude, precise);
	// if (ceilOrFloor == "ceil") num = Math.ceil(num)
	// else if (ceilOrFloor == "floor") num = Math.floor(num)
	// else num = Math.round(num);

	// num = num * tenToThePowerOf(magnitude-sf, precise);
	
	// // Sometimes this picks up a trailing .00000000001 which we want to remove

	// var expectedStringLength = 0;
	// if (magnitude >= 0) expectedStringLength = magnitude >= sf ? magnitude+1 : sf+2; // Add 1 for the decimal point
	// else expectedStringLength = 2 -magnitude + sf;
	// if (num < 0) expectedStringLength++; // Also need the negative symbol



	// num = parseFloat(num.toString().substring(0, expectedStringLength+1));
	
	// return num;
		
}



// Compute 10^n without using Math.pow for negative n which presents numerical instabilities
function tenToThePowerOf(n, precise = true){

	if (!precise) return Math.pow(10, n);

	if (n == Infinity || n == -Infinity) return n;

	if (n == 0) return 1;
	var val = "1";
	if (n < 0) {
	
	
		for (var index = -1; index > n; index --){
			val = "0" + val;
		}
		val = "." + val;
	}

	else if (n > 0) {
		return Math.pow(10, n);

	}
	else {
		return 1;
	}
	//console.log(n, "->", parseFloat(val));
	return parseFloat(val);


}


// Go to a random page
function goToRandom(){

	

	let pages = ["/class1/arg/", "/class1/cys/", "class1/gln/", "class1/glu1/", "class1/glu2/", "class1/glu3/", "class1/ile/", "class1/leu1/", "class1/leu2/", "class1/lys/", 
							"class1/met/", "class1/trp/", "class1/tyr/", "class1/val/", "about/methods/", "about/organisms/", "/class1/", "/class2/",
							"/class2/ala/", "/class2/asn/", "/class2/asp1/", "/class2/asp2/", "/class2/gly1/", "/class2/gly2/", "/class2/gly3/", "/class2/his/", "/class2/lys/", "/class2/phe1/",
							"/class2/phe2/", "/class2/phe3/", "/class2/phe4/", "/class2/phe5/", "/class2/pro1/", "/class2/pro2/", "/class2/pyl/", "/class2/sep/", "/class2/ser1/", "/class2/ser2/",
							"/class2/thr/", "/d/atl", "/d/cat1", "/d/cat2", "/d/crimvlg", "/d/dnk","/d/edit1a", "/d/editat", "/d/ek", "/d/eq",
							"/d/f","/d/gst", "/d/hgpt", "/d/iv","/d/whep", "/d/wy"];




	let index = Math.floor(Math.random()*pages.length); 

	window.location.replace(pages[index]);


} 