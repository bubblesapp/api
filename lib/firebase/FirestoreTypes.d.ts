import admin from 'firebase-admin';
import * as firebaseTesting from '@firebase/testing';
export declare type Firestore = admin.firestore.Firestore | firebaseTesting.firestore.Firestore;
export declare type DocumentReference = admin.firestore.DocumentReference | firebaseTesting.firestore.DocumentReference;
export declare type CollectionReference = admin.firestore.CollectionReference | firebaseTesting.firestore.CollectionReference;
export declare type Query = admin.firestore.Query | firebaseTesting.firestore.Query;
export declare type DocumentSnapshot = admin.firestore.DocumentSnapshot | firebaseTesting.firestore.DocumentSnapshot;
export declare type QuerySnapshot = admin.firestore.QuerySnapshot | firebaseTesting.firestore.QuerySnapshot;
