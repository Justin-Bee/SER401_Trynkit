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
    };

}
