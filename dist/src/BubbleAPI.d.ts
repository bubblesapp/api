import { Bubble } from './models';
import { Observable } from 'rxjs';
export interface BubbleAPI {
    exists(uid?: string): Promise<boolean>;
    get(uid?: string): Promise<Bubble>;
    observe(uid?: string): Observable<Bubble>;
    set(bubble: Bubble): Promise<void>;
    delete(uid?: string): Promise<void>;
    waitUntilExists(uid?: string): Promise<boolean>;
    waitUntilDeleted(uid?: string): Promise<boolean>;
    isPopped(uid?: string): Promise<boolean>;
    pop(uid?: string): Promise<void>;
    reset(uid?: string): Promise<void>;
}
