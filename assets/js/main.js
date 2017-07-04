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
  var truckCuisine = ($("#truck-cuisine").text()) ?  $("#truck-cuisine").text().trim().toLowerCase() : false;
  return {
    "Truck Name (DBA)":truckName,
    "Cuisine Type":truckCuisine,
  };
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
              //test if the property in the input section (inputObj) appears in this property of the truck
              if(truck[property].toLowerCase().indexOf(inputObj[property].toLowerCase())!=-1){
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

function loadFromJSON(){
  //clear out the database before adding more
  database.ref("trucks/").remove();
  for (var truckindex in truckjson){
    // console.log(truckjson[truckindex]);
    var truck = truckjson[truckindex];
    database.ref("trucks/").push(truck);
  }
}

function truckSort(obj, prop){
  var arr = [];
  //grab data and keys into an array for sorting
  for(var key in obj){
    arr.push([obj[key], key]);
  }
  //https://stackoverflow.com/questions/8900732/javascript-sort-objects-in-an-array-alphabetically-on-one-property-of-the-arra
  arr.sort(function(a,b){
    var textA = a[0][prop].toUpperCase();
    var textB = b[0][prop].toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  //putting it back in object format, with the key as a property
  //it uses indices instead of keys to maintain sorted order
  var sortedResult = {};
  for(var index in arr){
    arr[index][0].key = arr[index][1];
    sortedResult[index] = arr[index][0];
  }
  return sortedResult;
}


function setAutocompleteTags(){
  return new Promise(function(resolve, reject){
    var autocompleteTags = [];
    database.ref("trucks/").once("value", function(snapshot) {
      for(var key in snapshot.val()){
        autocompleteTags.push(snapshot.val()[key]["Truck Name (DBA)"]);
      }
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
    resolve(autocompleteTags);
  });
}

function createDropdownTags(callback){
    var dropdownTags = [];
    database.ref("trucks/").once("value", function(snapshot) {
      for(var key in snapshot.val()){
        if(dropdownTags.indexOf(snapshot.val()[key]["Cuisine Type"])==-1){
          dropdownTags.push(snapshot.val()[key]["Cuisine Type"]);
        }
      }
      callback(dropdownTags);
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}

function setHTMLDropdownTags(dropdownTags){
  for(var index in dropdownTags){
      $("#dropdownmenu").append('<li role="presentation"><a class="dropdownmenuitem" role="menuitem" tabindex="-1">'+dropdownTags[index]+'</a></li>');
    }
    return;
}

createDropdownTags(setHTMLDropdownTags);

setAutocompleteTags().then(function(tags){
  //https://jqueryui.com/autocomplete/
  $( function() {
    var autocompleteTags = tags;
    $( "#truck-name" ).autocomplete({
      source: autocompleteTags,
    });


  } );
});




$('#dropdownmenu').on('click', ".dropdownmenuitem", function(){
  $('#truck-cuisine').text($(this).text());
});

$("#search-button").on("click", function(event) {
  event.preventDefault();
  //DBsearch returns a promise, so the then waits for that promise to return, so we're sure to have the DB before we use it
  DBsearch().then(function(DB){
    //Whatever we want the search button to do (e.g. displaying and/or sorting the results) should go here
    // console.log(DB);

    var sortedDB = truckSort(DB, "Cuisine Type");

    // console.log(sortedDB);
    displayTrucks(DB);
  });
});


$('#search-button').on('click', function(event){
    event.preventDefault();
    // DBsearch();
    var trucks = DBsearch();
    displayTrucks(trucks);
    // console.log(DBsearch());
});
// iterates through the objects
function displayTrucks(trucks){

  var truckContainer = $(".trucks-list");
  truckContainer.empty();
  for(var key in trucks){
     // targeting attr 'savory', 'url', 'image url'
    var divHolder = $('<div class="truck-list"><div class="truck-list-image-container"><img src="'+trucks[key]["Image URL"]+'" class="truck-list-image" alt="standard food truck"></div><div class="truck-list-detail"><div class="truck-list-name">' + trucks[key]["Truck Name (DBA)"] + '</div><div class="truck-list-cuisine">'+ trucks[key]["Cuisine Type"]+'</div></div></div>');
    // divHolder.append(trucks[key]["Truck Name (DBA)"]);
    // divHolder.append(trucks[key]["Cuisine Type"]);
    // divHolder.append(trucks[key]["URL"]);
    // divHolder.append(trucks[key]["Facebook"]);
    // divHolder.append(trucks[key]["Twitter"]);
    truckContainer.append(divHolder);
  }
}


// //Get input values

//   var reportDate = null;
//   var reportTime = null;
//   var reportLocation = null;
//   var reportName = null;
//   var reportCuisine = null;

//   $('#submit-button').on('click', function(event) {
//     event.preventDefault(); 
//     console.log("submit clicked");

// // Getting values from text boxes
//     reportDate = $("#add-date-seen").val().trim();
//     reportTime = $("#add-time-seen").val().trim();
//     reportLocation = $("#add-location").val().trim();
//     reportName = $("#add-truck-name").val().trim();
//     reportCuisine = $("#add-truck-cuisine").val().trim();   

// // Console log input to verify it is captured
//     console.log(reportDate);
//     console.log(reportTime);
//     console.log(reportLocation);
//     console.log(reportName);
//     console.log(reportCuisine);

// // Clear out the text boxes after submit
//   $("#add-date-seen").val("");
//   $("#add-time-seen").val("");
//   $("#add-location").val("");
//   $("#add-truck-name").val("");
//   $("#add-truck-cuisine").val("");

// });



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
//
// function findOpenTrucks(truckOpen, truckClose){
//   var openTimeMoment = moment(truckOpen, "HH:mm");
//   var closeTimeMoment = moment(truckClose, "HH:mm");
//   var currentTimeMoment = moment();
//   var validTrucks = [];
//   database.ref("trucks/").once("value", function(snapshot) {
//     // do some stuff once
//     inputObj = retrieveInput();
//     for (var key in snapshot.val()){
//       var truck = snapshot.val()[key];
//       //NOTE TO SELF: set open/close time based on truck schedule in database
//
//       if(currentTimeMoment.isBetween(openTimeMoment, closeTimeMoment)){
//         validTrucks.push(truck);
//       }
//     }
//   });
//   return validTrucks;
// }
