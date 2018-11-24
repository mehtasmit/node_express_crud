var fs=require('fs');
var path=require('path');

var files=fs.readdirSync(__dirname);

files.forEach(function(file){
var filename=path.basename(file,'.js');
    if(filename!=="index"){
        exports[filename]=require('./'+filename);
    }
})