"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.friends.exists', () => {
    let adminAPI;
    beforeAll(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('returns false if friendUid is not friend of ofUid', async () => {
        await expect(adminAPI.friends.exists(__1.chance.guid(), __1.chance.guid())).resolves.toBeFalsy();
    });
    it('returns true if friendUid is friend of toUid', async () => {
        const friend = {
            uid: __1.chance.guid(),
            lastMet: new Date().getTime(),
        };
        const ofUid = __1.chance.guid();
        await adminAPI.friends.set(friend, ofUid);
        await expect(adminAPI.friends.exists(friend.uid, ofUid)).resolves.toBeTruthy();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
