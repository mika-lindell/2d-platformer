var utils;

utils = {
  now: function() {
    return new Date().getTime();
  },
  snap: function(value, snapSize) {
    return Math.floor(value / snapSize) * snapSize;
  },
  rand: function(min, max) {
    var range;
    if (max == null) {
      max = min;
      min = 0;
    }
    range = max - min;
    return Math.floor(Math.random() * range) + min;
  },
  counter: function(max, speed) {
    if (speed == null) {
      speed = 100;
    }
    return Math.floor(this.now() / speed % max);
  }
};
