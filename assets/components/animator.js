// Attach SVG JS to DOM SVG Canvas
const draw = SVG(".svg_container");

// SVG Selectors for all layers
const board = draw.find(".board");
const home = draw.find(".home");
const overlay = draw.find(".overlay");
const title = draw.find(".title");
const legal = draw.find(".legal");
const company = draw.find(".company");
const prompter = draw.find("#prompt");

// OPENING SEQUENCE
/////////////////////////////////////////////////

// COMPANY SEQUENCE

// SVG Selectors letters
var D = company.find("#D");
var A = company.find("#A");
var T = company.find("#T");
var B = company.find("#B");
var O = company.find("#O");
var Y = company.find("#Y");

var fadeInCompany = function () {
  home.hide();

  var companyAnimator = company
    .show()
    .animate({
      duration: 1,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  companyAnimator.after(fadeInLetters);
};

function fadeInLetters() {
  // get the audio element for the datboy audio
  // TODO: reference this properly
  const audioElement = document.querySelectorAll("audio")[1];
  audioElement.loop = false;

  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);

  // Connect <audio> to Web Audio API
  track.connect(audioContext.destination);

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Start intro music
  audioElement.play();

  fadeInD();
  colorD();
  fadeInA();
  colorA();
  fadeInT();
  colorT();
  fadeInB();
  colorB();
  fadeInO();
  colorO();
  fadeInY();
  colorY();
}

var fadeInD = function () {
  var DAnimator = D.animate({
    duration: 700,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorD() {
  D.animate({
    duration: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInA = function () {
  var AAnimator = A.animate({
    duration: 700,
    delay: 100,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorA() {
  A.animate({
    duration: 200,
    delay: 100,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInT = function () {
  var TAnimator = T.animate({
    duration: 700,
    delay: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorT() {
  T.animate({
    duration: 200,
    delay: 200,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInB = function () {
  var BAnimator = B.animate({
    duration: 700,
    delay: 300,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorB() {
  B.animate({
    duration: 200,
    delay: 300,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInO = function () {
  var OAnimator = O.animate({
    duration: 700,
    delay: 400,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);
};

function colorO() {
  O.animate({
    duration: 200,
    delay: 400,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeInY = function () {
  var YAnimator = Y.animate({
    duration: 700,
    delay: 500,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);

  YAnimator.after(fadeOutCompany);
};

function colorY() {
  Y.animate({
    duration: 200,
    delay: 500,
    when: "now",
    swing: "true",
    times: 1,
  })
    .attr({ fill: "#4B0082" })
    .animate({ duration: 200 })
    .attr({ fill: "#9400D3" })
    .animate({ duration: 200 })
    .attr({ fill: "#ff0000" })
    .animate({ duration: 200 })
    .attr({ fill: "#FF7F00" })
    .animate({ duration: 200 })
    .attr({ fill: "#FFFF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#00FF00" })
    .animate({ duration: 200 })
    .attr({ fill: "#1400F6" });
}

var fadeOutCompany = function () {
  var companyAnimator = company
    .animate({
      duration: 1000,
      delay: 2000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 0 });

  companyAnimator.after(fadeInLegal);
};

var fadeInLegal = function () {
  company.hide();

  var legalAnimator = legal
    .show()
    .animate({
      duration: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  legalAnimator.after(fadeOutLegal);
};

var fadeOutLegal = function () {
  var legalAnimator = legal
    .animate({
      duration: 1000,
      delay: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 0 });

  legalAnimator.after(fadeInTitle);
};

var fadeInTitle = function () {
  legal.hide();

  var titleAnimator = title
    .show()
    .animate({
      duration: 1000,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 });

  // get the audio element for the intro text
  // TODO: wrap this in a function and put in audio 
  const audioElement = document.querySelectorAll("audio")[0];
  audioElement.loop = true;

  // pass it into the audio context
  const track = audioContext.createMediaElementSource(audioElement);

  // Connect <audio> to Web Audio API
  track.connect(audioContext.destination);

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  // Start intro music
  audioElement.play();
};