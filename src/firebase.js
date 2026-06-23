import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

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

// ─── USUARIOS ────────────────────────────────────────────────────────────────

export async function getUser(eid) {
  const ref = doc(db, "users", eid);
  const snap = await getDoc(ref);
  return snap.exists() ? { eid, ...snap.data() } : null;
}

// Acepta initialCards opcionales (Fix 2: nuevos usuarios con 10 figus)
export async function createUser(eid, initialCards = {}) {
  const ref = doc(db, "users", eid);
  const userData = { cards: initialCards, lastPack: null };
  await setDoc(ref, userData);
  return { eid, ...userData };
}

export async function saveUser(eid, userData) {
  const ref = doc(db, "users", eid);
  await setDoc(ref, userData);
}

export async function getAllUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ eid: d.id, ...d.data() }));
}

// ─── TRADES ──────────────────────────────────────────────────────────────────

export async function getTrades() {
  const snap = await getDocs(collection(db, "trades"));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
}

export async function createTrade(trade) {
  const ref = await addDoc(collection(db, "trades"), trade);
  return { docId: ref.id, ...trade };
}

export async function acceptTradeInDB(docId, acceptedBy) {
  const ref = doc(db, "trades", docId);
  await updateDoc(ref, { status: "done", acceptedBy });
}
