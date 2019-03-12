module.exports = dexy

function dexy () {
  var current = -1
  var subtests = 0
  var queue = []

  return test

  function test (fn) {
    ~current ?
      (queue.splice(current + subtests++, 0, fn)) :
      (queue.push(fn), run())
  }

  function run () {
    if (~current) return

    var test = queue.shift()
    current = test ? 0 : -1
    subtests = 0

    test && test(function () {
      setTimeout(function () {
        run(current = -1)
      })
    })
  }
}
