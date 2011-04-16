Then /^a contact with email "([^"]*)" and name "([^"]*)" should exist$/ do |email, name|
  contact = Contact.find_by_email_and_name(email, name)
  contact.should_not be_nil
end
