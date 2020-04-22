"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirestoreAPI {
    constructor(app) {
        this.app = app;
        this.uid = () => {
            var _a;
            const auth = this.app.auth();
            if (FirestoreAPI.isClientAuth(auth)) {
                return (_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.uid;
            }
        };
        this.waitUntilDocument = async (documentReference, predicate = (snap) => snap.exists) => {
            return await new Promise((res, rej) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
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
        this.usersRef = () => this.app.firestore().collection('users');
        this.userRef = (uid = this.uid()) => this.usersRef().doc(uid);
        this.emailInvitesRef = () => this.app.firestore().collection('emailInvites');
        this.emailInviteQuery = (fromUid = this.uid(), toEmail) => this.emailInvitesRef().where('from', '==', fromUid).where('to', '==', toEmail);
        this.bubblesRef = () => this.app.firestore().collection('bubbles');
        this.bubbleRef = (uid = this.uid()) => this.bubblesRef().doc(uid);
        this.devicesRef = (uid) => this.userRef(uid).collection('devices');
        this.deviceRef = (id, uid) => this.devicesRef(uid).doc(id);
    }
    static isClientAuth(auth) {
        return !!auth.currentUser;
    }
}
exports.FirestoreAPI = FirestoreAPI;
