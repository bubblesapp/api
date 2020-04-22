import { Profile } from '../models';
import { ProfilesAPI } from '../ProfilesAPI';
import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Observable } from 'rxjs';
export declare class FirebaseProfilesAPI extends FirestoreAPI implements ProfilesAPI {
    constructor(app: App);
    protected profilesRef: () => CollectionReference;
    protected profileRef: (uid?: string) => DocumentReference;
    get: (uid?: string) => Promise<Profile>;
    observe: (uid?: string) => Observable<Profile>;
    set: (profile: Profile) => Promise<void>;
    update: (changes: Partial<Profile>, uid?: string) => Promise<void>;
    delete: (uid?: string) => Promise<void>;
    uidWihEmail: (email: string) => Promise<string>;
}
