//Exportando objetos
module.exports = {
    "IP": process.env.IP || "0.0.0.0",
    "PORT": process.env.PORT || "3000",
    //Las actualizaciones en colors se expresan como objetos
    "color_theme" : {
        "info":"rainbow",
        "data":"green",
        "error":"red",
        "warning":"yellow",  
        "favorite" : "pink"  
    },
    //Configurando rutas estTICAS
    "STATIC_PATH":"./static",
    "dbStringConnection" : procces.env.DB || "mongo:/localhost:27017/bodega"
};
//$env: MyTestVariable = "My temporary test variable"