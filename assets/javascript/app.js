var gameData = {
  q1: ["q1?", "a1correct", "a2i", "a3i", "a4i"],
  q2: ["q2?", "a1i", "a2correct", "a3i", "a4i"],
  q3: ["q3?", "a1i", "a2i", "a3correct", "a4i"]
};

var progression;//question number. 0 means game not running
var correctAnswers = [1, 2, 3];//array of correct answers
var userAnswers = [];//player's answers get pushed here
var userCorrect;//counts correct answers at end
var userIncorrect;//counts incorrect answers at end

var intervalId;//for timer
var timerRunning = false;//for timer
var time = 10;//time per question

function replaceQuestion(num) {//writes question to html
  $("#q").html(gameData["q" + num][0]);
}

function replaceAnswers(num) {//writes answeres to html
  $("#a1").html(gameData["q" + num][1])
  $("#a2").html(gameData["q" + num][2])
  $("#a3").html(gameData["q" + num][3])
  $("#a4").html(gameData["q" + num][4])
}

function reset() {//resets variables to base values for new game
  userAnswers = [];
  progression = 0;
  userCorrect = 0;
  userIncorrect = 0;
  $("#q").html("")
  $("#a1").html("click to start")
  $("#a2").html("")
  $("#a3").html("")
  $("#a4").html("")
  $("#reset").hide();
  console.log("resetting");
}

function askQuestion() {//combines replace functions from above
  replaceQuestion(progression);
  replaceAnswers(progression);
}

function startTimer() {
  time = 11;
  timerRunning = true;
  intervalId = setInterval(timerCount, 1000);
}

function timerCount() {
  time--;
  $("#timer").html(time);
  if (time === -1) {
    stopTimer();
    userAnswers.push("timeout");
    progression++;
      if (progression === 4) {
        endGame();
        return;
      }
    askQuestion();
    startTimer();
  }
}

function stopTimer() {  
    clearInterval(intervalId);
    timerRunning = false;
}

function popupAnswer() {//after click or timeout shows image of answer
  $("#popup").attr("src", "../trivia-game/assets/images/" + progression + ".jpg");
  setTimeout(clearImage, 2000);
}

function clearImage() {
  $("#popup").attr("src", "../trivia-game/assets/images/start.jpg");
}

function endGame() {
  for (var i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i] == userAnswers[i]) {
      userCorrect++;
    }
    else {
      userIncorrect++;
    }
  }
  $("#q").html("correct:" + userCorrect + ". incorrect:" + userIncorrect);
  $("#a1").html("")
  $("#a2").html("")
  $("#a3").html("")
  $("#a4").html("")
  $("#reset").show();
}

$("button").on("click", function() {
  console.log(progression)
  if ((progression === 0) && (timerRunning === false)) {
    progression++;
    startTimer();
    askQuestion();
  }
  else if ((progression > 0) && (timerRunning)) {
    stopTimer();
    popupAnswer();
    var temp = ($(this).attr("value"))
    userAnswers.push(temp);
    progression++;
    if (progression === 4) {
      setTimeout(endGame, 2000);
      return;
      }
    askQuestion();
    setTimeout(startTimer, 2000);
  }
})
$("#reset").on("click", function() {
    reset();
  })

// $("#reset").on("click", function() {
//   reset();
//   $("#endreset").clear();
// })

reset();

//game description and 'press to start' button
//var useranswers = [];
//var correct count and incorrect count
//var obj = {
//  q1: [q, a1, a2, a3, a4] index 0 for question
//  q2: [q, a1, a2, a3, a4] index 1 2 3 4 for answers
//};
//var answers = [1, 2, 3, 2, 1, 2]; etc
//for each question
//push obj.q1[0] at top for question\
//4 buttons
//push obj.q1[1] obj.q2[2] etc for answers
//on button click ->
//push value of button (1,2,3,4) into user answers
//compare answers and useranswers
//each question shows for 10s
//after button click, show answer for 2s, then move to next question
//reset button