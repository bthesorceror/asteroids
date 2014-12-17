var ak   = require('arcade_keys');
var Ship = require('./ship');

function Game(createCanvas) {
  this.background = createCanvas();
  this.background.fill("#000");
  this.background.commit();

  this.keys = ak([
    ak.keys.left,
    ak.keys.right,
    ak.keys.up,
    ak.keys.down
  ]);

  this.player = new Ship(createCanvas(), {
    x: 400,
    y: 300
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
  this.update();
  this.render();
  requestAnimationFrame(this.loop.bind(this));
}

module.exports = Game;
