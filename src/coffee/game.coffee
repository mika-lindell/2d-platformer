#
# GAME.COFFEE
#

@game =
	running: false
	init: ->
		if not gfx.init()
			alert "Sorry your browser doesn't support this game :("
			return
		gfx.load ->
			game.reset()

			console.log("Ready.")
	stop: -> @running = false
	start: -> @running = true
	reset: ->
		keys.reset()
		@player = new Player
		@level = new Level levels[0], @
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
		requestAnimationFrame -> game.tick()
	update: -> 
		@level.update()
		@player.update()
	render: -> 
		@level.render gfx
		@player.render gfx


