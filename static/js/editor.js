//set event listener to the editor for keyup
document.getElementById('editor').addEventListener("keyup", updateEditor, false);
/*
function to
 */
function updateEditor(){
    //get the users input
    var divValue = document.getElementById('editor').innerHTML;
    //if
    if(divValue.includes("import")){
    var replace = divValue.replace(/import/g, "<span style=color:orange;>import</span></span>");
    document.getElementById('editor').innerHTML=replace;
    //set the cursor at the end
    var el = document.getElementById('editor');
    var selection = window.getSelection();
    var range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(el);
    range.collapse(false);
    selection.addRange(range);
    el.focus();
    }
}
