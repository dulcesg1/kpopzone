var express = require('express');
var router = express.Router();
var request = require('request');

var mensaje= '';
//Realicemos la conexión con el micro servicio modificando el archivoroutes|estudiantes.js
// Listado de estudiantes
/*router.get('/',(req,res)=>{
    console.log('Listado de autores');
    res.render('autor/index',{ tittle: 'Listado de autores' });
});
*/
router.get('/',function(req, res, next){
    // Consumir mediante RESTAPI

    request.get("http://localhost:4000/autor/", (error, response, body)=>{
    
    mensaje= '';
    if(error){ // En caso de que surga un error
       console.error();
       mensaje= 'Error: '+ error;
    }
    console.log(JSON.parse(body)+mensaje);
    //Enviamos la información a la vista en Formato JSON
    res.render('autor/autor',{
        mensaje:mensaje,
        tittle: 'Listado de autores',
        menuId: 'autor',
        page: 'autor',
        data: JSON.parse(body)
        });
    });
});

// Despliega pantalla para agregar Autor

router.get('/add',(req,res)=>{
    mensaje= 'Agregando Autor';
    //Despliega pantalla para captura de Autor
    res.render('autor/add',{
        mensaje:mensaje,
        tittle: 'Agregar un Autor', // Título de la página
        Id_Autor:'',// Datos del Autor
        Nombre: '',
        ApellidoPat: '',
        ApellidoMat:'',
        FechaNacimiento:'',
        menuId: 'autor',
        page: 'autor',

    });

});

// Agregando un nuevo autor a traves de Microservicios
router.post('/add', function(req, res, next) {
    //Extrae los datos enviados por la forma
    let Id_Autor = req.body.Id_Autor;
    let Nombre = req.body.Nombre;
    let ApellidoPat = req.body.ApellidoPat;
    let ApellidoMat = req.body.ApellidoMat;
    let FechaNacimiento = req.body.FechaNacimiento;
    let errors = false;
    // Si no hay errores
    if (!errors) {
    //Encapsula datos de la forma
    var datosForma = {
    Id_Autor: Id_Autor,
    Nombre: Nombre,
    ApellidoPat: ApellidoPat,
    ApellidoMat: ApellidoMat,
    FechaNacimiento: FechaNacimiento
    }
    request.get({ url: "http://localhost:4000/autor/"+Id_Autor }, (error, response, body)=>{
    
        mensaje= '';
        if(error){ // En caso de que surga un error
           console.error();
           mensaje= 'Error: '+ error;
        }
        console.log(JSON.parse(body)+mensaje);
        let autor=JSON.parse(body);
        if(autor && autor!=""){
            mensaje="El numero de id ya esta registrado";
            res.render('autor/add',{
                mensaje:mensaje,
                tittle: ' Add autor',
                Id_Autor:'',// Datos del Autor
                Nombre: '',
                ApellidoPat: '',
                ApellidoMat:'',
                FechaNacimiento:'',
                menuId: 'autor',
                page: 'autor'
                });
        }else{
            request.post({ url: "http://localhost:4000/autor", json: datosForma },
            (error, response, body) => {
           
           mensaje = 'El dato se ha agregado con éxito';
           if (error) {
           console.log(error);
           mensaje = 'Error: ' + error;
           }
           console.log(response);
           res.redirect('/autor'); //Redirige a Listado de Autor
           });
           }
           });
        }
        //Enviamos la información a la vista en Formato JSON
       
        });
 //Agrega la funcionalidad en el archivo routes|autor.js para enviar un Id_Autor
// y muestre la información
//Despliega pantalla para Modificar Autor
router.get('/editar/:Id_Autor', (req, res) => {
    Id_Autor = req.params.Id_Autor;
    mensaje = 'Modificando Autor con Id ' + Id_Autor;
    console.log(mensaje);
    var AutorFind;
    //Busca si existe el autor de acuerdo al Id_Autor
    URI = "http://localhost:4000/autor/" + Id_Autor;
    console.log('URI: ' + URI);
    request.get(URI, (error, response, body) => {
    mensaje = '';
    if (error) { //En caso de que surja un error
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log("Autor Encontrado ===>");
    console.log(body);
    //Despliega pantalla para modificar de Autor
    res.render('autor/editar', {
    mensaje: mensaje,
    title: 'Modificando Autor', //Título de la página
    Id_Autor: JSON.parse(body).Id_Autor, //Datos de Autor
    Nombre: JSON.parse(body).Nombre,
    ApellidoPat: JSON.parse(body).ApellidoPat,
    ApellidoMat: JSON.parse(body).ApellidoMat,
    FechaNacimiento: JSON.parse(body).FechaNacimiento,
    menuId: 'autor',
    page: 'autor'
    });
    });        
});

//Agrega la funcionalidad que realiza los cambios en la base de datos
// Modificando un nuevo autora través del Microservicio
router.post('/editar', function(req, res, next) {
console.log('Modificando un Autor');
//Extrae los datos enviados por la forma
let Id_Autor = req.body.Id_Autor;
let Nombre = req.body.Nombre;
let ApellidoPat = req.body.ApellidoPat;
let errors = false;
// Si no hay errores
if (!errors) {
//Encapsula datos provenientes de la forma
var datosForma = {
Id_Autor: Id_Autor,
Nombre: Nombre,
ApellidoPat: ApellidoPat
}
//Invoca al Microservicio de modificar
request.put({ url: "http://localhost:4000/autor", json: datosForma },
(error, response, body) => {
mensaje = 'El dato se ha modificado con éxito';
if (error) {
console.log(error);
mensaje = 'Error: ' + error;
}
console.log(response);
res.redirect('/autor'); //Redirige a Listado de Autor
});
}
});

router.get('/delete/:Id_Autor', (req, res) => {
    Id_Autor = req.params.Id_Autor;
    mensaje = 'Eliminando Autor con Id ' + Id_Autor;
    console.log(mensaje);
    if (Id_Autor) {
    //Invoca al Microservicio
    URI = "http://localhost:4000/autor/" + Id_Autor;
    request.delete(URI, (error, response, body) => {
    mensaje = 'El dato se ha eliminado con éxito';
    if (error) {
    console.log(error);
    mensaje = 'Error: ' + error;
    }
    console.log(response);
    res.redirect('/autor'); //Redirige a Listado de autores
    });
    }
    });


module.exports= router;