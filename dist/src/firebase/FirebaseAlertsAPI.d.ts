import { AlertsAPI } from '../AlertsAPI';
import { Alert } from '../models';
import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Observable } from 'rxjs';
export declare class FirebaseAlertsAPI extends FirestoreAPI implements AlertsAPI {
    constructor(app: App);
    protected alertsRef: (uid?: string) => CollectionReference;
    protected alertRef: (id: string, uid?: string) => DocumentReference;
    observeAll: (uid?: string) => Observable<Alert[]>;
    get: (id: string, uid?: string) => Promise<Alert>;
    set: (alert: Alert, uid?: string) => Promise<void>;
    delete: (id: string, uid?: string) => Promise<void>;
    exists: (id: string, uid?: string) => Promise<boolean>;
    waitUntilExists: (id: string, uid?: string) => Promise<boolean>;
    waitUntilDeleted: (id: string, uid?: string) => Promise<boolean>;
}
