import {Invite} from '../../../src/models';
import {beforeAllTests, beforeEachTest, chance, createAdminAPI} from '../../';
import {API} from '../../..';
import {expect} from 'chai';

describe('API.invites.incoming.exists', () => {
  let adminAPI: API;
  let toUid: string;
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

    toUid = chance.guid();
  });

  it('returns true if an incoming invite exists', async () => {
    await adminAPI.invites.incoming.set(invite, toUid);
    const result = await adminAPI.invites.incoming.exists(invite.from, toUid);
    expect(result).to.be.true;
  });

  it("returns false if an incoming invite doesn't exists", async () => {
    await adminAPI.invites.incoming.set(invite, toUid);
    const result1 = await adminAPI.invites.incoming.exists(chance.guid(), toUid);
    expect(result1).to.be.false;
    const result2 = await adminAPI.invites.incoming.exists(invite.from, chance.guid());
    expect(result2).to.be.false;
  });

  afterEach(async () => {
    await adminAPI.destroy();
  });
});
