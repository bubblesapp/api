import { FirebaseProfilesAPI } from './FirebaseProfilesAPI';
import { API } from '../API';
import { FirebaseFriendsAPI } from './FirebaseFriendsAPI';
import { FirebaseInvitesAPI } from './FirebaseInvitesAPI';
import { Firestore } from './FirestoreTypes';
import { FirebaseBubbleAPI } from './FirebaseBubbleAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { FirebaseDevicesAPI } from './FirebaseDevicesAPI';
import { FirebaseNotificationsAPI } from './FirebaseNotificationsAPI';
export declare class FirebaseAPI extends FirestoreAPI implements API {
    firestore: Firestore;
    profiles: FirebaseProfilesAPI;
    friends: FirebaseFriendsAPI;
    invites: FirebaseInvitesAPI;
    bubble: FirebaseBubbleAPI;
    devices: FirebaseDevicesAPI;
    constructor(firestore: Firestore, profiles?: FirebaseProfilesAPI, friends?: FirebaseFriendsAPI, invites?: FirebaseInvitesAPI, bubble?: FirebaseBubbleAPI, devices?: FirebaseDevicesAPI);
    notifications: FirebaseNotificationsAPI;
    wait: (milliseconds: number) => Promise<void>;
    destroy: () => Promise<void>;
}
