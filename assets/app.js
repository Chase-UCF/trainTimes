//Initialize Db
var config = {
    apiKey: "AIzaSyBnRBwJrJ7nVI6YrKUkrfPmaRr2a-_Ibj4",
    authDomain: "traintimesdb.firebaseapp.com",
    databaseURL: "https://traintimesdb.firebaseio.com",
    projectId: "traintimesdb",
    storageBucket: "traintimesdb.appspot.com",
    messagingSenderId: "924815014376"
};
firebase.initializeApp(config);
var database = firebase.database();

//on sumbit button click send info to db and create new html attributes

$("#submit-button").click(function(event) {

    event.preventDefault();

    var trainNameInput = $("#trainName").val();
    var destinationInput = $("#destination").val();
    var firstTrainInput = $("#firstTrain").val();
    var frequencyInput = $("#frequency").val();


    database.ref().push({
        trainName: trainNameInput,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput
    });


});


database.ref().on("child_added", function(snapshot) {


    //clear out input fields
    $("#trainName").val(" ");
    $("#destination").val(" ");
    $("#firstTrain").val(" ");
    $("#frequency").val(" ");

    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);
    //get last child from db and place in html attribute
    var firstTrainTime = snapshot.val().firstTrain;
    var frequencyToBe = snapshot.val().frequency.toString;
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTrainTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequencyToBe;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequencyToBe - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    $("#tbody").append("<tr>" + "<td>" + snapshot.val().trainName +
    "</td><td>" + snapshot.val().destination +
    "</td><td>" + snapshot.val().frequency +
    "</td><td>" + firstTrainTime + "</td><td>" + tMinutesTillTrain + "</td>");

// Handle the errors
},
function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});