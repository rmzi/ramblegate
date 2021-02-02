// ToDo: represent map as object and read object to set minimap
const game_objects = {
  1: [],
  2: [
    {
      name: "RambleDoor",
      prompt: `Only those who possess hidden strength may open this door.`,
      actions: {
        open: {
          prompt: "Miraculously, the door swings wide as soon as you touch it.",
          type: "navigation_add",
          meta: {
            room: 2,
            direction: "east",
            destination: 4
          },
          prerequisites: [
            {
              inventory: ["Ramble"],
              failure_prompt: "You do not possess enough power to enter this room, yet."
            }
          ]
        }       
      }
    }
  ],
  3: [],
  4: [],
  5: [
    {
      name: "Ramble",
      prompt: `This strange object beckons you...
      almost begging you to grasp it...`,
      actions: {
        take: {
          prompt: "You feel more powerful somehow...",
          type: "inventory_add",
          meta: {
            item: {
              name: "Ramble"
            }
          },
          prerequisites: []
        }
      }
    },
  ]
};