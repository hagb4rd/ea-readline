var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");

var {fread,fwrite,csv,remap,mapping,loadini} = require('./remap');


var stdin=process.openStdin();

if(!stdin) {
  console.log(process.argv);
  
} else {

  process.stdin                        //connect streams together with `pipe`
    .pipe(es.split())                  //split stream to break on newlines
    .pipe(es.map(function (data, cb) { //turn this async function into a stream
      cb(null, remap(data,mapping)[0]+'\n')          //render it nicely
    }))
    .pipe(es.wait(function (err, body) {
      console.log(JSON.stringify(body.split('\n').slice(0,-2)));
    }))
    /*
    .pipe(es.writeArray(function(err,array){
      return JSON.stringify(array);
    }))
    /* */
    //.pipe(process.stdout)              // pipe it to stdout 
};