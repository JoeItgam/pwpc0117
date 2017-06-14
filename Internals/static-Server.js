//Funcionalidad de servidor estatico
//Cargando dependencias
var fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    config = require('../config/config');
    

//Exportando funcionalidad de servidor estatico
exports.server = function(req, res){
    var resourcePath;
    if(req.url == "/"){
        //El cliente no especifica recurso
        //enviar a index
        resourcePath = path.resolve('./static/index.html');
        
    }else{
        //Obteniendo la ruta absoluta del recurso que se desea servir
        resourcePath = path.resolve(config.STATIC_PATH + req.url);
    }
    console.log(`> Recurso solicitado: ${resourcePath}`.data);

    //Extrayendo la extension de la url
    var extName = path.extname(resourcePath);

    //Asignando un Content-Type dependiendo de la extencion de la url
    //Dejamos de un lado el switch y ocupamos mime
    //Creando la variable content-Type
    var ContentType = mime.lookup(extName);
   
   /* switch (extName) {
        case '.js':
            ContentType = 'text/javascript'
            break;
        case'.css':
            ContentType = 'text/css'
            break;
        case'.html':
            ContentType = 'text/html'
            break;
        default:
            ContentType = 'text/plain'
            break;
    }*/
    //Todo verificar la extencion del recurso
    //callback de exist es un booleano
    fs.exists(resourcePath,function(exits){
        if(exits){
            console.log('>Recurso existe...'.err);
            //El recurso existe y se intentara leer
            fs.readFile(resourcePath, function(err, content){
                //Verificar si hay error en lectura de archivo
                if(err){
                    console.log('>Error en lectura del recurso.'.error);
                    //Hubo error de lectura
                    res.writeHead(500,{
                        'Content-Type' : 'text/html'
                    });
                    res.write(`<center><img src = "img/ERR.jpg"></center> `);
                    res.write(`<body bgcolor = "#FFFFCC"></body>`);
                    res.write('<h1>Lo sentimos :C</h1>');
                    res.write('<h2>500: Error interno</h2>');
                    res.write('<h3>Espera un momento y recarga la</h3>');
                    res.write('<h3>pagina si el problema persiste</h3>');
                    res.write('<h3>contactanos...!</h3>');
                    res.end('<h4>Tel: 48-67-87-65</h4>');
                }
                else{
                    console.log(`>Se despacha el recurso: ${resourcePath}`.info);
                    //No hubo error
                    //Se envia el contenido al cliente
                    res.writeHead(200, {
                        'Content-Type' : ContentType,
                        'Server' : 'ITGAM@0.0.1'
                    });
                    res.end(content, 'utf-8');
                }
            });
            //res.writeHead(200,{
                //'Content-Type' : ContentType,
                //'Server' : 'ITGAM@0.0.1'
            //});
            //res.end('<h1>200: Si existe el recurso</h1>');
        }
        else{
            //El recurso no existe
            console.log('>El recurso no fue encontrado...'.inf );
            res.writeHead(404,{
                'Content-Type' : 'text/html',
                'Server' : 'ITGAM@0.0.1'
            });
            res.write(`<center><img src = "img/ERR.jpg"></center> `);
            res.write(`<body bgcolor = "#FFFFCC"></body>`);
            res.write('<h1><center><font color = "grey">Accion invalida :C</font></center></h1>');
            res.write('<h2><center><font color = "grey">404: ¡¡ Not Found !!</font></center></h2>');
            res.write('<h3><center><font color = "grey"> Lo mas probable es que la ruta</font></center></h3>');
            res.write('<h3><center><font color = "grey"> no sea correcta verificala y</font></center></h3>');
            res.end('<h3><center><font color = "grey"> vuelve a intentarlo..!</font></center></h3>');
            
        }
    });
}