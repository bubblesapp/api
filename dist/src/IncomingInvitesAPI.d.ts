import { Invite } from './models';
import { Observable } from 'rxjs';
export interface IncomingInvitesAPI {
    observeAll(toUid?: string): Observable<Invite[]>;
    set(invite: Invite, toUid?: string): Promise<void>;
    delete(fromUid: string, toUid?: string): Promise<void>;
    exists(fromUid: string, toUid?: string): Promise<boolean>;
    accept(fromUid: string, toUid?: string): Promise<void>;
    waitUntilExists(fromUid: string, toUid?: string): Promise<boolean>;
    waitUntilDeleted(fromUid: string, toUid?: string): Promise<boolean>;
}
