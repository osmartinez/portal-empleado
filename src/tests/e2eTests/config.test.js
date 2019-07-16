exports.config = {
    tests: './*_test.js',    // how to know which files are test files
    output: './output',      // where to save screenshots
    helpers: {
     WebDriverIO: {               // which backend helper to use
       url: 'http://app:4001',    // a base URL to start on
       host: 'firefox-container', // identifying where selenium runs
       browser: 'firefox',        // a series of config options
       smartWait: 5000,              
       waitForTimeout: 10000,
       desiredCapabilities: {        // for a demo app we do not want 
           acceptInsecureCerts: true,   //to worry about SSL certs
       }
     },
    },
    name: 'codeceptjs-docker',
  };