const chai = require('chai');
const path = require('path');

// expect path
chai.use(require('chai-fs'));

const { expect } = chai;
// eslint-disable-next-line no-undef
describe('EXIST FILES', () => {
    // eslint-disable-next-line no-undef
    it('CodeStyle', (done) => {
        expect(path.join(__dirname, '../../.eslintrc.json')).to.be.a.path();

        done();
    });
});
