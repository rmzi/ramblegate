// Attach SVG JS to DOM SVG Canvas
const draw = SVG(".svg_container");

// SVG Selectors for all layers
const board = draw.find(".board");
const scene = draw.find("#scene")
const home = draw.find(".home");
const overlay = draw.find(".overlay");
const title = draw.find(".title");
const legal = draw.find(".legal");
const company = draw.find(".company");
const prompter = draw.find("#prompt");
const sidebar = draw.find("#sidebar")

// HOME
const konami = draw.find(".konami");

// OPENING SEQUENCE
/////////////////////////////////////////////////

// HOME ANIMATIONS
const hand = home.find(".hand")
fadeHand();
scaleHand();

const glow = home.find("#path-3")
scaleGlow();

const glow2 = home.find("#path-5")
scaleGlow2();

function fadeHand() {
  const hand_animator = hand.animate({
    duration: 2000,
    when: "now",
    swing: "false",
    times: 10,
  }).attr({opacity: .7})
}

function scaleHand() {
  const hand_animator = hand.animate({
    duration: 2000,
    when: "now",
    swing: "false",
    times: 100,
  }).scale(.90)
}

function scaleGlow() {
  const glow_animator = glow.animate({
    duration: 3000,
    ease: ">",
    when: "now",
    swing: "true",
    times: 100,
  }).size(420,240).move(430,244)
}

function scaleGlow2() {
  const glow_animator = glow2.animate({
    duration: 3000,
    delay: 1500,
    ease: ">",
    when: "now",
    swing: "true",
    times: 100,
  }).size(420,240).move(430,244)
}

// COMPANY SEQUENCE

// SVG Selectors letters
var D = company.find("#D");
var A = company.find("#A");
var T = company.find("#T");
var B = company.find("#B");
var O = company.find("#O");
var Y = company.find("#Y");

const all_letters = [D, A, T, B, O, Y];

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

  // Iterate through all letters and fadeIn / colorCycle
  for (let i = 0; i < all_letters.length; i++){
    fadeInLetter(i);
    colorCycleLetter(i)
  }
}

function fadeInLetter(index) {
  console.log(all_letters[index][0][0])

  const letterAnimator = all_letters[index][0][0]
    .animate({
      duration: 700,
      delay: index * 100,
      when: "now",
      swing: "true",
      times: 1,
    })
    .attr({ opacity: 1 })
    .move(100, 100)
    .size(null, 200)
    .animate({ duration: 700 })
    .size(null, 90);

  // If on the last letter, fade out the company SVG
  if(index === all_letters.length - 1){
    letterAnimator.after(fadeOutCompany)
  }
}

function colorCycleLetter(index) {
  all_letters[index][0][0]
    .animate({
      duration: 200,
      delay: index * 100,
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
      delay: 1000,
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
