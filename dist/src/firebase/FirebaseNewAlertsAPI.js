"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseNewAlertsAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.newAlertsRef = (uid) => this.userRef(uid).collection('newAlerts');
        this.newAlertRef = (id, uid) => this.newAlertsRef(uid).doc(id);
        this.add = async (newAlert, uid) => {
            const ref = await this.newAlertsRef(uid).add(newAlert);
            return ref.id;
        };
        this.delete = async (id, uid) => {
            await this.newAlertRef(id, uid).delete();
        };
    }
}
exports.FirebaseNewAlertsAPI = FirebaseNewAlertsAPI;
