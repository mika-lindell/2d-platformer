var Block;

Block = (function() {
  Block.prototype.touchable = false;

  Block.prototype.solid = false;

  Block.prototype.climbable = false;

  function Block() {}

  Block.prototype.update = function() {};

  Block.prototype.render = function(gfx, x, y) {};

  return Block;

})();
