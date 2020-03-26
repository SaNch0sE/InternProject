const chai = require('chai');
const crypto = require('crypto');
const UtilService = require('../../src/components/User/service');
const AuthService = require('../../src/components/Auth/service');

const { expect } = chai;

const pass = crypto.randomBytes(Math.ceil(8 / 2)).toString('hex').slice(0, 8);
const userCreditionals = {
    fullName: 'Test Test',
    email: `${crypto
        .randomBytes(Math.ceil(8 / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, 8)}@test.com`,
    password: pass,
};

describe('UserComponent -> service', () => {
    it('UserComponent -> service -> findAll', async () => {
        const res = await UtilService.findAll();
        expect(res).to.be.an('array');
    });
    it('UserComponent -> service -> create', async () => {
        const res = await UtilService.create(userCreditionals);
        expect(res).to.be.an('object').and.to.have.property('_id');
        userCreditionals._id = res._id;
    });
    it('UserComponent -> service -> findById', async () => {
        const res = await UtilService.findById(userCreditionals._id);
        expect(res).to.be.an('object').and.to.have.property('fullName');
    });
    it('UserComponent -> service -> updateById', async () => {
        const res = await UtilService.updateById(userCreditionals._id, `${userCreditionals.fullName}_Updated`);
        expect(res).to.be.an('object').and.to.have.property('nModified').and.to.be.equal(1);
    });
    it('UserComponent -> service -> deleteById', async () => {
        const res = await UtilService.deleteById(userCreditionals._id);
        expect(res).to.be.an('object').and.to.have.property('deletedCount').and.to.be.equal(1);
    });
});

describe('AuthComponent -> service', () => {
    it('AuthComponent -> service -> signUp', async () => {
        userCreditionals.session = 'logged out';
        const res = await AuthService.signUp(userCreditionals);
        expect(res).to.be.an('object').and.to.have.property('_id');
    });
    it('AuthComponent -> service -> signIn', async () => {
        userCreditionals.session = 'testSession';
        const res = await AuthService.signIn({
            email: userCreditionals.email,
            password: userCreditionals.password,
        },
        userCreditionals.session);
        expect(res).to.be.an('object').and.to.have.property('nModified').and.to.be.equal(1);
    });
    it('AuthComponent -> service -> logout', async () => {
        const res = await AuthService.logout(userCreditionals.email, userCreditionals.session);
        expect(res).to.be.an('object').and.to.have.property('nModified').and.to.be.equal(1);
    });
});
