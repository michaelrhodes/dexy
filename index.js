module.exports = dexy

function dexy () {
  var timeout = null
  var test = null
  var queue = []

  return function (name, run) {
    queue.push({ name, run })
    start(runner)
  }

  function runner () {
    try {
      test = queue.shift()
      test && test.run(function (result) {
        console.assert(result, test.name)
        start(runner, test = null)
      })
    }
    catch (err) {
      console.assert(false, test.name, err)
      start(runner, test = null)
    }
  }

  function start (runner) {
    if (test) return
    if (!queue.length) return
    clearTimeout(timeout)
    timeout = setTimeout(runner)
  }
}
