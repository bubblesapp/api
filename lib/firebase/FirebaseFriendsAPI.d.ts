import { FriendsAPI } from '../FriendsAPI';
import { Friend } from '../models/Friend';
import { FirestoreAPI } from './FirestoreAPI';
import { Firestore } from './FirestoreTypes';
export declare class FirebaseFriendsAPI extends FirestoreAPI implements FriendsAPI {
    constructor(firestore: Firestore);
    get: (friendUid: string, ofUid: string) => Promise<Friend>;
    set: (friend: Friend, ofUid: string) => Promise<void>;
    delete: (friendUid: string, ofUid: string) => Promise<void>;
    exists: (friendUid: string, ofUid: string) => Promise<boolean>;
    waitUntilExists: (friendUid: string, ofUid: string) => Promise<boolean>;
    waitUntilDeleted: (friendUid: string, ofUid: string) => Promise<boolean>;
}
