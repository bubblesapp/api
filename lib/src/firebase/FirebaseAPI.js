"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseProfilesAPI_1 = require("./FirebaseProfilesAPI");
const FirebaseFriendsAPI_1 = require("./FirebaseFriendsAPI");
const FirebaseInvitesAPI_1 = require("./FirebaseInvitesAPI");
const FirebaseBubbleAPI_1 = require("./FirebaseBubbleAPI");
const FirestoreAPI_1 = require("./FirestoreAPI");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const FirebaseDevicesAPI_1 = require("./FirebaseDevicesAPI");
const FirebaseNotificationsAPI_1 = require("./FirebaseNotificationsAPI");
class FirebaseAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(firestore, profiles = new FirebaseProfilesAPI_1.FirebaseProfilesAPI(firestore), friends = new FirebaseFriendsAPI_1.FirebaseFriendsAPI(firestore), invites = new FirebaseInvitesAPI_1.FirebaseInvitesAPI(firestore), bubble = new FirebaseBubbleAPI_1.FirebaseBubbleAPI(firestore), devices = new FirebaseDevicesAPI_1.FirebaseDevicesAPI(firestore)) {
        super(firestore);
        this.firestore = firestore;
        this.profiles = profiles;
        this.friends = friends;
        this.invites = invites;
        this.bubble = bubble;
        this.devices = devices;
        this.wait = async (milliseconds) => await new Promise((res) => {
            setTimeout(() => res(), milliseconds);
        });
        this.destroy = async () => await this.firestore.app.delete();
        this.notifications = new FirebaseNotificationsAPI_1.FirebaseNotificationsAPI(firebase_admin_1.default.firestore(), firebase_admin_1.default.messaging(), this);
    }
}
exports.FirebaseAPI = FirebaseAPI;
