import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.email.exists', () => {
  let adminAPI: API;
  let invite: Invite;

  before(async () => await beforeAllTests());

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();

    invite = {
      from: chance.guid(),
      to: chance.email(),
      createdAt: new Date().getTime(),
      accepted: false,
    };
  });

  it('returns true if the email invite exists', async () => {
    await adminAPI.invites.email.add(invite);
    const result = await adminAPI.invites.email.exists(invite.from, invite.to);
    expect(result).to.be.true;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
