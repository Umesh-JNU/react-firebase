import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1HHKvIxGDj3VmXS9haOgSrq5Qj0bGm_M",
  authDomain: "secquraise-4a9db.firebaseapp.com",
  projectId: "secquraise-4a9db",
  storageBucket: "secquraise-4a9db.appspot.com",
  messagingSenderId: "920064215227",
  appId: "1:920064215227:web:82206478e4b9e90a81819e",
  measurementId: "G-KG4Q30NEGS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const getImage = async (location) => {
  return await getDownloadURL(ref(storage, location));
}

export { db, getImage };