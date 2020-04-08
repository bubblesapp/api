import { FirestoreAPI } from './FirestoreAPI';
import { Firestore } from './FirestoreTypes';
import { Device } from '../models';
import { DevicesAPI } from '../DevicesAPI';
export declare class FirebaseDevicesAPI extends FirestoreAPI implements DevicesAPI {
    constructor(firestore: Firestore);
    get: (uid: string, id: string) => Promise<Device>;
    list: (uid: string) => Promise<Device[]>;
    delete: (uid: string, id: string) => Promise<void>;
}
