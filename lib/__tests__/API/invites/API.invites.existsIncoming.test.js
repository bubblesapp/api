"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.invites.existsIncoming', () => {
    let adminAPI;
    let toUid;
    let invite;
    beforeAll(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
        invite = {
            from: __1.chance.guid(),
            to: __1.chance.email(),
            createdAt: new Date().getTime(),
            accepted: false,
        };
        toUid = __1.chance.guid();
    });
    it('returns true if an incoming invite exists', async () => {
        await adminAPI.invites.setIncoming(toUid, invite);
        await expect(adminAPI.invites.existsIncoming(toUid, invite.from)).resolves.toBeTruthy();
    });
    it("returns false if an incoming invite doesn't exists", async () => {
        await adminAPI.invites.setIncoming(toUid, invite);
        await expect(adminAPI.invites.existsIncoming(toUid, __1.chance.guid())).resolves.toBeFalsy();
        await expect(adminAPI.invites.existsIncoming(__1.chance.guid(), invite.from)).resolves.toBeFalsy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
