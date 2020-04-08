import { Invite } from '../models/Invite';
import { InvitesAPI } from '../InvitesAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { Firestore } from './FirestoreTypes';
export declare class FirebaseInvitesAPI extends FirestoreAPI implements InvitesAPI {
    constructor(firestore: Firestore);
    setIncoming: (toUid: string, invite: Invite) => Promise<void>;
    deleteIncoming: (toUid: string, fromUid: string) => Promise<void>;
    existsIncoming: (toUid: string, fromUid: string) => Promise<boolean>;
    addEmail: (invite: Invite) => Promise<string>;
    existsEmail: (fromUid: string, toEmail: string) => Promise<boolean>;
    deleteEmail: (fromUid: string, toEmail: string) => Promise<void>;
    listEmail: (toEmail: string) => Promise<Invite[]>;
    addOutgoing: (invite: Invite) => Promise<string>;
    existsOutgoing: (fromUid: string, toEmail: string) => Promise<boolean>;
    deleteOutgoing: (fromUid: string, toEmail: string) => Promise<void>;
    accept: (toUid: string, fromUid: string) => Promise<void>;
    waitUntilIncomingExists: (toUid: string, fromUid: string) => Promise<boolean>;
    waitUntilOutgoingDeleted: (fromUid: string, toEmail: string) => Promise<boolean>;
    waitUntilEmailDeleted: (fromUid: string, toEmail: string) => Promise<boolean>;
    waitUntilIncomingDeleted: (toUid: string, fromUid: string) => Promise<boolean>;
}
