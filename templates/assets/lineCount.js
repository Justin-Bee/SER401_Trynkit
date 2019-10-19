var dCopy = document.getElementById('copy');
var numBox = document.getElementById('nums');
var textBox = document.getElementById('txtBox');
var lineHeight = 22;

function addEvents() {
	"use strict";
	textBox.addEventListener("keyup", textCopy, false);
	textBox.addEventListener("keyup", append, false);
}

function textCopy() {
	"use strict";
	
	var textBoxVal = textBox.value;
	
	textBoxVal = textBoxVal.replace(/(?:\r\n|\r|\n)/g, '<br />');
	
	dCopy.innerHTML = textBoxVal;
}

function append() {
	"use strict";
	
	var lines = dCopy.offsetHeight / lineHeight, n = 1, pHolder = '';
	for (n = 1; n <= lines; n = n + 1) {
		pHolder += '<div class="row">' + n + '</div>';
	}
	if (lines === 0) {
		pHolder = '<div class="row">1</div>';
	}
	numBox.innerHTML = pHolder;
}

window.addEventListener("load", addEvents, false);