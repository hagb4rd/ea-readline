var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");

var {fread,fwrite,csv,remap,mapping,loadini,parsecsv} = require('./remap');



var stdin=process.openStdin();

process.stdin
  .pipe(es.map(parsecsv))
  .pipe(es.stringify())
  .pipe(process.stdout)