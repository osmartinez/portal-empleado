const {normalUserCredentials, rrhhUserCredentials, firstLoginUserCredentials} = require('../credentials')

Feature('LogIn usuario normal');

Scenario('Navego a la pagina inicial', I => {
  I.amOnPage('/');
  I.see('Acceder');
  I.fillField("username",normalUserCredentials.username)
  I.fillField("password",normalUserCredentials.password)
  I.click('Acceder')
  I.see("MENÚ PRINCIPAL")
});