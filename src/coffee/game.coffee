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

				# random
				rand = (max) -> Math.floor Math.random() * max

				# Make sum Ninjaz
				makeANinja = () ->
					x: rand(gfx.w)
					y: rand(gfx.h)

				drawANinja = (n) -> gfx.drawSprite 0, 1, n.x, n.y

				ninjas = (makeANinja() for [0...20])

				drawANinja n for n in ninjas

				level1 = """
				        .............
				        ...........*.
				        ....@#@@@@#@.
				        .....#....#..
				        .....#....#..
				        ..*..#...@@@.
				        ..@@@@@...#..
				        ...#......#..
				        ...#......#..
				        ...#......#..
				        .OOOOOOOOOOOO
				      """

				makeLevel = (ascii) ->
					# Define tile to symbol map
					tiles =
						"@": [4, 1]
						"O": [4, 0]
						"*": [5, 1]
						"#": [5, 0]

					# Cut up ascii string
					asciiMap = (row.split "" for row in ascii.split "\n")

					# Map characters to their tiles
					(for row in asciiMap
						for col in row
							#console.log tiles[col]
							tiles[col])

				# Create level
				level = makeLevel level1

				setInterval ->
					# run game things
					player.update()

					gfx.clear()

					# draw the level
					for row, y in level
						for tile, x in row
							continue if not tile
							xPos = x * gfx.tileW
							yPos = y * gfx.tileH
							gfx.drawSprite tile[0], tile[1], xPos, yPos

					# render player
					player.render(gfx)

				, 33

			# Ready to play
			console.log "Ready."

# Run the game
game.init()