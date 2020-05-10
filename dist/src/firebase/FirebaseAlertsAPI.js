"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseAlertsAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.alertsRef = (uid) => this.userRef(uid).collection('alerts');
        this.alertRef = (id, uid) => this.alertsRef(uid).doc(id);
        this.observeAll = (uid) => {
            return new rxjs_1.Observable((observer) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.alertsRef(uid).onSnapshot((qs) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc) => doc.data())), (err) => observer.error(err), () => observer.complete()));
        };
        this.get = async (id, uid) => {
            const doc = await this.alertRef(id, uid).get();
            return doc.exists ? doc.data() : undefined;
        };
        this.set = async (alert, uid) => {
            await this.alertRef(alert.id, uid).set(alert);
        };
        this.delete = async (id, uid) => {
            await this.alertRef(id, uid).delete();
        };
        this.exists = async (id, uid) => !!(await this.get(id, uid));
        this.waitUntilExists = async (id, uid) => {
            const snap = await this.waitUntilDocument(this.alertRef(id, uid));
            return snap.data().id === id;
        };
        this.waitUntilDeleted = async (id, uid) => {
            const predicate = (ds) => !ds.exists;
            const snap = await this.waitUntilDocument(this.alertRef(id, uid), predicate);
            return !snap.exists;
        };
    }
}
exports.FirebaseAlertsAPI = FirebaseAlertsAPI;
