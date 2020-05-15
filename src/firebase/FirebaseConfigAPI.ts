import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference, DocumentSnapshot} from './FirestoreTypes';
import {Config} from '../models/Config';
import {Observable} from 'rxjs';
import {ConfigAPI} from '../ConfigAPI';

export class FirebaseConfigAPI extends FirestoreAPI implements ConfigAPI {
  constructor(app: App) {
    super(app);
  }

  protected configsRef = (): CollectionReference => this.app.firestore().collection('config');

  protected configRef = (name: string): DocumentReference => this.configsRef().doc(name);

  observe = (name: string): Observable<Config> => {
    return new Observable<Config>((observer) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.configRef(name).onSnapshot(
        (doc: DocumentSnapshot) => observer.next(doc.data() as Config),
        (err) => observer.error(err),
      ),
    );
  };

  get = async (name: string): Promise<Config> => {
    const snap = await this.configRef(name).get();
    return snap.data() as Config;
  };
}
