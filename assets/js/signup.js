 //validaciones create account
    $('#mnsNameReg').hide();
	$('#mnsPassReg').hide();
	$('#mnsMailReg').hide();

	$('#btn-create').click(function(){
		validateFormAccount();
	});

	function validateFormAccount(){
		var nombreReg = $('#nameReg').val();
		var contrasenaReg = $('#passwordReg').val();
		var correoReg = $('#mailReg').val();

		var mailRegr = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

		if (nombreReg == "" ){
			$('#mnsNameReg').fadeIn();
			}else{
				$('#mnsNameReg').hide();
        			if(contrasenaReg == ""){
        				$('#mnsPassReg').fadeIn();
        				}else{
        					$('#mnsPassReg').hide();
        					if(correoReg == "" || !mailRegr.test(correoReg)){
        						$('#mnsMailReg').fadeIn();
        						}else{
        							$('#mnsMailReg').hide();
        							window.location.href = "movies.html";
        							guardarDatos();
        							}
        						}
        					}
						}


	
	 function guardarDatos(){
	 	localStorage.setItem("nameDat", $('#nameReg').val());
	 	localStorage.setItem("passDat", $('#passwordReg').val());
	 	localStorage.setItem("mailDat",	$('#mailReg').val());
	 }
