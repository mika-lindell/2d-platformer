
#
# GFX.COFFEE
#

gfx =

	# Initialize canvas
	init: ->
		# ? is used got "soak up" nulls -> code keeps running if var was a null
		canvas = document.querySelector "#game"
		# Get reference for drawing surface	
		@ctx = canvas?.getContext? "2d"
		# Here we return false in case of null
		return false if not @ctx

		# Keep going if canvas is properly referenced
		@w = canvas.width
		@h = canvas.height
		true

	# Clear canvas
	clear: ->
		@ctx.clearRect 0, 0, gfx.w, gfx.h

	# Load resource
	load: (onload) ->
		@sprites = new Image()
		# Set default source
		@sprites.src = "resources/sprites.png"
		@sprites.onload = -> onload()

	# Draw a sprite
	drawSprite: (col, row, x, y, srcSize = 24, outputSize = 24) ->
		@ctx.drawImage @sprites,
			col * srcSize, row * srcSize, srcSize, srcSize, # Location in sprite sheet
			x, y, outputSize, outputSize # Size the image is drawn to


#
# GAME.COFFEE
#

game =
		init: ->
			if not gfx.init()
				alert "Could not set up game canvas"
				return # Abort loading
			#Load sprites
			gfx.load ->
			#	gfx. drawSprite 0,0,100,50

				# random sprite
				rand = (max) -> Math.floor Math.random() * max
				for y in [0..19]
					for x in [0..23]
						col = rand 7
						row = rand 2
						gfx.drawSprite col, row, x * 24, y * 24

			# Ready to play
			gfx.clear()
			console.log "Ready."

# Run the game
game.init()
