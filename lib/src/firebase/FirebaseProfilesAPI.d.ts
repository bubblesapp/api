import { Profile } from '../models/Profile';
import { ProfilesAPI } from '../ProfilesAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { Firestore } from './FirestoreTypes';
export declare class FirebaseProfilesAPI extends FirestoreAPI implements ProfilesAPI {
    constructor(firestore: Firestore);
    get: (uid: string) => Promise<Profile>;
    set: (profile: Profile) => Promise<void>;
    delete: (uid: string) => Promise<void>;
    uidWihEmail: (email: string) => Promise<string>;
}
