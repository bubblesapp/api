"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.email.delete', () => {
    let adminAPI;
    before(async () => {
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
        await adminAPI.invites.email.add(invite);
        await adminAPI.invites.email.delete(invite.from, invite.to);
        const result = await adminAPI.invites.email.exists(invite.from, invite.to);
        chai_1.expect(result).to.be.false;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
