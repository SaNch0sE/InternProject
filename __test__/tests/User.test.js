/* eslint-disable no-undef */
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const crypto = require('crypto');

const server = require('../../src/server/server');

const { expect } = chai;

chai.use(chaiHttp);

const pass = crypto.randomBytes(Math.ceil(8 / 2)).toString('hex').slice(0, 8);
const userCreditionals = {
    fullName: 'Test Test',
    email: `${crypto
        .randomBytes(Math.ceil(8 / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, 8)}@test.com`,
    password: pass,
    repeat_password: pass,
};
let id;

// Create test agent
const agent = request.agent(server);

describe('UserComponent -> controller', () => {
    // Signin Up
    it('UserComponent -> controller -> /v1/users/signUp', (done) => {
        agent.post('/v1/users/signUp')
            .set('Accept', 'application/json')
            .send(userCreditionals)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property('data').and.to.be.a('object');

                expect(body.data).to.have.property('_id').and.to.be.a('string');
                expect(body.data).to.have.property('email').and.to.be.a('string');

                done();
            })
            .catch((err) => done(err));
    });
    // Signin In
    it('UserComponent -> controller -> /v1/users/signIn', (done) => {
        agent.post('/v1/users/signIn')
            .set('Accept', 'application/json')
            .send({
                email: userCreditionals.email,
                password: userCreditionals.password,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('ok').and.to.be.a('boolean').and.to.be.equal(true);
                // Check tokens
                expect(res).to.have.cookie('access');
                expect(res).to.have.cookie('refresh');
                done();
            })
            .catch((err) => done(err));
    });
    // Get all users
    it('UserComponent -> controller -> /v1/users/ -> findAll', (done) => {
        agent
            .get('/v1/users/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('array');
                expect(res.body.data[0]).to.be.a('object').and.to.have.property('_id');
                id = res.body.data[0]._id;
                done();
            })
            .catch((err) => done(err));
    });
    // Get one user
    it('UserComponent -> controller -> /v1/users/ -> findById', (done) => {
        agent
            .get(`/v1/users/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('object');
                done();
            })
            .catch((err) => done(err));
    });
    // Create new user
    it('UserComponent -> controller -> /v1/users/ -> create', (done) => {
        agent
            .post('/v1/users/')
            .set('Accept', 'application/json')
            .send({
                fullName: userCreditionals.fullName,
                email: userCreditionals.email,
                password: userCreditionals.password,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('object');
                expect(res.body.data).to.have.property('_id').and.to.be.a('string');
                id = res.body.data._id;
                done();
            })
            .catch((err) => done(err));
    });
    // Update new user's info
    it('UserComponent -> controller -> /v1/users/ -> updateById', (done) => {
        agent
            .put('/v1/users/')
            .set('Accept', 'application/json')
            .send({
                id,
                fullName: `${userCreditionals.fullName}_UPDATED`,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('object')
                    .and.to.have.property('updated').and.to.be.equal(true);
                done();
            })
            .catch((err) => done(err));
    });
    // Remove created user
    it('UserComponent -> controller -> /v1/users/ -> removeById', (done) => {
        agent
            .delete('/v1/users/')
            .set('Accept', 'application/json')
            .send({
                id,
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('object')
                    .and.to.have.property('deleted').and.to.be.equal(true);
                done();
            })
            .catch((err) => done(err));
    });
    // Logout
    it('UserComponent -> controller -> /v1/users/logout', (done) => {
        agent
            .post('/v1/users/logout')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const expectBody = expect(res.body);
                // Check response
                expectBody.to.have.property('data').and.to.be.a('object');
                done();
            })
            .catch((err) => done(err));
    });
});
