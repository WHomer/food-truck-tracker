//creates an onclick event for food truck containers
$('.js-truck-list').on('click', function(){
	//display light box
	$('.js-lightbox').css('display', 'block');
	var test = this;
	console.log(this);
	//populate data
	getLightboxContent();
})


//close button on the js-lightbox
$('.js-lightbox-close').on('click', function(){
	//close lightbox
	$('.js-lightbox').css('display', 'none');
})


//gathers information about the truck
function getLightboxContent(){
	//store each variable
	var truckName = truckjson[0]['Truck Name (DBA)'];
	var truckCuisine = truckjson[0]['Cuisiine Type'];
	var truckFacebook = truckjson[0]['Facebook'];
	var truckImage = truckjson[0]['Image URL']
	var truckSavory = truckjson[0]['Savory'];
	var truckSweet = truckjson[0]['Sweet'];
	var truckTwitter = truckjson[0]['Twitter'];
	var truckURL = truckjson[0]['URL'];
	//display each variable to lightbox
	$('.js-lb-name').text(truckName);
	$('.js-lb-image').attr('src', truckImage);
}