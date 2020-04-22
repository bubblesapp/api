"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseOutgoingInvitesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.outgoingInvitesRef = (fromUid = this.uid()) => this.userRef(fromUid).collection('outgoingInvites');
        this.outgoingInviteQuery = (fromUid = this.uid(), toEmail) => this.outgoingInvitesRef(fromUid).where('to', '==', toEmail);
        this.observeAll = (fromUid) => {
            return new rxjs_1.Observable((observer) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.outgoingInvitesRef(fromUid).onSnapshot((qs) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc) => doc.data())), (err) => observer.error(err), () => observer.complete()));
        };
        this.add = async (invite) => {
            const ref = await this.outgoingInvitesRef(invite.from).add(invite);
            return ref.id;
        };
        this.exists = async (toEmail, fromUid = this.uid()) => {
            const query = await this.outgoingInvitesRef(fromUid).where('to', '==', toEmail).get();
            return query.size > 0;
        };
        this.delete = async (fromUid, toEmail) => {
            const query = await this.outgoingInviteQuery(fromUid, toEmail).get();
            if (query.size === 0) {
                throw `Failed to delete outgoing invite in ${fromUid}
            to email ${toEmail}. Invite not found.`;
            }
            await query.docs.pop().ref.delete();
        };
        this.waitUntilDeleted = async (fromUid, toEmail) => {
            const predicate = (qs) => qs.size === 0;
            const snap = await this.waitUntilQuery(this.outgoingInviteQuery(fromUid, toEmail), predicate);
            return snap.size === 0;
        };
    }
}
exports.FirebaseOutgoingInvitesAPI = FirebaseOutgoingInvitesAPI;
