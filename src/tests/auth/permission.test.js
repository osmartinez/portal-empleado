const expect = require('chai').expect;
const app = require('../../index');
const request = require('supertest');
const { authenticatedNormalUser, authenticatedRRHHUser, authenticatedFirstLoginUser } = require('../../tests/testHelpers/testHelper.test')


/**
 * PRobamos que un visitante sin logear no puede acceder ni al dashboard ni a RRHH
 */
describe('Probando permisos visitante', function (done) {
    it('Debería redireccionar a la página dashboard', (done) => {
        request(app).get('/rrhh')
            .expect('Location', '/dashboard')
            .expect(302, done);
    });

    it('Debería redireccionar a la página de acceso', (done) => {
        request(app).get('/dashboard')
            .expect('Location', '/auth/login')
            .expect(302, done);
    });
});

/**
 * Probamos que un usuario normal puede acceder al dashboard y no puede acceder a Administración RRHH
 * Probamos que un usuario normal no puede acceder a la página de login puesto que ya esta loggeado, sí que puede acceder a logout
 */
describe('Probando permisos de usuario normal', function (done) {
    it('Debería cargar el dashboard sin problema', (done) => {
        authenticatedNormalUser.get('/dashboard')
            .expect(200, done);
    });

    it('Debería redireccionar a la página de dashboard al intentar cargar RRHH', (done) => {
        authenticatedNormalUser.get('/rrhh')
            .expect('Location', '/dashboard')
            .expect(302, done);
    });


    it('Debería redireccionar a dashboard puesto que ya esta logeado', (done) => {
        authenticatedNormalUser.get('/auth/login')
            .expect(302, done);
    });

    it('Debería desloggear y redireccionar a la página de acceso', (done) => {
        authenticatedNormalUser.get('/auth/logout')
            .expect('Location', '/auth/login')
            .expect(302, done);
    });
});

/**
 * Probamos que un usuario RRHH puede acceder al dashboard y a Administración RRHH
 * PRobamos que un usuario RRHH no puede acceder a la página de login puesto que ya esta loggeado, sí que puede acceder a logout
 */
describe('Probando permisos de usuario RRHH', function (done) {
    it('Debería cargar el dashboard', (done) => {
        authenticatedRRHHUser.get('/dashboard')
            .expect(302, done);
    });

    it('Debería cargar la página de RRHH', (done) => {
        authenticatedRRHHUser.get('/rrhh')
            .expect(302, done);
    });

    it('Debería redireccionar a dashboard puesto que ya esta logeado', (done) => {
        authenticatedRRHHUser.get('/auth/login')
            .expect(200, done);
    });

    it('Debería deslogear y redireccionar a la página de acceso', (done) => {
        authenticatedRRHHUser.get('/auth/logout')
            .expect('Location', '/auth/login')
            .expect(302, done);
    });
});

/**
 * Probamos que un usuario que acaba de iniciar sesion por primera vez no puede acceder a ningun recurso 
 * PRobamos que un usuario que acaba de iniciar sesión por primera vez siempre es redireccionado a la web de cambio de clave
 */
describe('Probando permisos de usuario first-time-login', function (done) {
    it('Debería cargar la pagina de cambio de clave si intento acceder al dashboard', (done) => {
        authenticatedFirstLoginUser.get('/dashboard')
            .expect(302, done);
    });

    it('Debería cargar la página de cambio de clave si intento acceder a recursos humanos', (done) => {
        authenticatedFirstLoginUser.get('/rrhh')
            .expect('Location', '/dashboard')
            .expect(302, done);
    });

    it('Debería poder acceder a la página de cambio de clave', (done) => {
        authenticatedFirstLoginUser.get('/dashboard/cambiar_clave')
            .expect(302, done);
    });

    it('Debería deslogear y redireccionar a la página de acceso', (done) => {
        authenticatedFirstLoginUser.get('/auth/logout')
            .expect('Location', '/auth/login')
            .expect(302, done);
    });
});