"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirestoreAPI {
    constructor(firestore) {
        this.firestore = firestore;
        this.waitUntilDocument = async (documentReference, predicate = (snap) => snap.exists) => {
            return await new Promise((res, rej) => {
                const unsubscribe = documentReference.onSnapshot((snap) => {
                    if (predicate(snap)) {
                        unsubscribe();
                        res(snap);
                    }
                }, (err) => {
                    rej(err);
                });
            });
        };
        this.waitUntilQuery = async (queryReference, predicate) => {
            return await new Promise((res, rej) => {
                const unsubscribe = queryReference.onSnapshot((snap) => {
                    if (predicate(snap)) {
                        unsubscribe();
                        res(snap);
                    }
                }, (err) => {
                    rej(err);
                });
            });
        };
        this.usersRef = () => this.firestore.collection('users');
        this.userRef = (uid) => this.usersRef().doc(uid);
        this.friendsRef = (ofUid) => this.userRef(ofUid).collection('friends');
        this.friendRef = (friendUid, ofUid) => this.friendsRef(ofUid).doc(friendUid);
        this.incomingInvitesRef = (toUid) => this.userRef(toUid).collection('incomingInvites');
        this.incomingInviteRef = (toUid, fromUid) => this.incomingInvitesRef(toUid).doc(fromUid);
        this.outgoingInvitesRef = (fromUid) => this.userRef(fromUid).collection('outgoingInvites');
        this.outgoingInviteQuery = (fromUid, toEmail) => this.outgoingInvitesRef(fromUid).where('to', '==', toEmail);
        this.emailInvitesRef = () => this.firestore.collection('emailInvites');
        this.emailInviteQuery = (fromUid, toEmail) => this.emailInvitesRef().where('from', '==', fromUid).where('to', '==', toEmail);
        this.profilesRef = () => this.firestore.collection('profiles');
        this.profileRef = (uid) => this.profilesRef().doc(uid);
        this.bubblesRef = () => this.firestore.collection('bubbles');
        this.bubbleRef = (uid) => this.bubblesRef().doc(uid);
        this.devicesRef = (uid) => this.userRef(uid).collection('devices');
        this.deviceRef = (uid, id) => this.devicesRef(uid).doc(id);
    }
}
exports.FirestoreAPI = FirestoreAPI;
