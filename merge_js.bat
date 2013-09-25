cd script
:: Using /b in the copy command removes the end of file character from generated file
copy _utils.js + gfx.js + keys.js + sound.js + _entity.js + ninja.js + player.js + _block.js + treasure.js + dirt.js + gravel.js + rock.js + ladder.js + levels.js + level.js + game.js "merged/main.js" /b
::PAUSE