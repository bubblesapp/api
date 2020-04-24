"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseEmailInvitesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor() {
        super(...arguments);
        this.add = async (invite, id) => {
            let ref;
            if (id) {
                ref = this.emailInvitesRef().doc(id);
            }
            else {
                ref = this.emailInvitesRef().doc();
            }
            await ref.set(invite);
            return ref.id;
        };
        this.exists = async (fromUid, toEmail) => {
            const query = await this.emailInviteQuery(fromUid, toEmail).get();
            return query.size > 0;
        };
        this.delete = async (fromUid, toEmail) => {
            const query = await this.emailInviteQuery(fromUid, toEmail).get();
            if (query.size === 0) {
                throw `Failed to delete email invite from ${fromUid}
            to email ${toEmail}. Invite not found.`;
            }
            await query.docs.pop().ref.delete();
        };
        this.list = async (toEmail) => {
            const querySnapshot = await this.emailInvitesRef().where('to', '==', toEmail).get();
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return querySnapshot.docs.map((doc) => doc.data());
        };
        this.waitUntilDeleted = async (fromUid, toEmail) => {
            const predicate = (qs) => qs.size === 0;
            const snap = await this.waitUntilQuery(this.emailInviteQuery(fromUid, toEmail), predicate);
            return snap.size === 0;
        };
    }
}
exports.FirebaseEmailInvitesAPI = FirebaseEmailInvitesAPI;
