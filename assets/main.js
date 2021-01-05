// Enable javascript HARD MODE
// ** NOTE ** Doesn't allow for _hoisting_
// "use strict";

let DEBUG_FLAG = true;

// Attach SVG JS to DOM SVG Canvas
const draw = SVG(".svg_container");

// SVG Selectors for all layers
const board = draw.find(".board");
const home = draw.find(".home");
const overlay = draw.find(".overlay");
const title = draw.find(".title");
const legal = draw.find(".legal");
const company = draw.find(".company");
const prompter = draw.find("#prompt");

// Initialize INPUT_MODE to `home`
let INPUT_MODE = "HOME";

// Map
///////////////////////

// ToDo: represent map as object and read object to set minimap
const game_map = {
  1: {
    north: 2,
  },
  2: {
    north: 5,
    south: 1,
    east: 4,
    west: 3,
  },
  3: {
    east: 2,
  },
  4: {
    west: 2,
  },
  5: {
    south: 2,
  },
};

// NOTE:
//   - In order for the text to fit properly in the prompter, it must follow the following parameters:
//     1. No line can have > 60 characters
//     2. Single line text can use ""
//     3. Multi-line text must use ``
// ToDo: No matter how text is defined, paginate properly

// Page length = 3 lines
const page_length = 3;

const script = {
  1: {
    entry: {
      title: "Enter: Ramblegate",
      // Example of a multi-line string using ``
      text: `Ramblegate is a game of power, not succinct in any way. 
        It teaches us patience with ourselves and the world... 
        Join us on this quest to conquer life itself!!
        You will be challenged in many ways,
        most of them focused on testing your intellect,
        courage and strength.
        Can you succeed in besting RAMBLEGATE?!`,
    },
  },
  2: {
    entry: {
      title: "Choices",
      text:
        "You are presented with a choice of three doors. Which one will you choose?",
    },
  },
  3: {
    entry: {
      title: "Green",
      text:
        "This room makes you feel... somehow angry... wanting of material things...",
    },
  },
  4: {
    entry: {
      title: "Blue",
      text:
        "This room make you feel calm... but also a bit sad... longing for the sea...",
    },
  },
  5: {
    entry: {
      title: "Enter: Ramble!",
      text: "Who's this? You are confronted with a strange object...",
    },
  },
  0: {
    test: {
      title: "woo",
      text: `Roses are Red,
        Violets are Blue,
        Sugar is sweet,
        And so are you.
        The sex is amazing,
        Your body is blazing.
        I can't tell you how you've made me complete,
        The world's been bereft, but now its replete`,
    },
  },
};

// Initialize Game State
// ToDo - write class for managing game state

// Define Game State
let game_state = {
  visited: [],
  current_room: 1,
  prompt: {
    title: "",
    text: "",
    page: 0,
  },
};

// Cardinal Directions (for minimap)
const north = board.find("#north");
const south = board.find("#south");
const east = board.find("#east");
const west = board.find("#west");

const directions = {
  north: north,
  south: south,
  east: east,
  west: west,
};

// INTIAL LOAD
/////////////////////////////////////////////////
function init() {
  debug("Initializing game...");

  debug(document.cookie);

  // Hide everything except `home`
  board.hide();
  overlay.hide();
  title.hide();
  legal.hide();
  company.hide();
  prompter.hide();

  // Listen for keydown events
  document.addEventListener("keydown", keyHandler, false);
}

// HELPER FUNCTIONS
/////////////////////////////////////////////////

// Output message to console iff DEBUG_STATE === true
function debug(text) {
  if (DEBUG_FLAG) {
    console.log("DEBUG: " + text);
  }
}

// Load a scene on the board
let fetchScene = (scene_num) => {
  let request = new XMLHttpRequest();
  request.open("GET", "assets/boards/BOARD" + scene_num + ".svg");
  request.send(null);

  request.onreadystatechange = () => {
    let DONE = 4; // readyState 4 means the request is done.
    let OK = 200; // status 200 is a successful return.
    if (request.readyState === DONE) {
      if (request.status === OK) {
        // Debug: dump scene payload
        debug(request.responseText);

        // Draw scene to the board
        board.svg(request.responseText);
      } else {
        // An error occurred during the request.
        console.log("Error: " + request.status);
      }
    }
  };
};

// COOKIE MONSTER
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// WEB AUDIO API
/////////////////////////////////////////////////

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// KONAMI CODE
/////////////////////////////////////////////////
const pattern = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Current index of Konami Code
let current = 0;

// OPENING SEQUENCE
/////////////////////////////////////////////////

// COMPANY SEQUENCE

// SVG Selectors letters
var D = company.find("#D");
var A = company.find("#A");
var T = company.find("#T");
var B = company.find("#B");
var O = company.find("#O");
var Y = company.find("#Y");

var fadeInCompany = function () {
  home.hide();

  var companyAnimator = company
    .show()
    .animate({
      duration: 1,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  companyAnimator.after(fadeInLetters);
};

function fadeInLetters() {
  // get the audio element for the datboy audio
  // TODO: reference this properly
  const audioElement = document.querySelectorAll("audio")[1];
  audioElement.loop = false;

  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);

  // Connect <audio> to Web Audio API
  track.connect(audioContext.destination);

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Start intro music
  audioElement.play();

  fadeInD();
  colorD();
  fadeInA();
  colorA();
  fadeInT();
  colorT();
  fadeInB();
  colorB();
  fadeInO();
  colorO();
  fadeInY();
  colorY();
}

var fadeInD = function () {
  var DAnimator = D.animate({
    duration: 700,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorD() {
  D.animate({
    duration: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInA = function () {
  var AAnimator = A.animate({
    duration: 700,
    delay: 100,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorA() {
  A.animate({
    duration: 200,
    delay: 100,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInT = function () {
  var TAnimator = T.animate({
    duration: 700,
    delay: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorT() {
  T.animate({
    duration: 200,
    delay: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInB = function () {
  var BAnimator = B.animate({
    duration: 700,
    delay: 300,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorB() {
  B.animate({
    duration: 200,
    delay: 300,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInO = function () {
  var OAnimator = O.animate({
    duration: 700,
    delay: 400,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorO() {
  O.animate({
    duration: 200,
    delay: 400,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInY = function () {
  var YAnimator = Y.animate({
    duration: 700,
    delay: 500,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);

  YAnimator.after(fadeOutCompany);
};

function colorY() {
  Y.animate({
    duration: 200,
    delay: 500,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeOutCompany = function () {
  var companyAnimator = company
    .animate({
      duration: 1000,
      delay: 2000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 0 });

  companyAnimator.after(fadeInLegal);
};

var fadeInLegal = function () {
  company.hide();

  var legalAnimator = legal
    .show()
    .animate({
      duration: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  legalAnimator.after(fadeOutLegal);
};

var fadeOutLegal = function () {
  var legalAnimator = legal
    .animate({
      duration: 1000,
      delay: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 0 });

  legalAnimator.after(fadeInTitle);
};

var fadeInTitle = function () {
  legal.hide();

  var titleAnimator = title
    .show()
    .animate({
      duration: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  // get the audio element for the intro text
  // TODO: reference this properly
  const audioElement = document.querySelectorAll("audio")[0];
  audioElement.loop = true;

  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);

  // Connect <audio> to Web Audio API
  track.connect(audioContext.destination);

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Start intro music
  audioElement.play();
};

// KEYBOARD INPUT
/////////////////////////////////////////////////
function keyHandler(event) {
  // Choose proper handler codepath based on INPUT_MODE
  switch (INPUT_MODE) {
    case "HOME":
      // 0 @ Home = TITLE
      if (event.key === "0") {
        // Changing game state to 'TITLE'
        INPUT_MODE = "TITLE";

        // Hide the homepage and transition to the board
        var homeAnimator = home
          .animate({
            duration: 1000,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ opacity: 0 });

        homeAnimator.after(fadeInCompany);
      }

      // 1 @ Home = BOARD
      if (event.key === "1") {
        // Hide the homepage and transition to the board
        var homeAnimator = home
          .animate({
            duration: 1000,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ opacity: 0 });

        INPUT_MODE = "BOARD";

        board
          .show()
          .animate({
            duration: 1000,
            delay: 100,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ opacity: 1 });

        // Start the game
        goToRoom(game_state.current_room);
      }

      // If the key isn't in the pattern, or isn't the current key in the pattern, reset
      if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;

        // ToDo: Redo this animation using cooler animation?
        // Color all Konami code instructions red
        for (i = 1; i <= 10; i++) {
          SVG("#button" + i.toString()).fill({ color: "#ff0000" });
        }

        // Half a second later, go back to black
        setTimeout(() => {
          for (i = 1; i <= 10; i++) {
            SVG("#button" + i.toString()).fill({ color: "#000000" });
          }
        }, 500);

        return;
      }

       // Update how much of the pattern is complete
       current++;
      
      if (current <= pattern.length) {
        SVG("#button" + current.toString())
          .animate({
            duration: 300,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ fill: "#00FF00" })
          .animate({ duration: 100 })
          .attr({ fill: "#0000FF" });
      }

      // If complete, move to the next screen
      if (pattern.length === current) {
        debug("Successfully entered the Konami Code. (If you know) You know.");

        current = 0;
        // Changing input mode to 'TITLE'
        INPUT_MODE = "TITLE";

        // Hide the homepage and transition to the board
        var homeAnimator = home
          .animate({
            duration: 1000,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ opacity: 0 });

        homeAnimator.after(fadeInCompany);
      }
      break;

    case "TITLE":
      if (event.key === "Enter") {
        debug(document.cookie);

        title.hide();

        // Change INPUT_MODE to board
        INPUT_MODE = "BOARD";

        board
          .show()
          .animate({
            duration: 1000,
            delay: 100,
            when: "now",
            swing: "true",
            times: 1,
          })
          .attr({ opacity: 1 });

        // Fetch current_room from cookies
        if (getCookie("current_room") != "") {
          game_state.current_room = getCookie("current_room");
        }

        // Fetch visited rooms from cookies
        if (getCookie("visited") != "") {
          game_state.visited = JSON.parse(getCookie("visited"));
        }

        // Start the game
        goToRoom(game_state.current_room);
      } else if (event.key === "0") {
        if (
          confirm(
            "Clear your save state? (All of your saved progress will be gone. For real, for real)."
          )
        ) {
          setCookie("visited", JSON.stringify([]), 10);
          setCookie("current_room", 1, 10);
          debug("Clearing game state");
        }
      }
      break;
    case "BOARD":
      switch (event.key) {
        case "ArrowUp":
          north.dispatch("click");
          break;
        case "ArrowDown":
          south.dispatch("click");
          break;
        case "ArrowRight":
          east.dispatch("click");
          break;
        case "ArrowLeft":
          west.dispatch("click");
          break;
        case "0":
          prompt(script[0].test.title, script[0].test.text, 0);
          INPUT_MODE = "PROMPT";
      }
      break;
    case "PROMPT":
      progressPrompt();
      break;
    default:
      debug("Invalid input mode");
      break;
  }
}

// ROOM NAVIGATION
/////////////////////////////////////////////////

// CONTROLLING MINIMAP
function setMiniMap(room_num) {
  // Clear existing event handlers
  north.off("click");
  south.off("click");
  east.off("click");
  west.off("click");

  // Iterate through possible movements from `room_num`
  for (let direction in game_map[room_num]) {
    directions[direction].click(() => goToRoom(game_map[room_num][direction]));
  }
}

function goToRoom(room_num) {
  // Remove existing scene from board
  board.find("#SCENE").remove();

  // Fetch new scene
  game_state.current_room = room_num;
  fetchScene(game_state.current_room);
  setMiniMap(game_state.current_room);

  // If it's the first time going to this room, show prompt
  if (game_state.visited.indexOf(game_state.current_room.toString()) === -1) {
    game_state.visited.push(game_state.current_room.toString());
    INPUT_MODE = "PROMPT";

    prompt(
      script[game_state.current_room].entry.title,
      script[game_state.current_room].entry.text,
      0
    );
  } else {
    debug("You have already been to this room.");
  }

  setCookie("visited", JSON.stringify(game_state.visited), 10);
  setCookie("current_room", game_state.current_room, 10);
}

// PROMPT MANAGEMENT
function prompt(title, text, page) {
  overlay.show();
  prompter.show();

  // Update the game state
  game_state.prompt = {
    title: title,
    text: text,
    page: page,
  };

  // Get only the text for this page
  const prompter_text = game_state.prompt.text
    .split("\n")
    .slice(page * page_length, page * page_length + page_length)
    .join("\n");
  debug(prompter_text);

  prompter.find("#prompt_title").text(title);
  prompter.find("#prompt_text").text(prompter_text);
}

function progressPrompt() {
  // Turn the page
  game_state.prompt.page++;

  // If on the last page
  if (
    game_state.prompt.page * page_length >
    game_state.prompt.text.split("\n").length
  ) {
    // Exit the prompter
    INPUT_MODE = "BOARD";
    prompter.hide();
    overlay.hide();
  } else {
    // Prompt the next page
    prompt(
      game_state.prompt.title,
      game_state.prompt.text,
      game_state.prompt.page
    );
  }
}

// INVENTORY MANAGEMENT

// Use the below pattern when adding things to inventory?

// function fun1(...params) {
//   console.log(params.length);
// }
// fun1();
// fun1(5);
// fun1(5, 6, 7);

// Use the pattern below for update_inventory()

// function update_inventory() {

//   game_state.inventory.map((item, index) => {
//     // Fetch item from sprite sheet
//     // Use index to put it into sidebar
//   })
// }

// const names = ['TutorialsPoint','Mohtashim','Bhargavi','Raja']
// names.map((element,index)=> {
//   console.log('inside arrow function')
//   console.log('index is '+index+' element value is :'+element)
// })

// Let's GO!
init();
