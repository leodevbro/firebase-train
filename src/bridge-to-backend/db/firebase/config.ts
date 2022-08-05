// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  DocumentData,
  doc,
  setDoc,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { IMyEnv } from "src/main-interfaces/sweet";

interface IFirestoreTimeStamp {
  nanoseconds: number;
  seconds: number;
}

interface IFirestoreGeoPoint {
  latitude: number;
  longitude: number;
}

type tyFirestoreDocField =
  | null
  | boolean
  | string
  | number
  | IFirestoreTimeStamp
  | IFirestoreGeoPoint
  | tyFirestoreDocField[]
  | { [key: string]: tyFirestoreDocField };

interface ISimpleDoc_withId {
  [key: string]: tyFirestoreDocField;
  id: string;
}

type tySimpleDoc_withoutId = {
  [key: string]: tyFirestoreDocField;
} & {
  id?: never;
};

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

const db = getFirestore(firebaseApp);

// const booksCollectionRef = collection(db, CollectionsEnum.books);

// const firebaseAnalytics = getAnalytics(firebaseApp);

// ==========================
// ==========================
// ==========================
// ==========================

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

getDocs(collection(db, "/", "books"))
  .then((snapshot) => {
    console.log(snapshot);
    const books = snapshot.docs.map((doc) => {
      const book = firebaseDocIntoSimpleDoc(doc);

      return book;
    });

    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

const mydd = firebaseDb_getDoc_byPath(["books", "4Csh2KNwQ8joV3QM5WlT"]);
console.log(mydd);

// get subcollection:
// const subColRef = collection(db, "/", "bookss", "custId---1659591717164", "myssikes");
// console.log(subColRef.id);
