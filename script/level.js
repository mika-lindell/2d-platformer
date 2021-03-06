var Level,
  __slice = [].slice;

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
              case "@":
                _results1.push(new Dirt());
                break;
              case "O":
                _results1.push(new Rock());
                break;
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
              case "#":
                _results1.push(new Ladder());
                break;
              case "-":
                _results1.push(new Ladder(true));
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

  Level.prototype.addNinja = function(x, y) {
    var ninja, xPos, yPos;
    xPos = x * gfx.tileW;
    yPos = y * gfx.tileH;
    ninja = new Ninja(this, xPos, yPos, this.game.player);
    return this.ninjas.push(ninja);
  };

  Level.prototype.addPlayer = function(x, y) {
    return this.game.setPlayer(x * gfx.tileW, y * gfx.tileH, this);
  };

  Level.prototype.removeBlock = function(x, y, block) {
    this.map[y][x] = new Block();
    if (block.constructor === Treasure) {
      if (--this.treasures === 0) {
        alert("Level Complete!");
        return game.reset();
      }
    }
  };

  Level.prototype.getBlockIndex = function(x, y) {
    return [Math.floor(x / gfx.tileW), Math.floor(y / gfx.tileH)];
  };

  Level.prototype.getBlockEdge = function(position, forVertical) {
    var snapTo;
    if (forVertical == null) {
      forVertical = false;
    }
    snapTo = !forVertical ? gfx.tileW : gfx.tileH;
    return utils.snap(position, snapTo);
  };

  Level.prototype.getBlock = function(x, y) {
    var xBlock, yBlock, _ref, _ref1;
    _ref = this.getBlockIndex(x, y), xBlock = _ref[0], yBlock = _ref[1];
    return ((_ref1 = this.map[yBlock]) != null ? _ref1[xBlock] : void 0) || new Rock();
  };

  Level.prototype.getBlocks = function() {
    var coords, x, y, _i, _len, _ref, _results;
    coords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = coords.length; _i < _len; _i++) {
      _ref = coords[_i], x = _ref[0], y = _ref[1];
      _results.push(this.getBlock(x, y));
    }
    return _results;
  };

  Level.prototype.update = function() {
    var block, ninjas, row, x, y, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _results;
    _ref = this.map;
    for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
      row = _ref[y];
      for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
        block = row[x];
        block.update(x, y, this);
      }
    }
    _ref1 = this.ninjas;
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      ninjas = _ref1[_k];
      ninjas.update();
    }
    _ref2 = this.ninjas;
    _results = [];
    for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
      ninjas = _ref2[_l];
      _results.push(this.checkCollision(this.game.player, ninjas));
    }
    return _results;
  };

  Level.prototype.checkCollision = function(p, b) {
    if (p.x + p.w >= b.x && p.x <= b.x + b.w && p.y + p.h >= b.y && p.y <= b.y + b.h) {
      sound.play("dead");
      alert("You are dead.");
      return game.reset();
    }
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

  Level.prototype.digAt = function(dir, x, y) {
    var block, xb, yb, _ref;
    _ref = this.getBlockIndex(x, y), xb = _ref[0], yb = _ref[1];
    xb = xb + (dir === "RIGHT" ? 1 : -1);
    if (yb + 1 > this.h || xb < 0 || xb > this.w - 1) {
      return;
    }
    block = this.map[yb + 1][xb];
    if (block.digIt != null) {
      block.digIt();
    }
    if (block.constructor === Block) {
      return this.map[yb + 1][xb] = new Gravel();
    }
  };

  return Level;

})();
