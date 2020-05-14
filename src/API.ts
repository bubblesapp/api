import {ProfilesAPI} from './ProfilesAPI';
import {FriendsAPI} from './FriendsAPI';
import {InvitesAPI} from './InvitesAPI';
import {BubbleAPI} from './BubbleAPI';
import {DevicesAPI} from './DevicesAPI';
import {NotificationsAPI} from './NotificationsAPI';
import {AlertsAPI} from './AlertsAPI';
import {NewAlertsAPI} from './NewAlertsAPI';
import {LinksAPI} from './LinksAPI';

export interface API {
  alerts: AlertsAPI;
  bubble: BubbleAPI;
  devices: DevicesAPI;
  friends: FriendsAPI;
  invites: InvitesAPI;
  newAlerts: NewAlertsAPI;
  notifications: NotificationsAPI;
  profiles: ProfilesAPI;
  links: LinksAPI;
  wait: (milliseconds: number) => Promise<void>;
  destroy: () => Promise<void>;
}
