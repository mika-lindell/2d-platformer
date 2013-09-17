(function() {
  var game, gfx;

  gfx = {
    init: function() {
      var canvas;
      canvas = document.querySelector("#game");
      this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
      if (!this.ctx) {
        return false;
      }
      this.w = canvas.width;
      this.h = canvas.height;
      return true;
    },
    clear: function() {
      return this.ctx.clearRect(0, 0, gfx.w, gfx.h);
    },
    load: function(onload) {
      this.sprites = new Image();
      this.sprites.src = "resources/sprites.png";
      return this.sprites.onload = function() {
        return onload();
      };
    },
    drawSprite: function(col, row, x, y, srcSize, outputSize) {
      if (srcSize == null) {
        srcSize = 24;
      }
      if (outputSize == null) {
        outputSize = 24;
      }
      return this.ctx.drawImage(this.sprites, col * srcSize, row * srcSize, srcSize, srcSize, x, y, outputSize, outputSize);
    }
  };

  game = {
    init: function() {
      if (!gfx.init()) {
        alert("Could not set up game canvas");
        return;
      }
      gfx.load(function() {
        var col, rand, row, x, y, _i, _results;
        rand = function(max) {
          return Math.floor(Math.random() * max);
        };
        _results = [];
        for (y = _i = 0; _i <= 19; y = ++_i) {
          _results.push((function() {
            var _j, _results1;
            _results1 = [];
            for (x = _j = 0; _j <= 23; x = ++_j) {
              col = rand(7);
              row = rand(2);
              _results1.push(gfx.drawSprite(col, row, x * 24, y * 24));
            }
            return _results1;
          })());
        }
        return _results;
      });
      gfx.clear();
      return console.log("Ready.");
    }
  };

  game.init();

}).call(this);
