import { firebaseDb_addDoc, firebaseDb_getDoc_byPath } from "./firebase/config";

export const dbApi = {
  getDoc: firebaseDb_getDoc_byPath,
  addDoc: firebaseDb_addDoc,
};
