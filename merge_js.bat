cd script
:: Using /b in the copy command removes the end of file character from generated file
copy gfx.js + keys.js + player.js + game.js "merged/main.js" /b
:: PAUSE