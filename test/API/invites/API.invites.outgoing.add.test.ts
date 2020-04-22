import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.outgoing.add', () => {
  let adminAPI: API;

  before(async () => await beforeAllTests());

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();
  });

  it('creates the outgoing invite', async () => {
    const invite: Invite = {
      from: chance.guid(),
      to: chance.email(),
      createdAt: new Date().getTime(),
      accepted: false,
    };

    await adminAPI.invites.outgoing.add(invite);
    const result = await adminAPI.invites.outgoing.exists(invite.to, invite.from);
    expect(result).to.be.true;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
