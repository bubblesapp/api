import { FirestoreAPI } from './FirestoreAPI';
import { NotificationsAPI } from '../NotificationsAPI';
import { Notification } from '../models';
import admin from 'firebase-admin';
import { FirebaseAPI } from './FirebaseAPI';
export declare class FirebaseNotificationsAPI extends FirestoreAPI implements NotificationsAPI {
    private messaging;
    private parentAPI;
    constructor(firestore: admin.firestore.Firestore, messaging: admin.messaging.Messaging, parentAPI: FirebaseAPI);
    newInvite: (fromUid: string, toUid: string) => Promise<void>;
    notifyIfAllowed: (uid: string, notification: Notification) => Promise<void>;
}
