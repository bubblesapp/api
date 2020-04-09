/// <reference types="chance" />
import { API } from '../';
export declare const rules: string;
export declare const chance: Chance.Chance;
export declare type Auth = {
    uid: string;
    email: string;
};
export declare const beforeAllTests: () => Promise<void>;
export declare const beforeEachTest: () => Promise<void>;
export declare const createClientAPI: (auth: Auth) => API;
export declare const createAdminAPI: () => API;
