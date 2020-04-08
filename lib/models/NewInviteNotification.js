"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("../i18n"));
class NewInviteNotification {
    constructor(from, iOSBadge = 0) {
        this.iOSBadge = iOSBadge;
        this.title = i18n_1.default.t('notifications.newInvite.title');
        this.text = i18n_1.default.t('notifications.newInvite.text').replace('$0', from.name);
    }
}
exports.NewInviteNotification = NewInviteNotification;
