module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      './vendor/angular/angular.js',
      './vendor/angular-route/angular-route.js',
      './vendor/angular-mocks/angular-mocks.js',
       './src/app/login/*.spec.js', 
       './src/app/login/*.js',
       './src/common/*.spec.js', 
       './src/common/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};