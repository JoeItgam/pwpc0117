const express = require('express'),
      app = express(),
      colors = require('colors'),
      parser = require('body-parser'),
      routes = require('./routes/routes'),
      favicon = require('serve-favicon'),
      flash = require('connect-flash'),
      session = require('express-session'),
      cookieParser = require('cookie-parser'),
      passport = require('passport'),
      //Cargando una libreria que permite parsear la informacion del formulario 
      querystring = require('querystring');
      
      //Declarando rutas
      faviconURL = `${__dirname}/public/images/ojo.jpg`,
      publicDir = express.static(`${__dirname}/public`),
      viewDir = `${__dirname}/views`,
      PORT = process.env.PORT || '3000',
      vendorDir = express.static(`${__dirname}/static/vendor`);
      require('./passport/passport')(passport);



//Configurando aplicacion
app
    
    .set('views', viewDir)
    .set('view engine', 'pug')
    .set('PORT', PORT)

    //Middleware
    .use( cookieParser() )
    .use( session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false
    }) )
    .use( flash() )
    .use(parser.urlencoded({extended: false}))
    .use( favicon(faviconURL) )
    .use(publicDir)
    .use(vendorDir)
    .use( passport.initialize() )
    .use( passport.session() )

    //Ejecutando logica
    .use('/', routes);

//Exportando como modulo independiente
module.exports = app;