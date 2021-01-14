// MANAGING TOUCH
////////////////////////
var startX,
    startY,
    dist,
    h_threshold = 150, //required min horizontal distance traveled to be considered swipe
    v_threshold = 100, //required min vertical distance traveled to be considered swipe
    allowedTime = 500, // maximum time allowed to travel that distance
    elapsedTime,
    startTime

function handleswipe(swipes){
    // If user has swiped in any direction
    if (swipes[0] || swipes[1] || swipes[2] || swipes[3]){

      switch(INPUT_MODE) {
        case "HOME":

          // Show Konami on first swipe
          if(!konami_started){
            showKonami();
            return; 
          }

          // Allow input of Konami Code
          if(swipes[0]){
            debug("swipe up")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowUp'}))
          } else if(swipes[1]){
            debug("swipe down")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowDown'}))
          } else if(swipes[2]){
            debug("swipe left")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowLeft'}))
          } else if(swipes[3]){
            debug("swipe right")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowRight'}))
          }
        break;
        case "TITLE":
          document.dispatchEvent(new KeyboardEvent('keydown',{'key':' '}));
        break;
        case "BOARD":

          // Allow input of Konami Code
          if(swipes[0]){
            debug("swipe up")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowUp'}))
          } else if(swipes[1]){
            debug("swipe down")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowDown'}))
          } else if(swipes[2]){
            debug("swipe left")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowLeft'}))
          } else if(swipes[3]){
            debug("swipe right")
            document.dispatchEvent(new KeyboardEvent('keydown',{'key':'ArrowRight'}))
          }
        break;
      }
    }
}

document.addEventListener('touchstart', function(e){
    document.innerHTML = ''
    var touchobj = e.changedTouches[0]
    dist = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime() // record time when finger first makes contact with surface
    e.preventDefault()
}, false)

document.addEventListener('touchmove', function(e){
    e.preventDefault() // prevent scrolling when inside DIV
}, false)

document.addEventListener('touchend', function(e){
    var touchobj = e.changedTouches[0]
    
    // get total horizontal / vertical distance traveled by finger while in contact with surface and how long it took
    horizontal_dist = touchobj.pageX - startX 
    vertical_dist = touchobj.pageY - startY
    elapsedTime = new Date().getTime() - startTime // get time elapsed
    
    // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
    var swipe_up = (elapsedTime <= allowedTime && vertical_dist <= v_threshold * -1 && Math.abs(horizontal_dist) <= 100)
    var swipe_down = (elapsedTime <= allowedTime && vertical_dist >= v_threshold && Math.abs(horizontal_dist) <= 100)
    var swipe_left = (elapsedTime <= allowedTime && horizontal_dist <= h_threshold * -1 && Math.abs(vertical_dist) <= 100)
    var swipe_right = (elapsedTime <= allowedTime && horizontal_dist >= h_threshold && Math.abs(vertical_dist) <= 100)

    handleswipe([swipe_up, swipe_down, swipe_left, swipe_right])
    e.preventDefault()
}, false)
