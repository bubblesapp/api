"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.outgoing.add', () => {
    let adminAPI;
    before(async () => await __1.beforeAllTests());
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
        await adminAPI.invites.outgoing.add(invite);
        const result = await adminAPI.invites.outgoing.exists(invite.to, invite.from);
        chai_1.expect(result).to.be.true;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
