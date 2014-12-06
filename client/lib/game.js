var ak   = require('arcade_keys');
var Ship = require('./ship');

function Game(canvas) {
  this.canvas = canvas;
  var player_x = canvas.width() / 2;
  var player_y = canvas.height() / 2;

  this.keys = ak([
    ak.keys.left,
    ak.keys.right,
    ak.keys.up,
    ak.keys.down
  ]);

  this.player = new Ship(this.canvas, {
    x: player_x,
    y: player_y
  }, "#F00");
}

Game.prototype.update = function() {
  this.player.update(this.keys);
}

Game.prototype.render = function() {
  this.player.render();
}

Game.prototype.start = function() {
  requestAnimationFrame(this.loop.bind(this));
}

Game.prototype.loop = function() {
  this.canvas.clear();
  this.update();
  this.render();
  this.canvas.commit();
  requestAnimationFrame(this.loop.bind(this));
}

module.exports = Game;
