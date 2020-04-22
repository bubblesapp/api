import {Friend} from './models';
import {Observable} from 'rxjs';

export interface FriendsAPI {
  observeAll(ofUid?: string): Observable<Friend[]>;
  get(friendUid: string, ofUid?: string): Promise<Friend>;
  set(friend: Friend, ofUid?: string): Promise<void>;
  update(changes: Partial<Friend>, friendUid: string, ofUid?: string): Promise<void>;
  delete(friendUid: string, ofUid?: string): Promise<void>;
  exists(friendUid: string, ofUid?: string): Promise<boolean>;
  waitUntilExists(friendUid: string, ofUid?: string): Promise<boolean>;
  waitUntilDeleted(friendUid: string, ofUid?: string): Promise<boolean>;
  setLastMet(friendUid: string, lastMet?: number, ofUid?: string): Promise<void>;
}
