"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const rxjs_1 = require("rxjs");
class FirebaseIncomingInvitesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.incomingInvitesRef = (toUid) => this.userRef(toUid).collection('incomingInvites');
        this.incomingInviteRef = (fromUid, toUid) => this.incomingInvitesRef(toUid).doc(fromUid);
        this.observeAll = (toUid) => {
            return new rxjs_1.Observable((observer) => this.incomingInvitesRef(toUid)
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                .onSnapshot((qs) => 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc) => doc.data())), (err) => observer.error(err), () => observer.complete()));
        };
        this.set = async (invite, toUid) => {
            await this.incomingInviteRef(invite.from, toUid).set(invite);
        };
        this.delete = async (fromUid, toUid) => {
            await this.incomingInviteRef(fromUid, toUid).delete();
        };
        this.exists = async (fromUid, toUid) => {
            const existingInvite = await this.incomingInviteRef(fromUid, toUid).get();
            return existingInvite.exists;
        };
        this.accept = async (fromUid, toUid) => {
            await this.incomingInvitesRef(toUid).doc(fromUid).update({ accepted: true });
        };
        this.waitUntilExists = async (fromUid, toUid) => {
            const snap = await this.waitUntilDocument(this.incomingInviteRef(fromUid, toUid));
            return snap.data().from === fromUid;
        };
        this.waitUntilDeleted = async (fromUid, toUid) => {
            const snap = await this.waitUntilDocument(this.incomingInviteRef(fromUid, toUid), (ds) => !ds.exists);
            return !snap.exists;
        };
    }
}
exports.FirebaseIncomingInvitesAPI = FirebaseIncomingInvitesAPI;
