var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//Start the Game - Press A Key to Start
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Check Which Button is Pressed
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log("gamePattern " + gamePattern)

}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("userClickedPattern " + userClickedPattern);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    gameOver();
    restartTheGame()
  }
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
  $("body").removeClass("game-over");
}, 200);
  $("#level-title").text("Game Over Press Any Key to Restart");
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
}

function restartTheGame(){
  started = false;
  level = 0;
  gamePattern = [];

  // $(document).keydown(function() {
  //
  // //   if (!started) {
  // //     $("#level-title").text("Level " + level);
  // //     nextSequence();
  // //     started = true;
  // //   }
  // // });
}
