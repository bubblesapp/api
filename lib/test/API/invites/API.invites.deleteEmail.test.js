"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.deleteEmail', () => {
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
        await adminAPI.invites.addEmail(invite);
        await adminAPI.invites.deleteEmail(invite.from, invite.to);
        const result = await adminAPI.invites.existsEmail(invite.from, invite.to);
        chai_1.expect(result).to.be.false;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
