/* import {expect} from 'chai';

describe('Some test', () => {
  it('runs', () => {
    console.log('Hello world');
    expect(true).to.be.true;
  });
}); */
describe('Some test', () => {
    it('runs', () => {
        console.log('Hello world');
        expect(true).toBeTruthy();
    });
});
