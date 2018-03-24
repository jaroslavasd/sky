import claimPage from '../pages/claim.page';
import { FLIGHT_PROBLEM, DELAY_DURATION } from '../helpers/options';

describe('claims', () => {
  it('eligibility check should be completed', () => {
    claimPage.open();
    claimPage.getPageHeader().should.include('Claim eligibility check', 'wrong initial page header');

    claimPage.setFlightDestinations('VNO', 'PAR');

    claimPage.setConnections(0);
    claimPage.setDate('2018', '2', '3');
    claimPage.setFlightNumber('BA', '3425');
    claimPage.waitForStepsCountToChange();

    claimPage.selectFlightProblemReason(FLIGHT_PROBLEM.DELAYED);

    claimPage.selectDelayReason(DELAY_DURATION.MORE_THAN_THREE);

    claimPage.setAirlinesReason(1);
    claimPage.setWhereDidYouHearAboutUs(1);

    claimPage.clickNext();
    claimPage.getPageHeader().should.include('Flight information', 'wrong page header after eligibility check');
  });

  it('steps should not be available when first step is not complete', () => {
    claimPage.open();

    // fill first step and expect second step to appear
    claimPage.setFlightDestinations('VNO', 'PAR');
    claimPage.isStepVisible(2, true)
      .should.equal(true, 'second step should be available when first is completed');

    // fill second step with 0 connections and expect fifth step to appear
    claimPage.setConnections(0);
    claimPage.setDate('2018', '2', '3');
    claimPage.setFlightNumber('BA', '3425');
    claimPage.isStepVisible(5, true)
      .should.equal(true, 'fifth step should be available when second is completed with 0 connections');

    // clear first step and expect fifth and second steps to be hidden
    claimPage.clearFlightFromDestination();
    claimPage.isStepVisible(5)
      .should.equal(false, 'fifth step should not be available when first is not completed');
    claimPage.isStepVisible(2)
      .should.equal(false, 'second step should not be available when first is not completed');
  });
});
