"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.incoming.set', () => {
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
        await adminAPI.invites.incoming.set(invite, toUid);
        const result = await adminAPI.invites.incoming.exists(invite.from, toUid);
        chai_1.expect(result).to.be.true;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
