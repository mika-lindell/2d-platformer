this.game = {
  init: function() {
    if (!gfx.init()) {
      alert("Sorry, no canvas");
      return;
    }
    return gfx.load(function() {
      return game.reset();
    });
  },
  stop: function() {
    return this.running = false;
  },
  start: function() {
    return this.running = true;
  },
  reset: function() {
    this.player = new Player;
    this.level = new Level(levels[0], this);
    keys.reset();
    if (!this.running) {
      this.start();
      return this.tick();
    }
  },
  setPlayer: function(x, y, level) {
    this.player.level = level;
    this.player.x = x;
    return this.player.y = y;
  },
  tick: function() {
    var _this = this;
    if (!this.running) {
      return;
    }
    gfx.clear();
    this.update();
    this.render();
    return setTimeout((function() {
      return game.tick();
    }), 33);
  },
  update: function() {
    this.level.update();
    return this.player.update();
  },
  render: function() {
    var backX, backY, leftEdge, levelWidth, offx, rightEdge;
    gfx.ctx.save();
    gfx.ctx.scale(1.3, 1.3);
    levelWidth = this.level.w * gfx.tileW;
    leftEdge = levelWidth / 2;
    rightEdge = (levelWidth / 4.4) + leftEdge;
    offx = this.player.x > leftEdge ? -this.player.x + leftEdge : 0;
    if (this.player.x > rightEdge) {
      offx = -(levelWidth / 4.4);
    }
    gfx.ctx.translate(offx, -this.player.y + (gfx.h / 4));
    this.level.render(gfx);
    this.player.render(gfx);
    backX = 1 - (this.player.x / gfx.w) * 100;
    backY = 1 - (this.player.y / gfx.h) * 100;
    gfx.ctx.canvas.style.backgroundPosition = "" + backX + "px " + backY + "px";
    return gfx.ctx.restore();
  }
};
