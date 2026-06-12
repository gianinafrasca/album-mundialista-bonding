import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-n7nh-sNLYfvFGwsn_sirnfMFaZbqdsw",
  authDomain: "album-mundialista-bonding.firebaseapp.com",
  projectId: "album-mundialista-bonding",
  storageBucket: "album-mundialista-bonding.firebasestorage.app",
  messagingSenderId: "184402438066",
  appId: "1:184402438066:web:7b06f45d66712c1047e6ab",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const MAIN_DOC = "pulpito_album";
const COL = "data";

export async function loadData() {
  try {
    const ref = doc(db, COL, MAIN_DOC);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : { users: {}, trades: [] };
  } catch (e) {
    console.error("Error loading:", e);
    return { users: {}, trades: [] };
  }
}

export async function saveData(data: any) {
  try {
    const ref = doc(db, COL, MAIN_DOC);
    await setDoc(ref, data);
  } catch (e) {
    console.error("Error saving:", e);
  }
}
