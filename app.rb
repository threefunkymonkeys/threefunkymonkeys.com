require 'cuba'
require 'cuba/render'
require 'i18n'

ENV["RACK_ENV"] ||= :development

Dir["./helpers/**/*.rb"].each { |rb| require rb }

I18n.load_path += Dir['./locale/**/*.yml']
I18n.enforce_available_locales = false

ThreeFunkyMonkeys::Helpers.init_environment(ENV['RACK_ENV'])

Cuba.plugin Cuba::Render
Cuba.plugin ThreeFunkyMonkeys::Helpers

Cuba.use Rack::Session::Cookie, :secret => ENV["SESSION_SECRET"]
Cuba.use Rack::Static,
          root: File.expand_path(File.dirname(__FILE__)) + "/public",
          urls: %w[/img /css /js /fonts]

include ThreeFunkyMonkeys::ViewHelpers

Cuba.define do
  init_locale(req.env)

  on get, root do
    res.write render('./views/layouts/main.html.erb') {
      render('./views/pages/home.html.erb')
    }
  end

  on 'contact' do
    on get, root do
      res.write render('./views/layouts/main.html.erb') {
        render('./views/pages/contact.html.erb')
      }
    end

    on post, root do
    end
  end

  on default do
    res.status = 404

    res.write render('./views/layouts/main.html.erb') {
      render('./views/pages/not-found.html.erb')
    }
  end
end
