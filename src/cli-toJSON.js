#!/usr/bin/env node
var es = require('event-stream')

process.openStdin()
  .pipe(es.split())
  .pipe(es.writeArray(function(err, array) {
    if(!err) {
      console.log(JSON.stringify(array.filter(x=>!!x)));
    } else {
        console.log(err);
    }
  }))