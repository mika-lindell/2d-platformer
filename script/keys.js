var keys;

keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  reset: function() {
    return this.up = this.down = this.left = this.right = this.space = false;
  },
  trigger: function(keyCode, isDown, event) {
    switch (keyCode) {
      case 37:
        this.left = isDown;
        break;
      case 39:
        this.right = isDown;
        break;
      case 38:
        this.up = isDown;
        break;
      case 40:
        this.down = isDown;
        break;
      case 32:
        if (isDown) {
          console.log("FIRE!");
        }
        this.space = isDown;
    }
    return event.preventDefault();
  }
};

$(document).keydown(function(e) {
  return keys.trigger(e.keyCode, true, e);
});

$(document).keyup(function(e) {
  return keys.trigger(e.keyCode, false, e);
});
