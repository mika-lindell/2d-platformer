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
var Ninja, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ninja = (function(_super) {
  __extends(Ninja, _super);

  function Ninja() {
    _ref = Ninja.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Ninja.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 1, this.x, this.y);
  };

  return Ninja;

})(Entity);
var Player,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  __extends(Player, _super);

  function Player(level, x, y) {
    Player.__super__.constructor.call(this, level, x, y);
    this.dir = "RIGHT";
  }

  Player.prototype.update = function() {
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
  };

  Player.prototype.render = function(gfx) {
    return gfx.drawSprite(0, 0, this.x, this.y);
  };

  return Player;

})(Entity);
var Block;

Block = (function() {
  Block.prototype.solid = false;

  function Block() {}

  Block.prototype.update = function() {};

  Block.prototype.render = function(gfx, x, y) {};

  return Block;

})();
var Treasure,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Treasure = (function(_super) {
  __extends(Treasure, _super);

  function Treasure() {
    this.yOff = Math.random() * Math.PI;
  }

  Treasure.prototype.update = function() {
    return this.yOff += Math.PI / 24;
  };

  Treasure.prototype.render = function(gfx, x, y) {
    var ySine;
    ySine = Math.floor(Math.sin(this.yOff) * 4);
    return gfx.drawSprite(5, 1, x, y + ySine);
  };

  return Treasure;

})(Block);
var Dirt, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dirt = (function(_super) {
  __extends(Dirt, _super);

  function Dirt() {
    _ref = Dirt.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Dirt.prototype.solid = true;

  Dirt.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(4, 1, x, y);
  };

  return Dirt;

})(Block);
var Rock, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Rock = (function(_super) {
  __extends(Rock, _super);

  function Rock() {
    _ref = Rock.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Rock.prototype.solid = true;

  Rock.prototype.render = function(gfx, x, y) {
    return gfx.drawSprite(4, 0, x, y);
  };

  return Rock;

})(Block);
var levels;

levels = [
  {
    name: "DIG and BUILD",
    data: ".P................X.....\n@-@@.........@@@@@@@-@..\n.#..@@@.............#...\n.#.....@@.@@.....X..#...\n@OO#.........#@@...O#..^\n...#.........#......#.^O\n...#..@@-@@@@#..-@@@@@OO\n...#....#....#..#.......\n...#....#....#..#.......\n...#....#....#..#.......\n@-@@OOOOO.#.@@@@@#@@-@@@\n.#.X......#......#..#...\n.#...*....#......#..#...\n####..@@#@@..-@@@@@@@..*\n####....#....#.........#\n####....#....#.........#\nOOOOOOOOOOOOOOOOOOOOOOOO"
  }
];
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
