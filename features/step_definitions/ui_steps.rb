Then /^I should see the "([^"]*)" message$/ do |message|
  i18n_msg = I18n.translate("application.messages.#{message.downcase.gsub(/ /, "_")}")
  i18n_msg.should_not include "translation message"
  page.body.should include i18n_msg
end

When /^the "([^"]*)" field is empty$/ do |field|
  When "I fill in \"#{field}\" with \"\"" 
end
