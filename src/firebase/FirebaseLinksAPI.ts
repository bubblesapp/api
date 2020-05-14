import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference} from './FirestoreTypes';
import {Link} from '../models/Link';
import {LinksAPI} from '../LinksAPI';

export class FirebaseLinksAPI extends FirestoreAPI implements LinksAPI {
  constructor(app: App) {
    super(app);
  }

  protected linksRef = (): CollectionReference => this.app.firestore().collection('links');

  protected linkRef = (uid?: string): DocumentReference => this.linksRef().doc(uid ?? this.uid());

  get = async (uid?: string): Promise<Link> => {
    const snap = await this.linkRef(uid).get();
    return snap.data() as Link;
  };

  set = async (link: Link, uid?: string): Promise<void> => {
    await this.linkRef(uid).set(link);
  };
}
