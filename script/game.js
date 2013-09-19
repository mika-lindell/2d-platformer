this.game = {
  running: false,
  init: function() {
    if (!gfx.init()) {
      alert("Sorry your browser doesn't support this game :(");
      return;
    }
    return gfx.load(function() {
      game.reset();
      return console.log("Ready.");
    });
  },
  stop: function() {
    return this.running = false;
  },
  start: function() {
    return this.running = true;
  },
  reset: function() {
    keys.reset();
    this.player = new Player;
    this.level = new Level(levels[0], this);
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
    return requestAnimationFrame(function() {
      return game.tick();
    });
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
