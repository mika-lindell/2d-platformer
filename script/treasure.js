var Treasure,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Treasure = (function(_super) {
  __extends(Treasure, _super);

  Treasure.prototype.touchable = true;

  Treasure.prototype.collected = false;

  function Treasure() {
    this.yOff = Math.random() * Math.PI;
  }

  Treasure.prototype.touch = function(entity) {
    if (entity.constructor === Player) {
      return this.collected = true;
    }
  };

  Treasure.prototype.update = function(x, y, level) {
    this.yOff += Math.PI / 24;
    if (this.collected) {
      sound.play("particle");
      return level.removeBlock(x, y, this);
    }
  };

  Treasure.prototype.render = function(gfx, x, y) {
    var ySine;
    ySine = Math.floor(Math.sin(this.yOff) * 4);
    return gfx.drawSprite(5, 1, x, y + ySine);
  };

  return Treasure;

})(Block);
