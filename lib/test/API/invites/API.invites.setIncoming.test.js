"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.setIncoming', () => {
    let adminAPI;
    before(async () => await __1.beforeAllTests());
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
        const result = await adminAPI.invites.existsIncoming(toUid, invite.from);
        chai_1.expect(result).to.be.true;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
