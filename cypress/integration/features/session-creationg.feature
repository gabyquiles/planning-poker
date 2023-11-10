Feature: Create session

    Scenario: User creates a new session
    As a Non-Logged-In User
    I want to be able to create a new session
    Because I want to share a unique id for other people to join my session

    Given I'm a logged-out user on the home page
    When I click the "Create New Session" button
    Then I should be in a path that starts with "/session"