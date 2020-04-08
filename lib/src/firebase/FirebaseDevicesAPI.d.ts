import { FirestoreAPI } from './FirestoreAPI';
import { App } from './FirestoreTypes';
import { Device } from '../models';
import { DevicesAPI } from '../DevicesAPI';
export declare class FirebaseDevicesAPI extends FirestoreAPI implements DevicesAPI {
    constructor(app: App);
    get: (uid: string, id: string) => Promise<Device>;
    list: (uid: string) => Promise<Device[]>;
    delete: (uid: string, id: string) => Promise<void>;
}
