import Page from './page';
import {
  timeout, setAutocompleteValue, clearAutocompleteValue, setDate, selectDropdownValue,
} from '../helpers/common';

class ClaimPage extends Page {
  get destinationFromInputId() { return 'react-select-2'; }
  get destinationToInputId() { return 'react-select-3'; }
  get connectionsInputId() { return 'react-select-4'; }
  get airlinesReasonDropdownId() { return 'react-select-5'; }
  get whereAboutUsDropdownId() { return 'react-select-6'; }
  get flightDateInputId() { return 'flightDate'; }

  get pageTopHeader() { return browser.element('h1'); }
  get failedFlightNumberLettersInput() { return browser.element('[name="failedFlightNumberLetters"]'); }
  get failedFlightNumberDigitsInput() { return browser.element('[name="failedFlightNumberDigits"]'); }
  get nextButton() { return browser.element('#step9 button'); }
  get hiddenSteps() { return browser.elements('[class="step is-hidden"]').value; }

  getStepSelector(stepNumber) { return `#step${stepNumber}`; }
  getStopCitySelector(stopNumber) {
    if (stopNumber > 4) {
      throw new Error('can\'t set more than 4 stops');
    }
    return `react-select-${8 + stopNumber}`;
  }
  getFlightProblemSelector(reason) {
    return `${this.getStepSelector(5)} [value='${reason}'] + span`;
  }
  getDelayDurationSelector(reason) {
    return `${this.getStepSelector(6)} [value='${reason}'] + span`;
  }

  open() {
    super.open('');
    return this;
  }

  waitForStepsCountToChange() {
    const hiddenStepsCount = this.hiddenSteps.length;

    try {
      browser.waitUntil(() => this.hiddenSteps.length !== hiddenStepsCount, timeout);
    } catch (error) {
      // do nothing
    }
  }

  isStepVisible(stepNumber, waitForStep = false) {
    if (waitForStep) {
      this.waitForStepsCountToChange();
    }

    return browser.isVisible(this.getStepSelector(stepNumber));
  }

  getPageHeader() {
    return this.pageTopHeader.getText();
  }

  // STEP 1
  setFlightDestinations(from, to) {
    setAutocompleteValue(this.destinationFromInputId, from);
    setAutocompleteValue(this.destinationToInputId, to);
  }

  clearFlightFromDestination() {
    clearAutocompleteValue(this.destinationFromInputId);
  }

  clearFlightToDestination() {
    clearAutocompleteValue(this.destinationToInputId);
  }

  // STEP 2
  setConnections(connectionNumber) {
    selectDropdownValue(this.connectionsInputId, connectionNumber);
  }

  setDate(year, month, day) {
    setDate(this.flightDateInputId, year, month, day);
  }

  setFlightNumber(letters, digits) {
    if (letters.length > 2) {
      throw new Error('flight number should not contain more than 2 letters');
    }

    if (digits.length > 4) {
      throw new Error('flight number should not contain more than 4 digits');
    }

    this.failedFlightNumberLettersInput.setValue(letters);
    this.failedFlightNumberDigitsInput.setValue(digits);
  }

  // STEP 4
  setStopCity(stopNumber, city) {
    setAutocompleteValue(this.getStopCitySelector(stopNumber), city);
  }

  // STEP 5
  selectFlightProblemReason(reason) {
    browser.click(this.getFlightProblemSelector(reason));
    this.waitForStepsCountToChange();
  }

  // STEP 6
  selectDelayReason(reason) {
    browser.click(this.getDelayDurationSelector(reason));
    this.waitForStepsCountToChange();
  }

  // STEP 7
  setAirlinesReason(optionNumber) {
    selectDropdownValue(this.airlinesReasonDropdownId, optionNumber);
  }

  setWhereDidYouHearAboutUs(optionNumber) {
    selectDropdownValue(this.whereAboutUsDropdownId, optionNumber);
  }

  // STEP 9
  clickNext() {
    this.nextButton.click();
    browser.waitUntil(() => this.getPageHeader().includes('2/4'));
  }
}

export default new ClaimPage();
