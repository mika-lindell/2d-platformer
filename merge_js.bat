cd script
:: Using /b in the copy command removes the end of file character from generated file
copy gfx.js + keys.js + _entity.js + ninja.js + player.js + _block.js + treasure.js + dirt.js + rock.js + levels.js + level.js + game.js "merged/main.js" /b
::PAUSE