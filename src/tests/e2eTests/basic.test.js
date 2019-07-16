Feature('Basic test');

Scenario('navigate to homepage', I => {
  I.amOnPage('http://app:4001');
  I.see('Acceder');
});