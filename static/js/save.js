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
 * @version October 2019
 */

/**
 * saveEditorContents
 * Saves the contents of the text editor to a file of the user's choice.
 * @author: Andrew Fiorentino
 * @param: filename the name of the file to be saved
 * @returns: none
 **/
function saveEditorContents() {
    if (editor.getAttribute('name') == '.py') {
        projectName = prompt('Please chose a name for your project: ', 'NewProject.py');
        editor.setAttribute('name', projectName);
        document.getElementById('tab0').innerText = projectName;
    } else {
        projectName = editor.getAttribute('name');
    }

    var element = document.createElement('a');
    var editorContent = editor.getValue();
    var contentArray = editorContent.split("\n");
    var finalContent = "";
    for(var i = 1; i < contentArray.length; i = i+2) {
        finalContent = finalContent + contentArray[i] + "\n";
    }

    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.getElementById('editor').innerText));
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(finalContent));
    element.setAttribute('download', projectName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}
