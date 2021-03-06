"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.invites.incoming.exists', () => {
    let adminAPI;
    let toUid;
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
        toUid = __1.chance.guid();
    });
    it('returns true if an incoming invite exists', async () => {
        await adminAPI.invites.incoming.set(invite, toUid);
        const result = await adminAPI.invites.incoming.exists(invite.from, toUid);
        chai_1.expect(result).to.be.true;
    });
    it("returns false if an incoming invite doesn't exists", async () => {
        await adminAPI.invites.incoming.set(invite, toUid);
        const result1 = await adminAPI.invites.incoming.exists(__1.chance.guid(), toUid);
        chai_1.expect(result1).to.be.false;
        const result2 = await adminAPI.invites.incoming.exists(invite.from, __1.chance.guid());
        chai_1.expect(result2).to.be.false;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
