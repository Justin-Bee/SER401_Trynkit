class editorClass {
    constructor() {
        this.projectName = "Empty";
        var edit = document.CreateElement("div");
        var id = edit.createAttribute('id');
        id.value = 'editor';
        edit.setAttributeNode(id);

        edit.contentEditable = 'true';
    }
}
