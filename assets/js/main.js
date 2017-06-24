firebase.initializeApp(config);
var database = firebase.database();

var seedTruck = {
  truckName : "my Truck2",
  websiteURL : "Google.com",
  twitterURL : "twitter.com",
  truckCuisine : "Food",
  truckSchedule : null,
  // lastSeen : null,
  // posts : [],
};




function DBpushTruck(){
    //an object to hold the info to be pushed
    var truck = seedTruck;
    //push the object to the db
    database.ref("trucks/").push(truck);
}

// database.ref("trucks/").once("value", function(snapshot) {
//   // do some stuff once
//   var test = _.map(snapshot.val(), "truckName");
//   console.log(test);
// });

function retrieveInput(){
  //if there is text in the input field, the var will set to it. otherwise sets to false
  var truckName = ($("#input-truckName").val()) ? $("#input-truckName").val(): false;
  var truckCuisine = ($("#input-truckCuisine").val()) ?  $("#input-truckCuisine").val() : false;
  var truckSchedule = ($("#input-truckSchedule").val()) ? $("#input-truckSchedule").val() : false;
  return {
    truckName:truckName,
    truckCuisine:truckCuisine,
    truckSchedule:truckSchedule,
  };
}

function DBsearch(name){
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
        //if the input exists (and ONLY if the input is present)...
        if(inputObj[property]){
          //test if it matches this truck
          if(inputObj[property]===truck[property]){
            console.log(inputObj[property]);
            validTrucks.push(truck);
          }
        }
      }
    }
    console.log(validTrucks);
    // var test2 = _.map(snapshot.val(), "truckName");
    // var test = _.find(snapshot.val(), function(o) { return o.truckName == name; });
    // console.log(test);
  });
}

database.ref().on("child_added", function(snapshot) {
  //variables for easy access
  var obj = snapshot.val();
  var key = snapshot.key;
}, function(errorObject){
  console.log("Errors handled: "+errorObject.code);
});

function DBremove(key){
  event.preventDefault();
    //an object to hold the info to be pushed
    var obj = {
    };
    //push the object to the db
    database.ref().child(key).remove();
}


database.ref().on("child_removed", function(snapshot){
  console.log("removed");
}, function(errorObject){
  console.log("Errors handled: "+errorObject.code);
});











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
