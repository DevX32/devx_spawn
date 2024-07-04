fx_version 'cerulean'
lua54 'yes'
game 'gta5'

ui_page 'web/build/index.html'

shared_scripts {
  '@ox_lib/init.lua',
  'shared/config.lua'
}

client_scripts {
  'client/**/*'
}

server_scripts {
  'server/**/*'
}

files {
  'web/build/index.html',
  'web/build/**/*'
}