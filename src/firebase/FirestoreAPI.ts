import {
  App,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from './FirestoreTypes';

export abstract class FirestoreAPI {
  protected constructor(protected app: App) {}

  protected waitUntilDocument = async (
    documentReference: DocumentReference,
    predicate: (snap: DocumentSnapshot) => boolean = (snap: DocumentSnapshot): boolean =>
      snap.exists,
  ): Promise<DocumentSnapshot> => {
    return await new Promise((res, rej) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const unsubscribe = documentReference.onSnapshot(
        (snap: DocumentSnapshot) => {
          if (predicate(snap)) {
            unsubscribe();
            res(snap);
          }
        },
        (err: Error) => {
          rej(err);
        },
      );
    });
  };

  protected waitUntilQuery = async (
    queryReference: Query,
    predicate: (snap: QuerySnapshot) => boolean,
  ): Promise<QuerySnapshot> => {
    return await new Promise((res, rej) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const unsubscribe = queryReference.onSnapshot(
        (snap) => {
          if (predicate(snap)) {
            unsubscribe();
            res(snap);
          }
        },
        (err) => {
          rej(err);
        },
      );
    });
  };

  protected usersRef = (): CollectionReference => this.app.firestore().collection('users');

  protected userRef = (uid: string): DocumentReference => this.usersRef().doc(uid);

  protected friendsRef = (ofUid: string): CollectionReference =>
    this.userRef(ofUid).collection('friends');

  protected friendRef = (friendUid: string, ofUid: string): DocumentReference =>
    this.friendsRef(ofUid).doc(friendUid);

  protected incomingInvitesRef = (toUid: string): CollectionReference =>
    this.userRef(toUid).collection('incomingInvites');

  protected incomingInviteRef = (toUid: string, fromUid: string): DocumentReference =>
    this.incomingInvitesRef(toUid).doc(fromUid);

  protected outgoingInvitesRef = (fromUid: string): CollectionReference =>
    this.userRef(fromUid).collection('outgoingInvites');

  protected outgoingInviteQuery = (fromUid: string, toEmail: string): Query =>
    this.outgoingInvitesRef(fromUid).where('to', '==', toEmail);

  protected emailInvitesRef = (): CollectionReference =>
    this.app.firestore().collection('emailInvites');

  protected emailInviteQuery = (fromUid: string, toEmail: string): Query =>
    this.emailInvitesRef().where('from', '==', fromUid).where('to', '==', toEmail);

  protected profilesRef = (): CollectionReference => this.app.firestore().collection('profiles');

  protected profileRef = (uid: string): DocumentReference => this.profilesRef().doc(uid);

  protected bubblesRef = (): CollectionReference => this.app.firestore().collection('bubbles');

  protected bubbleRef = (uid: string): DocumentReference => this.bubblesRef().doc(uid);

  protected devicesRef = (uid: string): CollectionReference =>
    this.userRef(uid).collection('devices');

  protected deviceRef = (uid: string, id: string): DocumentReference =>
    this.devicesRef(uid).doc(id);
}
