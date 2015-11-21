module ThreeFunkyMonkeys
  module RoutesHelpers
    def redirect!(location)
      res.redirect(location)
      halt res.finich
    end
  end
end
