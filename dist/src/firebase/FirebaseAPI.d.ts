import { FirebaseProfilesAPI } from './FirebaseProfilesAPI';
import { API } from '../API';
import { FirebaseFriendsAPI } from './FirebaseFriendsAPI';
import { FirebaseInvitesAPI } from './FirebaseInvitesAPI';
import { App } from './FirestoreTypes';
import { FirebaseBubbleAPI } from './FirebaseBubbleAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { FirebaseDevicesAPI } from './FirebaseDevicesAPI';
import { FirebaseNotificationsAPI } from './FirebaseNotificationsAPI';
import { FirebaseAlertsAPI } from './FirebaseAlertsAPI';
import { FirebaseNewAlertsAPI } from './FirebaseNewAlertsAPI';
export declare class FirebaseAPI extends FirestoreAPI implements API {
    app: App;
    alerts: FirebaseAlertsAPI;
    bubble: FirebaseBubbleAPI;
    devices: FirebaseDevicesAPI;
    friends: FirebaseFriendsAPI;
    invites: FirebaseInvitesAPI;
    newAlerts: FirebaseNewAlertsAPI;
    profiles: FirebaseProfilesAPI;
    constructor(app: App, alerts?: FirebaseAlertsAPI, bubble?: FirebaseBubbleAPI, devices?: FirebaseDevicesAPI, friends?: FirebaseFriendsAPI, invites?: FirebaseInvitesAPI, newAlerts?: FirebaseNewAlertsAPI, profiles?: FirebaseProfilesAPI);
    notifications: FirebaseNotificationsAPI;
    wait: (milliseconds: number) => Promise<void>;
    destroy: () => Promise<void>;
}
