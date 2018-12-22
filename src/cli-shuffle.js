#!/usr/bin/env node
var es = require('event-stream')

const linebreak = "\r\n"

function shuffle(o) {for(var j,x,i=o.length;i;j=Math.floor(Math.random()*i),x=o[--i],o[i]=o[j],o[j]=x);return o;};

process.openStdin()
    .pipe(es.split(/\r?\n/))
    .pipe(es.writeArray(function(err, array) {
         if(!err) {

        console.debug(`${array.length} lines read from process.stdin`);
         
        var data=array.filter((v,k)=>!!v).map(line=>String(line).trim()+linebreak)
        shuffle(data);
        
        es.readArray(data)
            .pipe(process.stdout)
        //console.log(JSON.stringify(array.filter(x=>!!x)));
    } else {
        console.error(err);
    }
  }))