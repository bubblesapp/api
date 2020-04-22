import { Device } from './models';
export interface DevicesAPI {
    get(id: string, uid?: string): Promise<Device>;
    list(uid?: string): Promise<Device[]>;
    set(device: Device, uid?: string): Promise<void>;
    delete(id: string, uid?: string): Promise<void>;
}
