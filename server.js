<<<<<<< HEAD
const app = require('./app.js'),
      colors = require('colors');
app.listen(app.get('PORT'), function (res) {
      console.log(`>Escuchando en el puerto: ${app.get('PORT')}`.green)
});
=======
//Cargar modulo http
var http = require('http');
//Cargar modulo fs
var fs = require ('fs');
//Cargar el modulo Path
//Administrar rutas
var path = require('path');
//Cargando colors
var colors = require('colors');
//Cargando configuraciones
var config = require("./config/config");
//Cargando el modulo mime
var mime = require('mime');
//Importando los handlers
var handlers = require('./Internals/handlers');
//Importando la funcionalidad del servidor estatico
var staticServer = require('./Internals/static-Server');

//Establecer el tema de colors
colors.setTheme(config.color_theme);

//Creando server
var server = http.createServer(function(req,res){
    //Logear peticion
    console.log(`> Peticion entrante: ${req.url}`.data);
    //Variable que almacena la ruta absulta del archivo hacia el servidor
    //Verificando si la url corresponde a un comando de mi API
    if(typeof(handlers[req.url]) == 'function'){
        //Existe el manejador en mi API
        //Entonces mando a ejecutar el manejador con los parametros que pide
        handlers[req.url](req, res);
    }else{
        //No existe el manejador en mi API
        //Entonces intento servir la url como recurso estatico
        staticServer.server(req, res);
    }
});

//Poniendo en ejecucion el server
server.listen(config.PORT, config.IP, function(){
    console.log(`> Server escuchando en http//${config.IP}:${config.PORT}`.info);
});
>>>>>>> 47c41c9074472221473d87239abcb9bf0ea3baed
