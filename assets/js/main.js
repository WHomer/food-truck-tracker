firebase.initializeApp(config);
var database = firebase.database();

var seedTruck = {
  truckName : "my Truck2",
  truckCuisine : "noodles",
  truckSavSweet: "sweet",
  websiteURL : "Google.com",
  twitterURL : "twitter.com",
  facebookURL: "facebook.com",
  truckSchedule : null,
  truckDescription: null,
  // lastSeen : null,
  // posts : [],
};




function DBpushTruck(){
    //an object to hold the info to be pushed
    // var truck = seedTruck;
    var truckName = ($("#add-truck-name").val()) ? $("#add-truck-name").val().trim(): null;
    var truckCuisine = ($("#add-truck-cuisine").val()) ? $("#add-truck-cuisine").val().trim(): null;
    var truckDescription = ($("#add-truck-description").val()) ? $("#add-truck-description").val().trim(): null;
    var truck = {
      truckName: truckName,
      truckCuisine: truckCuisine,
      truckDescription: truckDescription,
      truckSchedule : null,
    };
    //push the object to the db
    database.ref("trucks/").push(seedTruck);
}

function retrieveInput(){
  //if there is text in the input field, the var will set to it. otherwise sets to false
  var truckName = ($("#truck-name").val()) ? $("#truck-name").val().trim().toLowerCase(): false;
  var truckCuisine = ($("#truck-cuisine").val()) ?  $("#truck-cuisine").val().trim().toLowerCase() : false;
  var truckSchedule = ($("#input-truck-date").val()) ? $("#input-truck-date").val().trim().toLowerCase() : false;
  return {
    truckName:truckName,
    truckCuisine:truckCuisine,
    truckSchedule:truckSchedule,
  };
}

function DBsearch(){
  database.ref("trucks/").once("value", function(snapshot) {
    // do some stuff once
    var validTrucks = [];
    console.log(snapshot.val());
    inputObj = retrieveInput();
    for (var key in snapshot.val()){
      var truck = snapshot.val()[key];
      console.log(truck);
      //for each potential input
      for (var property in inputObj){
        //if the input and truck property exist (and ONLY if they exist, to avoid comparing to null)...
        if(inputObj[property] && truck[property]){
          //test if the property in the input section (inputObj) matches this property of the truck
          if(inputObj[property].toLowerCase()===truck[property].toLowerCase()){
            validTrucks.push(truck);
            //if anything of the properties matches, exit the loop, since we already know there's a match
            break;
          }
        }
      }
    }
    return validTrucks;
  });
}

function findOpenTrucks(truckOpen, truckClose){
  var openTimeMoment = moment(truckOpen, "HH:mm");
  var closeTimeMoment = moment(truckClose, "HH:mm");
  var currentTimeMoment = moment();
  var validTrucks = [];
  database.ref("trucks/").once("value", function(snapshot) {
    // do some stuff once
    inputObj = retrieveInput();
    for (var key in snapshot.val()){
      var truck = snapshot.val()[key];
      //NOTE TO SELF: set open/close time based on truck schedule in database

      if(currentTimeMoment.isBetween(openTimeMoment, closeTimeMoment)){
        validTrucks.push(truck);
      }
    }
  });
  return validTrucks;
}

function loadFromJSON(){
  for (var truckindex in truckjson){
    // console.log(truckjson[truckindex]);
    var truck = truckjson[truckindex];
    database.ref("trucks/").push(truck);
  }
}

database.ref().on("child_added", function(snapshot) {
  //variables for easy access
  var obj = snapshot.val();
  var key = snapshot.key;
}, function(errorObject){
  console.log("Errors handled: "+errorObject.code);
});









// function DBremove(key){
//   event.preventDefault();
//     //an object to hold the info to be pushed
//     var obj = {
//     };
//     //push the object to the db
//     database.ref().child(key).remove();
// }
//
//
// database.ref().on("child_removed", function(snapshot){
//   console.log("removed");
// }, function(errorObject){
//   console.log("Errors handled: "+errorObject.code);
// });

// var seedPost = {
//   postName: "this Truck",
//   postTime: null,
//   postLocation: null,
// };
// function DBpushPost(){

//     //an object to hold the info to be pushed
//     var post = seedPost;

//     //push the object to the db
//     database.ref("posts/").push(post);
//     //clear input boxes, if necessary
//     //$("#input").val("");
// }
