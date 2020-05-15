import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Config } from '../models/Config';
import { Observable } from 'rxjs';
import { ConfigAPI } from '../ConfigAPI';
export declare class FirebaseConfigAPI extends FirestoreAPI implements ConfigAPI {
    constructor(app: App);
    protected configsRef: () => CollectionReference;
    protected configRef: (name: string) => DocumentReference;
    observe: (name: string) => Observable<Config>;
    get: (name: string) => Promise<Config>;
}
