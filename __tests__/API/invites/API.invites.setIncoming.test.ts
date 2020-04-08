import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';

describe('API.invites.setIncoming', () => {
  let adminAPI: API;

  beforeAll(async () => await beforeAllTests());

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
    await expect(adminAPI.invites.existsIncoming(toUid, invite.from)).resolves.toBeTruthy();
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
