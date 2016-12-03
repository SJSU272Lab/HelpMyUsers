

$(document).ready(function(){
 
		//$("body").html("jQuery is working");
var cursorX;
var cursorY;
console.log("amdldakmfnd");
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
//setInterval(checkCursor, 1000);
function checkCursor(){
    console.log("Cursor at: " + cursorX + ", " + cursorY);
}
 
	});


