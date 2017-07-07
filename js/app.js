$(init);

let score             = 5;
let duckInterval      = null;
let duckSpeed         = 6000;
let duckIntervalSpeed = 2000;
let level             = 1;
let lives             = 3;
let ammonition        = 5;

const start1 = function() {
  new Audio('sounds/Whimsical-Popsicle.mp3').play();
};
const blast = function() {
  new Audio('sounds/explode1_15.mp3').play();
};

const reloaded = function() {
  new Audio('sounds/guncock_2.mp3').play();
};


function init() {
  const $start = $('.start');

  $start.on('click', playGame);
  $start.on('click', start1);
  $start.on('click',function(){
    $('.rules').toggle();
  });
}

function playGame() {
  duckInterval = setInterval(createDuck, duckIntervalSpeed);

  $('.level span').text(level);
  showBullets();
  $('.board').on('click', handleClick);
  $('#reload').on('click', addBullets);
}

function showBullets() {
  $('.bullets').empty();

  for (var i = 0; i < ammonition; i++) {
    $('<li></li>').appendTo('.bullets');
  }
}

function handleClick(e) {
  e.stopPropagation();

  if (ammonition !== 0) {
    ammonition--;
    showBullets();
    if ($(e.target).hasClass('duck')) clickedDuck(e.target);
  } else {
    // play sound
  }
}

function addBullets() {
  if (ammonition === 0) {
    ammonition = 5;
    showBullets();
    reloaded();
  }
}

function createDuck() {
  // the duck will be created and appended to a random row
  const $randomRow = $(pickRandomRow());
  const $duck       = $('<div class="duck"></div>');
  $randomRow.append($duck);
  $duck.on('click', handleClick);
  animateDuck($duck);
}

function animateDuck($duck) {
  $duck.animate({
    'left': '1100px'
  }, duckSpeed, 'linear', function() {
    // if animation is fully completed, this function will execute
    $duck.stop().remove();
    score --;
    $('.score span').text(score);
    checkScore();
  });
}

function clickedDuck(duck) {
  console.log('clicked');

  $(duck).stop().remove();
  blast();
  // definate a new animation to add to the top value of the duck
  score ++;
  $('.score span').text(score);
  checkScore();
}

function checkScore() {
  // check the value of score and either add a new level, or end the game
  if (score % 15 === 0) {
    level++;
    $('.level span').text(level);
    clearInterval(duckInterval);
    duckSpeed -= 1500;
    duckIntervalSpeed -= 70;
    duckInterval = setInterval(createDuck, duckIntervalSpeed);
  }

  if (score <= 0 ) {
    console.log('game over');
    $('.duck').stop().remove();
    clearInterval(duckInterval);
  }
}

function pickRandomRow() {
  return $('.row')[Math.floor(Math.random()*$('.row').length)];
}
