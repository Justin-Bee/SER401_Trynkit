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
 * @author Andrew Fiorentino 
 * @version October 2019
 */

/**
 * saveEditorContents
 * Saves the contents of the text editor to a file of the user's choice.
 * @author: Andrew Fiorentino
 * @parm: none
 * @returns: none
 **/
function saveEditorContents(contents, filename) {
    var file = new Blob([contents], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
        var a = document.createElement('a'),
            url = URL.createObject(file);
        a.href = file;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
