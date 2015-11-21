require "net/http"
require "uri"
require "json"
require 'base64'

module ThreeFunkyMonkeys
  module MailerHelpers
    def self.send_contact(email)
      request_body = {
        :key => ENV["MANDRILL_API_KEY"],
        :message => {
          :to => [{
                    "email" => "contact@threefunkymonkeys.com",
                    "name" => "INFO 3FM",
                    "type" => "to"
                  }],
          :from_name => email["name"],
          :from_email => email["email"],
          :subject => "Contact form: " + email["subject"],
          :html => email["message"].gsub("\n", "<br>"),
          :text => email["message"],
          :headers => {},
          :track_opens => true,
          :track_clicks => true,
          :auto_text => true,
          :url_strip_qs => true,
          :preserve_recipients => false,
          :bcc_address => '',
          :attachments => []
        },
        :async => false
      }

      uri = URI('https://mandrillapp.com')
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      request = Net::HTTP::Post.new('/api/1.0/messages/send.json', initheader = {'Content-Type' =>'application/json'})
      request.body = request_body.to_json

      response = http.start {|http| http.request(request)}
      puts response.body

      return response.code.to_i == 200
    end
  end
end
