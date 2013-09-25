var sound;

sound = {
  audio: {},
  list: {
    "dig": "dig.wav",
    "fall": "falling.wav",
    "particle": "particle.wav",
    "dead": "dead.wav"
  },
  init: function() {
    var name, url, _ref, _results;
    _ref = this.list;
    _results = [];
    for (name in _ref) {
      url = _ref[name];
      _results.push(this.audio[name] = new Audio("resources/" + url));
    }
    return _results;
  },
  play: function(name) {
    var _ref, _ref1;
    if ((_ref = this.audio[name]) != null) {
      _ref.currentTime = 0;
    }
    return (_ref1 = this.audio[name]) != null ? _ref1.play() : void 0;
  }
};

sound.init();
