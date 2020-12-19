var draw = SVG('#svg_container')
var board = draw.find('#BOARD')
var door1;
var scene;
var real_scene;

var initial_request = new XMLHttpRequest();
    initial_request.open('GET', 'assets/boards/BOARD1.svg');
    initial_request.send(null);

initial_request.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (initial_request.readyState === DONE) {
      if (initial_request.status === OK) {
            console.log(initial_request.responseText);
            board.svg(initial_request.responseText)
            door1 = board.find("#north")
            door1.on('click', goWest);
      } else {
        console.log('Error: ' + initial_request.status); // An error occurred during the request.
      }
    }
  };

let goWest = function() {
    console.log(board.children()[0][2])
    board.children()[0][2].remove()

    var new_request = new XMLHttpRequest();
    new_request.open('GET', 'assets/boards/BOARD2.svg');
    new_request.send(null);

    new_request.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (new_request.readyState === DONE) {
        if (new_request.status === OK) {
                console.log(new_request.responseText);
                scene = board.svg(new_request.responseText);
                door1 = board.find("#north")
                door1.on('click', goWest);
        } else {
            console.log('Error: ' + new_request.status); // An error occurred during the request.
        }
        }
    };
}