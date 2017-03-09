//Exportando objetos
exports.module = {
    "IP":"127.0.0.1" || process.env.IP,
    "PORT":"3000" || process.env.PORT,
    //Las actualizaciones en colors se expresan como objetos
    "color_theme" : {
        "info":"rainbow",
        "data":"green",
        "error":"red",
        "warning":"yellow"    
    },
    //Configurando rutas estTICAS
    "STATIC_PATH":"./static"
};

