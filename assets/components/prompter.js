// Page length = 3 lines
const page_length = 3;

// PROMPT MANAGEMENT
function promptUser(title, text, page) {
  overlay.show();
  prompter.show();

  // Update the game state
  game_state.prompt = {
    title: title,
    text: text,
    page: page,
  };

  // Get only the text for this page
  const prompter_text = game_state.prompt.text
    .split("\n")
    .slice(page * page_length, page * page_length + page_length)
    .join("\n");
  debug(prompter_text);

  prompter.find("#prompt_title").text(title);
  prompter.find("#prompt_text").text(prompter_text);
}

function progressPrompt() {
  // Turn the page
  game_state.prompt.page++;

  // If on the last page
  if (
    game_state.prompt.page * page_length >
    game_state.prompt.text.split("\n").length
  ) {
    // Exit the prompter
    INPUT_MODE = "BOARD";
    prompter.hide();
    overlay.hide();
  } else {
    // Prompt the next page
    promptUser(
      game_state.prompt.title,
      game_state.prompt.text,
      game_state.prompt.page
    );
  }
}