"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseBubbleAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(firestore) {
        super(firestore);
        this.get = async (uid) => {
            const snap = await this.bubbleRef(uid).get();
            return snap.exists ? snap.data() : undefined;
        };
        this.set = async (bubble) => {
            await this.bubbleRef(bubble.uid).set(bubble);
        };
        this.exists = async (uid) => {
            const snap = await this.bubbleRef(uid).get();
            return snap.exists;
        };
        this.delete = async (uid) => {
            await this.bubbleRef(uid).delete();
        };
        this.waitUntilExists = async (uid) => {
            const snap = await this.waitUntilDocument(this.bubbleRef(uid));
            return snap.exists;
        };
        this.waitUntilDeleted = async (uid) => {
            const predicate = (ds) => !ds.exists;
            const snap = await this.waitUntilDocument(this.bubbleRef(uid), predicate);
            return !snap.exists;
        };
        this.pop = async (uid) => {
            await this.bubbleRef(uid).update({ popped: true });
        };
        this.isPopped = async (uid) => {
            const bubble = await this.get(uid);
            return bubble.isPopped;
        };
    }
}
exports.FirebaseBubbleAPI = FirebaseBubbleAPI;
