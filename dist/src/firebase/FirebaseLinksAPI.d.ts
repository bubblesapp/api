import { FirestoreAPI } from './FirestoreAPI';
import { App, CollectionReference, DocumentReference } from './FirestoreTypes';
import { Link } from '../models/Link';
import { LinksAPI } from '../LinksAPI';
export declare class FirebaseLinksAPI extends FirestoreAPI implements LinksAPI {
    constructor(app: App);
    protected linksRef: () => CollectionReference;
    protected linkRef: (uid?: string) => DocumentReference;
    get: (uid?: string) => Promise<Link>;
    set: (link: Link, uid?: string) => Promise<void>;
}
