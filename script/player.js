var Player,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  __extends(Player, _super);

  function Player(level, x, y) {
    Player.__super__.constructor.call(this, level, x, y);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
    if (keys.left) {
      this.x -= this.speed;
    }
    if (keys.right) {
      this.x += this.speed;
    }
    if (keys.down) {
      this.y += this.speed;
    }
    if (keys.up) {
      return this.y -= this.speed;
    }
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  return Player;

})(Entity);
