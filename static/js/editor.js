/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keypress
//document.getElementById('editor').addEventListener("keydown", highlightKeywords, false);


const keyWords = ['import', 'from', 'if', 'else', 'for', 'while', 'False', 'None', 'True',
                    'and', 'as', 'assert', 'break', 'class', 'continue', 'def','del', 'elif',
                    'except', 'finally', 'global', 'in', 'is', 'lambda', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

//variables for the colors of the highlighting
//all are set to default colors
var keyWordColor ="orange";
var numberColor="blue";
var commentColor ="yellow";
var stringColor = "green";

var editor = document.getElementById('editor');
editor.addEventListener("keydown", function(event){
    if(event.keyCode === 13){//to handle enter presses
        event.preventDefault(); //Prevent default browser behavior
        if (window.getSelection) {
             var selection = window.getSelection(),
             range = selection.getRangeAt(0),
             br = document.createElement("br"),
             textNode = document.createTextNode("\u00a0"); //Passing " " directly will not end up being shown correctly
             range.deleteContents();//required or not?
             range.insertNode(br);
             range.collapse(false);
             range.insertNode(textNode);
             range.selectNodeContents(textNode);
             selection.removeAllRanges();
             selection.addRange(range);
             return false;
            }
    }
    else if (event.keyCode ===32){ //this is to handle if space is pressed
        highlightKeywords();
    }else if (event.keyCode ===8){  //this is for backspace
       highlightKeywords();
       cursorAtEnd(); //need to create a function for this to keep cursor at current location
    }
});

/**
 * @author: Justin Bee
 * @date: 10/14/2019
 * @params: String: key, String num
 * This is to set the colors of the different types of formatting
 */
function config(key, num){
    keyWordColor = key;
    numberColor = num;
}


/**
 * @author: Justin Bee
 * @param: none
 * function to highlight the syntax for MicroPython
 */
function highlightKeywords() {
    var divValue = document.getElementById('editor').innerText;
    //for the number highlighting
    var str = divValue.split(' ');
        for (var i = 0; i < str.length; i++) {
            //  console.log(str[i]);
            if (str[i].match(/\d+/)) {
                str[i] = "<span style=color:" + numberColor + ">"+str[i]+"</span>";
            }
        }
        divValue = "";
        for (var i = 0; i < str.length; i++) {
            if(str.length<=1){
                divValue =divValue + str[i];
            }else{
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
            divValue = divValue.replace(re, "<span style=color:" + keyWordColor + ">" + word + "</span>");
        }
    }
    
    //formatting for comments
    //match # until newline or </div>
  //  comRegEXP = new RegExp('^#.*<$', g); //this regex will match # to < assuming <div> is at end of line
   // divValue = divValue.replace(comRegEXP, "<span style=color:" + commentColor +">"+ comRegEXP+ "</span>");


    console.log(document.getElementById('editor').innerHTML); //for debugging purposes
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












