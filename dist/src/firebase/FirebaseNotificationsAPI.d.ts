import { FirestoreAPI } from './FirestoreAPI';
import { NotificationsAPI } from '../NotificationsAPI';
import { Notification } from '../models';
import { FirebaseAPI } from './FirebaseAPI';
import { App } from './FirestoreTypes';
export declare class FirebaseNotificationsAPI extends FirestoreAPI implements NotificationsAPI {
    private parentAPI;
    constructor(app: App, parentAPI: FirebaseAPI);
    newInvite: (fromUid: string, toUid: string) => Promise<void>;
    notifyIfAllowed: (uid: string, notification: Notification) => Promise<void>;
}
