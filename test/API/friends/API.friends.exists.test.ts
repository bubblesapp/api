import {Friend} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.friends.exists', () => {
  let adminAPI: API;

  before(async () => await beforeAllTests());

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();
  });

  it('returns false if friendUid is not friend of ofUid', async () => {
    const result = await adminAPI.friends.exists(chance.guid(), chance.guid());
    expect(result).to.be.false;
  });

  it('returns true if friendUid is friend of toUid', async () => {
    const friend: Friend = {
      uid: chance.guid(),
      lastMet: new Date().getTime(),
    };

    const ofUid = chance.guid();
    await adminAPI.friends.set(friend, ofUid);

    const result = await adminAPI.friends.exists(friend.uid, ofUid);
    expect(result).to.be.true;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
