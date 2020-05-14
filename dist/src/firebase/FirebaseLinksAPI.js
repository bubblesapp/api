"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseLinksAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.linksRef = () => this.app.firestore().collection('links');
        this.linkRef = (uid) => this.linksRef().doc(uid !== null && uid !== void 0 ? uid : this.uid());
        this.observe = (uid) => {
            return new rxjs_1.Observable((observer) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.linkRef(uid).onSnapshot((doc) => observer.next(doc.data()), (err) => observer.error(err)));
        };
        this.get = async (uid) => {
            const snap = await this.linkRef(uid).get();
            return snap.data();
        };
        this.set = async (link, uid) => {
            await this.linkRef(uid).set(link);
        };
    }
}
exports.FirebaseLinksAPI = FirebaseLinksAPI;
