import {FirestoreAPI} from './FirestoreAPI';
import {NotificationsAPI} from '../NotificationsAPI';
import {NewInviteNotification, Notification} from '../models';
import admin from 'firebase-admin';
import {FirebaseAPI} from './FirebaseAPI';
import {App} from './FirestoreTypes';

export class FirebaseNotificationsAPI extends FirestoreAPI implements NotificationsAPI {
  constructor(app: App, private parentAPI: FirebaseAPI) {
    super(app);
  }

  newInvite = async (fromUid: string, toUid: string): Promise<void> => {
    const profile = await this.parentAPI.profiles.get(toUid);
    const newInviteNotification = new NewInviteNotification(profile);
    await this.notifyIfAllowed(toUid, newInviteNotification);
  };

  notifyIfAllowed = async (uid: string, notification: Notification): Promise<void> => {
    // TODO: Use Message and sendMessage to provide platform specific experience
    /* const message: Message = {
      token: toToken,
      notification: {
        title: notification.title,
        body: notification.text,
        badge: notification.iOSBadge?.toString(),
      }
    } */
    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: notification.title,
        body: notification.text,
        badge: notification.iOSBadge?.toString() ?? '0',
      },
    };
    const profile = await this.parentAPI.profiles.get(uid);
    if (profile.pushNotificationsEnabled) {
      const devices = await this.parentAPI.devices.list(uid);
      const tokens = devices.map((device) => device.token);
      const result = await (this.app as admin.app.App).messaging().sendToDevice(tokens, payload);
      // Cleanup invalid devices
      await Promise.all(
        result.results.map((result, index) => {
          if (result.error) {
            if (
              result.error.code === 'messaging/invalid-registration-token' ||
              result.error.code === 'messaging/registration-token-not-registered'
            ) {
              return this.deviceRef(uid, devices[index].id).delete() as Promise<void>;
            }
          }
        }),
      );
    }
    if (profile.emailNotificationsEnabled) {
      //TODO: Send email notification
    }
  };
}
