import {FirestoreAPI} from './FirestoreAPI';
import {OutgoingInvitesAPI} from '../OutgoingInvitesAPI';
import {
  App,
  CollectionReference,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from './FirestoreTypes';
import {Invite} from '../models';
import {Observable} from 'rxjs';

export class FirebaseOutgoingInvitesAPI extends FirestoreAPI implements OutgoingInvitesAPI {
  constructor(app: App) {
    super(app);
  }

  protected outgoingInvitesRef = (fromUid: string = this.uid()): CollectionReference =>
    this.userRef(fromUid).collection('outgoingInvites');

  protected outgoingInviteQuery = (toEmail: string, fromUid: string = this.uid()): Query =>
    this.outgoingInvitesRef(fromUid).where('to', '==', toEmail);

  public observeAll = (fromUid?: string): Observable<Invite[]> => {
    return new Observable<Invite[]>((observer) =>
      this.outgoingInvitesRef(fromUid)
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

  add = async (invite: Invite): Promise<string> => {
    const ref = await this.outgoingInvitesRef(invite.from).add(invite);
    return ref.id;
  };

  exists = async (toEmail: string, fromUid?: string): Promise<boolean> => {
    const query = await this.outgoingInvitesRef(fromUid).where('to', '==', toEmail).get();
    return query.size > 0;
  };

  delete = async (toEmail: string, fromUid?: string): Promise<void> => {
    const query = await this.outgoingInviteQuery(toEmail, fromUid).get();
    if (query.size === 0) {
      throw `Failed to delete outgoing invite in ${fromUid}
            to email ${toEmail}. Invite not found.`;
    }
    await query.docs.pop().ref.delete();
  };

  waitUntilDeleted = async (toEmail: string, fromUid?: string): Promise<boolean> => {
    const predicate = (qs: QuerySnapshot): boolean => qs.size === 0;
    const snap = await this.waitUntilQuery(this.outgoingInviteQuery(toEmail, fromUid), predicate);
    return snap.size === 0;
  };
}
