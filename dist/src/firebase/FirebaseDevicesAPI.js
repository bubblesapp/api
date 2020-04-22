"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseDevicesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.get = async (id, uid) => {
            const snap = await this.deviceRef(id, uid).get();
            return snap.exists ? snap.data() : undefined;
        };
        this.set = async (device, uid) => {
            await this.deviceRef(device.id, uid).set(device);
        };
        this.list = async (uid) => {
            const docs = await this.devicesRef(uid).listDocuments();
            const snaps = await Promise.all(docs.map((doc) => doc.get()));
            return snaps.map((snap) => snap.data());
        };
        this.delete = async (id, uid) => {
            await this.deviceRef(id, uid).delete();
        };
    }
}
exports.FirebaseDevicesAPI = FirebaseDevicesAPI;
