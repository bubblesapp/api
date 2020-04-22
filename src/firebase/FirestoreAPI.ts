import {
  App,
  Auth,
  ClientAuth,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  Query,
  QuerySnapshot,
} from './FirestoreTypes';

export abstract class FirestoreAPI {
  protected constructor(protected app: App) {}

  private static isClientAuth(auth: Auth): auth is ClientAuth {
    return !!(auth as ClientAuth).currentUser;
  }

  protected uid = (): string | undefined => {
    const auth = this.app.auth();
    if (FirestoreAPI.isClientAuth(auth)) {
      return auth.currentUser?.uid;
    }
  };

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

  protected userRef = (uid: string = this.uid()): DocumentReference => this.usersRef().doc(uid);

  protected emailInvitesRef = (): CollectionReference =>
    this.app.firestore().collection('emailInvites');

  protected emailInviteQuery = (fromUid: string = this.uid(), toEmail: string): Query =>
    this.emailInvitesRef().where('from', '==', fromUid).where('to', '==', toEmail);


  protected bubblesRef = (): CollectionReference => this.app.firestore().collection('bubbles');

  protected bubbleRef = (uid: string = this.uid()): DocumentReference => this.bubblesRef().doc(uid);

  protected devicesRef = (uid?: string): CollectionReference =>
    this.userRef(uid).collection('devices');

  protected deviceRef = (id: string, uid?: string): DocumentReference =>
    this.devicesRef(uid).doc(id);
}
