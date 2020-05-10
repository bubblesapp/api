import {Alert} from './models';
import {Observable} from 'rxjs';

export interface AlertsAPI {
  observeAll(uid?: string): Observable<Alert[]>;
  get(id: string, uid?: string): Promise<Alert>;
  set(alert: Alert, uid?: string): Promise<void>;
  delete(id: string, uid?: string): Promise<void>;
  exists(id: string, uid?: string): Promise<boolean>;
  waitUntilExists(id: string, uid?: string): Promise<boolean>;
  waitUntilDeleted(id: string, uid?: string): Promise<boolean>;
}
