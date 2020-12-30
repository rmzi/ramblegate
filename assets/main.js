var draw = SVG('.svg_container')

// SVG Selectors for all layers
var board = draw.find('.board')
var home = draw.find('.home')
var overlay = draw.find('.overlay')
var title = draw.find('.title')
var legal = draw.find('.legal')
var company = draw.find('.company')

var GAME_STATE = 'HOME'

// Hide everything except `home`
board.hide()
overlay.hide()
title.hide()
legal.hide()
company.hide()

// Cardinal Directions (for minimap)
var north;
var south;
var east;
var west;

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

// WEB AUDIO API
/////////////////////////////////////////////////

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// KONAMI CODE
/////////////////////////////////////////////////
var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;

var fadeInCompany = function() {
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
  var legalAnimator = legal.show().animate({
    duration: 1000,
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

  // If the enter key is pressed on the Title screen, start the game


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

  if(GAME_STATE === 'TITLE') {
    if (event.key == "Enter") {
      // Hide everything (except Board and Overlay (which are already hidden))
      home.hide()
      legal.hide()
      title.hide()

      board.show().animate({
        duration: 1000,
        delay: 0000,
        when: 'now',
        swing: 'true',
        times: 1
      }).attr({opacity: 1});
    }
  }
};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);

// INTIAL LOAD
/////////////////////////////////////////////////
let init = function(){
  debug("Running init...")

  var initial_request = new XMLHttpRequest();
    initial_request.open('GET', 'assets/boards/BOARD1.svg');
    initial_request.send(null);

  initial_request.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (initial_request.readyState === DONE) {
        if (initial_request.status === OK) {
              debug(initial_request.responseText);
              board.svg(initial_request.responseText)
              door1 = board.find("#north")
              door1.on('click', room1_goNorth);
        } else {
          console.log('Error: ' + initial_request.status); // An error occurred during the request.
        }
      }
    };
}

// ROOM 1
/////////////////////////////////////////////////

// rename to room1_goWest
let room1_goNorth = function() {
    // Remove existing scene from board
    board.find("#SCENE").remove()

    // Fetch new scene
    var new_request = new XMLHttpRequest();
    new_request.open('GET', 'assets/boards/BOARD2.svg');
    new_request.send(null);

    // When scene is fetched, draw it to the page and attach new event handlers
    new_request.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (new_request.readyState === DONE) {
          if (new_request.status === OK) {
                  
            debug(new_request.responseText);
                  
            scene = board.svg(new_request.responseText);
            north = board.find("#north")
            north.on('click', room1_goNorth);
          } else {
            console.log('Error: ' + new_request.status); // An error occurred during the request.
          }
        }
    };
}

// ROOM 2
/////////////////////////////////////////////////

init();