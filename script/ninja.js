var Ninja, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ninja = (function(_super) {
  __extends(Ninja, _super);

  function Ninja() {
    _ref = Ninja.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Ninja.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 1, this.x, this.y);
  };

  return Ninja;

})(Entity);
