import { Profile } from './Profile';
import { Notification } from './Notification';
export declare class NewInviteNotification implements Notification {
    iOSBadge: number;
    constructor(from: Profile, iOSBadge?: number);
    title: string;
    text: string;
}
