module ThreeFunkyMonkeys
  module ViewHelpers
    def active_menu(path)
      req.path == path ? 'active' : ''
    end

    def home_page?
      req.path == "/"
    end
  end
end
