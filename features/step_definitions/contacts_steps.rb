Then /^a contact with email "([^"]*)" and name "([^"]*)" should exist$/ do |email, name|
  contact = Contact.find_by_email_and_name(email, name)
  contact.should_not be_nil
end

Given /^a contact with the email "([^"]*)" exists$/ do |email|
  contact = Contact.find_or_create_by_email(email)
  contact.should_not be_nil
  contact.should be_valid
  contact.should_not be_a_new_record
end
