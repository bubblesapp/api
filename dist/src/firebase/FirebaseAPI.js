"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseProfilesAPI_1 = require("./FirebaseProfilesAPI");
const FirebaseFriendsAPI_1 = require("./FirebaseFriendsAPI");
const FirebaseInvitesAPI_1 = require("./FirebaseInvitesAPI");
const FirebaseBubbleAPI_1 = require("./FirebaseBubbleAPI");
const FirestoreAPI_1 = require("./FirestoreAPI");
const FirebaseDevicesAPI_1 = require("./FirebaseDevicesAPI");
const FirebaseNotificationsAPI_1 = require("./FirebaseNotificationsAPI");
const FirebaseAlertsAPI_1 = require("./FirebaseAlertsAPI");
const FirebaseNewAlertsAPI_1 = require("./FirebaseNewAlertsAPI");
const FirebaseLinksAPI_1 = require("./FirebaseLinksAPI");
const FirebaseConfigAPI_1 = require("./FirebaseConfigAPI");
class FirebaseAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app, alerts = new FirebaseAlertsAPI_1.FirebaseAlertsAPI(app), bubble = new FirebaseBubbleAPI_1.FirebaseBubbleAPI(app), config = new FirebaseConfigAPI_1.FirebaseConfigAPI(app), devices = new FirebaseDevicesAPI_1.FirebaseDevicesAPI(app), friends = new FirebaseFriendsAPI_1.FirebaseFriendsAPI(app), invites = new FirebaseInvitesAPI_1.FirebaseInvitesAPI(app), links = new FirebaseLinksAPI_1.FirebaseLinksAPI(app), newAlerts = new FirebaseNewAlertsAPI_1.FirebaseNewAlertsAPI(app), profiles = new FirebaseProfilesAPI_1.FirebaseProfilesAPI(app)) {
        super(app);
        this.app = app;
        this.alerts = alerts;
        this.bubble = bubble;
        this.config = config;
        this.devices = devices;
        this.friends = friends;
        this.invites = invites;
        this.links = links;
        this.newAlerts = newAlerts;
        this.profiles = profiles;
        this.wait = async (milliseconds) => await new Promise((res) => {
            setTimeout(() => res(), milliseconds);
        });
        this.destroy = async () => await this.app.delete();
        this.notifications = new FirebaseNotificationsAPI_1.FirebaseNotificationsAPI(app, this);
    }
}
exports.FirebaseAPI = FirebaseAPI;
