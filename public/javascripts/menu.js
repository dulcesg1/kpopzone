//Hacer un poco más dinamica la barra de menú
$(document).ready(function() {
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
    });