import { FirestoreAPI } from './FirestoreAPI';
import { BubbleAPI } from '../BubbleAPI';
import { Firestore } from './FirestoreTypes';
import { Bubble } from '../models/Bubble';
export declare class FirebaseBubbleAPI extends FirestoreAPI implements BubbleAPI {
    constructor(firestore: Firestore);
    get: (uid: string) => Promise<Bubble>;
    set: (bubble: Bubble) => Promise<void>;
    exists: (uid: string) => Promise<boolean>;
    delete: (uid: string) => Promise<void>;
    waitUntilExists: (uid: string) => Promise<boolean>;
    waitUntilDeleted: (uid: string) => Promise<boolean>;
    pop: (uid: string) => Promise<void>;
    isPopped: (uid: string) => Promise<boolean>;
}
