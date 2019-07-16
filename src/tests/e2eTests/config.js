exports.config = {
    tests: './*.test.js',    // how to know which files are test files
    output: '',
    helpers: {
     WebDriverIO: {               // which backend helper to use
       url: 'http://portal-empleado-test:5555',    // a base URL to start on
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