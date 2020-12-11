var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje= '';

router.get('/',function(req, res, next){
    // Consumir mediante RESTAPI

    request.get("http://localhost:4000/libro/", (error, response, body)=>{
    
    mensaje= '';
    if(error){ // En caso de que surga un error
       console.error();
       mensaje= 'Error: '+ error;
    }
    console.log(JSON.parse(body)+mensaje);
    //Enviamos la información a la vista en Formato JSON
    res.render('libro/libro',{
        mensaje:mensaje,
        tittle: 'Listado de libros',
        menuId: 'libro',
        page: 'libro',
        data: JSON.parse(body)
        });
    });
});

// Despliega pantalla para agregar libro

router.get('/add',(req,res)=>{
    mensaje= 'Agregando libro';
    //Despliega pantalla para captura de libro
    res.render('libro/add',{
        mensaje:mensaje,
        tittle: 'Agregar un libro', // Título de la página
        Id_Libro:'',// Datos del libro
        Titulo: '',
        Categoria: '',
        Editorial:'',
        FechaPulicacion:'',
        menuId: 'libro',
        page: 'libro',

    });

});

// Agregando un nuevo libro a traves de Microservicios
router.post('/add', function(req, res, next) {
    //Extrae los datos enviados por la forma
    let Id_Libro = req.body.Id_Libro;
    let Titulo = req.body.Titulo;
    let Categoria = req.body.Categoria;
    let Editorial = req.body.Editorial;
    let FechaPulicacion = req.body.FechaPulicacion;
    let errors = false;
    // Si no hay errores
    if (!errors) {
    //Encapsula datos de la forma
    var datosForma = {
    Id_Libro: Id_Libro,
    Titulo: Titulo,
    Categoria: Categoria,
    Editorial: Editorial,
    FechaPulicacion: FechaPulicacion
    }
    request.get({ url: "http://localhost:4000/libro/"+Id_Libro }, (error, response, body)=>{
    
        mensaje= '';
        if(error){ // En caso de que surga un error
           console.error();
           mensaje= 'Error: '+ error;
        }
        console.log(JSON.parse(body)+mensaje);
        let libro=JSON.parse(body);
        if(libro && libro!=""){
            mensaje="El numero de id ya esta registrado";
            res.render('libro/add',{
                mensaje:mensaje,
                tittle: ' Add libro',
                Id_Libro:'',// Datos del libro
                Titulo: '',
                Categoria: '',
                Editorial:'',
                FechaPulicacion:'',
                menuId: 'libro',
                page: 'libro'
                });
        }else{
            request.post({ url: "http://localhost:4000/libro", json: datosForma },
            (error, response, body) => {
           
           mensaje = 'El dato se ha agregado con éxito';
           if (error) {
           console.log(error);
           mensaje = 'Error: ' + error;
           }
           console.log(response);
           res.redirect('/libro'); //Redirige a Listado de libro
           });
           }
           });
        }
        //Enviamos la información a la vista en Formato JSON
       
        });
 //Agrega la funcionalidad en el archivo routes|libro.js para enviar un Id_Libro
// y muestre la información
//Despliega pantalla para Modificar libro
router.get('/editar/:Id_Libro', (req, res) => {
    Id_Libro = req.params.Id_Libro;
    mensaje = 'Modificando libro con Id ' + Id_Libro;
    console.log(mensaje);
    var libroFind;
    //Busca si existe el libro de acuerdo al Id_Libro
    URI = "http://localhost:4000/libro/" + Id_Libro;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
    mensaje = '';
    if (error) { //En caso de que surja un error
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log("libro Encontrado ===>");
    console.log(body);
    //Despliega pantalla para modificar de libro
    res.render('libro/editar', {
    mensaje: mensaje,
    title: 'Modificando libro', //Título de la página
    Id_Libro: JSON.parse(body).Id_Libro, //Datos de libro
    Titulo: JSON.parse(body).Titulo,
    Categoria: JSON.parse(body).Categoria,
    Editorial: JSON.parse(body).Editorial,
    FechaPulicacion: JSON.parse(body).FechaPulicacion,
    menuId: 'libro',
    page: 'libro'
    });
    });        
});

//Agrega la funcionalidad que realiza los cambios en la base de datos
// Modificando un nuevo libroa través del Microservicio
router.post('/editar', function(req, res, next) {
console.log('Modificando un libro');
//Extrae los datos enviados por la forma
let Id_Libro = req.body.Id_Libro;
let Titulo = req.body.Titulo;
let Editorial = req.body.Editorial;
let errors = false;
// Si no hay errores
if (!errors) {
//Encapsula datos provenientes de la forma
var datosForma = {
Id_Libro: Id_Libro,
Titulo: Titulo,
Editorial: Editorial
}
//Invoca al Microservicio de modificar
request.put({ url: "http://localhost:4000/libro", json: datosForma },
(error, response, body) => {
mensaje = 'El dato se ha modificado con éxito';
if (error) {
console.log(error);
mensaje = 'Error: ' + error;
}
console.log(response);
res.redirect('/libro'); //Redirige a Listado de libro
});
}
});

router.get('/delete/:Id_Libro', (req, res) => {
    Id_Libro = req.params.Id_Libro;
    mensaje = 'Eliminando libro con Id ' + Id_Libro;
    console.log(mensaje);
    if (Id_Libro) {
    //Invoca al Microservicio
    URI = "http://localhost:4000/libro/" + Id_Libro;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
    if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log(response);
    res.redirect('/libro'); //Redirige a Listado de libroes
    });
    }
    });


module.exports= router;