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

// Load a scene on the board
function fetchScene(scene_num){
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

  // TOOD: reference cookie monster class
  setCookie("visited", JSON.stringify(game_state.visited), 10);
  setCookie("current_room", game_state.current_room, 10);
}