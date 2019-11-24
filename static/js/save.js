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
 * Purpose: This file handles the saving functionality for the text editor web application
 * SER401
 * @file save.js
 * @author Andrew Fiorentino 
 * @author Abigail Ida
 * @version November 2019
 */

/**
 * saveEditorContents
 * Saves the contents of the text editor to a file of the user's choice.
 * @author: Andrew Fiorentino
 * @param: filename the name of the file to be saved
 * @returns: none
 **/
function saveEditorContents() {
    if (document.getElementById('code').getAttribute('name') == '.py') {
        projectName = prompt('Please chose a name for your project: ', 'NewProject.py');
        document.getElementById('code').setAttribute('name', projectName);
        document.getElementById('tab0').innerText = projectName;
    } else {
        projectName = document.getElementById('code').getAttribute('name');
    }

    var element = document.createElement('a');
    var editorContent = editor.getValue();
    var contentArray = editorContent.split("\n");
    var finalContent = "";
    for(var i = 0; i < contentArray.length; i ++) {
        finalContent = finalContent + contentArray[i] + "\n";
    }
    console.log(finalContent);
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById('editor').innerText));
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalContent));
    element.setAttribute('download', projectName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}

/**
 * saveTabPrompt
 * Prompts the user to specify if they would like to save the tab they are closing 
 * @author: Abigail Ida
 * @param: TabTitle
 * @returns: none
 **/
function saveTabPrompt(currentTab){
    userResponse = confirm('Select ok to save the current tab.');
     //get tab title
    var tabTitle = currentTab; 
    if(userResponse == true){
        //"save" by downloading .py file to users machine
        downloadEditorContents(tabTitle);
    }else{
        verification = alert('You have chosen not to save the contents of ' + tabTitle + ' before closing.');
        //remove tab and corresponding contents from local storage??
    }
}

/**
 * clearEditorContents
 * Clears the current contents in the editor window
 * @author: Abigail Ida
 * @returns: none
 **/
function clearEditorContents(content){
    editor.setValue("");
}

/**
 * downloadEditorContents
 * saves the current contents of the editor window in a .py file by downloading it to the users machine.
 * The name of the .py file is named after the user slected tab title listed on the corresponding tab.
 * @author: Abigail Ida
 * @param: tabTitle
 * @returns: none
 **/
function downloadEditorContents(tabTitle) {
    projectName = tabTitle;
    var element = document.createElement('a');
    var editorContent = editor.getValue();
    var contentArray = editorContent.split("\n");
    var finalContent = "";
    for(var i = 0; i < contentArray.length; i ++) {
        finalContent = finalContent + contentArray[i] + "\n";
    }
    console.log(finalContent);
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById('editor').innerText));
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalContent));
    element.setAttribute('download', projectName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}