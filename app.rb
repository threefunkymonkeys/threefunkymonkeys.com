require 'cuba'
require 'cuba/render'
require 'i18n'
require_relative './helpers/environment_helper'

I18n.load_path += Dir['./locale/**/*.yml']
I18n.enforce_available_locales = false

Cuba.plugin Cuba::Render
Cuba.plugin ThreeFunkyMonkeys::Helpers

Cuba.use Rack::Session::Cookie, :secret => ENV["SESSION_SECRET"]
Cuba.use Rack::Static,
          root: File.expand_path(File.dirname(__FILE__)) + "/public",
          urls: %w[/img /css /js]

Cuba.define do
  init_locale(req.env)

  on get ,root do
    res.write render('./views/layouts/home.html.erb') {
      render('./views/pages/home.html.erb')
    }
  end
end
