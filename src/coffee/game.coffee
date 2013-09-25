@game =
  init: ->
    if not gfx.init()
      alert "Sorry, no canvas"
      return
    gfx.load ->
      game.reset()
  stop: -> @running = false
  start: -> @running = true
  
  reset: ->
    @player = new Player
    @level = new Level levels[0], @
    keys.reset()
    if not @running
      @start()
      @tick()
    
  setPlayer: (x, y, level) ->
    @player.level = level
    @player.x = x
    @player.y = y 

  tick: ->
    return if not @running
    gfx.clear()
    @update()
    @render()
    setTimeout (=> game.tick()), 33
    
  update: ->
    @level.update()
    @player.update()
    
  render: ->
    gfx.ctx.save()
    # Player camera
    gfx.ctx.scale 1.3, 1.3
    levelWidth = @level.w * gfx.tileW
    leftEdge = levelWidth / 2
    # Changin the number from 4 to 4.4 to snap to the edge of last block is pretty naive soolution
    rightEdge = (levelWidth / 4.4) + leftEdge
    offx = if @player.x > leftEdge then -@player.x + leftEdge else 0
    if @player.x > rightEdge
      offx = -(levelWidth / 4.4)
    
    gfx.ctx.translate offx, -@player.y + (gfx.h / 4)
    @level.render gfx
    @player.render gfx

    # Cheap parallax effect
    backX = 1 - (@player.x / gfx.w) * 100
    backY = 1 - (@player.y / gfx.h) * 100
    gfx.ctx.canvas.style.backgroundPosition = "#{backX}px #{backY}px"
    gfx.ctx.restore()