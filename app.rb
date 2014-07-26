require 'cuba'
require 'cuba/render'

Cuba.plugin Cuba::Render

Cuba.use Rack::Static,
          root: File.expand_path(File.dirname(__FILE__)) + "/public",
          urls: %w[/img /css /js]

Cuba.define do
  on get ,root do
    res.write render('./views/layouts/home.html.erb') {
      render('./views/pages/home.html.erb')
    }
  end
end
