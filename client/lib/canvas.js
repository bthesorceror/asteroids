var $ = require('jquery');

function Canvas($el) {
  this.$el     = $el;
  this.el      = this.$el[0];

  this.canvas  = $('<canvas />').attr({
    width: this.width(),
    height: this.height()
  })[0];

  this.context = this.canvas.getContext('2d');

  this.shownContext = this.el.getContext('2d');
}

Canvas.prototype.commit = function() {
  this.shownContext.drawImage(this.canvas, 0, 0);
}

Canvas.prototype.clear = function() {
  this.isolatedState(function(context) {
    context.fillStyle = "#000";

    context.fillRect(
      0, 0, this.width(), this.height());
  });
}

Canvas.prototype.strokePath = function(path) {
  this.context.beginPath();

  for (var i = 0; i < path.length; i++) {
    var func = i == 0 ? "moveTo" : "lineTo";
    this.context[func](path[i].x, path[i].y);
  }

  this.context.closePath();
  this.context.stroke();
}

Canvas.prototype.isolatedState = function(callback) {
  this.context.save();
  callback.call(this, this.context);
  this.context.restore();
}

Canvas.prototype.width = function() {
  return this.$el.width();
}

Canvas.prototype.height = function() {
  return this.$el.height();
}

module.exports = Canvas;
