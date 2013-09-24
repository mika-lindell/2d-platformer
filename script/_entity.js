var Entity;

Entity = (function() {
  Entity.prototype.x = 0;

  Entity.prototype.y = 0;

  Entity.prototype.w = 18;

  Entity.prototype.h = 24;

  Entity.prototype.speed = 4;

  Entity.prototype.dir = "LEFT";

  function Entity(level, x, y) {
    this.level = level;
    this.x = x;
    this.y = y;
    this.falling = true;
    this.wasFalling = true;
    this.onLadder = false;
    this.wasOnLadder = false;
    this.onTopOfLadder = false;
  }

  Entity.prototype.update = function() {};

  Entity.prototype.render = function(gfx) {
    return gfx.ctx.fillText("?", this.x, this.y);
  };

  Entity.prototype.move = function(x, y) {
    var bl, br, tl, tr, xo, xv, yo, yv, _ref, _ref1;
    if (this.falling) {
      y += this.speed * 2;
    }
    this.wasFalling = this.falling;
    xo = x;
    yo = y;
    xv = this.x + xo;
    yv = this.y + yo;
    _ref = this.level.getBlocks([this.x, yv], [this.x, yv + (this.h - 1)], [this.x + (this.w - 1), yv], [this.x + (this.w - 1), yv + (this.h - 1)]), tl = _ref[0], bl = _ref[1], tr = _ref[2], br = _ref[3];
    if (y < 0 && (tl.solid || tr.solid)) {
      yo = this.level.getBlockEdge(this.y, "VERT") - this.y;
    }
    if (y > 0 && (bl.solid || br.solid)) {
      yo = this.level.getBlockEdge(yv + (this.h - 1), "VERT") - this.y - this.h;
      this.falling = false;
    }
    _ref1 = this.level.getBlocks([xv, this.y], [xv, this.y + (this.h - 1)], [xv + (this.w - 1), this.y], [xv + (this.w - 1), this.y + (this.h - 1)]), tl = _ref1[0], bl = _ref1[1], tr = _ref1[2], br = _ref1[3];
    if (x < 0 && (tl.solid || bl.solid)) {
      xo = this.level.getBlockEdge(this.x) - this.x;
    }
    if (x > 0 && (tr.solid || br.solid)) {
      xo = this.level.getBlockEdge(xv + (this.w - 1)) - this.x - this.w;
    }
    this.x += xo;
    this.y += yo;
    return this.checkNewPos(x, y);
  };

  Entity.prototype.checkNewPos = function(origX, origY) {
    var bl, block, br, nearBlocks, snapAmount, tl, touchingALadder, tr, _i, _len, _ref;
    this.wasOnLadder = this.onLadder;
    nearBlocks = (_ref = this.level.getBlocks([this.x, this.y], [this.x, this.y + this.h], [this.x + (this.w - 1), this.y], [this.x + (this.w - 1), this.y + this.h]), tl = _ref[0], bl = _ref[1], tr = _ref[2], br = _ref[3], _ref);
    for (_i = 0, _len = nearBlocks.length; _i < _len; _i++) {
      block = nearBlocks[_i];
      if (block.touchable) {
        block.touch(this);
      }
    }
    this.onLadder = false;
    touchingALadder = nearBlocks.some(function(block) {
      return block.climbable;
    });
    if (touchingALadder) {
      this.onLadder = true;
      this.falling = false;
      if (origY !== 0) {
        snapAmount = utils.snap(this.x, gfx.tileW);
        if (!(bl.climbable || tl.climbable)) {
          this.x = snapAmount + gfx.tileW;
        }
        if (!(br.climbable || tr.climbable)) {
          this.x = snapAmount;
        }
      }
    }
    this.onTopOfLadder = this.onLadder && !(tl.climbable || tr.climbable) && (this.y + this.h) % gfx.tileH === 0;
    if (!this.onLadder && !this.falling) {
      if (!(bl.solid || br.solid || bl.climbable || br.climbable)) {
        return this.falling = true;
      }
    }
  };

  return Entity;

})();
