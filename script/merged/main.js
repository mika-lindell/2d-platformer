var gfx;

gfx = {
  tileW: 24,
  tileH: 24,
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
  drawSprite: function(col, row, x, y, w, h, scale) {
    if (w == null) {
      w = 1;
    }
    if (h == null) {
      h = 1;
    }
    if (scale == null) {
      scale = 1;
    }
    w *= this.tileW;
    h *= this.tileH;
    return this.ctx.drawImage(this.sprites, col * w, row * h, w, h, x, y, w * scale, h * scale);
  }
};
var keys;

keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  reset: function() {
    return this.up = this.down = this.left = this.right = this.space = false;
  },
  trigger: function(keyCode, isDown, event) {
    switch (keyCode) {
      case 37:
        this.left = isDown;
        break;
      case 39:
        this.right = isDown;
        break;
      case 38:
        this.up = isDown;
        break;
      case 40:
        this.down = isDown;
        break;
      case 32:
        if (isDown) {
          console.log("FIRE!");
        }
        this.space = isDown;
    }
    return event.preventDefault();
  }
};

document.addEventListener("keydown", function(e) {
  return keys.trigger(e.keyCode, true, e);
}, false);

document.addEventListener("keyup", function(e) {
  return keys.trigger(e.keyCode, false, e);
}, false);
var player;

player = {
  x: gfx.tileW * 3,
  y: gfx.tileH * 5,
  speed: 4,
  update: function() {
    if (keys.left) {
      this.x -= this.speed;
    }
    if (keys.right) {
      this.x += this.speed;
    }
    if (keys.down) {
      this.y += this.speed;
    }
    if (keys.up) {
      return this.y -= this.speed;
    }
  },
  render: function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  }
};
var game;

game = {
  init: function() {
    if (!gfx.init()) {
      alert("Could not set up game canvas");
      return;
    }
    gfx.load(function() {
      var drawANinja, level, level1, makeANinja, makeLevel, n, ninjas, rand, _i, _len;
      rand = function(max) {
        return Math.floor(Math.random() * max);
      };
      makeANinja = function() {
        return {
          x: rand(gfx.w),
          y: rand(gfx.h)
        };
      };
      drawANinja = function(n) {
        return gfx.drawSprite(0, 1, n.x, n.y);
      };
      ninjas = (function() {
        var _i, _results;
        _results = [];
        for (_i = 0; _i < 20; _i++) {
          _results.push(makeANinja());
        }
        return _results;
      })();
      for (_i = 0, _len = ninjas.length; _i < _len; _i++) {
        n = ninjas[_i];
        drawANinja(n);
      }
      level1 = ".............\n...........*.\n....@#@@@@#@.\n.....#....#..\n.....#....#..\n..*..#...@@@.\n..@@@@@...#..\n...#......#..\n...#......#..\n...#......#..\n.OOOOOOOOOOOO";
      makeLevel = function(ascii) {
        var asciiMap, col, row, tiles, _j, _len1, _results;
        tiles = {
          "@": [4, 1],
          "O": [4, 0],
          "*": [5, 1],
          "#": [5, 0]
        };
        asciiMap = (function() {
          var _j, _len1, _ref, _results;
          _ref = ascii.split("\n");
          _results = [];
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            row = _ref[_j];
            _results.push(row.split(""));
          }
          return _results;
        })();
        _results = [];
        for (_j = 0, _len1 = asciiMap.length; _j < _len1; _j++) {
          row = asciiMap[_j];
          _results.push((function() {
            var _k, _len2, _results1;
            _results1 = [];
            for (_k = 0, _len2 = row.length; _k < _len2; _k++) {
              col = row[_k];
              _results1.push(tiles[col]);
            }
            return _results1;
          })());
        }
        return _results;
      };
      level = makeLevel(level1);
      return setInterval(function() {
        var row, tile, x, xPos, y, yPos, _j, _k, _len1, _len2;
        player.update();
        gfx.clear();
        for (y = _j = 0, _len1 = level.length; _j < _len1; y = ++_j) {
          row = level[y];
          for (x = _k = 0, _len2 = row.length; _k < _len2; x = ++_k) {
            tile = row[x];
            if (!tile) {
              continue;
            }
            xPos = x * gfx.tileW;
            yPos = y * gfx.tileH;
            gfx.drawSprite(tile[0], tile[1], xPos, yPos);
          }
        }
        return player.render(gfx);
      }, 33);
    });
    return console.log("Ready.");
  }
};

game.init();
