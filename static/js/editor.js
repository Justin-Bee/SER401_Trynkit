/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keyup
document.getElementById('editor').addEventListener("keypress", highlightKeywords, false);

const keyWords = ['import', 'from', 'if', 'else', 'for', 'while', 'False', 'None', 'True',
                    'and', 'as', 'assert', 'break', 'class', 'continue', 'def','del', 'elif',
                    'except', 'finally', 'global', 'in', 'is', 'lambda', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

/**
 * TODO write a config function so we can change the colors of the formatting based upon the styles
 */



/**
function to highlight the syntax for MicroPython
 */
function highlightKeywords() {
     //have to set a delay so it doesn't format a partial word
     setTimeout(function(){
        var divValue = document.getElementById('editor').innerHTML;
        for(var i=0; i<=keyWords.length; i++) {
              //if to replace with highlighting
            var word = keyWords[i];
            if (divValue.includes(word)) {
                  //create regex variable
                re = new RegExp('\\b'+word+'\\b',"g");
                divValue = divValue.replace(re , "<span style=color:orange;>" + word + "</span></span>");
                document.getElementById('editor').innerHTML = divValue;
                cursorAtEnd();
            }
        }
      },2000); //2 second delay
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



