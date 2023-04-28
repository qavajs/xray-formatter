Feature: XRayExample

  Background:
    Given background

  @PROD-30
  Scenario: passed scenario 1
    When passed step

  @PROD-31
  Scenario: failed scenario
    When failed step

  @PROD-32
  Scenario: passed scenario 2
    When passed step

  @PROD-39999999
  Scenario: passed scenario 3
    When passed step
