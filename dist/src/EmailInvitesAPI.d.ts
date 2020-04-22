import { Invite } from './models';
export interface EmailInvitesAPI {
    add(invite: Invite): Promise<string>;
    delete(fromUid: string, toEmail: string): Promise<void>;
    exists(fromUid: string, toEmail: string): Promise<boolean>;
    list(toEmail: string): Promise<Invite[]>;
    waitUntilDeleted(fromUid: string, toEmail: string): Promise<boolean>;
}
