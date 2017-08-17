$(document).ready(function(){ 
	//toggle del boton login
   $('#btn-logIn').on('click',function(){
      $('#log-In').toggle('slow');
   });
   //validacion login
  	$('#mensajeUser').hide();
	$('#mensajePass').hide();

	$('#letsgo').click(function(){
		validateForm();
	});
	function validateForm(){
		var usuario = $('#user').val();
		var contrasena = $('#pass').val();
		var usuarioLocal= localStorage.getItem('userDat');
		var contrasenaLocal=localStorage.getItem('passDat');

		if (usuario == usuarioLocal && contrasena == contrasenaLocal){
			window.location.href = "profile.html"; 
				}else{
					if(usuario == "" || usuario != usuarioLocal){
						$('#mensajeUser').fadeIn();
						}else{
							$('#mensajeUser').hide();
							if(contrasena == "" || contrasena != contrasenaLocal){
								$('#mensajePass').fadeIn();
							}
						}
					}
				}	
		
        

});