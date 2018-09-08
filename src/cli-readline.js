#!/usr/bin/env node
var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");
var argv = require("minimist")(process.argv.slice(2));



try {
  var {fread,fwrite,csv,remap,mapping,loadini,parsecsv} = require('./remap');


  var encodeRoute=(s)=>s.split(/\\|\//).map(routePart=>encodeURIComponent(routePart)).join('/');

  var remap=(mapping,fn)=>{
    fn=fn||encodeRoute;
    return function(data,callback) { 
      try { 
        data = Object.entries(mapping)
          .reduce((data,[k,v])=>data.replace(fn(k),v), fn(data));
          callback(null,data+"\n");
      } catch(err) {
        callback(err);
      }
    };
  };

  if (argv.remap) {
    if(String(argv.remap).includes("=")) {
      var list=argv.remap.split(/,/);
      list.forEach(entry => {
        var [key,val]=entry.split("=");
        mapping[key]=val;
      });
    }
    //var fn=function(data,callback) { var data=(data?remap(mapping,)+"\r\n":""); callback(null,data) }
    var fn=remap(mapping,encodeRoute)
  } else {
    throw Error('Missing Parameter');
  }

  //read stream
  if(fileName=argv._[0]) {
    var stream = fs.createReadStream(path.resolve(fileName),{encoding:"utf8"})
  } else {
    var stream = process.openStdin()
  }
  
  
  stream
  .pipe(es.split())
  .pipe(es.map(fn))
  .pipe(process.stdout)

} catch(e) {

  console.log(e.message);
  console.log(`USAGE: dir D:\Dokumente\iv\*.* /s/b | readline --remap="D:\Dokumente=http://iis" | tojson`);
}