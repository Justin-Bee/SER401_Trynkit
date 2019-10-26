/**
 * Copyright [2019] [Justin Bee, Brian Carson, Andrew Fiorentino, Abigail Ida, Vicente Ochoa]
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Purpose: This file handles the formatting of the code editor
 * SER401
 * @file lineCount.js
 * @author Brian Carson
 * @version October 2019
 */

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