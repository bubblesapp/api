import {FriendsAPI} from '../FriendsAPI';
import {Friend} from '../models';
import {FirestoreAPI} from './FirestoreAPI';
import {
  App,
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from './FirestoreTypes';
import {Observable} from 'rxjs';

export class FirebaseFriendsAPI extends FirestoreAPI implements FriendsAPI {
  constructor(app: App) {
    super(app);
  }

  protected friendsRef = (ofUid?: string): CollectionReference =>
    this.userRef(ofUid).collection('friends');

  protected friendRef = (friendUid: string, ofUid?: string): DocumentReference =>
    this.friendsRef(ofUid).doc(friendUid);

  public observeAll = (ofUid?: string): Observable<Friend[]> => {
    return new Observable<Friend[]>((observer) =>
      this.friendsRef(ofUid)
        .orderBy('lastMet', 'desc')
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .onSnapshot(
          (qs: QuerySnapshot) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Friend)),
          (err: Error) => observer.error(err),
          () => observer.complete(),
        ),
    );
  };

  public get = async (friendUid: string, ofUid?: string): Promise<Friend | undefined> => {
    const doc = await this.friendRef(friendUid, ofUid).get();
    return doc.exists ? (doc.data() as Friend) : undefined;
  };

  public set = async (friend: Friend, ofUid?: string): Promise<void> => {
    await this.friendRef(friend.uid, ofUid).set(friend);
  };

  public update = async (
    changes: Partial<Friend>,
    friendUid: string,
    ofUid?: string,
  ): Promise<void> => {
    await this.friendRef(friendUid, ofUid).update(changes);
  };

  public delete = async (friendUid: string, ofUid?: string): Promise<void> => {
    await this.friendRef(friendUid, ofUid).delete();
  };

  public exists = async (friendUid: string, ofUid?: string): Promise<boolean> =>
    !!(await this.get(friendUid, ofUid));

  public waitUntilExists = async (friendUid: string, ofUid?: string): Promise<boolean> => {
    const snap = await this.waitUntilDocument(this.friendRef(friendUid, ofUid));
    return snap.data().uid === friendUid;
  };

  public waitUntilDeleted = async (friendUid: string, ofUid?: string): Promise<boolean> => {
    const predicate = (ds: DocumentSnapshot): boolean => !ds.exists;
    const snap = await this.waitUntilDocument(this.friendRef(friendUid, ofUid), predicate);
    return !snap.exists;
  };

  public setLastMet = async (
    friendUid: string,
    lastMet: number = new Date().getTime(),
    ofUid?: string,
  ): Promise<void> => {
    await this.friendRef(friendUid, ofUid).update({lastMet});
  };
}
