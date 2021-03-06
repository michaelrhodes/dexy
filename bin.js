#!/usr/bin/env node

var fs = require('fs')
var os = require('os')
var path = require('path')
var child = require('child_process')
var random = require('math-random')
var parallel = require('run/parallel')
var template = read('script.template')
var spy = resolve('console-spy')

var code = 0
var node = process.argv[0]
var files = process.argv.slice(2)
var limit = between(1, 5, os.cpus().length)
var multiple = files.length > 1
var opts = {
  cwd: process.cwd(),
  env: process.env,
  stdio: ['ipc']
}

parallel(limit, files.map(prepare), function (err, codes) {
  if (err) console.error(err)
  if (err && !code) code = 1
  process.exit(codes.filter(nonzero)[0] || code)
})

function prepare (file) {
  var test = path.resolve(file)
  var prefix = ''

  if (multiple) {
    var ext = path.extname(test)
    var name = path.basename(test, ext)
    prefix = '[' + name + '] '
  }

  return function (done) {
    var id = 'dexy_' + random()
      .toString(32)
      .substr(2)

    var script = template
      .replace(/{id}/g, id)
      .replace(/{spy}/, spy)
      .replace(/{test}/, test)

    var runner = child
      .spawn(node, ['-e', script], opts)
      .once('error', done)
      .once('close', function (code) {
        done(null, code)
      })
      .on('message', function (failed) {
        if (!code && failed[id]) code = 1
      })

    runner.stdout.on('data', function (buf) {
      process.stdout.write(prefix + buf)
    })

    runner.stderr.on('data', function (buf) {
      process.stderr.write(prefix + buf)
    })
  }
}

function resolve (module) {
  return require.resolve(module, {
    paths: [path.join(__dirname, 'node_modules')]
  })
}

function read (filename) {
  var filepath = path.resolve(__dirname, filename)
  return fs.readFileSync(filepath, 'utf8')
}

function between (min, max, num) {
  return Math.max(min, Math.min(max, num))
}

function nonzero (code) {
  return code !== 0
}
