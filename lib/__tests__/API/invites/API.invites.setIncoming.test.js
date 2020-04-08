"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.invites.setIncoming', () => {
    let adminAPI;
    beforeAll(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('creates the incoming invite', async () => {
        const invite = {
            from: __1.chance.guid(),
            to: __1.chance.email(),
            createdAt: new Date().getTime(),
            accepted: false,
        };
        const toUid = __1.chance.guid();
        await adminAPI.invites.setIncoming(toUid, invite);
        await expect(adminAPI.invites.existsIncoming(toUid, invite.from)).resolves.toBeTruthy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
