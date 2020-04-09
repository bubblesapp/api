"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.friends.exists', () => {
    let adminAPI;
    before(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('returns false if friendUid is not friend of ofUid', async () => {
        const result = await adminAPI.friends.exists(__1.chance.guid(), __1.chance.guid());
        chai_1.expect(result).to.be.false;
    });
    it('returns true if friendUid is friend of toUid', async () => {
        const friend = {
            uid: __1.chance.guid(),
            lastMet: new Date().getTime(),
        };
        const ofUid = __1.chance.guid();
        await adminAPI.friends.set(friend, ofUid);
        const result = await adminAPI.friends.exists(friend.uid, ofUid);
        chai_1.expect(result).to.be.true;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
