// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

// const firebaseAnalytics = getAnalytics(firebaseApp);

// ==========================
// ==========================
// ==========================
// ==========================

/*

const firebaseDocIntoSimpleDoc = (
  rawDoc: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>,
) => {
  if (rawDoc.exists()) {
    const simpleData_withoutId: tySimpleDoc_withoutId = rawDoc.data();

    const simpleData_withId: ISimpleDoc_withId = {
      ...simpleData_withoutId,
      id: rawDoc.id,
    };

    return simpleData_withId;
  } else {
    return null;
  }
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

export const firebaseDb_getDoc_byPath = async (
  pathSegments: string[], // last item is the id
) => {
  if (pathSegments.length % 2 !== 0) {
    console.log(`pathSegments.length is probably odd. It must be even.`);
    return null;
  }

  const docRef = doc(db, "/", ...pathSegments);
  const docSnap = await getDoc(docRef);

  const simpleDoc = firebaseDocIntoSimpleDoc(docSnap);
  return simpleDoc;
};

//

export const firebaseDb_deleteDoc_byPath = async (
  pathSegments: string[], // last item is the id
) => {
  if (pathSegments.length % 2 !== 0) {
    console.log(`pathSegments.length is probably odd. It must be even.`);
    return null;
  }

  const docRef = doc(db, "/", ...pathSegments);

  const existing = await getDoc(docRef);

  const docId = pathSegments[pathSegments.length - 1];

  if (existing.exists()) {
    await deleteDoc(docRef);
    return docId;
  } else {
    console.log(`${docId} already deleted`);
    return `${docId} already deleted`;
  }
};

//

export const firebaseDb_getCollection_byPath = async (
  pathSegments: string[], // last item is the id
) => {
  if (pathSegments.length % 2 !== 1) {
    console.log(`pathSegments.length is probably even. It must be odd.`);
    return null;
  }

  const collectionRef = collection(db, "/", ...pathSegments);
  const snapshot = await getDocs(collectionRef);

  const myDocs = snapshot.docs.map((doc) => {
    const simpleDoc = firebaseDocIntoSimpleDoc(doc);
    return simpleDoc;
  });

  return myDocs;
};

export const firebaseDb_getCollection_byQuery = async (
  q: Query<DocumentData>,
  // q: CollectionReference<DocumentData>
) => {
  const snapshot = await getDocs(q);

  const myDocs = snapshot.docs.map((doc) => {
    const simpleDoc = firebaseDocIntoSimpleDoc(doc);
    return simpleDoc;
  });

  return myDocs;
};

//

export const firebaseDb_addDoc = async (
  pathSegments: string[], // if number of segments is even, then the last segment is the custom id of the new doc
  objAsInput: tySimpleDoc_withoutId,
): Promise<string | null> => {
  const numberOfSegmentsIsEven = pathSegments.length % 2 === 0;
  const customId = numberOfSegmentsIsEven ? pathSegments[pathSegments.length - 1] : null;

  if (customId) {
    const newDocRef = doc(db, "/", ...pathSegments);

    const existing = await getDoc(newDocRef);

    if (existing.exists()) {
      console.log("already exists");
      return null;
    } else {
      await setDoc(newDocRef, objAsInput);
      return customId;
    }
  } else {
    // with auto id
    const collectionRef = collection(db, "/", ...pathSegments);
    const addedDoc = await addDoc(collectionRef, objAsInput);
    return addedDoc.id;
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//

firebaseDb_getCollection_byPath(["books"]).then((x) => {
  console.log("initial books:");
  console.log(x);
});

const q = query(collection(db, "/", "books"), where("author", "==", "Patrick Rothfuss"));
const q1 = query(collection(db, "/", "books"));

firebaseDb_getCollection_byQuery(q1).then((x) => {
  console.log("queried books:", x);
});

firebaseDb_getDoc_byPath(["bookss", "custId---1659591717164"]).then((x) => {
  console.log("iniital one doc:");
  console.log(x);
});

//

// get subcollection:
// const subColRef = collection(db, "/", "bookss", "custId---1659591717164", "myssikes");
// console.log(subColRef.id);

// real time listener of collection:
onSnapshot(collection(db, "/", "books"), (snapshot) => {
  const myDocs = snapshot.docs.map((doc) => {
    const simpleDoc = firebaseDocIntoSimpleDoc(doc);
    return simpleDoc;
  });

  console.log("aaaabaa000");
  console.log(myDocs);
});

// real time listener of doc:
onSnapshot(doc(db, "/", "books", "i4"), (snapshot) => {
  const simpleDoc = firebaseDocIntoSimpleDoc(snapshot);
  console.log("aaaabaa");
  console.log(simpleDoc);
});


*/
