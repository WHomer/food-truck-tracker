firebase.initializeApp(config);
var database = firebase.database();

var seedTruck = {
  truckName : "my Truck2",
  websiteURL : "Google.com",
  twitterURL : "twitter.com",
  tags : ["food", "water"],
  schedule : null,
  lastSeen : null,
  posts : [],
};

var seedPost = {
  postName: "this Truck",
  postTime: null,
  postLocation: null,
};

function DBpushTruck(){

    //an object to hold the info to be pushed
    var truck = seedTruck;

    //push the object to the db
    database.ref("trucks/").push(truck);
    //clear input boxes, if necessary
    //$("#input").val("");
}

database.ref("trucks/").once("value", function(snapshot) {
  // do some stuff once
  var test = _.map(snapshot.val(), "truckName");
  console.log(test);
});

function DBsearch(name){
  database.ref("trucks/").once("value", function(snapshot) {
    // do some stuff once
    var test2 = _.map(snapshot.val(), "truckName");
    var test = _.find(snapshot.val(), function(o) { return o.truckName == name; });
    console.log(test);
  });
}



function DBpushPost(){

    //an object to hold the info to be pushed
    var post = seedPost;

    //push the object to the db
    database.ref("posts/").push(post);
    //clear input boxes, if necessary
    //$("#input").val("");
}

database.ref().on("child_added", function(snapshot) {
  //variables for easy access
  var obj = snapshot.val();
  var key = snapshot.key;
  // var test = _.map(snapshot.val(), "truckName");
  // console.log(test);
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
    //clear input boxes, if necessary
    //$("#input").val("");
}


database.ref().on("child_removed", function(snapshot){
  console.log("removed");
}, function(errorObject){
  console.log("Errors handled: "+errorObject.code);
});
