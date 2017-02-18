const c = require('./utilities.js')

var readable = function(parts) {
  var parsed = ""
  parsed = parts.replace(/\bn/gi, "noun")
  parsed = parsed.replace(/\bpron/gi, "pronoun")
  parsed = parsed.replace(/\bprep/gi, 'preposition')
  parsed = parsed.replace(/det/gi, 'determiner')
  parsed = parsed.replace(/\bv/gi, 'verb')
  parsed = parsed.replace(/adv/gi, 'adverb')
  parsed = parsed.replace(/adj/gi, 'adjective')
  parsed = parsed.replace(/\bbe/gi, 'be-verb')
  parsed = parsed.replace(/q/gi, 'qualifier')
  parsed = parsed.replace(/\bart/gi, 'article')
  parsed = parsed.replace(/conj/gi, 'conjuncture')
  parsed = parsed.replace(/auxv/gi, 'auxiliary-verb')
  parsed = parsed.replace(/aux/gi, 'auxiliary')
  parsed = parsed.replace(/inf/gi, 'infinitive')
  parsed = parsed.replace(/posn/gi, 'possessive-noun')
  parsed = parsed.replace(/posp/gi, 'possessive-pronoun')
  arsed = parsed.replace(/mod/gi, 'modals')
  return parsed
}

module.exports = {
  readable: readable
, shuffleBoth: function(question) {
    var words = question.sentence.split(" ")
    var parts = readable(question.parts).split(" ")

    var i = words.length
    if (i == 0) return {sentence: "", parts: ""}
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1 ))
        var a = words[i]
        var b = words[j]
        words[i] = b
        words[j] = a

        var a = parts[i]
        var b = parts[j]
        parts[i] = b
        parts[j] = a
    }

    return {sentence: words.join(' '), parts: parts.join(' ')}
  }
}
