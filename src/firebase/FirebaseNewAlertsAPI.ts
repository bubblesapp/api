import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference} from './FirestoreTypes';
import {NewAlertsAPI} from '../NewAlertsAPI';
import {NewAlert} from '../models';

export class FirebaseNewAlertsAPI extends FirestoreAPI implements NewAlertsAPI {
  constructor(app: App) {
    super(app);
  }

  protected newAlertsRef = (uid?: string): CollectionReference =>
    this.userRef(uid).collection('newAlerts');

  protected newAlertRef = (id: string, uid?: string): DocumentReference =>
    this.newAlertsRef(uid).doc(id);

  add = async (newAlert: NewAlert, uid?: string): Promise<string> => {
    const ref = await this.newAlertsRef(uid).add(newAlert);
    return ref.id;
  };

  delete = async (id: string, uid?: string): Promise<void> => {
    await this.newAlertRef(id, uid).delete();
  };
}
