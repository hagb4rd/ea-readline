#!/usr/bin/env node
var es = require('event-stream')

process.openStdin()
  .pipe(es.split())
  .pipe(es.writeArray(function(err, array) {
      console.log(JSON.stringify(array.filter(x=>!!x)));
  }))