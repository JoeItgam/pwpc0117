//Cargando el static server
var staticServer = require("./static-Server");
//Cargando una libreria que permite parsear la informacion del formulario 
var querystring = require('querystring');
//Creamos un cliente
var mongo = require('mongodb').MongoClient;
//Importamos config
var config = require('../config/config.js');
//Guardamos url
var url = 'mongodb://localhost:27017/inventario';
//archivo que contiene los manejadores correspodientes
//al "api" de mi aplicación
var author = {
    "name" : "Olivas Jimenez Jose",
    "Department" : "Computer and System",
    "University" : "TNM GAM"
};
//manejadores
var getAuthorInfo = function(req, res){
    //Estableciendo el mime apropiado para dar a conocer al 
    //navegador que se enviara un json
    res.writeHead(200, {
        "Content-Type" : "application/json"
    });
    
    //Serializar la respuesta
    var jsonResponse = JSON.stringify(author);
    res.end(jsonResponse);

    //console.log("> Respondiendo petición....");
    //res.write('> Name: Olivas Jimenez Jose\n');
    //res.write('> Departament: Software depeloper\n');
    //res.write('> Location: LINNDET Room');
    //res.end();
    }

var getServerName = function(req, res){
    console.log('Respondiendo nombre del server...!');
    res.end('> Servidor La fiera.');
}

var getServerTime = function(req, res){
    console.log("> Solicitando hora.".data)
    var date = new Date;
    var hora = date.getHours();
    var minuto = date.getMinutes();
    var seg = date.getSeconds();

    res.writeHead(200,{
        'Content-Type' : 'text/html'
    });
    if (hora >= 0 && hora < 12) {
        res.write(`<body background = "img/BD.jpg" ></body>`);
        res.write("<br><h1><center>Muy buenos dias....!</center></h1>");
        res.write(`<h2><center>La hora actual del server es:</center></h2>`);
        res.end(`<h2><center> ${hora} : ${minuto} : ${seg}</center></h2>`);           
    }
    else if (hora >= 12 && hora < 16 ) {
        res.write(`<body background = "img/BT.jpg"></body>`);
        res.write("<h1><center><font color = 'white'>Muy buenas tardes....!</font></center></h1>");
        res.write(`<h2><center><font color = 'white'>La hora actual del server es:</font></center></h2>`);
        res.end(`<h2><center><font color = 'white'>${hora} : ${minuto} : ${seg}</font></center></h2>`);
    }
    else{
        res.write(`<body background = "img/BN1.jpg">`);
        res.write("<h1><center><font color ='white'>Muy buenas noches...!</font></center></h1>");
        res.write(`<h2><center><font color = 'white'>La hora actual del server es:</font></center></h2>`);
        res.end(`<h2><center><font color = 'white'>${hora} : ${minuto} : ${seg}</font></center></h2>`);
    }

};


//Insertar valores al formulario de agregar articulos
var getPostArticulos = function(req, res){
    //Viendo el tipo de peticion 
    if (req.method === "POST") {
        //Procesar formulario
        var postData = "";
        //Create listener
        //*Event driven programing
        req.on("data",function(dataChunk){
            postData += dataChunk;
            //Agregando seguridad 
            if(postData.length > 1e6){
                //Destruir la conexion
                console.log('> Actividad maliciosa detectada por parte de un cliente.');
                req.connection.destroy();
            }
        });
        //Registrando otro listener ante un cierre de conexion
        req.on("end",function() {
            //Rescatar los datos recibidos del cliente
            console.log(`> Data Received: ${postData}`.data);
            var data = querystring.parse(postData);
            //Replicar los datos recibidos
            res.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            //Respondiendo con una replica de los datos recibidos
            res.write(`<body bgcolor = "ADD8E6"></body>`);
            res.write("<h1>EXCELENTE.</h1>");
            res.write("<h3>Datos agregados:</h3>");
            res.write(`<link rel="stylesheet" href="vendor/sweetalert/dist/sweetalert.css">
                <script src="vendor/sweetalert/dist/sweetalert.min.js"></script>`);
            res.write(`<!-- Cargando Bootstrap -->
            <link rel="stylesheet" href="vendor\bootstrap\dist\css\bootstrap.min.css";>
            <!--Cargando estilos de bootstrap -->
            <link rel="stylesheet" href="vendor\bootstrap\dist\js\bootstrap.min.js">
            <!-- Cargando Bootstrap -->
            <script src="vendor\bootstrap\dist\js\bootstrap.min.js"></script>`);
            
            for(var key in data){
                //if(data.hasOwnProperty(key)){
                    res.write(`<ul><li>${key.toString().toUpperCase()} : ${data[key]}</li></ul>`);
                //};
            }
            mongo.connect(url, function(err, db){
                    console.log("conectado a mongo".green);
                    if (err) {
                        res.end(`<script>sweetAlert("error", "Conexion erronea.", "error");</script>`)
                    } else {
                        var collection = db.collection('inventario');
                        collection.insert(querystring.parse(postData), function (err, data) {
                            if (err) {
                                console.log('Error..!'.red);
                                res.write(`<script>sweetAlert("Error", "Datos no agregados a la BD.", "error");</script>`)
                            };
                            console.log("Los datos han sido insertados".rainbow);
                            res.write(`<script>sweetAlert("Excelente", "Se agrego articulo exitosamente.", "success");</script>`);
                            db.close();
                             //Cierro la ul y la conexion
                             
                             res.end(`<input type="button" class="btn btn-primary" value="Pagina principal" onclick="location.href='index2.html'">`);
                        });
                    }
                });
                console.log("> Se solicita raiz get")
            });
        }else{
        //Se sirve el index.html
        staticServer.server(req, res);
    }
};

var getData = function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
       
    });
    res.write(`<center><h1><strong>Inventario</strong></h1></center><br>`);
    res.write(`<body style="background-color:#9AD1ED;"></body>`);

    //Conexion a la BD
    mongo.connect(url, function (err, db) {
        var collection = db.collection('inventario');
        collection.find().toArray(function (err, data) {
            console.log('Mostrando archivos'.cyan);
            if (err) throw err;
            res.write('<link rel="stylesheet" href="vendor/bootstrap/dist/css/bootstrap.css">');
            for (var dato in data) {
                res.write(`<strong>Producto;</strong>`);
                res.write('<div class="container col-md-12"><ul>')
                for (var key in data[dato]) {
                    if (Object.prototype.hasOwnProperty.call(data[dato], key)) {
                        res.write(`<li>${key.toString().toUpperCase()} : ${data[dato][key]}</li>`);
                    }
                }
                res.write(`</ul></div>`);
            }
            res.write(`<div>`);
            res.write(`<input type="button" class="btn btn-primary" value="index" onclick="location.href='index2.html'">`);
            res.end(`</div>`);
    });
        db.close();
    });
}
/*
var getPostRoot = function(req, res){
    //Viendo el tipo de peticion 
    if (req.method === "POST") {
        //Procesar formulario
        var postData = "";
        //Create listener
        //*Event driven programing
        req.on("data",function(dataChunk){
            postData += dataChunk;
            //Agregando seguridad 
            if(postData.length > 1e6){
                //Destruir la conexion
                console.log('> Actividad maliciosa detectada por parte de un cliente.');
                req.connection.destroy();
            }
        });
        //Registrando otro listener ante un cierre de conexion
        req.on("end",function() {
            //Rescatar los datos recibidos del cliente
            console.log(`> Data Received: ${postData}`.data);
            var data = querystring.parse(postData);
            //Replicar los datos recibidos
            res.writeHead(200, {
                'Content-Type' : 'text/html'
            });
            //Respondiendo con una replica de los datos recibidos
            res.write("<h1>Excelente..!</h1>");
            res.write('<ul>');
            for(var key in data){
                //if(data.hasOwnProperty(key)){
                    res.write(`<li>${key.toString().toUpperCase()} : ${data[key]}</li>`);
                //};
            }
            //Cierro la ul y la conexion
            res.end('</ul>');
        });
    }else{
        console.log("> Se solicita raiz get")
        //Se sirve el index.html
        staticServer.server(req, res);
    }
};
*/
var handlers = {};
handlers["/"] = getPostArticulos;
handlers["/data.html"] = getData;
handlers["/getauthorinfo"] = getAuthorInfo;
handlers["/getservername"] = getServerName;
handlers["/getservertime"] = getServerTime;

module.exports = handlers;