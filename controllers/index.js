//Carga controlodores
const fs = require('fs'),
      path = require('path'),
      files = fs.readdirSync(__dirname);

files.forEach(function(file){
    var fileName = path.basename(file, '.js');
    
    if(fileName !== 'index'){
        exports[fileName] = require('./'+fileName);
    }
});

