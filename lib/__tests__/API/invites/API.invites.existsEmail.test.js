"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.invites.existsEmail', () => {
    let adminAPI;
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
    });
    it('returns true if the email invite exists', async () => {
        await adminAPI.invites.addEmail(invite);
        await expect(adminAPI.invites.existsEmail(invite.from, invite.to)).resolves.toBeTruthy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
