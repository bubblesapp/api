import { NewAlert } from './models/NewAlert';
export interface NewAlertsAPI {
    add(newAlert: NewAlert, uid?: string): Promise<string>;
    delete(id: string, uid?: string): Promise<void>;
}
