"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseProfilesAPI_1 = require("./FirebaseProfilesAPI");
const FirebaseFriendsAPI_1 = require("./FirebaseFriendsAPI");
const FirebaseInvitesAPI_1 = require("./FirebaseInvitesAPI");
const FirebaseBubbleAPI_1 = require("./FirebaseBubbleAPI");
const FirestoreAPI_1 = require("./FirestoreAPI");
const FirebaseDevicesAPI_1 = require("./FirebaseDevicesAPI");
const FirebaseNotificationsAPI_1 = require("./FirebaseNotificationsAPI");
class FirebaseAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app, profiles = new FirebaseProfilesAPI_1.FirebaseProfilesAPI(app), friends = new FirebaseFriendsAPI_1.FirebaseFriendsAPI(app), invites = new FirebaseInvitesAPI_1.FirebaseInvitesAPI(app), bubble = new FirebaseBubbleAPI_1.FirebaseBubbleAPI(app), devices = new FirebaseDevicesAPI_1.FirebaseDevicesAPI(app)) {
        super(app);
        this.app = app;
        this.profiles = profiles;
        this.friends = friends;
        this.invites = invites;
        this.bubble = bubble;
        this.devices = devices;
        this.wait = async (milliseconds) => await new Promise((res) => {
            setTimeout(() => res(), milliseconds);
        });
        this.destroy = async () => await this.app.delete();
        this.notifications = new FirebaseNotificationsAPI_1.FirebaseNotificationsAPI(app, this);
    }
}
exports.FirebaseAPI = FirebaseAPI;
