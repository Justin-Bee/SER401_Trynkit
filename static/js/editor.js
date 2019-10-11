/**
 * @author: Justin Bee
 * @date: 10/8/2019
 *
 */


//set event listener to the editor for keyup
document.getElementById('editor').addEventListener("keydown", highlightKeywords, false);

const keyWords = ['import', 'from', 'if', 'else', 'for', 'while', 'False', 'None', 'True',
                    'and', 'as', 'assert', 'break', 'class', 'continue', 'def','del', 'elif',
                    'except', 'finally', 'global', 'in', 'is', 'lambda', 'nonlocal', 'not',
                    'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/**
 * TODO write a config function so we can change the colors of the formatting based upon the styles
 */



/**
 * @author: Justin Bee
 * @param: none
 * function to highlight the syntax for MicroPython
 */
function highlightKeywords() {
        var divValue = document.getElementById('editor').innerText;
        for(var i=0; i<keyWords.length; i++) {
            var word = keyWords[i];  //word we want to replace
            var wordHTML = "&gt;"+word+"&lt;";  //variable for same word surrounded by html tags
            if (divValue.includes(wordHTML)){
                //do nothing so we dont continue to wrap the text in html tags
                //TODO maybe explore this more with the HTML tags
            }else if(divValue.includes(word)) {
                //create regex variable
                re = new RegExp('\\b'+word+'\\b',"g");
                divValue = divValue.replace(re , "<span style=color:orange>" + word+ "</span></span>");
                document.getElementById('editor').innerHTML = divValue;
                cursorAtEnd();
               // console.log(document.getElementById('editor').innerHTML);
            }
        }
        highlightNumbers();
}

/**
 * @author: Justin Bee
 * @param: none
 * The function finds numeric characters and highlights them
 */
function highlightNumbers(){
    var divValue = document.getElementById('editor').innerHTML;
    //    var divValue = divValue.toString();
        for(var i=0; i<=numbers.length; i++) {
            var num = numbers[i];  //word we want to replace
            var numHTML = "&gt;"+num+"&lt;";  //variable for same word surrounded by html tags
            if (divValue.includes(numHTML)){
                //do nothing so we dont continue to wrap the text in html tags
                //TODO maybe explore this more with the HTML tags
            }else if(divValue.includes(num)) {
                //create regex variable
                //TODO need to improve upon this 
                //if user enters xxxx8888 the 8888 will still get highlighted.
                re = new RegExp(num, "g");
                divValue = divValue.replace(re , "<span style=color:blue>" + num+ "</span></span>");
                document.getElementById('editor').innerHTML = divValue;
                console.log(divValue);
                cursorAtEnd();
            }
        }
}


/**
 * this function sets the cursor at the end of the text
 * TODO fix fnction to find current location of cursor and set back to there
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





