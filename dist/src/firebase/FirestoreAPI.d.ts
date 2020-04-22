import { App, CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot } from './FirestoreTypes';
export declare abstract class FirestoreAPI {
    protected app: App;
    protected constructor(app: App);
    private static isClientAuth;
    protected uid: () => string;
    protected waitUntilDocument: (documentReference: DocumentReference, predicate?: (snap: DocumentSnapshot) => boolean) => Promise<DocumentSnapshot>;
    protected waitUntilQuery: (queryReference: Query, predicate: (snap: QuerySnapshot) => boolean) => Promise<QuerySnapshot>;
    protected usersRef: () => CollectionReference;
    protected userRef: (uid?: string) => DocumentReference;
    protected emailInvitesRef: () => CollectionReference;
    protected emailInviteQuery: (fromUid: string, toEmail: string) => Query;
    protected bubblesRef: () => CollectionReference;
    protected bubbleRef: (uid?: string) => DocumentReference;
    protected devicesRef: (uid?: string) => CollectionReference;
    protected deviceRef: (id: string, uid?: string) => DocumentReference;
}
