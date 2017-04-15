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
    var trainTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTrainTime);

    var diffTime = moment().diff(moment(firstTrainTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    $("#tbody").append("<tr>" + "<td>" + snapshot.val().trainName +
    "</td><td>" + snapshot.val().destination +
    "</td><td>" + snapshot.val().frequency +
    "</td><td>" + firstTrainTime + "</td><td>" + diffTime + "</td>");

// Handle the errors
},
function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

    // Assume the following situations.
    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away
    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
    // ==========================================================
    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
    // Assumptions
    var tFrequency = 3;
    // Time is 3:30 AM
    var firstTime = "03:30";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var trainTime = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrain);