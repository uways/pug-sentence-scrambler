require('./prototypes.js')
var express = require('express')
var bodyParser = require('body-parser')
var auth = require('basic-auth')
const c = require('./utilities.js')
const db = require('./data.json')
var app = express()

// Clear cache
Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
});

app.use(bodyParser.json())
app.set('view engine', 'pug')
app.locals.pretty = true

app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.render('index')
})

app.get('/home', function(req, res) {
  //res.sendFile('index.html', { root: __dirname + '/public' })
  res.render('index')
})

app.get('/:tense(present|past|future)', function(req, res) {
  //res.sendFile('index.html', { root: __dirname + '/public' })
  res.render('index')
})

app.get('/:tense/:type/', function(req, res) {
  const name = db[req.params.tense][req.params.type].name + " - Select Difficulty Level"
  res.render('levelselect', {
    title: name
  })
})

app.get('/:tense/:type/:level', function(req, res) {
  const name = db[req.params.tense][req.params.type].name + ' - ' + req.params.level.capitalize()
  var questions = []
  var dbq = db[req.params.tense][req.params.type][req.params.level]

  dbq.forEach(function(question) {
    questions.push(c.shuffleBoth(question))
  })

  res.render('activity', {
    title: name,
    crumbs: [req.params.tense.capitalize(), req.params.type.capitalize(), req.params.level.capitalize()],
    questions: questions
  })
})

app.post('/:tense/:type/:level/check', function(req, res) {
  const answer = req.body
  console.log(answer)
  var dbq = db[req.params.tense][req.params.type][req.params.level]
  if (answer.answer == dbq[answer.id-1].sentence) {
    res.send("Correct!")
  }
  else {
    res.send("Oops, try again.")
  }
})

app.use('/edit', function(req, res) {
  var credentials = auth(req)
  if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'admin') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    //res.sendFile('editor.html', { root: __dirname + '/public' })
    var data = JSON.stringify(db)
    res.render('editor', {data: data})
  }
  //res.sendFile('editor.html', { root: __dirname + '/public' })
})

app.get('/schema', function(req, res) {
  res.sendFile('schema.json', { root: __dirname + '/public' })
})

app.listen(3000)
