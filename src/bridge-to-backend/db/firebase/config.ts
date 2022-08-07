// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { IMyEnv } from "src/main-interfaces/sweet";

// REACT_APP_FIREBASE_API_KEY=AIzaSyAYaf4zponZlfDYxPeGna5Fb5OBD51WXWo
// REACT_APP_FIREBASE_AUTHDOMAIN=dojo001projectid.firebaseapp.com
// REACT_APP_FIREBASE_PROJECT_ID=dojo001projectid
// REACT_APP_FIREBASE_STORAGE_BUCKET=dojo001projectid.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=764305287151
// REACT_APP_FIREBASE_APP_ID=1:764305287151:web:425b2c4175d35c227f781a
// REACT_APP_FIREBASE_MEASUREMENT_ID=G-3NF1GTLPQF

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

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

// const firebaseAnalytics = getAnalytics(firebaseApp);

// ==========================
// ==========================
// ==========================
// ==========================

/*

// import { backup } from "firestore-export-import";

backups().then((collections) => {
// ['collectionName1', 'collectionName2'] // Array of collection's name is OPTIONAL
  // You can do whatever you want with collections
  console.log(JSON.stringify(collections));
});

backup("users").then((data) => {
  const json = JSON.stringify(data);
  console.log(json);

  //where collection.json is your output file name.
  // fs.writeFile("collection.json", json, "utf8", () => {
  //   console.log("done");
  // });
});
*/
