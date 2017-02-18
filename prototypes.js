Array.prototype.shuffle = function() {
    var i = this.length
    if (i == 0) return this
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1 ))
        var a = this[i]
        var b = this[j]
        this[i] = b
        this[j] = a
    }
    return this
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
