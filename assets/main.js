// Output debug messages
let DEBUG_FLAG = true;

// HELPER FUNCTIONS
/////////////////////////////////////////////////

// Output message to console iff DEBUG_STATE === true
function debug(text) {
  if (DEBUG_FLAG) {
    console.log("DEBUG: " + text);
  }
}

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

// Let's GO!
init();
