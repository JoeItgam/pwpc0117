const app = require('./app.js'),
      colors = require('colors');
app.listen(app.get('PORT'), function (res) {
      console.log(`>Escuchando en el puerto: ${app.get('PORT')}`.green)
});
