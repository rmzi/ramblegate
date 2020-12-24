var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var current = 0;
var homepage = document.getElementById("home");

var keyHandler = function (event) {

	if(event.key == " "){
		homepage.classList.remove("hidden")
		homepage.classList.add("visible")
	}

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

	// If complete, alert and reset
	if (pattern.length === current) {
		current = 0;
		
		homepage.classList.add("hidden");
		homepage.classList.remove("visible")
	}

};

// Listen for keydown events
document.addEventListener('keydown', keyHandler, false);