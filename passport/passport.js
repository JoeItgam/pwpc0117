const localStrategy = require('passport-local').Strategy,
      mongo = require('mongodb').MongoClient,
      url = 'mongodb://joe:123JoePWPC@ds135700.mlab.com:35700/invprofin',
      colors = require('colors');

module.exports = function (passport) {
    //Serializando y deserealizando objeto(convertir a un string)
    passport.serializeUser(function (user, done) {
        done(null, user);      
    });
    passport.deserializeUser(function (obj, done) {
        done(null,obj);
    });
    //Autenticacion
    passport.use(new localStrategy({
        passReqToCallback: true
    }, function (req, email, password, done) {
        //console.log(`Usuario ${email} iniciando sesion..`.red);
        //Autenticando usuarios
        console.log('>Conectando a la BD..!'.green);
        mongo.connect(url,function(err,db){
            if(err) throw err;
            var collection = db.collection('users');
            collection.find({email : email}).toArray(function(err,user){
                if(err) throw err;
                if(password === user[0].password){
                    db.close();
                    console.log('>Cerrando BD...'.green);
                    return done(null,user);
                }
                console.log('>Hubo en error al iniciar secion'.red);
                return done(null,false, req.flash('authmessage','Correo o Password incorrectos'));
            }); 
        });
    }))
}