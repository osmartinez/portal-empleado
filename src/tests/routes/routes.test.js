const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../../index')
const { authenticatedNormalUser, authenticatedRRHHUser } = require('../../tests/testHelpers/testHelper.test')

/**
 * Probamos que un visitante sin logear no puede acceder ni al dashboard ni a RRHH
 */
describe('Probando rutas visitante', function (done) {
    it('Debería cargar la página de acceso', (done) => {
        request(app).get('/auth/login')
            .expect(200, done);
    });
});
