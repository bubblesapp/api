"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../");
describe('API.profiles.uidWithEmail', () => {
    let adminAPI;
    beforeAll(async () => await __1.beforeAllTests());
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
        await expect(adminAPI.profiles.uidWihEmail(profile.email)).resolves.toEqual(profile.uid);
    });
    it('returns undefined if no user exists with the given email', async () => {
        const profile = {
            uid: __1.chance.guid(),
            email: __1.chance.email(),
            name: __1.chance.name(),
        };
        await adminAPI.profiles.set(profile);
        await expect(adminAPI.profiles.uidWihEmail(__1.chance.email())).resolves.toBeUndefined();
    });
    afterEach(async () => {
        await adminAPI.destroy();
    });
});
