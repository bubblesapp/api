import { FriendsAPI } from '../FriendsAPI';
import { Friend } from '../models';
import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Observable } from 'rxjs';
export declare class FirebaseFriendsAPI extends FirestoreAPI implements FriendsAPI {
    constructor(app: App);
    protected friendsRef: (ofUid?: string) => CollectionReference;
    protected friendRef: (friendUid: string, ofUid?: string) => DocumentReference;
    observeAll: (ofUid?: string) => Observable<Friend[]>;
    get: (friendUid: string, ofUid?: string) => Promise<Friend>;
    set: (friend: Friend, ofUid?: string) => Promise<void>;
    update: (changes: Partial<Friend>, friendUid: string, ofUid?: string) => Promise<void>;
    delete: (friendUid: string, ofUid?: string) => Promise<void>;
    exists: (friendUid: string, ofUid?: string) => Promise<boolean>;
    waitUntilExists: (friendUid: string, ofUid?: string) => Promise<boolean>;
    waitUntilDeleted: (friendUid: string, ofUid?: string) => Promise<boolean>;
    setLastMet: (friendUid: string, lastMet?: number, ofUid?: string) => Promise<void>;
}
