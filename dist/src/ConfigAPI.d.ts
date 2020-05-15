import { Config } from './models/Config';
import { Observable } from 'rxjs';
export interface ConfigAPI {
    observe(name: string): Observable<Config>;
    get(name: string): Promise<Config>;
}
