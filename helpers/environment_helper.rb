module ThreeFunkyMonkeys
  ALLOWED_LOCALES = [:en, :es]
  DEFAULT_LOCALE = :es

  module Helpers

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

  end
end
