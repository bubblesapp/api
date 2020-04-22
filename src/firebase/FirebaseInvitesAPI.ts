import {Invite} from '../models';
import {InvitesAPI} from '../InvitesAPI';
import {FirestoreAPI} from './FirestoreAPI';
import {App, DocumentSnapshot, QuerySnapshot} from './FirestoreTypes';
import {IncomingInvitesAPI} from '../IncomingInvitesAPI';
import {FirebaseIncomingInvitesAPI} from './FirebaseIncomingInvitesAPI';
import {OutgoingInvitesAPI} from '../OutgoingInvitesAPI';
import {FirebaseOutgoingInvitesAPI} from './FirebaseOutgoingInvitesAPI';
import {FirebaseEmailInvitesAPI} from './FirebaseEmailInvitesAPI';
import {EmailInvitesAPI} from '../EmailInvitesAPI';

export class FirebaseInvitesAPI extends FirestoreAPI implements InvitesAPI {
  constructor(app: App) {
    super(app);
  }
  public incoming: IncomingInvitesAPI = new FirebaseIncomingInvitesAPI(this.app);
  public outgoing: OutgoingInvitesAPI = new FirebaseOutgoingInvitesAPI(this.app);
  public email: EmailInvitesAPI = new FirebaseEmailInvitesAPI(this.app);
}
