$(document).ready(function(){

	$("select").click(function(){

		var idCity = $("select").val();

		$.ajax({
			url: 'https://developers.zomato.com/api/v2.1/search',
			beforeSend: function(req) {
				req.setRequestHeader('user-key','4540d992a1972a96c9d8e233c5d69e3d');
			},
			type: 'GET',
			dataType: 'json',
			data: {
				entity_id: idCity,
				entity_type: 'city'
			}
		})
		.done(function(response) {
			console.log("success");
			response.restaurants.forEach(function(e){
				$(".contenedor").append('<div class="caja">' + '<p>nombre: ' + e.restaurant.name + '</p>' + '<p>direccion: ' + e.restaurant.location.address + '</p>' + '<p>comuna: ' + e.restaurant.location.locality + '</p>' + '<img src="' + e.restaurant.thumb + '">' + '</p>' + '<p>precio por dos: ' + e.restaurant.average_cost_for_two + '</p>' + '<p>rating: ' + e.restaurant.user_rating.aggregate_rating + '</p>' + '<p>cuisine: ' + e.restaurant.cuisines + '</p>' + '</div>');
			})
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});

})