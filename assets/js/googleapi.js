var map;
// SHOW MAP
// SHOW MAP
// SHOW MAP
// SHOW MAP
// SHOW MAP
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    // scrollwheel: false,
    zoom: 12,
    center: new google.maps.LatLng(41.9106569, -87.645705),
    mapTypeId: 'roadmap'
  });
  // ICONS
  // ICONS
  // ICONS
  // ICONS
  // ICONS
  var iconBase = 'http://i.imgur.com/';
  var icons = {
    info: {
      icon: iconBase + 'yvZyBZY.png?1'
    }
  };
  // LOCATIONS 
  // LOCATIONS 
  // LOCATIONS 
  // LOCATIONS 
  // LOCATIONS 
  var features = [{
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
  }, { // 1030 s hamilton ave
    position: new google.maps.LatLng(41.8683822, -87.6825061),
    type: 'info'
  }, { // 2220 w campbell park dr
    position: new google.maps.LatLng(41.8726946, -87.6840292),
    type: 'info'
  }, { // 300 s wabash ave 
    position: new google.maps.LatLng(41.8781786, -87.6282772),
    type: 'info'
  }, { //185 n columbus dr
    position: new google.maps.LatLng(41.884535, -87.622707),
    type: 'info'
  }, { // 151 n franklin st 
    position: new google.maps.LatLng(41.8845957, -87.6375729),
    type: 'info'
  }, { //20 s lasalle st 
    position: new google.maps.LatLng(41.8814938, -87.6345388),
    type: 'info'
  }, { //1615 w chicago ave
    position: new google.maps.LatLng(41.8958385, -87.670242),
    type: 'info'
  }, { //1155 n oakley ave 
    position: new google.maps.LatLng(41.9103511, -87.6869629),
    type: 'info'
  }, { //2135 w division
    position: new google.maps.LatLng(41.9028701, -87.6833215),
    type: 'info'
  }, { // 1262 n milwaukee ave
    position: new google.maps.LatLng(41.9047718, -87.6708711),
    type: 'info'
  }, { // 1851 w jackson blvd
    position: new google.maps.LatLng(41.8774951, -87.6754357),
    type: 'info'
  }, { // 1400 w adams 
    position: new google.maps.LatLng(41.8789616, -87.6641274),
    type: 'info'
  }, { //902 w adams
    position: new google.maps.LatLng(41.8791841, -87.6519044),
    type: 'info'
  }, { // 149 ashland ave
    position: new google.maps.LatLng(41.8842185, -87.6689884),
    type: 'info'
  }, { // 829 larrabee st 
    position: new google.maps.LatLng(41.897547, -87.6448367),
    type: 'info'
  }, { //  450 n ciyfront plaza dr
    position: new google.maps.LatLng(41.8896491, -87.6244132),
    type: 'info'
  }, { //219 w chicago ave
    position: new google.maps.LatLng(41.8963641, -87.6372835),
    type: 'info'
  }, { //930 n lasalle dr
    position: new google.maps.LatLng(41.8999295, -87.6353502),
    type: 'info'
  }, { // 830 n wells 
    position: new google.maps.LatLng(41.8974838, -87.6364339),
    type: 'info'
  }, { // 65 e harrison st 
    position: new google.maps.LatLng(41.8742315, -87.6276764),
    type: 'info'
  }, { // 150 w van buren st
    position: new google.maps.LatLng(41.8768628, -87.6348765),
    type: 'info'
  }, { // 499-423 s columbus dr
    position: new google.maps.LatLng(41.8769824, -87.6228329),
    type: 'info'
  }, { // 126 n clark st 
    position: new google.maps.LatLng(41.8841492, -87.6331298),
    type: 'info'
  }, { // 30 e lake st
    position: new google.maps.LatLng(41.8860502, -87.6290347),
    type: 'info'
  }, { // 1760 n sheffield ave
    position: new google.maps.LatLng(41.9133413, -87.6553938),
    type: 'info'
  }, { // 2500 n cannon dr
    position: new google.maps.LatLng(41.9275682, -87.6368361),
    type: 'info'
  }, { // 2354-2304 n stockton dr
    position: new google.maps.LatLng(41.9245069, -87.6379778),
    type: 'info'
  }, { //1030 w fullerton pkwy
    position: new google.maps.LatLng(41.92536, -87.6565682),
    type: 'info'
  }, { // 1005 w wrightwood ave
    position: new google.maps.LatLng(41.9289988, -87.6889347),
    type: 'info'
  }, { // 3628 n broadway
    position: new google.maps.LatLng(41.9482556, -87.6500014),
    type: 'info'
  }, { // 817 w belmont ave
    position: new google.maps.LatLng(41.9399547, -87.6522815),
    type: 'info'
  }, { // 3241 n lincoln ave 
    position: new google.maps.LatLng(41.9409791, -87.671334),
    type: 'info'
  }, { // 3627 n southport ave
    position: new google.maps.LatLng(41.9475587, -87.6662289),
    type: 'info'
  }];
  // Create markers.
  // Create markers.
  // Create markers.
  // Create markers.
  // Create markers.
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    })
  });
  // OVERLAY
  // OVERLAY
  // OVERLAY
  // OVERLAY
  // OVERLAY
  $('.map-container').on("mouseleave", function() {
    map.setOptions({
      scrollwheel: false
    });
  });
  $('.map-container').on("mousedown", function() {
    map.setOptions({
      scrollwheel: true
    });
  });
  // Make above passive for better response. Not working perfectly.
}