var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(41.9106569, -87.645705),
    mapTypeId: 'roadmap'
  });

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    info: {
      icon: iconBase + 'info-i_maps.png'
    },
    question:{
    	info: {
    		icon: iconBase
    	}
    }
  };

  var features = [
    {
    	//450 n city front plaza
      position: new google.maps.LatLng(41.8896491, -87.6244132),
      type: 'info'
    }, {
    	// 600 w chicago ave
      position: new google.maps.LatLng(41.8975185, -87.6461667),
      type: 'info'
    }, {
    	// monroe & clark
      position: new google.maps.LatLng(41.8806818, -87.6330294),
      type: 'info'
    }, {
    	// daley center
      position: new google.maps.LatLng(41.8842601, -87.63034337),
      type: 'info'
    }, {
    	// lasalle and adam
      position: new google.maps.LatLng(41.8795031, -87.6324292),
      type: 'info'
    }, {
    	// madison and lower wacker
      position: new google.maps.LatLng(41.8819259, -87.6389343),
      type: 'info'
    }, {
    	// merchandise mart
      position: new google.maps.LatLng(41.888543, -87.6354435),
      type: 'info'
    }, {
    	//michigan ave and harrison st
      position: new google.maps.LatLng(41.8745063, -87.6263573),
      type: 'info'
    }, {
    	// michigan ave and monroe
      position: new google.maps.LatLng(41.8808237, -87.6264247),
      type: 'info'
    }, {
    	// columbus and randolph
      position: new google.maps.LatLng(41.8848961, -87.6204949),
      type: 'info'
    }, {
    	// rush university
      position: new google.maps.LatLng(41.8746222, -87.6689625),
      type: 'info'
    }, {
    	// monroe and sangamon
      position: new google.maps.LatLng(41.8804179, -87.6530192),
      type: 'info'
    }, {
    	// southport and addison
      position: new google.maps.LatLng(41.9470633, -87.6662129),
      type: 'info'
    }, {
    	//wabash and van buren
      position: new google.maps.LatLng(41.8769559, -87.6282314),
      type: 'info'
    }, {
    	//wabash and adams
      position: new google.maps.LatLng(41.8794945, -87.628316),
      type: 'info'
    }
  ];

  // Create markers.
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
  });
}