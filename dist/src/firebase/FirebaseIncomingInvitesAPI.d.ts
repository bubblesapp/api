import { FirestoreAPI } from './FirestoreAPI';
import { IncomingInvitesAPI } from '../IncomingInvitesAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Invite } from '../models';
import { Observable } from 'rxjs';
export declare class FirebaseIncomingInvitesAPI extends FirestoreAPI implements IncomingInvitesAPI {
    constructor(app: App);
    protected incomingInvitesRef: (toUid?: string) => CollectionReference;
    protected incomingInviteRef: (fromUid: string, toUid?: string) => DocumentReference;
    observeAll: (toUid?: string) => Observable<Invite[]>;
    set: (invite: Invite, toUid?: string) => Promise<void>;
    delete: (fromUid: string, toUid?: string) => Promise<void>;
    exists: (fromUid: string, toUid?: string) => Promise<boolean>;
    accept: (fromUid: string, toUid?: string) => Promise<void>;
    waitUntilExists: (fromUid: string, toUid?: string) => Promise<boolean>;
    waitUntilDeleted: (fromUid: string, toUid?: string) => Promise<boolean>;
}
