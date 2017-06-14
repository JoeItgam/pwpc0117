const mongo = require('mongodb').MongoClient,
      url = 'mongodb://joe:123JoePWPC@ds135700.mlab.com:35700/invprofin',
      colors = require('colors');

module.exports = {
    getSignUp: function(req, res, next){
        return res.render('users/signup')
    },

    postSignUp: function(req, res, netx){
            mongo.connect(url,function(err,db){
            var collection = db.collection('users');
            collection.insert(req.body,(err,data)=>{
                if (err) throw err; 
                console.log('Datos guardados en la BD..'.red); 
            });
        });
        req.flash('info','Registro exitoso.')
        return res.redirect('/user/signin');    
    },

    getSignIn: function(req, res, next) {
        return res.render('users/signin',
                           {
                               message: req.flash('info'), 
                               authmessage : req.flash('authmessage')
                            });
    },

    logout: function (req, res, next) {
        req.logout(),
        res.redirect('/')
    },

    getUserReg: function (req, res, next) {
        res.render('users/registrar', {
            isAuthenticated : req.isAuthenticated(),
			user : req.user
        })
    },
    
    postUserReg: function(req, res, netx){
            mongo.connect(url,function(err,db){
            var collection = db.collection('eventos');
            collection.insert(req.body,(err,data)=>{
                if (err) throw err; 
                console.log('Datos guardadosa en la BD..'.red); 
            });

        });
        req.flash('info','Registro exitoso.')
        return res.redirect('/user/registrar');
    },

    getUserSearch: function (req, res, next) {
        return res.render('users/buscar', {
            isAuthenticated : req.isAuthenticated(),
			user : req.user
        })
    },

    postUserSearch: function(req, res, next){
        mongo.connect(url, function(err, db) {
            if (err) throw err;
            db.collection('eventos').find().toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
            });
        });
        return res.redirect('/prueba');
    },

    /*prueba: function (req, res, next) {
        res.render('users/prueba', {
            isAuthenticated : req.isAuthenticated(),
			user : req.user
        });*
    }*/
}