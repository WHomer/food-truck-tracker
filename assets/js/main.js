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
};




function DBpushTruck(){
    //an object to hold the info to be pushed
    // var truck = seedTruck;
    var truckName = ($("#add-truck-name").val()) ? $("#add-truck-name").val().trim(): null;
    var truckCuisine = ($("#add-truck-cuisine").val()) ? $("#add-truck-cuisine").val().trim(): null;
    // var truckDescription = ($("#add-truck-description").val()) ? $("#add-truck-description").val().trim(): null;
    var truck = {
      "Truck Name (DBA)": truckName,
      "Cuisine Type": truckCuisine,
      // truckDescription: truckDescription,
      // truckSchedule : null,
    };
    //push the object to the db
    database.ref("trucks/").push(seedTruck);
}

function retrieveInput(){
  //if there is text in the input field, the var will set to it. otherwise sets to false
  var truckName = ($("#truck-name").val()) ? $("#truck-name").val().trim().toLowerCase(): false;
  var truckCuisine = ($("#truck-cuisine").val()) ?  $("#truck-cuisine").val().trim().toLowerCase() : false;
  // var truckSchedule = ($("#input-truck-date").val()) ? $("#input-truck-date").val().trim().toLowerCase() : false;
  return {
    "Truck Name (DBA)":truckName,
    "Cuisine Type":truckCuisine,
    // truckSchedule:truckSchedule,
  };
}

function DBsearch(){
  var DB = new Promise(function(resolve, reject){
    database.ref("trucks/").once("value", function(snapshot) {
      // do some stuff once
      var validTrucks = [];
      inputObj = retrieveInput();
      var allBlank = true;
      for (var prop in inputObj){
        if(inputObj[prop]){
          allBlank = false;
          break;
        }
      }
      if(allBlank){
        DB = snapshot.val();
      }
      else{
        for (var key in snapshot.val()){
          var truck = snapshot.val()[key];
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
        DB = validTrucks;
      }
      console.log(DB);
      resolve(DB);
    }, function(errorObject){
      console.log("Errors handled: "+errorObject.code);
      reject([]);
    });
  }).then(function(){
    console.log("DB Search Done");
    return DB;
  });
}

function DBsearch(){
  return new Promise(function(resolve, reject){
    database.ref("trucks/").once("value", function(snapshot) {
      // do some stuff once
      var validTrucks = [];
      inputObj = retrieveInput();
      var allBlank = true;
      for (var prop in inputObj){
        if(inputObj[prop]){
          allBlank = false;
          break;
        }
      }
      if(allBlank){
        DB = snapshot.val();
      }
      else{
        for (var key in snapshot.val()){
          var truck = snapshot.val()[key];
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
        DB = validTrucks;
      }
      resolve(DB);
    }, function(errorObject){
      console.log("Errors handled: "+errorObject.code);
      reject([]);
    });
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
  //clear out the database before adding more
  database.ref("trucks/").remove();
  for (var truckindex in truckjson){
    // console.log(truckjson[truckindex]);
    var truck = truckjson[truckindex];
    database.ref("trucks/").push(truck);
  }
}

//NOTE: ideally, this should take an object full or trucks as an argument, instead of using the .ref to call the db, but for testing purposes, this is here so we can use it easily.
function truckSort(prop){
  var arr;
  firebase.database().ref('/trucks').once("value", function (snapshot) {
    arr = [];
    snapshot.forEach(function(child){
      //grabbing the data and keys into an array, for sorting
      arr.push([child.val(), child.key]);
    });
  });
  //https://stackoverflow.com/questions/8900732/javascript-sort-objects-in-an-array-alphabetically-on-one-property-of-the-arra
  arr.sort(function(a,b){
    var textA = a[0][prop].toUpperCase();
    var textB = b[0][prop].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  //putting it back in the same object format as the db normally is
  var obj = {};
  for(var index in arr){
    obj[arr[index][1]] = arr[index][0];
  }
  return arr;
}

$("#search-button").on("click", function(event) {
  event.preventDefault();
  //DBsearch returns a promise, so the then waits for that promise to return, so we're sure to have the DB before we use it
  DBsearch().then(function(DB){
    //Whatever we want the search button to do (e.g. displaying and/or sorting the results) should go here
    console.log(DB);

    // truckSort(DB, "Cuisine Type")

  });

});





// database.ref().on("child_added", function(snapshot) {
//   //variables for easy access
//   var obj = snapshot.val();
//   var key = snapshot.key;
// }, function(errorObject){
//   console.log("Errors handled: "+errorObject.code);
// });

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
