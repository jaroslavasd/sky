const chai = require('chai');
const nodeFetch = require('node-fetch');

exports.config = {
  specs: [
    './test/specs/**/*.js',
  ],
  maxInstances: 10,
  capabilities: [{
    browserName: 'chrome', // options: chrome || firefox || phantomjs
  },
  // {
  //   browserName: 'firefox', // options: chrome || firefox || phantomjs
  // }],
  ],

  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: 'https://claim.skycop.com/',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'], //
  framework: 'mocha',
  mochaOpts: {
    compilers: ['js:babel-register'],
    require: ['./test/helpers/common.js'],
    timeout: 120000,
  },
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order
  // to enhance it and to build services around it. You can either apply a single function or an
  // array of methods to it. If one of them returns with a promise, WebdriverIO will wait until
  // that promise got resolved to continue.
  //
  // Gets executed once before all workers get launched.
  // onPrepare: function (config, capabilities) {
  // },
  //
  // Gets executed before test execution begins. At this point you can access all global
  // variables, such as `browser`. It is the perfect place to define custom commands.
  // before(capabilities, specs) {
  before() {
    global.fetch = nodeFetch;
    chai.config.includeStack = true;
    global.expect = chai.expect;
    global.AssertionError = chai.AssertionError;
    global.Assertion = chai.Assertion;
    global.assert = chai.assert;
    chai.Should();
    global.waitForElementTimeOut = 20000;
    browser.timeouts('script', 60000);
    // browser.windowHandleMaximize();
  },
  //
  // Hook that gets executed before the suite starts
  // beforeSuite: function (suite) {
  // },
  //
  // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
  // beforeEach in Mocha)
  // beforeHook: function () {
  // },
  //
  // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
  // afterEach in Mocha)
  // afterHook: function () {
  // },
  //
  // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // beforeTest: function (test) {
  // },
  //
  // Runs before a WebdriverIO command gets executed.
  // beforeCommand: function (commandName, args) {
  // },
  //
  // Runs after a WebdriverIO command gets executed
  // afterCommand: function (commandName, args, result, error) {
  // },
  //
  // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
  // afterTest() {
  //   browser.reload();
  // },
  //
  // Hook that gets executed after the suite has ended
  // afterSuite: function (suite) {
  // },
  //
  // Gets executed after all tests are done. You still have access to all global variables from
  // the test.
  // after: function (result, capabilities, specs) {
  // },
  //
  // Gets executed after all workers got shut down and the process is about to exit. It is not
  // possible to defer the end of the process using a promise.
  // onComplete: function(exitCode) {
  // }
};
