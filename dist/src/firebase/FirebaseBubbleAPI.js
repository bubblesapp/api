"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseBubbleAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
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
        this.reset = async (uid) => {
            await this.bubbleRef(uid).update({ popped: false });
        };
        this.isPopped = async (uid) => {
            const bubble = await this.get(uid);
            return bubble.isPopped;
        };
    }
    observe(uid) {
        return new rxjs_1.Observable((observer) => 
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.bubbleRef(uid).onSnapshot((doc) => observer.next(doc.data()), (err) => observer.error(err)));
    }
}
exports.FirebaseBubbleAPI = FirebaseBubbleAPI;
