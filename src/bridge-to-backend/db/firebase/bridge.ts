import { auth, db } from "./config";

import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  DocumentData,
  doc,
  setDoc,
  updateDoc,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  onSnapshot,
  query,
  where,
  Query,
  CollectionReference,
  Unsubscribe,
  FieldValue,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
  User,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
  // as only for input to db [start]
  | FieldValue // for serverTimestamp()
  // as only for input to db [end]
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

//

export const firebaseDb_updateDoc_byPath = async (
  pathSegments: string[], // last item is the id
  updatingFields: tySimpleDoc_withoutId, // can be only the fields which are being updated
) => {
  if (pathSegments.length % 2 !== 0) {
    console.log(`pathSegments.length is probably odd. It must be even.`);
    return null;
  }

  const id = pathSegments[pathSegments.length - 1];

  const docRef = doc(db, "/", ...pathSegments);
  await updateDoc(docRef, updatingFields);

  return id;
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

  if (numberOfSegmentsIsEven) {
    const customId = pathSegments[pathSegments.length - 1];
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

// firebaseDb_getCollection_byQuery(
//   query(collection(db, "/", "books"), where("author", "==", "Patrick Rothfuss")),
// ).then((x) => {
//   console.log("initial books:");
//   console.log(x);
// });

const q = query(collection(db, "/", "books"), where("author", "==", "Patrick Rothfuss"));
const q1 = query(collection(db, "/", "books"));

// firebaseDb_getCollection_byQuery(q).then((x) => {
//   console.log("queried books:", x);
// });

firebaseDb_getDoc_byPath(["bookss", "custId---1659591717164"]).then((x) => {
  console.log("iniital one doc:");
  console.log(x);
});

//

// get subcollection:
// const subColRef = collection(db, "/", "bookss", "custId---1659591717164", "myssikes");
// console.log(subColRef.id);

// ================
// real time listener of collection:
/*
const unsub1: Unsubscribe = onSnapshot(collection(db, "/", "books"), (snapshot) => {
  const myDocs = snapshot.docs.map((doc) => {
    const simpleDoc = firebaseDocIntoSimpleDoc(doc);
    return simpleDoc;
  });

  console.log("aaaabaa000");
  console.log(myDocs);
});
*/

// real time listener of doc:
/*
const unsub2: Unsubscribe = onSnapshot(doc(db, "/", "books", "i4"), (snapshot) => {
  const simpleDoc = firebaseDocIntoSimpleDoc(snapshot);
  console.log("aaaabaa");
  console.log(simpleDoc);
});
*/

// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
// '''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

// USERS:

export const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const sendResetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

const deleteCurrentUser = async (password: string) => {
  if (auth.currentUser && auth.currentUser.email) {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, password);

    await reauthenticateWithCredential(auth.currentUser, credential);
    deleteUser(auth.currentUser);
  }
};

const currUser: {
  v: null | User;
} = {
  v: null,
};

const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  console.log("currentUser:", currentUser);
  currUser.v = currentUser;

  currentUser?.providerData.forEach((profile) => {
    console.log("-----------------");
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
  if (currentUser) {
    // console.log(currentUser);
  } else {
    //
  }
});

// =======================
// test:

const login000 = () => {
  login("user002@mymail.com", "user000");
};

const update001 = async () => {
  if (currUser.v) {
    await updateProfile(currUser.v, {
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg",
    });

    console.log("updated");
  }
};

const updateMyMail = async () => {
  if (auth.currentUser) {
    await updateEmail(auth.currentUser, "jokonda@mymail.com");
    console.log("updated");
  }
};

setTimeout(() => {
  // login000();
}, 5000);
