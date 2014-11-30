var $ = require('jquery');

var Canvas = require('./lib/canvas');
var Game   = require('./lib/game');

$(function() {
  var canvas = new Canvas($('canvas#screen'));
  var game   = new Game(canvas);

  game.start();
});
