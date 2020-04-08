import admin from 'firebase-admin';
import * as firebaseTesting from '@firebase/testing';
import firebase from 'firebase';

export type App = admin.app.App | firebase.app.App;

export type f = Omit<admin.firestore.Firestore, 'getAll' | 'listCollections'>;
export type Firestore = f | firebaseTesting.firestore.Firestore;

export type DocumentReference =
  | admin.firestore.DocumentReference
  | firebaseTesting.firestore.DocumentReference;

export type CollectionReference =
  | admin.firestore.CollectionReference
  | firebaseTesting.firestore.CollectionReference;

export type Query = admin.firestore.Query | firebaseTesting.firestore.Query;

export type DocumentSnapshot =
  | admin.firestore.DocumentSnapshot
  | firebaseTesting.firestore.DocumentSnapshot;

export type QuerySnapshot = admin.firestore.QuerySnapshot | firebaseTesting.firestore.QuerySnapshot;
