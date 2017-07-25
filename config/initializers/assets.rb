# Be sure to restart your server when you modify this file.

Rails.application.configure do
  # Version of your assets, change this if you want to expire all your assets.
  config.assets.version = '1.0'

  config.assets.paths << Rails.root.join('node_modules')

  config.sass.preferred_syntax = :sass

  config.browserify_rails.commandline_options = [
      %Q(--transform [ hbsfy --traverse ]),
      "--extension '.hbs'",
      "--debug"
    ]
end
