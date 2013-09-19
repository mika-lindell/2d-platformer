class Level
	w: 0
	h: 0
	treasures: 0
	ninjas: []
	constructor: (level, @game) -> 
		@load level
	load: (level) ->
		# Clear level items
		@ninjas = []
		@treasures = 0
		# Level string to map
		asciiMap = (row.split "" for row in level.data.split "\n")
		# Loop over the map and create blocks
		@map = for row, y in asciiMap
			for col, x in row
				switch col
					when "P"
						@addPlayer x, y
						new Block()
					when "X"
						@addNinja x, y
						new Block()
					when "*" 
						@treasures++
						new Treasure()
					when "@" then new Dirt()
					when "O" then new Rock()
					else new Block()
		# Set level height and width
		@h = @map.length
		@w = @map[0].length
	addPlayer: (x, y) ->
		@game.setPlayer x * gfx.tileW, y * gfx.tileH, @
	addNinja: (x, y) ->
		xPos = x * gfx.tileW
		yPos = y * gfx.tileH
		ninja = new Ninja @, xPos, yPos # @ === this
		@ninjas.push ninja
	update: ->
		# Update level blocks
		for row in @map
			for block in row
				block.update()
		ninjas.update() for ninjas in @ninjas

	render: (gfx) ->
		# Render level blocks
		for row, y in @map
			for block, x in row
				block.render gfx, x * gfx.tileW, y * gfx.tileH
		ninjas.render gfx for ninjas in @ninjas