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
