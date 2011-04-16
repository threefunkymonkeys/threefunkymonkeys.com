Then /^I should see the "([^"]*)" message$/ do |message|
  i18n_msg = I18n.translate("application.messages.#{message.downcase.gsub(/ /, "_")}")
  i18n_msg.should_not include "translation message"
  page.body.should include i18n_msg
end
