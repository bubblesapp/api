"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseFriendsAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.get = async (friendUid, ofUid) => {
            const doc = await this.friendRef(friendUid, ofUid).get();
            return doc.exists ? doc.data() : undefined;
        };
        this.set = async (friend, ofUid) => {
            await this.friendRef(friend.uid, ofUid).set(friend);
        };
        this.delete = async (friendUid, ofUid) => {
            await this.friendRef(friendUid, ofUid).delete();
        };
        this.exists = async (friendUid, ofUid) => !!(await this.get(friendUid, ofUid));
        this.waitUntilExists = async (friendUid, ofUid) => {
            const snap = await this.waitUntilDocument(this.friendRef(friendUid, ofUid));
            return snap.data().uid === friendUid;
        };
        this.waitUntilDeleted = async (friendUid, ofUid) => {
            const predicate = (ds) => !ds.exists;
            const snap = await this.waitUntilDocument(this.friendRef(friendUid, ofUid), predicate);
            return !snap.exists;
        };
    }
}
exports.FirebaseFriendsAPI = FirebaseFriendsAPI;
