"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseDevicesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.get = async (uid, id) => {
            const snap = await this.deviceRef(uid, id).get();
            return snap.exists ? snap.data() : undefined;
        };
        this.list = async (uid) => {
            const docs = await this.devicesRef(uid).listDocuments();
            const snaps = await Promise.all(docs.map((doc) => doc.get()));
            return snaps.map((snap) => snap.data());
        };
        this.delete = async (uid, id) => {
            await this.deviceRef(uid, id).delete();
        };
    }
}
exports.FirebaseDevicesAPI = FirebaseDevicesAPI;
