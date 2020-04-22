import {Profile} from './models';
import {Observable} from 'rxjs';

export interface ProfilesAPI {
  get(uid?: string): Promise<Profile>;
  observe(uid?: string): Observable<Profile>;
  set(profile: Profile): Promise<void>;
  update(changes: Partial<Profile>): Promise<void>;
  delete(uid?: string): Promise<void>;
  uidWihEmail(email: string): Promise<string | undefined>;
}
