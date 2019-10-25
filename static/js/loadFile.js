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
 * Purpose: This file handles the formatting of the code editor
 * SER401
 * @file loadFile.js
 * @author Andrew Fiorentino
 * @version October 2019
 */

function loadFile() {
    var fileupload = document.getElementById("file");
    var filePath = document.getElementById("spnFilePath");
    var button = document.getElementById("loadFileBtn");
    button.onclick = function () {
        fileupload.click();
    };
    file.onchange = function () {
        var projectName = fileupload.value.split('\\')[fileupload.value.split('\\').length - 1];

        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function(progressEvent){
            highlightKeywords(this.result);
        };
        reader.readAsText(file);
        document.getElementById('editor').setAttribute('name', projectName);
        document.getElementById('tab0').innerText = projectName;
    };

}
