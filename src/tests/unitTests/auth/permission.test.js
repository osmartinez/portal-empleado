const expect = require('chai').expect;
const app = require('../../../index');
const request = require('supertest');
const { authenticatedNormalUser, authenticatedRRHHUser, authenticatedFirstLoginUser } = require('../testHelpers/testHelper.test')


