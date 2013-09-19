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
