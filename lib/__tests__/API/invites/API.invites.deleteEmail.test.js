"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.invites.deleteEmail', () => {
    let adminAPI;
    beforeAll(async () => {
        await __1.beforeAllTests();
    });
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('deletes the email invite', async () => {
        const invite = {
            from: __1.chance.guid(),
            to: __1.chance.email(),
            createdAt: new Date().getTime(),
            accepted: false,
        };
        await adminAPI.invites.addEmail(invite);
        await adminAPI.invites.deleteEmail(invite.from, invite.to);
        await expect(adminAPI.invites.existsEmail(invite.from, invite.to)).resolves.toBeFalsy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
