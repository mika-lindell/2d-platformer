var Player,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  __extends(Player, _super);

  function Player() {
    Player.__super__.constructor.apply(this, arguments);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
    var xo, yo;
    xo = yo = 0;
    if (!this.falling) {
      if (keys.left) {
        xo -= this.speed;
        this.dir = "LEFT";
      }
      if (keys.right) {
        xo += this.speed;
        this.dir = "RIGHT";
      }
    }
    if (keys.down && this.onLadder) {
      yo += this.speed;
    }
    if (keys.up && this.onLadder && !this.onTopOfLadder) {
      yo -= this.speed;
    }
    if (keys.space) {
      this.dig();
    }
    return this.move(xo, yo);
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  Player.prototype.dig = function() {
    if (utils.now() - this.lastDig < (0.5 * 1000)) {
      return;
    }
    this.level.digAt(this.dir, this.x, this.y);
    return this.lastDig = utils.now();
  };

  return Player;

})(Entity);
