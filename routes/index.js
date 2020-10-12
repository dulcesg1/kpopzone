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
