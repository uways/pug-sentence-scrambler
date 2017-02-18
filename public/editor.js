var http = new XMLHttpRequest();
http.onreadystatechange = function() {
  if (this.readyState === 4) {
    if (this.status >= 200 && this.status < 400) {
      var schema = JSON.parse(this.responseText)
      var editor = new JSONEditor(document.getElementById('editor_holder'), {schema: schema})
      editor.setValue(data)
    } else {
      // Error :(
    }
  }
}
http.open("GET","/schema", true)
http.send()
