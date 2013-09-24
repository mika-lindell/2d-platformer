utils =
	now: -> new Date().getTime()
	# Get left edge of a block
	snap: (value, snapSize) -> Math.floor(value / snapSize) * snapSize
	rand: (min, max) ->
		if not max?
			max = min
			min = 0
		range = max - min
		Math.floor(Math.random() * range) + min