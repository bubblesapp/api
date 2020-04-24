"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreAPI_1 = require("./FirestoreAPI");
const FirebaseIncomingInvitesAPI_1 = require("./FirebaseIncomingInvitesAPI");
const FirebaseOutgoingInvitesAPI_1 = require("./FirebaseOutgoingInvitesAPI");
const FirebaseEmailInvitesAPI_1 = require("./FirebaseEmailInvitesAPI");
class FirebaseInvitesAPI extends FirestoreAPI_1.FirestoreAPI {
    constructor(app) {
        super(app);
        this.incoming = new FirebaseIncomingInvitesAPI_1.FirebaseIncomingInvitesAPI(this.app);
        this.outgoing = new FirebaseOutgoingInvitesAPI_1.FirebaseOutgoingInvitesAPI(this.app);
        this.email = new FirebaseEmailInvitesAPI_1.FirebaseEmailInvitesAPI(this.app);
        this.invite = async (email, fromUid) => {
            const uid = fromUid !== null && fromUid !== void 0 ? fromUid : this.uid();
            if (uid) {
                const invite = {
                    from: uid,
                    to: email,
                    accepted: false,
                    createdAt: new Date().getTime(),
                };
                const id = await this.outgoing.add(invite);
                await this.email.add(invite, id);
            }
        };
    }
}
exports.FirebaseInvitesAPI = FirebaseInvitesAPI;
