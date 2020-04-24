import { FirestoreAPI } from './FirestoreAPI';
import { EmailInvitesAPI } from '../EmailInvitesAPI';
import { Invite } from '../models';
export declare class FirebaseEmailInvitesAPI extends FirestoreAPI implements EmailInvitesAPI {
    add: (invite: Invite, id?: string) => Promise<string>;
    exists: (fromUid: string, toEmail: string) => Promise<boolean>;
    delete: (fromUid: string, toEmail: string) => Promise<void>;
    list: (toEmail: string) => Promise<Invite[]>;
    waitUntilDeleted: (fromUid: string, toEmail: string) => Promise<boolean>;
}
