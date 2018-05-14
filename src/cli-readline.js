#!/usr/bin/env node
var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");
var argv = require("minimist")(process.argv.slice(2));

var {fread,fwrite,csv,remap,mapping,loadini,parsecsv} = require('./remap');







var readline = function(inputStream,fnMap=function(data,callback) { callback(null,data) }) {
  inputStream
    .pipe(es.split())
    .pipe(es.map(fnMap))
    .pipe(process.stdout)
    /*
    .pipe(es.writeArray(function(err, array) {
      console.log(JSON.stringify(array));
    }))
    /* */
}

var file = "D:\\Dokumente\\iv\\annika.txt";

var stdin, fileName;
if(fileName=argv._[0]) {
  stdin = fs.createReadStream(path.resolve(fileName),{encoding:"utf8"})
} else {
  stdin=process.openStdin();
}

if(!stdin) {
  console.log("USAGE: readline [FILE]");
  process.kill(1);
} else {
  if(argv.csv === true) {
    var fn=parsecsv();
  } else if (argv.csv) {
    var fn=parsecsv(argv.csv.split(","))
  } else if (argv.remap) {
    var fn=function(data,callback) { var data=(data?remap(data)+"\r\n":""); callback(null,data) }
  } else {
    var fn=function(data,callback) { callback(null,data) }
  }
  readline(stdin,fn);
} 


/* */