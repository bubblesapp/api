"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
class FirebaseInvitesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(firestore) {
        super(firestore);
        this.setIncoming = async (toUid, invite) => {
            await this.incomingInviteRef(toUid, invite.from).set(invite);
        };
        this.deleteIncoming = async (toUid, fromUid) => {
            await this.incomingInviteRef(toUid, fromUid).delete();
        };
        this.existsIncoming = async (toUid, fromUid) => {
            const existingInvite = await this.incomingInviteRef(toUid, fromUid).get();
            return existingInvite.exists;
        };
        this.addEmail = async (invite) => {
            const ref = await this.emailInvitesRef().add(invite);
            return ref.id;
        };
        this.existsEmail = async (fromUid, toEmail) => {
            const query = await this.emailInviteQuery(fromUid, toEmail).get();
            return query.size > 0;
        };
        this.deleteEmail = async (fromUid, toEmail) => {
            const query = await this.emailInviteQuery(fromUid, toEmail).get();
            if (query.size === 0) {
                throw `Failed to delete email invite from ${fromUid}
            to email ${toEmail}. Invite not found.`;
            }
            await query.docs.pop().ref.delete();
        };
        this.listEmail = async (toEmail) => {
            const querySnapshot = await this.emailInvitesRef().where('to', '==', toEmail).get();
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return querySnapshot.docs.map((doc) => doc.data());
        };
        this.addOutgoing = async (invite) => {
            const ref = await this.outgoingInvitesRef(invite.from).add(invite);
            return ref.id;
        };
        this.existsOutgoing = async (fromUid, toEmail) => {
            const query = await this.outgoingInvitesRef(fromUid).where('to', '==', toEmail).get();
            return query.size > 0;
        };
        this.deleteOutgoing = async (fromUid, toEmail) => {
            const query = await this.outgoingInviteQuery(fromUid, toEmail).get();
            if (query.size === 0) {
                throw `Failed to delete outgoing invite in ${fromUid}
            to email ${toEmail}. Invite not found.`;
            }
            await query.docs.pop().ref.delete();
        };
        this.accept = async (toUid, fromUid) => {
            await this.incomingInviteRef(toUid, fromUid).update({ accepted: true });
        };
        this.waitUntilIncomingExists = async (toUid, fromUid) => {
            const snap = await this.waitUntilDocument(this.incomingInviteRef(toUid, fromUid));
            return snap.data().from === fromUid;
        };
        this.waitUntilOutgoingDeleted = async (fromUid, toEmail) => {
            const predicate = (qs) => qs.size === 0;
            const snap = await this.waitUntilQuery(this.outgoingInviteQuery(fromUid, toEmail), predicate);
            return snap.size === 0;
        };
        this.waitUntilEmailDeleted = async (fromUid, toEmail) => {
            const predicate = (qs) => qs.size === 0;
            const snap = await this.waitUntilQuery(this.emailInviteQuery(fromUid, toEmail), predicate);
            return snap.size === 0;
        };
        this.waitUntilIncomingDeleted = async (toUid, fromUid) => {
            const predicate = (ds) => !ds.exists;
            const snap = await this.waitUntilDocument(this.incomingInviteRef(toUid, fromUid), predicate);
            return !snap.exists;
        };
    }
}
exports.FirebaseInvitesAPI = FirebaseInvitesAPI;
