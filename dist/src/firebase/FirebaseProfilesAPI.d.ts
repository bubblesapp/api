import { Profile } from '../models/Profile';
import { ProfilesAPI } from '../ProfilesAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { App } from './FirestoreTypes';
export declare class FirebaseProfilesAPI extends FirestoreAPI implements ProfilesAPI {
    constructor(app: App);
    get: (uid: string) => Promise<Profile>;
    set: (profile: Profile) => Promise<void>;
    delete: (uid: string) => Promise<void>;
    uidWihEmail: (email: string) => Promise<string>;
}
