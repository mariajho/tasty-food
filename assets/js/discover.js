$(document).ready(function(){

/*Conecta las ciudades (city_id=83 corresponde a Santiago, por lo que me trae los datos de tipos de comida de Santiago)*/
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=83',
		beforeSend: function(req) {
			req.setRequestHeader('user-key','c0604a457024d1c819de9ece877f2fbe');
		},
		type: 'GET',
		dataType: 'json',
		data: {
			city_id: 83,
			entity_type: 'city'
		}
	})

	.done(function(response) {
		response.cuisines.forEach(function(cv){
			$('#cousine-select').append($('<option></option>')
					.attr('value', cv.cuisine.cuisine_id)
					.text(cv.cuisine.cuisine_name));
			//Muestro en las opciones del Select el id y nombre de los tipos de comida
		})
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

/*Al hacer click a algun elemento del select me muestra los datos según el id que tenían de tipo de comida (idCuisine)*/

	$('select').click(function(){
		var idCuisine = $("select").val(); //Este dato lo trae del id de la opcion que se haya seleccionado
		$.ajax({
			url: 'https://developers.zomato.com/api/v2.1/search?entity_id=83&entity_type=city&cuisines='+idCuisine,
			beforeSend: function(req) {
				req.setRequestHeader('user-key','c0604a457024d1c819de9ece877f2fbe');
			},
			type: 'GET',
			dataType: 'json',
			data: {
				city_id: 83,
				entity_type: 'city'
			}
		})

		.done(function(response) {
			console.log("success");
			$('.mostrar').empty() //Limpio los datos del div, en caso que ya se haya seleccionado algo
			//Creo 2 arrays vacios para poner el contenido de la latitud y longitud
			var array=[];
			var array2=[];

			response.restaurants.forEach(function(e){
			//$('.mostrar').append('<p>'+e.restaurant.location.address+'</p>'); //Acá muestro en pantalla las direcciones según tipo de comida, para probar que funcione
			//Pusheo los datos a los arrays

			array.push(e.restaurant.location.latitude);
			array2.push(e.restaurant.location.longitude);
			//console.log(array);

			})

			//Le paso los datos al initmap
			initMap(array,array2);
		})

		.fail(function() {
			console.log("error");
		})

		.always(function() {
			console.log("complete");
		});
	})

})


/*Probando ubicaciones*/

function initMap(array,array2) {

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 11,
		center: coor
		zoom: 13, //nivel de profundidad
		center: {lat: -33.437778, lng: -70.650278}, //coordenadas de Santiago
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	var marker;
	for (i = 0; i < array.length; i++) {  //Me da error en el .length pero igual me funciona
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(array[i], array2[i]), //Muestra los marcadores de cada posición del array
			map: map
		});
	}

}
