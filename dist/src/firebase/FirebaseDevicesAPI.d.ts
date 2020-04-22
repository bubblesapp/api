import { FirestoreAPI } from './FirestoreAPI';
import { App } from './FirestoreTypes';
import { Device } from '../models';
import { DevicesAPI } from '../DevicesAPI';
export declare class FirebaseDevicesAPI extends FirestoreAPI implements DevicesAPI {
    constructor(app: App);
    get: (id: string, uid?: string) => Promise<Device>;
    set: (device: Device, uid?: string) => Promise<void>;
    list: (uid?: string) => Promise<Device[]>;
    delete: (id: string, uid?: string) => Promise<void>;
}
