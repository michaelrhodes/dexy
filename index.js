module.exports = dexy

function dexy () {
  var current = false
  var subtests = 0
  var queue = []

  return test

  function test (fn) {
    current ?
      (queue.splice(subtests++, 0, fn)) :
      (queue.push(fn), run())
  }

  function run () {
    var test = queue.shift()
    current = !!test
    subtests = 0

    current && test(function () {
      setTimeout(function () {
        run(current = false)
      })
    })
  }
}
