#!/usr/bin/env node
var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");


var {fread,fwrite,csv,remap,mapping,loadini} = require('./remap');


if(process.argv[3]) {
  var key=process.argv[2].replace(/$"|"^/,'');
  var val=process.argv[3].replace(/$"|"^/,'');
  mapping[key]=val;
  console.log(mapping);
  console.log(key,val);
}
else if(process.argv[2]) {
  var filepath=path.resolve(process.cwd(), process.argv[2]);
  if(fs.existsSync(filepath)) {
    var contents=fs.readFileSync(filepath, {encoding: 'utf-8'});
    Object.assign(mapping, ini.parse(contents));
  } 
}

process.stdin                        //connect streams together with `pipe`
.pipe(es.split(/(\r?\n)/))                  //split stream to break on newlines
.pipe(es.map(function (data, cb) { //turn this async function into a stream
  cb(null, remap(data,mapping)[0]+'\n')          //render it nicely
}))
.pipe(es.wait(function (err, body) {
  console.log(JSON.stringify(body.split('\n').slice(0,-2)));
}))