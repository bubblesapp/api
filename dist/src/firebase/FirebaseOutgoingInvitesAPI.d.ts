import { FirestoreAPI } from './FirestoreAPI';
import { OutgoingInvitesAPI } from '../OutgoingInvitesAPI';
import { App, CollectionReference, Query } from './FirestoreTypes';
import { Invite } from '../models';
import { Observable } from 'rxjs';
export declare class FirebaseOutgoingInvitesAPI extends FirestoreAPI implements OutgoingInvitesAPI {
    constructor(app: App);
    protected outgoingInvitesRef: (fromUid?: string) => CollectionReference;
    protected outgoingInviteQuery: (toEmail: string, fromUid?: string) => Query;
    observeAll: (fromUid?: string) => Observable<Invite[]>;
    add: (invite: Invite) => Promise<string>;
    exists: (toEmail: string, fromUid?: string) => Promise<boolean>;
    delete: (toEmail: string, fromUid?: string) => Promise<void>;
    waitUntilDeleted: (toEmail: string, fromUid?: string) => Promise<boolean>;
}
