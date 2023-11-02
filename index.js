var gamePattern = [];
var userSelection = [];
var level = 0;
var started = false;

$(document).on("keydown", function () {
  if (!started) {
    initGame();
    nextSeq();
    started = true;
  }
});

$(".btn").on("click", function (event) {
  var key = event.target.id;
  makeSound(key);
  userSelection.push(key);
  if (userSelection.length <= gamePattern.length) {
    check(userSelection.length - 1);
  } else {
    wrong();
  }
});

function initGame() {
  gamePattern = [];
  level = 0;
  started = false;
}
function check(currentLevel) {
  if (userSelection[currentLevel] == gamePattern[currentLevel]) {
    if (currentLevel == gamePattern.length - 1) {
      setTimeout(() => {
        if (started) {
          nextSeq();
        }
      }, 1000);
    }
  } else {
    wrong();
  }
}
function wrong() {
  new Audio("sounds/wrong.mp3").play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  started = false;
}
function makeSound(key) {
  switch (key) {
    case "green":
      var sound = new Audio("sounds/green.mp3");
      sound.play();
    case "blue":
      var sound = new Audio("sounds/blue.mp3");
      sound.play();
    case "red":
      var sound = new Audio("sounds/red.mp3");
      sound.play();
    case "yellow":
      var sound = new Audio("sounds/yellow.mp3");
      sound.play();
  }
  makeAnimate(key);
}
function makeAnimate(e) {
  $("." + e).addClass("pressed");
  setTimeout(() => {
    $("." + e).removeClass("pressed");
  }, 100);
}
function nextSeq() {
  userSelection = [];
  level++;
  var buttons = ["blue", "green", "red", "yellow"];
  var next = Math.ceil(Math.random() * 4);
  var selected = buttons[next - 1];
  gamePattern.push(selected);
  $("h1").text("Level " + gamePattern.length);
  makeSound(selected);
}
