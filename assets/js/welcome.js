$(document).ready(function(){ 
	//toggle del boton login
   $('#btn-logIn').on('click',function(){
      $('#log-In').toggle('slow');
   });
   //validacion login
	$('#mensajeName').hide();
	$('#mensajePass').hide();

	$('#letsgo').click(function(){
		validateForm();
	});
	function validateForm(){
		var usuario = $('#name').val();
		var contrasena = $('#pass').val();
		var usuarioLocal= localStorage.getItem('nameDat');
		var contrasenaLocal=localStorage.getItem('passDat');

		if (usuario == usuarioLocal && contrasena == contrasenaLocal){
			window.location.href = "profile.html"; 
				}else{
					if(usuario == "" || usuario != usuarioLocal){
						$('#mensajeName').fadeIn();
						}else{
							$('#mensajeName').hide();
							if(contrasena == "" || contrasena != contrasenaLocal){
								$('#mensajePass').fadeIn();
							}
						}
					}
				}	
		
        

});