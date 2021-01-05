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