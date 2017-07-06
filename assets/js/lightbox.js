//creates an onclick event for food truck containers
$('.truck-list').on('click', function(){
	//display light box
	$('.js-lightbox').css('display', 'block');
	//get truck name from clicked content;
	var truck = (this.childNodes[3].childNodes[1].innerText);
	//populate data
	getLightboxContent(truck);
})


//close button on the js-lightbox
$('.js-lightbox-close').on('click', function(){
	//close lightbox
	$('.js-lightbox').css('display', 'none');
})


//gathers information about the truck
function getLightboxContent(truck){
	//search truckjson for truck object
	console.log(truckjson.length);
	for (var i = 0; i < truckjson.length; i++){
		if (truck === truckjson[i]['Truck Name (DBA)']){
			//store each variable
			var truckName = truckjson[i]['Truck Name (DBA)'];
			var truckCuisine = truckjson[i]['Cuisiine Type'];
			var truckFacebook = truckjson[i]['Facebook'];
			var truckImage = truckjson[i]['Image URL']
			var truckSavory = truckjson[i]['Savory'];
			var truckSweet = truckjson[i]['Sweet'];
			var truckTwitter = truckjson[i]['Twitter'];
			var truckURL = truckjson[i]['URL'];
			//display each variable to lightbox
			$('.js-lb-name').text(truckName);
			$('.js-lb-image').attr('src', truckImage);
		}
	}
}