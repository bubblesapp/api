import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { NewAlertsAPI } from '../NewAlertsAPI';
import { NewAlert } from '../models';
export declare class FirebaseNewAlertsAPI extends FirestoreAPI implements NewAlertsAPI {
    constructor(app: App);
    protected newAlertsRef: (uid?: string) => CollectionReference;
    protected newAlertRef: (id: string, uid?: string) => DocumentReference;
    sendAlert: (to: string[], message: string, uid?: string) => Promise<void>;
    add: (newAlert: NewAlert, uid?: string) => Promise<string>;
    delete: (id: string, uid?: string) => Promise<void>;
}
