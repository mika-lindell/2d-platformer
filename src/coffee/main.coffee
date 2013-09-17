
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

				# random
				rand = (max) -> Math.floor Math.random() * max

				# Make sum Ninjaz
				makeANinja = () ->
					x: rand(gfx.w)
					y: rand(gfx.h)

				drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

				ninjas = (makeANinja() for [0...20])

				drawANinja n for n in ninjas

				gfx.drawSprite 0, 0, 50, 50
				gfx.drawSprite 0, 0, 74, 50, 1, 1, 2

			# Ready to play
			gfx.clear()
			console.log "Ready."

# Run the game
game.init()
