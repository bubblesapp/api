import { FirestoreAPI } from './FirestoreAPI';
import { BubbleAPI } from '../BubbleAPI';
import { App } from './FirestoreTypes';
import { Bubble } from '../models';
import { Observable } from 'rxjs';
export declare class FirebaseBubbleAPI extends FirestoreAPI implements BubbleAPI {
    constructor(app: App);
    get: (uid?: string) => Promise<Bubble>;
    observe(uid?: string): Observable<Bubble>;
    set: (bubble: Bubble) => Promise<void>;
    exists: (uid?: string) => Promise<boolean>;
    delete: (uid?: string) => Promise<void>;
    waitUntilExists: (uid?: string) => Promise<boolean>;
    waitUntilDeleted: (uid?: string) => Promise<boolean>;
    pop: (uid?: string) => Promise<void>;
    reset: (uid?: string) => Promise<void>;
    isPopped: (uid?: string) => Promise<boolean>;
}
