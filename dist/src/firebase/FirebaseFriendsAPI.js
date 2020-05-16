"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseFriendsAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.friendsRef = (ofUid) => this.userRef(ofUid).collection('friends');
        this.friendRef = (friendUid, ofUid) => this.friendsRef(ofUid).doc(friendUid);
        this.observeAll = (ofUid) => {
            return new rxjs_1.Observable((observer) => this.friendsRef(ofUid)
                .orderBy('lastMet', 'desc')
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                .onSnapshot((qs) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc) => doc.data())), (err) => observer.error(err), () => observer.complete()));
        };
        this.get = async (friendUid, ofUid) => {
            const doc = await this.friendRef(friendUid, ofUid).get();
            return doc.exists ? doc.data() : undefined;
        };
        this.set = async (friend, ofUid) => {
            await this.friendRef(friend.uid, ofUid).set(friend);
        };
        this.update = async (changes, friendUid, ofUid) => {
            await this.friendRef(friendUid, ofUid).update(changes);
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
        this.setLastMet = async (friendUid, lastMet = new Date().getTime(), ofUid) => {
            await this.friendRef(friendUid, ofUid).update({ lastMet });
        };
    }
}
exports.FirebaseFriendsAPI = FirebaseFriendsAPI;
