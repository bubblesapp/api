import { InvitesAPI } from '../InvitesAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { App } from './FirestoreTypes';
import { IncomingInvitesAPI } from '../IncomingInvitesAPI';
import { OutgoingInvitesAPI } from '../OutgoingInvitesAPI';
import { EmailInvitesAPI } from '../EmailInvitesAPI';
export declare class FirebaseInvitesAPI extends FirestoreAPI implements InvitesAPI {
    constructor(app: App);
    incoming: IncomingInvitesAPI;
    outgoing: OutgoingInvitesAPI;
    email: EmailInvitesAPI;
}
