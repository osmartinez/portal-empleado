const expect = require('chai').expect;
const app = require('../../index');
const request = require('supertest');

const normalUserCredentials = {
    username: 'normal',
    password: 'normal'
}

const rrhhUserCredentials = {
    username: 'osmartinez',
    password: 'Hackerox4'
}

const firstLoginUserCredentials = {
    username: 'first',
    password: 'first',
}

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