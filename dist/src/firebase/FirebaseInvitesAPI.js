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
    }
}
exports.FirebaseInvitesAPI = FirebaseInvitesAPI;
