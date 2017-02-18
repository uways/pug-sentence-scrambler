// By Uways based partly on
// Dennie Hoopingarner's http://clear.msu.edu/dennie/matic/mixer/

function writeWord(word, id) {
  const answer = word.innerHTML.replace(/\s/g,'')
  document.getElementById("MST" + id).value += answer + " "
  var coloredWord = document.createElement("span")
  coloredWord.className = word.getAttribute('wordtype') + '-text'
  coloredWord.innerHTML = answer
  document.getElementById("MS" + id).appendChild(coloredWord)
  document.getElementById("MS" + id).appendChild(document.createTextNode(" "))

  word.disabled = true
  document.getElementById("tt" + word.id).className = "mdl-tooltip mdl-tooltip--large"
}

function clearAnswer(id) {
  document.getElementById("MST" + id).value = ""
  document.getElementById("MS" + id).innerHTML = ""
  var buttons = document.getElementById("q" + id).childNodes
  buttons.forEach(function(button, index) {
    button.disabled = false
  })
  document.getElementById("result" + id).innerHTML = ""
}

function checkAnswer2(SC) {
    studentArray = new Array();
    correctArray = new Array();
    myWrong = 0
    CA = (eval("S" + SC))
    studentAnswerA = eval("document.forms[1].MS" + SC + ".value")
    studentAnswer = studentAnswerA.substr(0, studentAnswerA.length - 1)
    if (CA == studentAnswer) {
        alert("Correct.")
    } else {
        correctArray = CA.split(" ")
        studentArray = studentAnswer.split(" ")
        // Check the studentAnswer, word by word
        myRight = correctArray.length
        for (var i = 0; i <= correctArray.length; i++) {
          if (studentArray[i] != correctArray[i]) {
              myWrong++
          }
        }
        alert("Out of a total of " + correctArray.length + " words, you got " + myWrong + " words wrong.")
    }
}

function checkAnswer(id) {
  var answer = document.getElementById("MST" + id).value.trim()
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        document.getElementById("result" + id).innerHTML = this.responseText
      } else {
        // Error :(
      }
    }
  }
  var url = window.location.protocol + "//" + window.location.host + window.location.pathname
  http.open("POST",url + "/check", true)
  http.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  http.send(JSON.stringify({id: id, answer: answer}))
}
