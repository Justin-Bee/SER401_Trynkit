var dCopy = document.getElementById('copy2');
var cPosDiv = document.getElementById('cPos');
var lineHeight = 22;

function getCurrentPos(textarea){
	"use strict";
	
	var allText = textarea.value.substr(0, textarea.selectionStart);
	allText = allText.replace(/(?:\r\n|\r|\n)/g, '<br />');
	
	dCopy.innerHTML = allText;
	
	allText = allText.split("<br />");
	var lineNum = dCopy.offsetHeight / lineHeight;
	var colNum = allText[allText.length-1].length;
	
	cPosDiv.innerHTML = 'Line: ' + lineNum + ' | Col: ' + colNum;
}