import {Link} from './models/Link';

export interface LinksAPI {
  get(uid?: string): Promise<Link>;
  set(link: Link, uid?: string): Promise<void>;
}
