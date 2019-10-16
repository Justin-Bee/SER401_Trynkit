/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keypress
document.getElementById('editor').addEventListener("keydown", highlightKeywords, false);


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

var isEnterPressed = false;

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
    var str = divValue.split(" ");
        for (var i = 0; i < str.length; i++) {
            //  console.log(str[i]);
            if (str[i].match(/\d+/)) {
                str[i] = "<span style=color:" + numberColor + ">" + str[i] + "</span>";
            }
        }
        divValue = "";
        for (var i = 0; i < str.length; i++) {
                divValue = divValue + str[i] + " ";
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
    console.log(divValue); //for debugging purposes
    document.getElementById('editor').innerHTML = divValue;
    cursorAtEnd();
}


/**
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












