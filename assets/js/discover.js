//Map
function initMap(){
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 13, //nivel de profundidad
		center: {lat: -33.437778, lng: -70.650278}, //coordenadas de Santiago
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	function geoFind(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(geo_succes, geo_error, geo_options);
		}
	}

	var latitude, longitude;

	var geo_succes = function(position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		//var image = "https://maps.google.com/mapfiles/kml/shapes/";
		var miUbicacion = new google.maps.Marker({
			position: {lat:latitude, lng:longitude},
			animation: google.maps.Animation.DROP,
			map: map,
			//icon: image + "cycling.png"
		});

		map.setZoom(17);
		map.setCenter({lat:latitude, lng:longitude});
	}

	var geo_error = function(error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}

	var geo_options = {
	enableHighAccuracy: true, 
	maximumAge: 30000, 
	timeout: 27000
	};

}

//API
//tipos de cocina en select
$(document).ready(function(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cuisines',
		beforeSend: function(req) {
			req.setRequestHeader('user-key','c0604a457024d1c819de9ece877f2fbe');
		},
		type: 'GET',
		dataType: 'json',
		data: {
			city_id: 83 //id de la ciudad santiago: 83
		}
	})
	.done(function(response) {
		console.log(response); //{cuisines: Array(52)}
		response.cuisines.forEach(function(cv){ //{cuisine_id: 1, cuisine_name: "American"}
			console.log(cv.cuisine.cuisine_name);
	    		$('#cousine-select').append($('<option></option>')
					.attr('value', cv.cuisine.cuisine_id)
					.text(cv.cuisine.cuisine_name)); 
		});
	})
	.fail(function() {
		console.log('error');
	})
	.always(function() {
		console.log('complete');
	});
})

//var select = $("#mySelect option:selected").val(); //select