"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
const chai_1 = require("chai");
describe('API.profiles.uidWithEmail', () => {
    let adminAPI;
    before(async () => await __1.beforeAllTests());
    beforeEach(async () => {
        await __1.beforeEachTest();
        adminAPI = __1.createAdminAPI();
    });
    it('returns the uid of the profile with the given email', async () => {
        const profile = {
            uid: __1.chance.guid(),
            email: __1.chance.email(),
            name: __1.chance.name(),
        };
        await adminAPI.profiles.set(profile);
        const result = await adminAPI.profiles.uidWihEmail(profile.email);
        chai_1.expect(result).to.equal(profile.uid);
    });
    it('returns undefined if no user exists with the given email', async () => {
        const profile = {
            uid: __1.chance.guid(),
            email: __1.chance.email(),
            name: __1.chance.name(),
        };
        await adminAPI.profiles.set(profile);
        const result = await adminAPI.profiles.uidWihEmail(__1.chance.email());
        chai_1.expect(result).to.be.undefined;
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
