import {NewAlert} from './models';

export interface NewAlertsAPI {
  sendAlert(to: string[], message: string, uid?: string): Promise<string>;
  add(newAlert: NewAlert, uid?: string): Promise<string>;
  delete(id: string, uid?: string): Promise<void>;
}
