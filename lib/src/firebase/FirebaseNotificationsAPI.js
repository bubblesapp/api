"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const models_1 = require("../models");
class FirebaseNotificationsAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(firestore, messaging, parentAPI) {
        super(firestore);
        this.messaging = messaging;
        this.parentAPI = parentAPI;
        this.newInvite = async (fromUid, toUid) => {
            const profile = await this.parentAPI.profiles.get(toUid);
            const newInviteNotification = new models_1.NewInviteNotification(profile);
            await this.notifyIfAllowed(toUid, newInviteNotification);
        };
        this.notifyIfAllowed = async (uid, notification) => {
            var _a, _b;
            // TODO: Use Message and sendMessage to provide platform specific experience
            /* const message: Message = {
              token: toToken,
              notification: {
                title: notification.title,
                body: notification.text,
                badge: notification.iOSBadge?.toString(),
              }
            } */
            const payload = {
                notification: {
                    title: notification.title,
                    body: notification.text,
                    badge: (_b = (_a = notification.iOSBadge) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '0',
                },
            };
            const profile = await this.parentAPI.profiles.get(uid);
            if (profile.pushNotificationsEnabled) {
                const devices = await this.parentAPI.devices.list(uid);
                const tokens = devices.map((device) => device.token);
                const result = await this.messaging.sendToDevice(tokens, payload);
                // Cleanup invalid devices
                await Promise.all(result.results.map((result, index) => {
                    if (result.error) {
                        if (result.error.code === 'messaging/invalid-registration-token' ||
                            result.error.code === 'messaging/registration-token-not-registered') {
                            return this.deviceRef(uid, devices[index].id).delete();
                        }
                    }
                }));
            }
            if (profile.emailNotificationsEnabled) {
                //TODO: Send email notification
            }
        };
    }
}
exports.FirebaseNotificationsAPI = FirebaseNotificationsAPI;
