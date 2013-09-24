var Dirt, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dirt = (function(_super) {
  __extends(Dirt, _super);

  function Dirt() {
    _ref = Dirt.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Dirt.prototype.solid = true;

  Dirt.prototype.render = function(gfx, x, y) {
    var oldAlpha;
    oldAlpha = gfx.ctx.globalAlpha;
    gfx.ctx.globalAlpha = 1 - this.digTime / 80;
    gfx.drawSprite(4, 1, x, y);
    return gfx.ctx.globalAlpha = oldAlpha;
  };

  Dirt.prototype.digIt = function() {
    this.digTime = 80;
    return this.solid = false;
  };

  Dirt.prototype.update = function() {
    if (--this.digTime === 50) {
      return this.solid = true;
    }
  };

  return Dirt;

})(Block);
