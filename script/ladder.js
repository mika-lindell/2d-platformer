var Ladder,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ladder = (function(_super) {
  __extends(Ladder, _super);

  Ladder.prototype.climbable = true;

  function Ladder(top) {
    this.top = top;
    this.frame = top ? 6 : 5;
  }

  Ladder.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(this.frame, 0, x, y);
  };

  return Ladder;

})(Block);
