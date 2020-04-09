"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseProfilesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.get = async (uid) => {
            const doc = await this.profileRef(uid).get();
            return doc.exists ? doc.data() : undefined;
        };
        this.set = async (profile) => {
            await this.profileRef(profile.uid).set(profile);
        };
        this.delete = async (uid) => {
            await this.profileRef(uid).delete();
        };
        // TODO: Create index on email in profiles
        this.uidWihEmail = async (email) => {
            var _a;
            const profiles = await this.profilesRef().where('email', '==', email).get();
            return (_a = profiles.docs.pop()) === null || _a === void 0 ? void 0 : _a.id;
        };
    }
}
exports.FirebaseProfilesAPI = FirebaseProfilesAPI;
