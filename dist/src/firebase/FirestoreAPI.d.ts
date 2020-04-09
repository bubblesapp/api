import { App, CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot } from './FirestoreTypes';
export declare abstract class FirestoreAPI {
    protected app: App;
    protected constructor(app: App);
    protected waitUntilDocument: (documentReference: DocumentReference, predicate?: (snap: DocumentSnapshot) => boolean) => Promise<DocumentSnapshot>;
    protected waitUntilQuery: (queryReference: Query, predicate: (snap: QuerySnapshot) => boolean) => Promise<QuerySnapshot>;
    protected usersRef: () => CollectionReference;
    protected userRef: (uid: string) => DocumentReference;
    protected friendsRef: (ofUid: string) => CollectionReference;
    protected friendRef: (friendUid: string, ofUid: string) => DocumentReference;
    protected incomingInvitesRef: (toUid: string) => CollectionReference;
    protected incomingInviteRef: (toUid: string, fromUid: string) => DocumentReference;
    protected outgoingInvitesRef: (fromUid: string) => CollectionReference;
    protected outgoingInviteQuery: (fromUid: string, toEmail: string) => Query;
    protected emailInvitesRef: () => CollectionReference;
    protected emailInviteQuery: (fromUid: string, toEmail: string) => Query;
    protected profilesRef: () => CollectionReference;
    protected profileRef: (uid: string) => DocumentReference;
    protected bubblesRef: () => CollectionReference;
    protected bubbleRef: (uid: string) => DocumentReference;
    protected devicesRef: (uid: string) => CollectionReference;
    protected deviceRef: (uid: string, id: string) => DocumentReference;
}
