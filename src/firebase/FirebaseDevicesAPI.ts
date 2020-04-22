import {FirestoreAPI} from './FirestoreAPI';
import {App} from './FirestoreTypes';
import {Device} from '../models';
import {DevicesAPI} from '../DevicesAPI';
import admin from 'firebase-admin';
import DocumentSnapshot = admin.firestore.DocumentSnapshot;

export class FirebaseDevicesAPI extends FirestoreAPI implements DevicesAPI {
  constructor(app: App) {
    super(app);
  }

  get = async (id: string, uid?: string): Promise<Device | undefined> => {
    const snap = await this.deviceRef(id, uid).get();
    return snap.exists ? (snap.data() as Device) : undefined;
  };

  set = async (device: Device, uid?: string): Promise<void> => {
    await this.deviceRef(device.id, uid).set(device);
  };

  list = async (uid?: string): Promise<Device[]> => {
    const docs = await (this.devicesRef(
      uid,
    ) as admin.firestore.CollectionReference).listDocuments();
    const snaps = await Promise.all(
      docs.map<Promise<DocumentSnapshot>>((doc) => doc.get()),
    );
    return snaps.map<Device>((snap) => snap.data() as Device);
  };

  delete = async (id: string, uid?: string): Promise<void> => {
    await this.deviceRef(id, uid).delete();
  };
}
