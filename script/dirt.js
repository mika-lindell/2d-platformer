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
    return gfx.drawSprite(4, 1, x, y);
  };

  return Dirt;

})(Block);
