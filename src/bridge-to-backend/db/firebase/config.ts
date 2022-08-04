import { IMyEnv } from "src/main-interfaces/sweet";

export const aaaa002 = 7;

const myEnv = process.env as IMyEnv;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //   apiKey: "AIzaSyAYaf4zponZlfDYxPeGna5Fb5OBD51WXWo",
  //   authDomain: "dojo001projectid.firebaseapp.com",
  //   projectId: "dojo001projectid",
  //   storageBucket: "dojo001projectid.appspot.com",
  //   messagingSenderId: "764305287151",
  //   appId: "1:764305287151:web:425b2c4175d35c227f781a",
  //   measurementId: "G-3NF1GTLPQF",

  apiKey: myEnv.REACT_APP_FIREBASE_API_KEY,
  authDomain: myEnv.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: myEnv.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: myEnv.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: myEnv.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: myEnv.REACT_APP_FIREBASE_APP_ID,
  measurementId: myEnv.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
