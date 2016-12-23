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
Cuba.plugin ThreeFunkyMonkeys::RoutesHelpers

Cuba.use Rack::Session::Cookie, :secret => ENV["SESSION_SECRET"]
Cuba.use Rack::Static,
          root: File.expand_path(File.dirname(__FILE__)) + "/public",
          urls: %w[/img /css /js /fonts]

Cuba.settings[:render][:layout] = "layouts/main.html"

include ThreeFunkyMonkeys::ViewHelpers

Cuba.define do
  init_locale(req.env)

  on get, root do
    render('./pages/home.html')
  end

  on 'contact' do
    on get, root do
      render('./pages/contact.html')
    end

    on post, root do
      params = req.params
      if ThreeFunkyMonkeys::MailerHelpers.send_contact(params)
        res.write "success"
      else
        res.write "error"
      end
    end
  end

  on default do
    res.status = 404

    render('./pages/not-found.html')
  end
end
