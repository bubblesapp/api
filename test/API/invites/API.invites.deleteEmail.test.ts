import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.deleteEmail', () => {
  let adminAPI: API;

  before(async () => {
    await beforeAllTests();
  });

  beforeEach(async () => {
    await beforeEachTest();
    adminAPI = createAdminAPI();
  });

  it('deletes the email invite', async () => {
    const invite: Invite = {
      from: chance.guid(),
      to: chance.email(),
      createdAt: new Date().getTime(),
      accepted: false,
    };
    await adminAPI.invites.addEmail(invite);

    await adminAPI.invites.deleteEmail(invite.from, invite.to);
    const result = await adminAPI.invites.existsEmail(invite.from, invite.to);
    expect(result).to.be.false;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
