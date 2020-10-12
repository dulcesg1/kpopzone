var express = require('express');
var router= express.Router();

//Agrega el método GET
router.get('/',function(req, res, next){
    res.render('acercade', { page:'acercade', menuId:'acercade'});
});

module.exports = router;