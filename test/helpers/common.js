const timeout = 2000;

const waitForMenuAndClickOption = function waitForMenuAndClickOption(element, optionNumber) {
  browser.waitForExist('.Select-menu-outer', timeout);
  browser.click(`#${element}--option-${optionNumber}`);
}

const setAutocompleteValue = function setAutocompleteValue(element, value) {
  if (value) {
    browser.setValue(`#${element}--value > div.Select-input > input`, value);

    browser.waitForExist('.Select-loading', timeout, false);
    browser.waitForExist('.Select-loading', timeout, true);

    waitForMenuAndClickOption(element, 0);
  }
};

const clearAutocompleteValue = function clearAutocompleteValue(element) {
  browser.click(`#${element}--value + span > .clear-value`);
};

const selectDropdownValue = function selectDropdownValue(element, optionNumber) {
  browser.click(`#${element}--value`);
  waitForMenuAndClickOption(element, optionNumber);
};

const setDate = function setDate(element, year, month, day) {
  browser.click(`#rdt-control-click-${element}`);
  browser.waitForVisible('.rdtPicker', timeout);

  browser.waitForVisible('.rdtYears', timeout);
  browser.click(`.rdtYears [data-value="${year}"]`);

  browser.waitForVisible('.rdtMonths', timeout);
  browser.click(`.rdtMonths [data-value="${month - 1}"]`);

  browser.waitForVisible('.rdtDays', timeout);
  browser.click(`.rdtDays [data-value="${day}"]`);

  browser.waitForVisible('.rdtPicker', 2000, true);
};

module.exports.timeout = timeout;
module.exports.setAutocompleteValue = setAutocompleteValue;
module.exports.clearAutocompleteValue = clearAutocompleteValue;
module.exports.selectDropdownValue = selectDropdownValue;
module.exports.setDate = setDate;
