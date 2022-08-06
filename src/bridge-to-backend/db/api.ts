import { collection, orderBy, query, where } from "firebase/firestore";
import {
  firebaseDb_addDoc,
  firebaseDb_getDoc_byPath,
  firebaseDb_deleteDoc_byPath,
  firebaseDb_getCollection_byQuery,
  firebaseDb_updateDoc_byPath,
} from "./firebase/bridge";
import { db } from "./firebase/config";

export const dbApi0 = {
  getDoc: firebaseDb_getDoc_byPath,
  addDoc: firebaseDb_addDoc,
  deleteDoc: firebaseDb_deleteDoc_byPath,
};

export const dbApi = {
  addDoc: firebaseDb_addDoc,

  getBooksOfPatrick: async () => {
    const myItems = await firebaseDb_getCollection_byQuery(
      query(
        collection(db, "/", "books"),
        where("author", "==", "Patrick Rothfuss"),
        orderBy("tist", "asc"),
      ),
    );

    return myItems;
  },

  getAllbooks: async () => {
    const myItems = await firebaseDb_getCollection_byQuery(
      query(
        collection(db, "/", "books"),
        // where("author", "==", "Patrick Rothfuss"),
        // orderBy("tist", "asc"),
      ),
    );

    return myItems;
  },

  updateOneBook: async () => {
    const idOfupdated = await firebaseDb_updateDoc_byPath(["books", "6afuR5Toy0FjZ95h9HCi"], {
      title: "------",
    });
    return idOfupdated;
  },
};
