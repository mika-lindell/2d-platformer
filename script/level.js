var Level;

Level = (function() {
  Level.prototype.w = 0;

  Level.prototype.h = 0;

  Level.prototype.treasures = 0;

  Level.prototype.ninjas = [];

  function Level(level, game) {
    this.game = game;
    this.load(level);
  }

  Level.prototype.load = function(level) {
    var asciiMap, col, row, x, y;
    this.ninjas = [];
    this.treasures = 0;
    asciiMap = (function() {
      var _i, _len, _ref, _results;
      _ref = level.data.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push(row.split(""));
      }
      return _results;
    })();
    this.map = (function() {
      var _i, _len, _results;
      _results = [];
      for (y = _i = 0, _len = asciiMap.length; _i < _len; y = ++_i) {
        row = asciiMap[y];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            col = row[x];
            switch (col) {
              case "P":
                this.addPlayer(x, y);
                _results1.push(new Block());
                break;
              case "X":
                this.addNinja(x, y);
                _results1.push(new Block());
                break;
              case "*":
                this.treasures++;
                _results1.push(new Treasure());
                break;
              case "@":
                _results1.push(new Dirt());
                break;
              case "O":
                _results1.push(new Rock());
                break;
              default:
                _results1.push(new Block());
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }).call(this);
    this.h = this.map.length;
    return this.w = this.map[0].length;
  };

  Level.prototype.addPlayer = function(x, y) {
    return this.game.setPlayer(x * gfx.tileW, y * gfx.tileH, this);
  };

  Level.prototype.addNinja = function(x, y) {
    var ninja, xPos, yPos;
    xPos = x * gfx.tileW;
    yPos = y * gfx.tileH;
    ninja = new Ninja(this, xPos, yPos);
    return this.ninjas.push(ninja);
  };

  Level.prototype.update = function() {
    var block, ninjas, row, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
    _ref = this.map;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
        block = row[_j];
        block.update();
      }
    }
    _ref1 = this.ninjas;
    _results = [];
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      ninjas = _ref1[_k];
      _results.push(ninjas.update());
    }
    return _results;
  };

  Level.prototype.render = function(gfx) {
    var block, ninjas, row, x, y, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;
    _ref = this.map;
    for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
      row = _ref[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.render(gfx, x * gfx.tileW, y * gfx.tileH);
      }
    }
    _ref1 = this.ninjas;
    _results = [];
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      ninjas = _ref1[_k];
      _results.push(ninjas.render(gfx));
    }
    return _results;
  };

  return Level;

})();
