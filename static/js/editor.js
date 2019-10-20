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
 * @file editor.js
 * @author Justin Bee
 * @version October 2019
 */


const keyWords = ['import', 'from', 'if', 'else', 'for', 'while', 'False', 'None', 'True',
                    'and', 'as', 'assert', 'break', 'class', 'continue', 'def','del', 'elif',
                    'except', 'finally', 'global', 'in', 'is', 'lambda', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

//variables for the colors of the highlighting
//all are set to default colors
var keyWordColor ="orange";
var numberColor="blue";
var commentColor ="red";
var stringColor = "green";


/**
 * This block of code handles the key events: "Enter", "Space", "Backspace"
 * @type {HTMLElement}
 */
var editor = document.getElementById('editor');
editor.addEventListener("keydown", function(event){
    if(event.keyCode === 13){//to handle enter presses
        event.preventDefault(); //Prevent default browser behavior
        if (window.getSelection) {
             var selection = window.getSelection(),
             range = selection.getRangeAt(0),
             br = document.createElement("br"), //create <br> for the html
             textNode = document.createTextNode("\u00a0"); //Passing " " directly will not end up being shown correctly
             range.deleteContents();
             range.insertNode(textNode);
             range.insertNode(br); //insert the br into the correct position
             range.collapse(false);
             range.insertNode(textNode);
             range.selectNodeContents(textNode);
             selection.removeAllRanges();
             selection.addRange(range);
             return false;
            }
    }
    else if (event.keyCode ===32){ //this is to handle if space is pressed
        var divValue = document.getElementById('editor').innerText;
        highlightKeywords(divValue);
    }else if (event.keyCode ===8){  //this is for backspace
        var divValue = document.getElementById('editor').innerText;
       highlightKeywords(divValue);
       cursorAtEnd(); //need to create a function for this to keep cursor at current location
    }
});

/**
 * @author: Justin Bee
 * @date: 10/14/2019
 * @params: String: key, String num
 * This is to set the colors of the different types of formatting
 */
function config(key, num, com, str){
    keyWordColor = key;
    numberColor = num;
    commentColor = com;
    stringColor = str;
}


/**
 * @author: Justin Bee
 * @param: none
 * function to highlight the syntax for MicroPython
 */
function highlightKeywords(divValue) {

    var str = divValue.split(' ');
    for (var i = 0; i < str.length; i++) {
        //  console.log(str[i]);
        if (str[i].match(/\d+/)) {
            str[i] = "<span style=color:" + numberColor + ">" + str[i] + "</span></span>";
        }
    }
    divValue = "";
    for (var i = 0; i < str.length; i++) {
        if (str.length <= 1) {
            divValue = divValue + str[i];
        } else {
            divValue = divValue + str[i] + " ";
        }
    }

    //for the keyword highlighting
    for (var i = 0; i < keyWords.length; i++) {
        var word = keyWords[i];  //word we want to replace
        var wordHTML = ">" + word + "<";  //variable for same word surrounded by html tags
        if (divValue.includes(wordHTML)) {
            //do nothing so we dont continue to wrap the text in html tags
        } else if (divValue.includes(word)) {
            //create regex variable
            re = new RegExp('\\b' + word + '\\b', "g");
            divValue = divValue.replace(re, "<span style=color:" + keyWordColor + ">" + word + "</span></span>");
        }
    }
    //formatting for strings
    var strRegEXP = new RegExp('"(.*?)"', 'gm');
    var mat = divValue.match(strRegEXP);
    if(mat != null){
        for(var i = 0; i<mat.length; i++){
            newStr = removeHTML(mat[i]);
            divValue = divValue.replace(mat[i], "<span style=color:" + stringColor + ">" + newStr + "</span></span>");
        }
    }

    //formatting for comments
    //match # until newline
    var comRegEXP = new RegExp('#.*$', 'gm'); //this regex will match # to < assuming <div> is at end of line
    var matched = divValue.match(comRegEXP);
    if (matched != null) {
        for (var i = 0; i < matched.length; i++) {
            newWord = removeHTML(matched[i]);
            divValue = divValue.replace(matched[i], "<span style=color:" + commentColor + ">" + newWord + "</span></span>");
         }
    }

    console.log(document.getElementById('editor').innerHTML); //for debugging purposes
    //console.log(document.getElementById('editor').innerText); //for debugging purposes
    document.getElementById('editor').innerHTML = divValue;
    cursorAtEnd();
}




/**
 * @param: none
 * this function sets the cursor at the end of the text
 * TODO fix function to find current location of cursor and set back to there
 */
function cursorAtEnd(){
    //set the cursor at the end of text in div
            var el = document.getElementById('editor');
            var selection = window.getSelection();
            var range = document.createRange();
            selection.removeAllRanges();
            range.selectNodeContents(el);
            range.collapse(false);
            selection.addRange(range);
            el.focus();
}

/**
 * Function to remove HTML tags from the inside of a string
 * @param: String - str
 * @return: String
 */
 function removeHTML(str) {
      if ((str===null) || (str===''))
      return false;
      else
      str = str.toString();
      var htmlReg = new RegExp('<([^>]+)>', "g");
      return str.replace( htmlReg, '');
   }


   function removeNBSP() {
     value = document.getElementById('editor').innerHTML;
     value = value.replace('&nbsp;', ' ');
     document.getElementById('editor').innerHTML= value;

   }


/**
 * this is code that I am working on the improve the number formatting
 */
 //var numRegEXP = new RegExp('\\b\d*\\b', 'g');
   // var num1 = divValue.match(numRegEXP);
   // if(num1 != null){
    //    for(var i =0; i<num1.length; i++){
    //        console.log(num1.length);
     //        newNum = num1[i];
     //        divValue = divValue.replace(newNum,  "<span style=color:" + numberColor + ">" + newNum + "</span>");
     //   }
   // }//








