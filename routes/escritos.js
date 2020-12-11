var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje= '';
//Realicemos la conexión con el micro servicio modificando el archivoroutes|estudiantes.js
// Listado de estudiantes
/*router.get('/',(req,res)=>{
    console.log('Listado de escritoses');
    res.render('escritos/index',{ tittle: 'Listado de escritos' });
});
*/
router.get('/',function(req, res, next){
    // Consumir mediante RESTAPI

    request.get("http://localhost:4000/escritos/", (error, response, body)=>{
    
    mensaje= '';
    if(error){ // En caso de que surga un error
       console.error();
       mensaje= 'Error: '+ error;
    }
    console.log(JSON.parse(body)+mensaje);
    //Enviamos la información a la vista en Formato JSON
    res.render('escritos/escritos',{
        mensaje:mensaje,
        tittle: 'Listado de escritos',
        menuId: 'escritos',
        page: 'escritos',
        data: JSON.parse(body)
        });
    });
});

// Despliega pantalla para agregar escritos

router.get('/add',(req,res)=>{
    mensaje= 'Agregando escritos';
    //Despliega pantalla para captura de escritos
    res.render('escritos/add',{
        mensaje:mensaje,
        tittle: 'Agregar un escrito', // Título de la página
        Id_Escrito:'',// Datos del escrito
        Id_Autor: '',
        Id_Libro: '',
        Descripcion:'',
        ISBN:'',
        menuId: 'escritos',
        page: 'escritos',

    });

});

// Agregando un nuevo escritos a traves de Microservicios
router.post('/add', function(req, res, next) {
    //Extrae los datos enviados por la forma
    let Id_Escrito = req.body.Id_Escrito;
    let Id_Autor = req.body.Id_Autor;
    let Id_Libro = req.body.Id_Libro;
    let Descripcion = req.body.Descripcion;
    let ISBN = req.body.ISBN;
    let errors = false;
    // Si no hay errores
    if (!errors) {
    //Encapsula datos de la forma
    var datosForma = {
    Id_Escrito: Id_Escrito,
    Id_Autor: Id_Autor,
    Id_Libro: Id_Libro,
    Descripcion: Descripcion,
    ISBN: ISBN
    }
    request.get({ url: "http://localhost:4000/escritos/"+Id_Escrito }, (error, response, body)=>{
    
        mensaje= '';
        if(error){ // En caso de que surga un error
           console.error();
           mensaje= 'Error: '+ error;
        }
      
        console.log(JSON.parse(body)+mensaje);
        let escritos=JSON.parse(body);
        if(escritos==null || escritos==""){
            request.get({ url: "http://localhost:4000/autor/"+Id_Autor }, (error, response, body)=>{
                console.log("Autor"+JSON.parse(body));
        let autor=JSON.parse(body);
        console.log(autor);
        if(autor==null || autor==""){
                mensaje= '';
                if(error){ // En caso de que surga un error
                   console.error();
                   mensaje= 'Error: '+ error;
                }
              
            mensaje="El numero de id autor no esta registrado";
           
            }else{
                request.get({ url: "http://localhost:4000/libro/"+Id_Libro }, (error, response, body)=>{
                    console.log("Libro: "+JSON.parse(body));
            let libro=JSON.parse(body);
            console.log(libro);
            if(libro==null || libro==""){
                mensaje= '';
                if(error){ // En caso de que surga un error
                   console.error();
                   mensaje= 'Error: '+ error;
                }
              
            mensaje="El numero de id libro no esta registrado";
            }else{
                console.log("Dontro else esscrito");
                request.post({ url: "http://localhost:4000/escritos", json: datosForma },
                (error, response, body) => {
               
               mensaje = 'El dato se ha agregado con éxito';
               if (error) {
               console.log(error);
               mensaje = 'Error: ' + error;
               }
               console.log(response);
               res.redirect('/escritos'); //Redirige a Listado de escritos
               });
            }
       
        });
            }
        });  
        }else{
            mensaje="El numero de id escrito ya existe";
            res.render('escritos/add',{
                mensaje:mensaje,
                tittle: 'Agregar un escrito', // Título de la página
                Id_Escrito:'',// Datos del escrito
                Id_Autor: '',
                Id_Libro: '',
                Descripcion:'',
                ISBN:'',
                menuId: 'escritos',
                page: 'escritos',
        
            });
           }
           });
        }
        //Enviamos la información a la vista en Formato JSON
       
        });
 //Agrega la funcionalidad en el archivo routes|escritos.js para enviar un Id_Escrito
// y muestre la información
//Despliega pantalla para Modificar escritos
router.get('/editar/:Id_Escrito', (req, res) => {
    Id_Escrito = req.params.Id_Escrito;
    mensaje = 'Modificando escritos con Id ' + Id_Escrito;
    console.log(mensaje);
    var escritosFind;
    //Busca si existe el escritos de acuerdo al Id_Escrito
    URI = "http://localhost:4000/escritos/" + Id_Escrito;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
    mensaje = '';
    if (error) { //En caso de que surja un error
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log("escrito Encontrado ===>");
    console.log(body);
    //Despliega pantalla para modificar de escritos
    res.render('escritos/editar', {
    mensaje: mensaje,
    title: 'Modificando escrito', //Título de la página
    Id_Escrito: JSON.parse(body).Id_Escrito, //Datos de escritos
    Id_Autor: JSON.parse(body).Id_Autor,
    Id_Libro: JSON.parse(body).Id_Libro,
    Descripcion: JSON.parse(body).Descripcion,
    ISBN: JSON.parse(body).ISBN,
    menuId: 'escritos',
    page: 'escritos'
    });
    });        
});

//Agrega la funcionalidad que realiza los cambios en la base de datos
// Modificando un nuevo escritosa través del Microservicio
router.post('/editar', function(req, res, next) {
console.log('Modificando un escritos');
//Extrae los datos enviados por la forma
let Id_Escrito = req.body.Id_Escrito;
let Descripcion = req.body.Descripcion;
let ISBN = req.body.ISBN;
let errors = false;
// Si no hay errores
if (!errors) {
//Encapsula datos provenientes de la forma
var datosForma = {
Id_Escrito: Id_Escrito,
Descripcion: Descripcion,
ISBN: ISBN
}
//Invoca al Microservicio de modificar
request.put({ url: "http://localhost:4000/escritos", json: datosForma },
(error, response, body) => {
mensaje = 'El dato se ha modificado con éxito';
if (error) {
console.log(error);
mensaje = 'Error: ' + error;
}
console.log(response);
res.redirect('/escritos'); //Redirige a Listado de escritos
});
}
});

router.get('/delete/:Id_Escrito', (req, res) => {
    Id_Escrito = req.params.Id_Escrito;
    mensaje = 'Eliminando escritos con Id ' + Id_Escrito;
    console.log(mensaje);
    if (Id_Escrito) {
    //Invoca al Microservicio
    URI = "http://localhost:4000/escritos/" + Id_Escrito;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
    if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log(response);
    res.redirect('/escritos'); //Redirige a Listado de escritoses
    });
    }
    });


module.exports= router;