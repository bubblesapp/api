import {NewAlert} from './models/NewAlert';

export interface NewAlertsAPI {
  sendAlert(to: string[], message: string, uid?: string): Promise<void>;
  add(newAlert: NewAlert, uid?: string): Promise<string>;
  delete(id: string, uid?: string): Promise<void>;
}
