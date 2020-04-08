"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chance_1 = __importDefault(require("chance"));
const firebaseTesting = __importStar(require("@firebase/testing"));
const index_1 = require("../index");
const __1 = require("../");
exports.rules = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../firestore.rules'), // Path to rules from lib/
'utf8');
exports.chance = new chance_1.default();
exports.beforeAllTests = async () => {
    await firebaseTesting.loadFirestoreRules({ projectId: index_1.projectId, rules: exports.rules });
};
exports.beforeEachTest = async () => {
    await firebaseTesting.clearFirestoreData({ projectId: index_1.projectId });
};
const createTestClientApp = (auth) => firebaseTesting.initializeTestApp({ projectId: index_1.projectId, auth });
const createTestAdminApp = () => firebaseTesting.initializeAdminApp({ projectId: index_1.projectId });
exports.createClientAPI = (auth) => new __1.FirebaseAPI(createTestClientApp(auth));
exports.createAdminAPI = () => new __1.FirebaseAPI(createTestAdminApp());
