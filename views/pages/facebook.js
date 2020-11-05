
	$(function() {
	
	  var app_id = '560989368013265';
	  var scopes = 'email';
	
	  var btn_loginf = '<a href="#" id="loginf" class="btn btn-primary"> Facebook</a>';
	
	  var div_session = "<div id='facebook-session'>"+
				"<strong></strong>"+
				"<img>"+
				"<a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"+
				"</div>";
	
	  window.fbAsyncInit = function() {
	
		  FB.init({
			appId      : app_id,
			status     : true,
			cookie     : true, 
			xfbml      : true, 
			version    : 'v8.0'
		  });
	
	
		  FB.getLoginStatus(function(response) {
			statusChangeCallback(response, function() {

			});
		  });
		};
	
		var statusChangeCallback = function(response, callback) {
		  console.log(response);
		   
		  if (response.status === 'connected') {
			  getFacebookData();
		  } else {
			 callback(false);
		  }
		}
	
		var checkLoginState = function(callback) {
		  FB.getLoginStatus(function(response) {
			  callback(response);
		  });
		}
	
		var getFacebookData =  function() {
		  FB.api('/me', function(response) {
			$('#loginf').after(div_session);
			$('#loginf').remove();
			$('#facebook-session strong').text("Bienvenido: "+response.name);
			$('#facebook-session img').attr('src','http://graph.facebook.com/'+response.id+'/picture?type=large');
		  });
		}
	
		var facebookLogin = function() {
		  checkLoginState(function(data) {
			if (data.status !== 'connected') {
			  FB.login(function(response) {
				if (response.status === 'connected')
				  getFacebookData();
			  }, {scope: scopes});
			}
		  })
		}
	
		var facebookLogout = function() {
		  checkLoginState(function(data) {
			if (data.status === 'connected') {
			FB.logout(function(response) {
			  $('#facebook-session').before(btn_loginf);
			  $('#facebook-session').remove();
			});
		  }
		  });
	
		}

		$(document).on('click', '#loginf', function(e) {
		  e.preventDefault();
	
		  facebookLogin();
		})
	
		$(document).on('click', '#logout', function(e) {
		  e.preventDefault();
	
		  if (confirm("¿Está seguro?"))
			facebookLogout();
		  else 
			return false;
		});
	
	});
	