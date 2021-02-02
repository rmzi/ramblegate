function act(action) {
  switch (action.type) {
    case "inventory_add": 
      // Add item to game inventory
      game_state.inventory.append(item);
      update_inventory();
    break;

    case "inventory_remove":
      // Remove item from game inventory
      game_state.inventory = game_state.inventory.filter(function(item){
        return item !== action.meta.item
      })
      update_inventory();

    case "navigation_add":
      // Add new navigation to the map
      game_map[action.meta.room][action.meta.dir] = action.meta.destination
    break;
  }
}

function setInteractions(){

  let foreground = draw.find("#FOREGROUND")
  let objects = foreground.children()

  console.log(objects)

  // For each object in foreground(current_room)
  // for(object in foreground){

  // }
  // Attach event handlers to object
    // onClick --> createMenu
    // createMenu(object)
      // for(action in game_objects[current_room][object].actions)
        // createMenuItem(action).click(act(action))




} 