var cp = exports.cp =require("child_process");
var es = exports.es =require("event-stream");
var fs = require("fs");
var path = require("path");



var fread=exports.fread=(file)=>fs.readFileSync(path.resolve(file), {encoding:"utf8"}); 
var fwrite=exports.fwrite=(file,data)=>fs.readWriteSync(path.resolve(file), (typeof(data)=="string"?data:JSON.stringify(data)), {encoding:"utf8"}); 




