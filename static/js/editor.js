/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keyup
document.getElementById('editor').addEventListener("keyup", updateEditor, false);

const keyWords = ['import', 'from', 'if', 'else', 'for', 'while'];
/*
function to highlight the syntax for MicroPython
 */
function updateEditor(){
    //get the users input from the <div>
    var divValue = document.getElementById('editor').innerHTML;
    var found = false;
    //for loop to search the input
    for(var i=0; i<=keyWords.length; i++) {
        //if to replace with highlighting
        if (divValue.includes(keyWords[i])) {
            //create regex variable
            var word = keyWords[i].toString();
            var re = new RegExp(word, "g");
            var replace = divValue.replace(re, "<span style=color:orange;>" + word + "</span></span>");
            document.getElementById('editor').innerHTML = replace;
            cursorAtEnd();
        }
    }
}
/**
 * this function sets the cursor at the end of the text
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