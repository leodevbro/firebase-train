import { firebaseDb_addDoc, firebaseDb_getDoc_byPath, firebaseDb_deleteDoc_byPath } from "./firebase/config";

export const dbApi0 = {
  getDoc: firebaseDb_getDoc_byPath,
  addDoc: firebaseDb_addDoc,
  deleteDoc: firebaseDb_deleteDoc_byPath,
};
