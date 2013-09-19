keys = 
	up: false,
	down: false,
	left: false,
	right: false,
	space: false,

	reset: ->
		@up = @down = @left = @right = @space = false

	trigger: (keyCode, isDown, event) -> 
		switch keyCode
			when 37 then @left = isDown
			when 39 then @right = isDown
			when 38 then @up = isDown
			when 40 then @down = isDown
			when 32
				console.log "FIRE!" if isDown
				@space = isDown
		event.preventDefault()

document.addEventListener "keydown", (e) ->
	keys.trigger e.keyCode, true, e
, false

document.addEventListener "keyup", (e) ->
	keys.trigger e.keyCode, false, e
, false