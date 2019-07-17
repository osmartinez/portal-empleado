const expect = require('chai').expect;
const request = require('supertest');
const { authenticatedNormalUser, authenticatedRRHHUser, authenticatedFirstLoginUser } = require('../testHelpers/testHelper.test')
const http_config = require('../../../http_config')
http_config.port = 6666
const app = require('../../../index');


