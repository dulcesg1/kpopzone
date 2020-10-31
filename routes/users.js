var express = require('express');
var router = express.Router();
const User = require('../model/user');
/* GET users listing. */
router.get('/',function (req, res, next) {
  res.send('respond with a resource');
});
/* LOGIN */
router.post('/signup',function (req, res, next) {
  var user = new User({
    email:req.body.email,
    password: req.body.password,
    nombre:req.body.nombre,
    apPat:req.body.apPat,
    apMat:req.body.apMat

  });

  //Guarda un registro en Mongo
   user.save((err, response) => {
     if (err)res.status(400).send(err);
     res.status(200).redirect('/iniciarsesion');
   });
  //Busca un registro mediante el email
 // User.findById(req.body.email, (err, user) => {
 // if (err) res.status(400).send(err);
 // res.status(200).send(user);
  //});
});

router.post('/login',function (req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  //Busca un registro mediante el email
  User.findBy({email,password}, (err, user) => {
  if (err) res.status(400).send(err);
  res.status(200).redirect('/home');
  
  });
});

module.exports = router;
