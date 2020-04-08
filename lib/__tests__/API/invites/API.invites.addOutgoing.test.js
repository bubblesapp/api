"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.invites.addOutgoing', () => {
    let adminAPI;
    beforeAll(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('creates the outgoing invite', async () => {
        const invite = {
            from: __1.chance.guid(),
            to: __1.chance.email(),
            createdAt: new Date().getTime(),
            accepted: false,
        };
        await adminAPI.invites.addOutgoing(invite);
        await expect(adminAPI.invites.existsOutgoing(invite.from, invite.to)).resolves.toBeTruthy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
