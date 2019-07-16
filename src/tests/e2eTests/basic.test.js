Feature('Basic test');

Scenario('navigate to homepage', I => {
  I.amOnPage('/');
  I.see('Acceder');
});