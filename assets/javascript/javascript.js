// Initialize Firebase
var config = {
  apiKey: "AIzaSyAqo1z0i7kIZeDJaIn8lZj2_2OdqXLQ3BY",
  authDomain: "train-scheduler-da9e7.firebaseapp.com",
  databaseURL: "https://train-scheduler-da9e7.firebaseio.com",
  projectId: "train-scheduler-da9e7",
  storageBucket: "train-scheduler-da9e7.appspot.com",
  messagingSenderId: "429545543070"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").click(function(event) {
  event.preventDefault();

  var trnName = $("#train-name-input").val().trim();
  var trnDest = $("#dest-input").val().trim();
  var trnFirstTime = moment($("#train-time-input").val().trim(), "HH:mm").format("X");
  var trnFreq = $("#frequency-input").val().trim();

  var newTrn = {
    name: trnName,
    dest: trnDest,
    time: trnFirstTime,
    freq: trnFreq
  };

  database.ref().push(newTrn);

  console.log(newTrn.name);
  console.log(newTrn.dest);
  console.log(newTrn.time);
  console.log(newTrn.freq);

  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#train-time-input").val("");
  $("#frequency-input").val("");  

});

database.ref().on("child_added", function(childSnapshot) {
  
  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().dest;
  var trnFirstTime = childSnapshot.val().time;
  var trnFreq = childSnapshot.val().freq;

  var trainConverted = moment(trnFirstTime, "X").subtract(1, "years");



  var diffTime = moment().diff(moment(trainConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var timeRemainder = diffTime % trnFreq;
  console.log(timeRemainder);

  var minutesTillTrain = trnFreq - timeRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var trnArrival = moment(nextTrain).format("hh:mm");


  



  

 

  var newRow = $("<tr>").append(
    $("<td>").text(trnName),
    $("<td>").text(trnDest),
    $("<td>").text(trnFreq),
    $("<td>").text(trnArrival),
    $("<td>").text(minutesTillTrain),
    
  );

  $("#train-table > tbody").append(newRow);

});