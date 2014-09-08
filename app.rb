require 'cuba'
require 'cuba/render'
require 'i18n'
require_relative './helpers/environment_helper'

ENV["RACK_ENV"] ||= :development

I18n.load_path += Dir['./locale/**/*.yml']
I18n.enforce_available_locales = false

ThreeFunkyMonkeys::Helpers.init_environment(ENV['RACK_ENV'])

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
