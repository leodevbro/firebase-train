// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  DocumentData,
  doc,
  setDoc,
} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { IMyEnv } from "src/main-interfaces/sweet";

interface IBooks {
  id: string;
  author: string;
  title: string;
}

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
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(firebaseApp);

const booksCollectionRef = collection(firebaseDb, "books");

// const firebaseAnalytics = getAnalytics(firebaseApp);

const firebaseDocIntoSimple = (docData: DocumentData) => {};

getDocs(booksCollectionRef)
  .then((snapshot) => {
    console.log(snapshot);
    const books = snapshot.docs.map((doc) => {
      const theData = doc.data() as Omit<IBooks, "id">;

      const book: IBooks = {
        id: doc.id,
        ...theData,
      };

      return book;
    });

    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

const objToSend: Omit<IBooks, "id"> = {
  author: "aaa1",
  title: "ttt1",
};

// addDoc(booksCollectionRef, objToSend);

export const firebaseDb_addBook = async (objAsInput: Omit<IBooks, "id">, customId?: string) => {
  if (customId) {
    // TODO: jer sheamowmos ID
    await setDoc(doc(firebaseDb, "books", customId), objAsInput);
    return customId;
  } else {
    const addedDoc = await addDoc(booksCollectionRef, objAsInput);
    return addedDoc.id;
  }
};
