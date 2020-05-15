"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseConfigAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.configsRef = () => this.app.firestore().collection('config');
        this.configRef = (name) => this.configsRef().doc(name);
        this.observe = (name) => {
            return new rxjs_1.Observable((observer) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.configRef(name).onSnapshot((doc) => observer.next(doc.data()), (err) => observer.error(err)));
        };
        this.get = async (name) => {
            const snap = await this.configRef(name).get();
            return snap.data();
        };
    }
}
exports.FirebaseConfigAPI = FirebaseConfigAPI;
