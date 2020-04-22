import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.incoming.set', () => {
  let adminAPI: API;

  before(async () => await beforeAllTests());

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();
  });

  it('creates the incoming invite', async () => {
    const invite: Invite = {
      from: chance.guid(),
      to: chance.email(),
      createdAt: new Date().getTime(),
      accepted: false,
    };
    const toUid = chance.guid();

    await adminAPI.invites.incoming.set(invite, toUid);
    const result = await adminAPI.invites.incoming.exists(invite.from, toUid);
    expect(result).to.be.true;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
