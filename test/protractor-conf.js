exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../src/app/login/*.spec.js', '!../src/app/login/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8200/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
