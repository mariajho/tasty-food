$(document).ready(function(){

	$(".btn-search").click(function(){
		$(".container.info").empty();

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
			/*for (i=0 ; i<response.restaurants.length ; i++){
				$(".container.info").append('<div class="caja" id="' + i.toString() + '">' + '<img src="' + response.restaurants[i].restaurant.thumb + '" class="img-responsive">' + '<span>' + response.restaurants[i].restaurant.name + '</span>' + '<span>' + response.restaurants[i].restaurant.location.locality + '</span>' + '</div>');
			}*/

			response.restaurants.forEach(function(e){
				var id = localStorage.setItem("id",e.restaurant.id);
				var nombre = localStorage.setItem("name",e.restaurant.name);
				var comuna = localStorage.setItem("comuna",e.restaurant.location.locality);
				var direccion = localStorage.setItem("direccion",e.restaurant.location.address);
				var rating = localStorage.setItem("rating",e.restaurant.user_rating.aggregate_rating);
				var price = localStorage.setItem("price",e.restaurant.average_cost_for_two);
				var cocina = localStorage.setItem("cocina",e.restaurant.cuisines);
				console.log(localStorage.getItem("id"));
				$(".container.info").append('<div class="caja" id="' + localStorage.getItem("id") + '">' + '<img src="' + e.restaurant.thumb + '" class="img-responsive">' + '<span>' + localStorage.getItem("name") + '</span>' + '<span>' + e.restaurant.location.locality + '</span>' + '</div>');
				/*$(".container.info").append('<div class="caja">' + '<p>nombre: ' + e.restaurant.name + '</p>' + '<p>direccion: ' + e.restaurant.location.address + '</p>' + '<p>comuna: ' + e.restaurant.location.locality + '</p>' + '<img src="' + e.restaurant.thumb + '" class="img-responsive">' + '</p>' + '<p>precio por dos: ' + e.restaurant.average_cost_for_two + '</p>' + '<p>rating: ' + e.restaurant.user_rating.aggregate_rating + '</p>' + '<p>cuisine: ' + e.restaurant.cuisines + '</p>' + '</div>');*/
			});
			$(".caja").click(function(){
				console.log(localStorage.getItem("id"))
				$(".container.detalle").append('<p>' + localStorage.getItem("name") + '</p>' + '<p>Direccion:</p>' + '<p>' + localStorage.getItem("direccion") + '</p>' + '<p>Price:</p>' + '<p>' + localStorage.getItem("price") + '</p>' + '<p>Rating:</p>' + '<p>' + localStorage.getItem("rating") + '</p>' + '</div>');
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