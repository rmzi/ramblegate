var draw = SVG('svg_container')

var xhr = new XMLHttpRequest();
xhr.open('GET', 'assets/boards/BOARD2.svg');
xhr.send(null);

xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
            console.log(xhr.responseText);
            draw.svg(xhr.responseText)
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };


// let door2 = SVG('#DOOR-2');
// let door3 = SVG('#DOOR-3');

let highlight = function() {
    this.fill({color: '#f06'});
}

let unhighlight = function(){
    this.fill({color: '#ffffff'});
}

// let goWest = function() {
//     alert("Going West!");
// }

// let goNorth = function() {
//     alert("Going North!");
// }

// let goEast = function() {
//     alert("Going East!");
// }

// door1.on('mouseenter', highlight);
// door1.on('mouseleave', unhighlight);
// door1.on('click', goWest);

// door2.on('mouseenter', highlight);
// door2.on('mouseleave', unhighlight);
// door2.on('click', goNorth);

// door3.on('mouseenter', highlight);
// door3.on('mouseleave', unhighlight);
// door3.on('click', goEast);