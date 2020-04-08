import {FirebaseProfilesAPI} from './FirebaseProfilesAPI';
import {API} from '../API';
import {FirebaseFriendsAPI} from './FirebaseFriendsAPI';
import {FirebaseInvitesAPI} from './FirebaseInvitesAPI';
import {App} from './FirestoreTypes';
import {FirebaseBubbleAPI} from './FirebaseBubbleAPI';
import {FirestoreAPI} from './FirestoreAPI';
import {FirebaseDevicesAPI} from './FirebaseDevicesAPI';
import {FirebaseNotificationsAPI} from './FirebaseNotificationsAPI';

export class FirebaseAPI extends FirestoreAPI implements API {
  constructor(
    public app: App,
    public profiles = new FirebaseProfilesAPI(app),
    public friends = new FirebaseFriendsAPI(app),
    public invites = new FirebaseInvitesAPI(app),
    public bubble = new FirebaseBubbleAPI(app),
    public devices = new FirebaseDevicesAPI(app),
  ) {
    super(app);
    this.notifications = new FirebaseNotificationsAPI(app, this);
  }

  public notifications: FirebaseNotificationsAPI;

  wait = async (milliseconds: number): Promise<void> =>
    await new Promise((res) => {
      setTimeout(() => res(), milliseconds);
    });

  destroy = async (): Promise<void> =>
    await this.app.delete();
}
