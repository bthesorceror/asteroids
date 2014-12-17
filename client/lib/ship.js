var ak      = require('arcade_keys');
var _       = require('underscore');
var helpers = require('./helpers.js');

var buildPointObject       = helpers.buildPointObject;
var convertVectorToRadians = helpers.convertVectorToRadians;
var convertToRadians       = helpers.convertToRadians;
var radiansToVector        = helpers.radiansToVector;

var SHIP_SIZE       = 45;
var HALF_SIZE       = SHIP_SIZE / 2;
var QUARTER_SIZE    = HALF_SIZE / 2;
var EIGHTH_SIZE     = QUARTER_SIZE / 2;
var TURN_RATE       = 2;
var LINE_WIDTH      = 2;
var FIRE_COLOR      = "#FF8C00";
var SPEED_INCREMENT = 2;
var MAX_SPEED       = 20;

function Ship(canvas, initial_position, color) {
  this.canvas   = canvas;
  this.color    = color;
  this.position = initial_position;
  this.speed    = 0;
  this.degrees  = 0;
  this.engineOn = false;
  this.vector   = { x: 0, y: 0 };
}

Ship.prototype.points = function() {

  if (!this._points) {
    this._points = [
      buildPointObject(0, -HALF_SIZE),
      buildPointObject(HALF_SIZE, HALF_SIZE),
      buildPointObject(0, QUARTER_SIZE),
      buildPointObject(-HALF_SIZE, HALF_SIZE),
    ];
  }

  return this._points;
}

Ship.prototype.enginePoints = function() {
  if (!this._enginePoints) {
    this._enginePoints = [
      buildPointObject(0, QUARTER_SIZE + LINE_WIDTH),
      buildPointObject(QUARTER_SIZE,
                       QUARTER_SIZE + EIGHTH_SIZE + LINE_WIDTH),
      buildPointObject(QUARTER_SIZE, SHIP_SIZE),
      buildPointObject(0, SHIP_SIZE - EIGHTH_SIZE),
      buildPointObject(-QUARTER_SIZE, SHIP_SIZE),
      buildPointObject(-QUARTER_SIZE,
                       QUARTER_SIZE + EIGHTH_SIZE + LINE_WIDTH),
    ];
  }

  return this._enginePoints;
}

Ship.prototype.radians = function() {
  return convertToRadians(this.degrees);
}

Ship.prototype.turnLeft = function() {
  this.degrees = this.degrees - TURN_RATE;
  if (this.degrees < 0) {
    this.degrees = 360 - this.degrees;
  }
}

Ship.prototype.turnRight = function() {
  this.degrees = (this.degrees + TURN_RATE) % 360;
}

Ship.prototype.accelerate = function() {
  if (this.speed < MAX_SPEED) {
    this.speed += SPEED_INCREMENT;
  }
}

Ship.prototype.decelerate = function() {
  if (this.speed > 0) {
    this.speed -= SPEED_INCREMENT;
  }
}

Ship.prototype.update = function(keys) {
  this.canvas.clear();
  if (keys.isPressed(ak.keys.left)) {
    this.turnLeft();
  } else if (keys.isPressed(ak.keys.right)) {
    this.turnRight();
  }
  this.engineOn = keys.isPressed(ak.keys.up);

  if (this.engineOn) {
    this.applyMovement(this.movementVector());
    this.accelerate();
  } else {
    this.decelerate();
  }
  this.applyMovement(this.resistanceVector());
  this.move();
}

Ship.prototype.move = function() {
  this.position.x += this.vector.x;
  this.position.y += this.vector.y;
}

Ship.prototype.applyMovement = function(vector) {
  this.vector.x += vector.x;
  this.vector.y += vector.y;
}

Ship.prototype.resistanceVector = function() {
  var radians = convertVectorToRadians(this.vector) - convertToRadians(180);
  return radiansToVector(radians, 0.01);
}

Ship.prototype.movementVector = function() {
  var radians = convertToRadians(this.degrees - 90);
  return radiansToVector(radians, 0.10);
}

Ship.prototype.render = function() {
  var self = this;

  this.canvas.isolatedState(function(context) {
    context.lineWidth = LINE_WIDTH;
    context.strokeStyle = self.color;

    context.translate(self.position.x + 0.5, self.position.y);
    context.rotate(self.radians());

    this.strokePath(self.points());

    if (self.engineOn) {
      context.strokeStyle = FIRE_COLOR;
      this.strokePath(self.enginePoints());
    }
  });

  this.canvas.commit();
}

module.exports = Ship;
