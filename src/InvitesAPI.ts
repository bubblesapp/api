import {OutgoingInvitesAPI} from './OutgoingInvitesAPI';
import {IncomingInvitesAPI} from './IncomingInvitesAPI';
import {EmailInvitesAPI} from './EmailInvitesAPI';

export interface InvitesAPI {
  outgoing: OutgoingInvitesAPI;
  incoming: IncomingInvitesAPI;
  email: EmailInvitesAPI;
}
