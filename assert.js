module.exports = assert

function assert (name, a, b) {
  arguments.length === 3 ?
    console.assert(a === b, name, values(a, b)) :
    console.assert(a, name)
}

function values (a, b) {
  return '(' +
    'wanted: ' + JSON.stringify(b) + '; ' +
    'got: ' + JSON.stringify(a) +
  ')'
}
