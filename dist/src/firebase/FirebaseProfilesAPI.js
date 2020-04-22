"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseProfilesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.profilesRef = () => this.app.firestore().collection('profiles');
        this.profileRef = (uid = this.uid()) => this.profilesRef().doc(uid);
        this.get = async (uid) => {
            const doc = await this.profileRef(uid).get();
            return doc.exists ? doc.data() : undefined;
        };
        this.observe = (uid) => {
            return new rxjs_1.Observable((observer) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.profileRef(uid).onSnapshot((doc) => observer.next(doc.data()), (err) => observer.error(err)));
        };
        this.set = async (profile) => {
            await this.profileRef(profile.uid).set(profile);
        };
        this.update = async (changes, uid) => {
            await this.profileRef(uid).update(changes);
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
