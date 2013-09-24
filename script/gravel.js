var Gravel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Gravel = (function(_super) {
  __extends(Gravel, _super);

  function Gravel() {
    _ref = Gravel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Gravel.prototype.solid = true;

  Gravel.prototype.digTime = 100;

  Gravel.prototype.update = function(x, y, level) {
    if (--this.digTime < 0) {
      return level.removeBlock(x, y, this);
    }
  };

  Gravel.prototype.render = function(gfx, x, y) {
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.globalAlpha = this.digTime / 50;
    gfx.drawSprite(4, 2, x, y);
    return gfx.ctx.globalAlpha = oldAlpha;
  };

  return Gravel;

})(Block);
