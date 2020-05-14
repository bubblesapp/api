import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Link } from '../models/Link';
import { LinksAPI } from '../LinksAPI';
import { Observable } from 'rxjs';
export declare class FirebaseLinksAPI extends FirestoreAPI implements LinksAPI {
    constructor(app: App);
    protected linksRef: () => CollectionReference;
    protected linkRef: (uid?: string) => DocumentReference;
    observe: (uid?: string) => Observable<Link>;
    get: (uid?: string) => Promise<Link>;
    set: (link: Link, uid?: string) => Promise<void>;
}
