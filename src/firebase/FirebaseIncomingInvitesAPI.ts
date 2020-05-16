import {FirestoreAPI} from './FirestoreAPI';
import {IncomingInvitesAPI} from '../IncomingInvitesAPI';
import {
  App,
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from './FirestoreTypes';
import {Invite} from '../models';
import {Observable} from 'rxjs';

export class FirebaseIncomingInvitesAPI extends FirestoreAPI implements IncomingInvitesAPI {
  constructor(app: App) {
    super(app);
  }

  protected incomingInvitesRef = (toUid?: string): CollectionReference =>
    this.userRef(toUid).collection('incomingInvites');

  protected incomingInviteRef = (fromUid: string, toUid?: string): DocumentReference =>
    this.incomingInvitesRef(toUid).doc(fromUid);

  public observeAll = (toUid?: string): Observable<Invite[]> => {
    return new Observable<Invite[]>((observer) =>
      this.incomingInvitesRef(toUid)
        .orderBy('createdAt', 'asc')
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .onSnapshot(
          (qs: QuerySnapshot) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            observer.next(qs.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Invite)),
          (err: Error) => observer.error(err),
          () => observer.complete(),
        ),
    );
  };

  public set = async (invite: Invite, toUid?: string): Promise<void> => {
    await this.incomingInviteRef(invite.from, toUid).set(invite);
  };

  public delete = async (fromUid: string, toUid?: string): Promise<void> => {
    await this.incomingInviteRef(fromUid, toUid).delete();
  };

  public exists = async (fromUid: string, toUid?: string): Promise<boolean> => {
    const existingInvite = await this.incomingInviteRef(fromUid, toUid).get();
    return existingInvite.exists;
  };

  public accept = async (fromUid: string, toUid?: string): Promise<void> => {
    await this.incomingInvitesRef(toUid).doc(fromUid).update({accepted: true});
  };

  public waitUntilExists = async (fromUid: string, toUid?: string): Promise<boolean> => {
    const snap = await this.waitUntilDocument(this.incomingInviteRef(fromUid, toUid));
    return snap.data().from === fromUid;
  };

  public waitUntilDeleted = async (fromUid: string, toUid?: string): Promise<boolean> => {
    const snap = await this.waitUntilDocument(
      this.incomingInviteRef(fromUid, toUid),
      (ds) => !ds.exists,
    );
    return !snap.exists;
  };
}
