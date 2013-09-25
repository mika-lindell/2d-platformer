var Ninja,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ninja = (function(_super) {
  __extends(Ninja, _super);

  Ninja.prototype.state = "CRUISING";

  Ninja.prototype.subState = "IDLE";

  function Ninja(level, x, y, player) {
    this.player = player;
    Ninja.__super__.constructor.call(this, level, x, y);
  }

  Ninja.prototype.speed = 3;

  Ninja.prototype.time = 0;

  Ninja.prototype.render = function(gfx) {
    var fx;
    fx = this.dir === "LEFT" ? 2 : 0;
    fx += utils.counter(2);
    return gfx.drawSprite(fx, 1, this.x, this.y);
  };

  Ninja.prototype.cruise = function(px, py) {
    var newMove, x, y;
    x = y = 0;
    switch (this.subState) {
      case "RIGHT":
        x += this.speed;
        this.dir = "RIGHT";
        break;
      case "LEFT":
        x -= this.speed;
        this.dir = "LEFT";
    }
    if (--this.time < 0) {
      newMove = utils.rand(5);
      this.time = utils.rand(20, 40);
      this.subState = (function() {
        switch (newMove) {
          case 0:
          case 1:
            return "LEFT";
          case 2:
          case 3:
            return "RIGHT";
          default:
            return "IDLE";
        }
      })();
    }
    if (this.onLadder && !this.wasOnLadder) {
      if (Math.random() < 0.5) {
        this.state = "HUNTING";
      }
    }
    if (py === this.y) {
      this.state = "HUNTING";
    }
    return [x, y];
  };

  Ninja.prototype.hunt = function(px, py) {
    var x, y;
    x = y = 0;
    if (py === this.y || this.onTopOfLadder) {
      if (px > this.x) {
        x += this.speed;
        this.dir = "RIGHT";
      } else {
        x -= this.speed;
        this.dir = "LEFT";
      }
    } else if (this.onLadder) {
      if (!this.onTopOfLadder && py < this.y) {
        y -= this.speed;
      }
      if (py > this.y) {
        y += this.speed;
      }
    } else {
      this.state = "CRUISING";
      this.subState = "LEFT";
    }
    return [x, y];
  };

  Ninja.prototype.update = function() {
    var px, py, xo, yo, _ref;
    _ref = (function() {
      var _ref;
      if (this.falling) {
        return [0, 0];
      } else {
        _ref = this.player, px = _ref.x, py = _ref.y;
        switch (this.state) {
          case "CRUISING":
            return this.cruise(px, py);
          case "HUNTING":
            return this.hunt(px, py);
        }
      }
    }).call(this), xo = _ref[0], yo = _ref[1];
    return this.move(xo, yo);
  };

  return Ninja;

})(Entity);
