module ThreeFunkyMonkeys
  module Concerns
    class CheckSpam
      include Scoped::Concern

      def initialize(params = {})
        @message = params["message"]
        @email = params["email"]
      end

      def run
        url_regex = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/

        ban_regex = /(sexy|sex|girls|chicas|for the night|pasar la noche|порно|порнография|порнуха|порнушка|affiliate|marketing|bitcoin|investieren|tinyurl|Прокип|Андрей|продукт)/i

        if ban_regex.match(@message) || url_regex.match(@message)
          return error({ message: ["not_valid"] })
        end

        success({ message: "Pottentialy clean" })
      end
    end
  end
end
