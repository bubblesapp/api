import {FirestoreAPI} from './FirestoreAPI';
import {EmailInvitesAPI} from '../EmailInvitesAPI';
import {Invite} from '../models';
import {DocumentReference, QueryDocumentSnapshot, QuerySnapshot} from './FirestoreTypes';

export class FirebaseEmailInvitesAPI extends FirestoreAPI implements EmailInvitesAPI {
  add = async (invite: Invite, id?: string): Promise<string> => {
    let ref: DocumentReference;
    if (id) {
      ref = this.emailInvitesRef().doc(id);
    } else {
      ref = this.emailInvitesRef().doc();
    }
    await ref.set(invite);
    return ref.id;
  };

  exists = async (fromUid: string, toEmail: string): Promise<boolean> => {
    const query = await this.emailInviteQuery(fromUid, toEmail).get();
    return query.size > 0;
  };

  delete = async (fromUid: string, toEmail: string): Promise<void> => {
    const query = await this.emailInviteQuery(fromUid, toEmail).get();
    if (query.size === 0) {
      throw `Failed to delete email invite from ${fromUid}
            to email ${toEmail}. Invite not found.`;
    }
    await query.docs.pop().ref.delete();
  };

  list = async (toEmail: string): Promise<Invite[]> => {
    const querySnapshot = await this.emailInvitesRef().where('to', '==', toEmail).get();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Invite);
  };

  waitUntilDeleted = async (fromUid: string, toEmail: string): Promise<boolean> => {
    const predicate = (qs: QuerySnapshot): boolean => qs.size === 0;
    const snap = await this.waitUntilQuery(this.emailInviteQuery(fromUid, toEmail), predicate);
    return snap.size === 0;
  };
}
