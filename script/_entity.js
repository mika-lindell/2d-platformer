var Entity;

Entity = (function() {
  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
    /*
    			(@x, @y) -> 
    
    			is the same as:
    
    			(x, y) ->
    				@x = x
    				@y = y
    */

  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  return Entity;

})();
