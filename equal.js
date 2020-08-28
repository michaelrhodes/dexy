module.exports = equal

var keys = Object.keys
var json = JSON.stringify

// Note: ArrayBuffers are stringified into empty objects and thus
// return false positives, but all other types should just work™

function equal (v0, v1, k0, k1, j0, j1, i, l) {
  if (v0 === v1) return true
  if (v0 && v1 && ((l = k0 = keys(v0)).length) !== (k1 = keys(v1)).length) return false
  for (i = 0; i < l; i++) if (!equal(v0[k0[i]], v1[k1[i]])) return false
  return (j0 = json(v0)) && (j1 = json(v1)) && j0 === j1
}
