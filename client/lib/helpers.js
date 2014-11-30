function buildPointObject(x, y) {
  return { x: x, y: y }
}

function convertToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function convertVectorToRadians(vector) {
  return Math.atan2(vector.y, vector.x);
}

function radiansToVector(radians, multiplier) {
  if (arguments.length < 2) { multiplier = 1.0; }

  return {
    x: Math.cos(radians) * multiplier,
    y: Math.sin(radians) * multiplier
  };
}

module.exports = {
  buildPointObject: buildPointObject,
  convertVectorToRadians: convertVectorToRadians,
  convertToRadians: convertToRadians,
  radiansToVector: radiansToVector
}
