const expect = require('chai').expect;
const request = require('supertest');
const http_config = require('../../../http_config')
http_config.port = 6666
const app = require('../../../index');
const {normalUserCredentials, rrhhUserCredentials, firstLoginUserCredentials} = require('../../credentials')


authenticatedNormalUser = request.agent(app);
before((done) => {
    authenticatedNormalUser
        .post('/auth/login')
        .send(normalUserCredentials)
        .end((err, response) => {
            expect(response.statusCode).to.equal(302);
            expect('Location', '/dashboard');
            done();
        });
});

authenticatedRRHHUser = request.agent(app);
before((done) => {
    authenticatedRRHHUser
        .post('/auth/login')
        .send(rrhhUserCredentials)
        .end((err, response) => {
            expect(response.statusCode).to.equal(302);
            expect('Location', '/dashboard');
            done();
        });
});

authenticatedFirstLoginUser = request.agent(app);
before((done) => {
    authenticatedFirstLoginUser
        .post('/auth/login')
        .send(firstLoginUserCredentials)
        .end((err, response) => {
            expect(response.statusCode).to.equal(302);
            expect('Location', '/dashboard');
            done();
        });
});


module.exports = {authenticatedNormalUser, authenticatedRRHHUser,authenticatedFirstLoginUser}