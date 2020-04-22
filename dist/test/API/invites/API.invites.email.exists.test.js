"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.email.exists', () => {
    let adminAPI;
    let invite;
    before(async () => await __1.beforeAllTests());
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
        await adminAPI.invites.email.add(invite);
        const result = await adminAPI.invites.email.exists(invite.from, invite.to);
        chai_1.expect(result).to.be.true;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
