Feature: Homepage contact
  As the site owner
  In order to have feedback from users
  I want the homepage to offer a contact form

  Scenario: Contact form
    Given I am a regular user
     When I go to the homepage
      And I fill in "email" with "kandalf@threefunkymonkeys.com"
      And I fill in "name" with "Leonardo Mateo"
      And I press "let me know"
     Then I should see the "Thank you" message
      And a contact with email "kandalf@threefunkymonkeys.com" and name "Leonardo Mateo" should exist
