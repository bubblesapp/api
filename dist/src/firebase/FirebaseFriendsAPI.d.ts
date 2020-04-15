import { FriendsAPI } from '../FriendsAPI';
import { Friend } from '../models';
import { FirestoreAPI } from './FirestoreAPI';
import { App } from './FirestoreTypes';
export declare class FirebaseFriendsAPI extends FirestoreAPI implements FriendsAPI {
    constructor(app: App);
    get: (friendUid: string, ofUid: string) => Promise<Friend>;
    set: (friend: Friend, ofUid: string) => Promise<void>;
    delete: (friendUid: string, ofUid: string) => Promise<void>;
    exists: (friendUid: string, ofUid: string) => Promise<boolean>;
    waitUntilExists: (friendUid: string, ofUid: string) => Promise<boolean>;
    waitUntilDeleted: (friendUid: string, ofUid: string) => Promise<boolean>;
}
