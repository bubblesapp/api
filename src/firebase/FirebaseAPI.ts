import {FirebaseProfilesAPI} from './FirebaseProfilesAPI';
import {API} from '../API';
import {FirebaseFriendsAPI} from './FirebaseFriendsAPI';
import {FirebaseInvitesAPI} from './FirebaseInvitesAPI';
import {App} from './FirestoreTypes';
import {FirebaseBubbleAPI} from './FirebaseBubbleAPI';
import {FirestoreAPI} from './FirestoreAPI';
import {FirebaseDevicesAPI} from './FirebaseDevicesAPI';
import {FirebaseNotificationsAPI} from './FirebaseNotificationsAPI';
import {FirebaseAlertsAPI} from './FirebaseAlertsAPI';
import {FirebaseNewAlertsAPI} from './FirebaseNewAlertsAPI';

export class FirebaseAPI extends FirestoreAPI implements API {
  constructor(
    public app: App,
    public alerts = new FirebaseAlertsAPI(app),
    public bubble = new FirebaseBubbleAPI(app),
    public devices = new FirebaseDevicesAPI(app),
    public friends = new FirebaseFriendsAPI(app),
    public invites = new FirebaseInvitesAPI(app),
    public newAlerts = new FirebaseNewAlertsAPI(app),
    public profiles = new FirebaseProfilesAPI(app),
  ) {
    super(app);
    this.notifications = new FirebaseNotificationsAPI(app, this);
  }

  public notifications: FirebaseNotificationsAPI;

  wait = async (milliseconds: number): Promise<void> =>
    await new Promise((res) => {
      setTimeout(() => res(), milliseconds);
    });

  destroy = async (): Promise<void> => await this.app.delete();
}
