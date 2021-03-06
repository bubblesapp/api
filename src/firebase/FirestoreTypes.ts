import admin from 'firebase-admin';
import * as firebaseTesting from '@firebase/testing';
import firebase from 'firebase';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type App = admin.app.App | firebase.app.App | ReactNativeFirebase.FirebaseApp;

export type ClientAuth = firebase.auth.Auth | FirebaseAuthTypes.Module;

export type Auth = admin.auth.Auth | ClientAuth;

export type Firestore =
  | admin.firestore.Firestore
  | firebaseTesting.firestore.Firestore
  | FirebaseFirestoreTypes.Module;

export type DocumentReference =
  | admin.firestore.DocumentReference
  | firebaseTesting.firestore.DocumentReference
  | FirebaseFirestoreTypes.DocumentReference;

export type CollectionReference =
  | admin.firestore.CollectionReference
  | firebaseTesting.firestore.CollectionReference
  | FirebaseFirestoreTypes.CollectionReference;

export type Query =
  | admin.firestore.Query
  | firebaseTesting.firestore.Query
  | FirebaseFirestoreTypes.Query;

export type DocumentSnapshot =
  | admin.firestore.DocumentSnapshot
  | firebaseTesting.firestore.DocumentSnapshot
  | FirebaseFirestoreTypes.DocumentSnapshot;

export type QuerySnapshot =
  | admin.firestore.QuerySnapshot
  | firebaseTesting.firestore.QuerySnapshot
  | FirebaseFirestoreTypes.QuerySnapshot;

export type QueryDocumentSnapshot =
  | admin.firestore.QueryDocumentSnapshot
  | firebaseTesting.firestore.QueryDocumentSnapshot
  | FirebaseFirestoreTypes.QueryDocumentSnapshot;
