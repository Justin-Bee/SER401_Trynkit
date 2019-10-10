/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keyup
document.getElementById('editor').addEventListener("keyup", updateEditor, false);

const keyWords = ['import', 'from', 'if', 'else', 'for', 'while', 'False', 'None', 'True',
                    'and', 'as', 'assert', 'break', 'class', 'continue', 'def','del', 'elif',
                    'except', 'finally', 'global', 'in', 'is', 'lambda', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];
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
        var word = keyWords[i];
        var wordBeginning = keyWords[i];
        var wordEnding = keyWords[i];
        var wordCaret = keyWords[i];
        wordBeginning = " " + wordBeginning + " ";
        wordEnding = wordEnding + ' ';
        wordCaret = ">"+word+"<";
        //if word is surrounded by html tags already
        if(divValue.includes(wordCaret)){
            //do nothing
        }
        else if (divValue.includes(wordBeginning)){
            //create regex variable
            var re = new RegExp(word, "g");
            divValue = divValue.replace(re, "<span style=color:orange;>" + word+ "</span>");
            document.getElementById('editor').innerHTML = divValue;
            cursorAtEnd();
            console.log(divValue); //this is just to see what im actually putting in the div
        }else if(divValue.includes(wordEnding)){
             var re = new RegExp(word, "g");
            divValue = divValue.replace(re, "<span style=color:orange;>" + word + "</span>");
            document.getElementById('editor').innerHTML = divValue;
            cursorAtEnd();
            //only for debugging
            console.log(divValue);
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

