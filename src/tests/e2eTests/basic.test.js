Feature('Basic test');

Scenario('navigate to homepage', I => {
  I.amOnPage('/');
  I.see('Acceder');
  I.fillField("username","omartinez")
  I.fillField("password","Hackerox4")
  I.click('Acceder')
  I.see("Portal web","h1")
});