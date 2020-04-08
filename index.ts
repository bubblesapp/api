let projectId;
if (process.env.FIREBASE_CONFIG) {
  projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
} else if (process.env.GCLOUD_PROJECT) {
  projectId = JSON.parse(process.env.GCLOUD_PROJECT);
}

export {projectId};

export * from './src/API';
export * from './src/firebase/FirebaseAPI';
export * from './src/models';
