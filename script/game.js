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
    this.level.render(gfx);
    return this.player.render(gfx);
  }
};
