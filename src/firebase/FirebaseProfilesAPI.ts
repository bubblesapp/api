import {Profile} from '../models';
import {ProfilesAPI} from '../ProfilesAPI';
import {FirestoreAPI} from './FirestoreAPI';
import {App, CollectionReference, DocumentReference} from './FirestoreTypes';
import {Observable} from 'rxjs';

export class FirebaseProfilesAPI extends FirestoreAPI implements ProfilesAPI {
  constructor(app: App) {
    super(app);
  }

  protected profilesRef = (): CollectionReference => this.app.firestore().collection('profiles');

  protected profileRef = (uid: string = this.uid()): DocumentReference =>
    this.profilesRef().doc(uid);

  public get = async (uid?: string): Promise<Profile | undefined> => {
    const doc = await this.profileRef(uid).get();
    return doc.exists ? (doc.data() as Profile) : undefined;
  };

  public observe = (uid?: string): Observable<Profile> => {
    return new Observable<Profile>((observer) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.profileRef(uid).onSnapshot(
        (doc) => observer.next(doc.data() as Profile),
        (err) => observer.error(err),
      ),
    );
  };

  public set = async (profile: Profile): Promise<void> => {
    await this.profileRef(profile.uid).set(profile);
  };

  public update = async (changes: Partial<Profile>, uid?: string): Promise<void> => {
    await this.profileRef(uid).update(changes);
  };

  public delete = async (uid?: string): Promise<void> => {
    await this.profileRef(uid).delete();
  };

  // TODO: Create index on email in profiles
  public uidWihEmail = async (email: string): Promise<string | undefined> => {
    const profiles = await this.profilesRef().where('email', '==', email).get();
    return profiles.docs.pop()?.id;
  };
}
