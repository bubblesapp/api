import { Invite } from './models';
import { Observable } from 'rxjs';
export interface OutgoingInvitesAPI {
    observeAll(fromUid?: string): Observable<Invite[]>;
    add(invite: Invite): Promise<string>;
    exists(toEmail: string, fromUid?: string): Promise<boolean>;
    delete(toEmail: string, fromUid?: string): Promise<void>;
    waitUntilDeleted(toEmail: string, fromUid?: string): Promise<boolean>;
}
