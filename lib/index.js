"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
let projectId;
exports.projectId = projectId;
if (process.env.FIREBASE_CONFIG) {
    exports.projectId = projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
}
else if (process.env.GCLOUD_PROJECT) {
    exports.projectId = projectId = JSON.parse(process.env.GCLOUD_PROJECT);
}
__export(require("./src/firebase/FirebaseAPI"));
__export(require("./src/models"));
