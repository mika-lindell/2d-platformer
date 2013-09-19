class Entity
	speed: 4
	dir: "LEFT"
	constructor: (@level, @x, @y) ->
		###
			(@x, @y) -> 

			is the same as:

			(x, y) ->
				@x = x
				@y = y
		###
	update: ->
	render: (gfx) -> gfx.ctx.fillText "?", @x, @y