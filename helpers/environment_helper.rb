require 'securerandom'
require 'logger'

module ThreeFunkyMonkeys
  ALLOWED_LOCALES = [:en, :es]
  DEFAULT_LOCALE = :en

  module Helpers
    def self.init_environment(env)
      self.set_env(env)

      ENV["SESSION_SECRET"] ||= SecureRandom.uuid
    end

    def self.set_env(env)
      filename = env.to_s + ".env.sh"

      if File.exists? filename
        env_vars = File.read(filename)
        env_vars.each_line do |var|
          name, value = var.split("=")
          if name && value
            ENV[name.strip] = value.strip
          end
        end
      end
    end

    def init_locale(env)
      if req.params.has_key?('lang') && ALLOWED_LOCALES.include?(req.params['lang'].to_sym)
        session[:locale] = req.params['lang'].to_sym
      elsif !session[:locale] && env.has_key?("HTTP_ACCEPT_LANGUAGE")
        locale = env["HTTP_ACCEPT_LANGUAGE"][0,2].to_sym #take first accepted language
        locale = DEFAULT_LOCALE unless ALLOWED_LOCALES.include?(locale)
        session[:locale] = locale
      end

      I18n.locale = session[:locale]
    end

    def logger
      log_level = ENV["LOG_LEVEL"] || :warn
      output = ENV["LOG_OUTPUT"] || STDOUT

      @@logger ||= Proc.new {
        logger = Logger.new(output)
        logger.level = log_level
        logger
      }.call
    end
  end
end
