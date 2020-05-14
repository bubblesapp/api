import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference, DocumentSnapshot} from './FirestoreTypes';
import {Link} from '../models/Link';
import {LinksAPI} from '../LinksAPI';
import {Observable} from 'rxjs';
import {Bubble} from '../models';

export class FirebaseLinksAPI extends FirestoreAPI implements LinksAPI {
  constructor(app: App) {
    super(app);
  }

  protected linksRef = (): CollectionReference => this.app.firestore().collection('links');

  protected linkRef = (uid?: string): DocumentReference => this.linksRef().doc(uid ?? this.uid());

  observe = (uid?: string): Observable<Link> => {
    return new Observable<Link>((observer) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.linkRef(uid).onSnapshot(
        (doc: DocumentSnapshot) => observer.next(doc.data() as Link),
        (err) => observer.error(err),
      ),
    );
  };

  get = async (uid?: string): Promise<Link> => {
    const snap = await this.linkRef(uid).get();
    return snap.data() as Link;
  };

  set = async (link: Link, uid?: string): Promise<void> => {
    await this.linkRef(uid).set(link);
  };
}
