// NOTE:
//   - In order for the text to fit properly in the prompter, it must follow the following parameters:
//     1. No line can have > 60 characters
//     2. Single line text can use ""
//     3. Multi-line text must use ``
// ToDo: No matter how text is defined, paginate properly

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