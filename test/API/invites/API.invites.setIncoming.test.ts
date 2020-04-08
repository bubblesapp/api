import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.setIncoming', () => {
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

    await adminAPI.invites.setIncoming(toUid, invite);
    const result = await adminAPI.invites.existsIncoming(toUid, invite.from);
    expect(result).to.be.true;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
