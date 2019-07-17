const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const { authenticatedNormalUser, authenticatedRRHHUser } = require('../testHelpers/testHelper.test')
const {http_config} = require('../../../http_config')
http_config.port = 6666
const app = require('../../../index')

/**
 * Probamos que un visitante sin logear no puede acceder ni al dashboard ni a RRHH
 */
describe('Probando rutas visitante', function (done) {
    it('Debería cargar la página de acceso', (done) => {
        request(app).get('/auth/login')
            .expect(200, done);
    });
});
