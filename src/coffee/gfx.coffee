#
# GFX.COFFEE
#

gfx =

	# Tile width and height
	tileW: 24
	tileH: 24 

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
	drawSprite: (col, row, x, y, w = 1, h = 1, scale = 1) ->
		w *= @tileW
		h *= @tileH
		@ctx.drawImage @sprites,
			col * w, row * h, w, h, # Grid location in sprite sheet
			x, y, w * scale, h * scale # Size of the sprite on canvas