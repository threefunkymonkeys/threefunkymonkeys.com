require "postmark"
require "net/http"
require "uri"
require "json"
require 'base64'

module ThreeFunkyMonkeys
  module MailerHelpers
    def self.send_contact(email)
      client = Postmark::ApiClient.new(ENV["POSTMARK_API_TOKEN"])

      html_body = <<-HTMLEMAIL
        <p>Name: #{email["name"]} - #{email["email"]}</p>
        <p>#{email["message"].gsub("\n", "<br>")}</p>
      HTMLEMAIL

      postmark_message = {
        :from => "Administrador 3FM <admin@threefunkymonkeys.com>",
        :to => "Info 3FM <contact@threefunkymonkeys.com>",
        :subject => "Contact form: " + email["subject"],
        :html_body => html_body,
        :text_body => "#{email["name"]} - #{email["email"]}\n#{email["message"]}",
        :track_opens => true
      }

      response = client.deliver(postmark_message)


      return response[:message] == "OK"
    end
  end
end
