module.exports = queue

function queue () {
  var running = false
  var subtests = 0
  var queue = []

  return test

  function test (fn) {
    running ?
      (queue.splice(subtests++, 0, fn)) :
      (queue.push(fn), run())
  }

  function run () {
    var test = queue.shift()
    running = !!test
    subtests = 0

    running && test(function () {
      setTimeout(function () {
        run(running = false)
      })
    })
  }
}
