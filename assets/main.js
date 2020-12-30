// Attach SVG JS to DOM SVG Canvas
var draw = SVG('.svg_container')

// SVG Selectors for all layers
var board = draw.find('.board')
var home = draw.find('.home')
var overlay = draw.find('.overlay')
var title = draw.find('.title')
var legal = draw.find('.legal')
var company = draw.find('.company')

// Initialize Game State to `home`
var GAME_STATE = 'HOME'

// Hide everything except `home`
board.hide()
overlay.hide()
title.hide()
legal.hide()
company.hide()

// Cardinal Directions (for minimap)
var north = board.find('#north');
var south = board.find('#south');
var east = board.find('#east');
var west = board.find('#west');

// Manage current room
var current_room;
var scene;

var DEBUG_FLAG = true;

// HELPER FUNCTIONS
/////////////////////////////////////////////////

let debug = function(text){
  if(DEBUG_FLAG) {
    console.log("DEBUG: " + text);
  }
}

let fetchScene = function(scene_num) {
  var request = new XMLHttpRequest();
  request.open('GET', 'assets/boards/BOARD' + scene_num + '.svg');
  request.send(null);

  request.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (request.readyState === DONE) {
      if (request.status === OK) {
            // Debug: dump scene payload
            debug(request.responseText);
            
            // Draw scene to the board
            board.svg(request.responseText)
      } else {
        // An error occurred during the request.
        console.log('Error: ' + request.status); 
      }
    }
  };
}

// WEB AUDIO API
/////////////////////////////////////////////////

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');
audioElement.loop = true;

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// KONAMI CODE
/////////////////////////////////////////////////
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;

// OPENING SEQUENCE
/////////////////////////////////////////////////
var fadeInCompany = function() {
  home.hide();

  var companyAnimator = company.show().animate({
    duration: 1000,
    when: 'now',
    swing: 'true',
    times: 1
  }).attr({opacity: 1});

  companyAnimator.after(fadeOutCompany);
}

var fadeOutCompany = function() {
  var companyAnimator = company.animate({
    duration: 1000,
    delay: 1000,
    when: 'now',
    swing: 'true',
    times: 1
  }).attr({opacity: 0})

  companyAnimator.after(fadeInLegal)
}

var fadeInLegal = function() {
  company.hide()

  var legalAnimator = legal.show().animate({
    duration: 1000,
    delay: 1000,
    when: 'now',
    swing: 'true',
    times: 1
  }).attr({opacity: 1});

  legalAnimator.after(fadeOutLegal);
}

var fadeOutLegal = function() {
  var legalAnimator = legal.animate({
    duration: 1000,
    delay: 1000,
    when: 'now',
    swing: 'true',
    times: 1
  }).attr({opacity: 0})

  legalAnimator.after(fadeInTitle)
}

var fadeInTitle = function() {
  legal.hide();

  var titleAnimator = title.show().animate({
    duration: 1000,
    when: 'now',
    swing: 'true',
    times: 1
  }).attr({opacity: 1});

  // Connect <audio> to Web Audio API
  track.connect(audioContext.destination);

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  // Start intro music
  audioElement.play();
}

// KEYBOARD INPUT
/////////////////////////////////////////////////
var keyHandler = function (event) {

  // HOME MODE
  if(GAME_STATE === 'HOME'){
        // If the key isn't in the pattern, or isn't the current key in the pattern, reset
      if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
        for(i = 1; i <= 10; i++){
            SVG("#button" + i.toString()).fill({color: '#ff0000'})
    }
    setTimeout(() => { 
      for(i = 1; i <= 10; i++){
              SVG("#button" + i.toString()).fill({color: '#000000'})
      }  
    }, 500);

    return;
    }

    // Update how much of the pattern is complete
    current++;

    if(current <= pattern.length){
        SVG("#button" + current.toString()).fill({color: '#f06'})
    }

    // If complete, move to the next screen
    if (pattern.length === current) {

    debug("Successfully entered the Konami Code. (If you know) You know.")

    current = 0;
    // Changing game state to 'TITLE'
    GAME_STATE = 'TITLE'

    // Hide the homepage and transition to the board
    var homeAnimator = home.animate({
      duration: 1000,
      when: 'now',
      swing: 'true',
      times: 1
    }).attr({opacity: 0});

    homeAnimator.after(fadeInCompany);
    }
  }

  // TITLE MODE
  if(GAME_STATE === 'TITLE') {
    if (event.key == "Enter") {
      title.hide()

      // Change GAME_STATE to board
      GAME_STATE = 'BOARD'

      board.show().animate({
        duration: 1000,
        delay: 100,
        when: 'now',
        swing: 'true',
        times: 1
      }).attr({opacity: 1});

      // Start the game
      goToRoom(current_room);
    }
  }

  // BOARD MODE
  if(GAME_STATE === 'BOARD') {
    switch(event.key) {
      case "ArrowUp":
      north.dispatch('click');
      break;
      case "ArrowDown":
      south.dispatch('click');
      break;
      case "ArrowRight":
      east.dispatch('click');
      break;
      case "ArrowLeft":
      west.dispatch('click');
      break;
    }
  }
};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);

// CONTROLLING MINIMAP
var setMiniMap = function(room_num){

  // Clear existing event handlers
  north.off('click');
  south.off('click');
  east.off('click');
  west.off('click')

  switch(room_num) {
    case 1:
      north.click(() => goToRoom(2));
      break;
    case 2:
      north.click(() => goToRoom(5));
      south.click(() => goToRoom(1))
      east.click(() => goToRoom(4));
      west.click(() => goToRoom(3));
      break;
    case 3:
      east.click(() => goToRoom(2));
      break;
    case 4:
      west.click(() => goToRoom(2));
      break;
    case 5:
      south.click(() => goToRoom(2))
      break;
    default:
      debug("Invalid room number provided -- are you haXX0r??")
  } 
}

// INTIAL LOAD
/////////////////////////////////////////////////
let init = function(){
  debug("Running init...")
  current_room = 1;
}

// ROOM NAVIGATION
/////////////////////////////////////////////////
let goToRoom = function(room_num) {
  // Remove existing scene from board
  board.find("#SCENE").remove();

  // Fetch new scene
  current_room = room_num;
  fetchScene(current_room);
  setMiniMap(current_room);
}

init();