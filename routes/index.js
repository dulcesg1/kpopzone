var express = require('express');
var router = express.Router();
var nombres = ['Omar','Brenda','Jessica','Beto','Belem', 'Cynthia','Juan Luis','Francisco','Estefania','Sagrario'];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page:'Home', menuId:'Home' });
});
/* Ruta nueva al Ubicación*/
router.get('/ubicacion', function(req, res, next) {
  res.render('pages/ubicacion', { page: 'ubicacion', menuId: 'ubiacion' });
});
/* Ruta nueva al inicio de sesión*/
router.get('/iniciarsesion', function(req, res, next) {
  res.render('pages/iniciarsesion', { page: 'iniciarsesion', menuId: 'iniciarsesion' });
});
/* Ruta nueva al Registro*/
router.get('/registrase', function(req, res, next) {
  res.render('pages/registrarse', { page: 'registrarse', menuId: 'registrarse' });
});
/* Ruta nueva a la Bienvenida*/
router.get('/bienvenida', function(req, res, next) {
  res.render('pages/bienvenida', { page: 'bienvenida', menuId: 'bienvenida' });
});
/* Ruta nueva a Geolocalizacion*/
router.get('/geo', function(req, res, next) {
  res.render('pages/geo', { page: 'geo', menuId: 'geo' });
});
 //Método POST
 router.post('/',function(req,res){
   res.send('Tengo una petición con POST');
 });
//Método PUT
router.put('/',function(req,res){
  res.send('Te doy un saludo con Greeting');
});

//Método DELETE
router.delete('/',function(req, res){
  res.send('Te doy un saludo con DELETE');
});

module.exports = router;
