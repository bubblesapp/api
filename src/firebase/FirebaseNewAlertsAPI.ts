import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference} from './FirestoreTypes';
import {NewAlertsAPI} from '../NewAlertsAPI';
import {Alert, NewAlert} from '../models';

export class FirebaseNewAlertsAPI extends FirestoreAPI implements NewAlertsAPI {
  constructor(app: App) {
    super(app);
  }

  protected newAlertsRef = (uid?: string): CollectionReference =>
    this.userRef(uid).collection('newAlerts');

  protected newAlertRef = (id: string, uid?: string): DocumentReference =>
    this.newAlertsRef(uid).doc(id);

  sendAlert = async (to: string[], message: string, uid?: string): Promise<void> => {
    const ref = this.newAlertsRef(uid).doc();
    const alert: Alert = {
      id: ref.id, // Alert has same id as NewAlert
      message,
      createdAt: new Date().getTime(),
    };
    const newAlert: NewAlert = {
      alert,
      to,
      createdBy: uid ?? this.uid(),
    };
    await ref.set(newAlert);
  };

  add = async (newAlert: NewAlert, uid?: string): Promise<string> => {
    const ref = await this.newAlertsRef(uid).add(newAlert);
    return ref.id;
  };

  delete = async (id: string, uid?: string): Promise<void> => {
    await this.newAlertRef(id, uid).delete();
  };
}
