import {Profile} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.profiles.uidWithEmail', () => {
  let adminAPI: API;

  before(async () => await beforeAllTests());

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();
  });

  it('returns the uid of the profile with the given email', async () => {
    const profile: Profile = {
      uid: chance.guid(),
      email: chance.email(),
      name: chance.name(),
    };

    await adminAPI.profiles.set(profile);
    const result = await adminAPI.profiles.uidWihEmail(profile.email)
    expect(result).to.equal(profile.uid);
  });

  it('returns undefined if no user exists with the given email', async () => {
    const profile: Profile = {
      uid: chance.guid(),
      email: chance.email(),
      name: chance.name(),
    };

    await adminAPI.profiles.set(profile);

    const result = await adminAPI.profiles.uidWihEmail(chance.email());
    expect(result).to.be.undefined;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
