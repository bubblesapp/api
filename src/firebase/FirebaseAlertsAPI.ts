import {AlertsAPI} from '../AlertsAPI';
import {Alert} from '../models';
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

export class FirebaseAlertsAPI extends FirestoreAPI implements AlertsAPI {
  constructor(app: App) {
    super(app);
  }

  protected alertsRef = (uid?: string): CollectionReference =>
    this.userRef(uid).collection('alerts');

  protected alertRef = (id: string, uid?: string): DocumentReference => this.alertsRef(uid).doc(id);

  public observeAll = (uid?: string): Observable<Alert[]> => {
    return new Observable<Alert[]>((observer) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.alertsRef(uid).onSnapshot(
        (qs: QuerySnapshot) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          observer.next(qs.docs.map((doc: QueryDocumentSnapshot) => doc.data() as Alert)),
        (err: Error) => observer.error(err),
        () => observer.complete(),
      ),
    );
  };

  public get = async (id: string, uid?: string): Promise<Alert | undefined> => {
    const doc = await this.alertRef(id, uid).get();
    return doc.exists ? (doc.data() as Alert) : undefined;
  };

  public set = async (alert: Alert, uid?: string): Promise<void> => {
    await this.alertRef(alert.id, uid).set(alert);
  };

  public delete = async (id: string, uid?: string): Promise<void> => {
    await this.alertRef(id, uid).delete();
  };

  public exists = async (id: string, uid?: string): Promise<boolean> => !!(await this.get(id, uid));

  public waitUntilExists = async (id: string, uid?: string): Promise<boolean> => {
    const snap = await this.waitUntilDocument(this.alertRef(id, uid));
    return snap.data().id === id;
  };

  public waitUntilDeleted = async (id: string, uid?: string): Promise<boolean> => {
    const predicate = (ds: DocumentSnapshot): boolean => !ds.exists;
    const snap = await this.waitUntilDocument(this.alertRef(id, uid), predicate);
    return !snap.exists;
  };
}
