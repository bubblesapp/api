"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import I18n from '../i18n';
class NewInviteNotification {
    constructor(from, iOSBadge = 0) {
        this.iOSBadge = iOSBadge;
        //this.title = I18n.t('notifications.newInvite.title');
        //this.text = I18n.t('notifications.newInvite.text').replace('$0', from.name);
    }
}
exports.NewInviteNotification = NewInviteNotification;
