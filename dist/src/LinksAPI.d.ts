import { Link } from './models/Link';
import { Observable } from 'rxjs';
export interface LinksAPI {
    observe(uid?: string): Observable<Link>;
    get(uid?: string): Promise<Link>;
    set(link: Link, uid?: string): Promise<void>;
}
