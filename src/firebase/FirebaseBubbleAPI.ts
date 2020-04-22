import {FirestoreAPI} from './FirestoreAPI';
import {BubbleAPI} from '../BubbleAPI';
import {App, DocumentSnapshot} from './FirestoreTypes';
import {Bubble} from '../models';
import {Observable} from 'rxjs';

export class FirebaseBubbleAPI extends FirestoreAPI implements BubbleAPI {
  constructor(app: App) {
    super(app);
  }

  get = async (uid?: string): Promise<Bubble | undefined> => {
    const snap = await this.bubbleRef(uid).get();
    return snap.exists ? (snap.data() as Bubble) : undefined;
  };

  observe(uid?: string): Observable<Bubble> {
    return new Observable<Bubble>((observer) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.bubbleRef(uid).onSnapshot(
        (doc: DocumentSnapshot) => observer.next(doc.data() as Bubble),
        (err) => observer.error(err),
      ),
    );
  }

  set = async (bubble: Bubble): Promise<void> => {
    await this.bubbleRef(bubble.uid).set(bubble);
  };

  exists = async (uid?: string): Promise<boolean> => {
    const snap = await this.bubbleRef(uid).get();
    return snap.exists;
  };

  delete = async (uid?: string): Promise<void> => {
    await this.bubbleRef(uid).delete();
  };

  waitUntilExists = async (uid?: string): Promise<boolean> => {
    const snap = await this.waitUntilDocument(this.bubbleRef(uid));
    return snap.exists;
  };

  waitUntilDeleted = async (uid?: string): Promise<boolean> => {
    const predicate = (ds: DocumentSnapshot): boolean => !ds.exists;
    const snap = await this.waitUntilDocument(this.bubbleRef(uid), predicate);
    return !snap.exists;
  };

  pop = async (uid?: string): Promise<void> => {
    await this.bubbleRef(uid).update({popped: true});
  };

  reset = async (uid?: string): Promise<void> => {
    await this.bubbleRef(uid).update({popped: false});
  };

  isPopped = async (uid?: string): Promise<boolean> => {
    const bubble = await this.get(uid);
    return bubble.isPopped;
  };
}
