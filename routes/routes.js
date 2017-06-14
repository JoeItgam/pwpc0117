const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      //Exportando modulos de Controlers/index
      controllers = require('.././controllers'),
      //Exportando Middleware
      Middleware = require('.././middleware/autenticacion')


router
      //Creando ruta para pagina de inicio
      .get('/', controllers.homeController.index)

      //Ruta de registro para el usuario
      .get('/user/signup', controllers.userController.getSignUp)

      //Ruta del formulario (POST)
      .post('/user/signup', controllers.userController.postSignUp)

      //Ruta para iniciar secion
      .get('/user/signin', controllers.userController.getSignIn)

      //Ruta que autentifica
      .post('/user/signin', passport.authenticate('local',{
            successRedirect : '/',
            failureRedirect : '/user/signin',
            failureFlash : true
      }))

      //Ruta para registrar en el inventario
      .get('/user/registrar', Middleware.isLogged, controllers.userController.getUserReg)

      //Post del registro
      .post('/user/registrar', controllers.userController.postUserReg)

      //Ruta para buscar articulo en el inventario
      .get('/user/buscar',Middleware.isLogged, controllers.userController.getUserSearch)

      //Ruta post para buscar un articulo
      .post('/user/buscar', controllers.userController.postUserSearch)

      //Ruta cuando el usuario ya esta logeado
      .get('/user/logout', controllers.userController.logout);

      //Ruta de prueba
      //router.get('/prueba', controllers.userController.prueba);

//Exportando como modulo independiente
module.exports = router;