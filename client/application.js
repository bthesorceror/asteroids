var $      = require('jquery');
var Game   = require('./lib/game');
var Canvas = require('./lib/canvas');

function createCanvas($el, height, width) {
  var $canvas = $("<canvas />").attr({
    height: height,
    width: width
  }).css({
    margin: "auto",
    height: height,
    width: width,
    display: "block",
    position: "absolute",
    top: 0,
    left: "50%",
    "margin-left": -width / 2
  });

  $el.append($canvas);

  return new Canvas($canvas);
}

$(function() {
  var $screen = $("#screen");
  var createFunc = createCanvas.bind(null, $screen, 600, 800);
  var game = new Game(createFunc);

  game.start();
});
