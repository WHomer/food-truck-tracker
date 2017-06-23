firebase.initializeApp(config);

function DBpushTruck(){
  event.preventDefault();

    //an object to hold the info to be pushed
    var obj = {
    };

    //push the object to the db
    database.ref("trucks/").push(obj);
    //clear input boxes, if necessary
    //$("#input").val("");
}

function DBpushPost(){
  event.preventDefault();

    //an object to hold the info to be pushed
    var obj = {
    };

    //push the object to the db
    database.ref("trucks/").push(obj);
    //clear input boxes, if necessary
    //$("#input").val("");
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
    //clear input boxes, if necessary
    //$("#input").val("");
}


database.ref().on("child_removed", function(snapshot){
  console.log("removed");
}, function(errorObject){
  console.log("Errors handled: "+errorObject.code);
});
