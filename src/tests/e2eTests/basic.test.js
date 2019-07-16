Feature('Basic test');

Scenario('navigate to homepage', I => {
  I.amOnPage('https://google.es');
  I.see('Buscar con Google');
});