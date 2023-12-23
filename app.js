var gameState = "start";
var boxArr = [];
var clickArr = [];
var lvl = 1;
var vol = true;

// Key Listener
$(document).keypress(function (e) {
  if (gameState === "start") {
    $(".start-title").css("display", "none");
    $(".level-title").text("Level " + lvl);
    $(".level-title").css("display", "block");
    gameState = "play";
    setTimeout(play, 500);
  }

  if (gameState === "over") {
    // Restart conditions
    lvl = 1;
    boxArr = [];
    clickArr = [];

    // Restart css
    $(".over-title").css("display", "none");
    $(".box").css("opacity", "1");
    $(".level-title").text("Level " + lvl);
    $(".level-title").css("visibility", "visible");
    gameState = "play";
    setTimeout(play, 500);
  }
});

// Click Listener
$(".box").on("click", function (e) {
  if (gameState === "play") {
    var clickedBox = "." + e.target.classList[1];

    // Click Animation
    $(clickedBox).addClass("pressed");
    setTimeout(function () {
      $(clickedBox).removeClass("pressed");
    }, 100);

    // Click Sound
    if (vol) playSound(clickedBox);

    // Upadte clickArr
    clickArr.push(clickedBox);

    // Check if wrong
    if (!check(clickArr)) {
      gameState = "over";
      over();
      // return;
    }

    // Check if lvlUp
    if (clickArr.length === lvl) {
      lvlUp();
    }
  }
});

function play() {
  var randNum = Math.floor(Math.random() * 4) + 1;
  var box = ".box" + randNum;
  // Box Sound
  if (vol) playSound(box);
  boxArr.push(box);
  // Flash box
  $(box).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function over() {
  // Red flash
  $("body").css("background-color", "red");
  setTimeout(function () {
    $("body").css("background-color", "#011f3f");
  }, 100);

  // Fade boxes and hide level-title
  $(".box").css("opacity", "0.2");
  $(".level-title").css("visibility", "hidden");

  // Display over-title and set level to 0
  $(".over-title").css("display", "block");
  lvl = 0;
  $(".level-title").text("Level " + lvl);
}

function lvlUp() {
  // Clear clickArr and call play
  lvl++;
  clickArr = [];
  $(".level-title").text("Level " + lvl);
  setTimeout(play, 1000);
}

function check(clickArr) {
  for (let i = 0; i < clickArr.length; i++) {
    if (clickArr[i] !== boxArr[i]) {
      return false;
    }
  }
  return true;
}

function playSound(clickedBox) {
  if (clickedBox == ".box1") {
    var aud = new Audio("sounds/green.mp3");
    aud.play();
  } else if (clickedBox == ".box2") {
    var aud = new Audio("sounds/red.mp3");
    aud.play();
  } else if (clickedBox == ".box3") {
    var aud = new Audio("sounds/yellow.mp3");
    aud.play();
  } else {
    var aud = new Audio("sounds/blue.mp3");
    aud.play();
  }
}

// Volume Control
$(".vol").click(function (e) {
  $(e.target).toggleClass("fa-volume-high");
  $(e.target).toggleClass("fa-volume-xmark");
  vol = !vol;
});
