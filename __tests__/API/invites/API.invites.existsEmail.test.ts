import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';

describe('API.invites.existsEmail', () => {
  let adminAPI: API;
  let invite: Invite;

  beforeAll(async () => await beforeAllTests());

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
    await adminAPI.invites.addEmail(invite);
    await expect(adminAPI.invites.existsEmail(invite.from, invite.to)).resolves.toBeTruthy();
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
