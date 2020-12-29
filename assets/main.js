var draw = SVG('.svg_container')
var board = draw.find('.board')
var home = draw.find('.home')
var overlay = draw.find('.overlay')
var title = draw.find('.title')

board.hide()
overlay.hide()
title.hide()

var door1;
var scene;
var real_scene;
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
var homepage = document.getElementsByClassName("home")[0];

// KEYBOARD INPUT
/////////////////////////////////////////////////
var keyHandler = function (event) {

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
    
    // Hide the homepage and transition to the board
    home.hide()
    board.show()
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
              door1.on('click', goWest);
        } else {
          console.log('Error: ' + initial_request.status); // An error occurred during the request.
        }
      }
    };
}

// ROOM 1
/////////////////////////////////////////////////

// rename to room1_goWest
let goWest = function() {
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
            door1 = board.find("#north")
            door1.on('click', goWest);
          } else {
            console.log('Error: ' + new_request.status); // An error occurred during the request.
          }
        }
    };
}

// ROOM 2
/////////////////////////////////////////////////

init();