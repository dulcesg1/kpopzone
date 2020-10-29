var miImagen = document.querySelector('img');

var miSolicitud = new Request('flores.jpg');

fetch(miSolicitud).then(function(respuesta) {
  return respuesta.blob();
}).then(function(respuesta) {
  var objeto = URL.createObjectURL(respuesta);
  miImagen.src = objeto;
});