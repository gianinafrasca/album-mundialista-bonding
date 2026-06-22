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
  query,
  where,
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

// Obtiene un usuario por EID
export async function getUser(eid) {
  const ref = doc(db, "users", eid);
  const snap = await getDoc(ref);
  return snap.exists() ? { eid, ...snap.data() } : null;
}

// Crea un usuario nuevo
export async function createUser(eid) {
  const ref = doc(db, "users", eid);
  const userData = { cards: {}, lastPack: null };
  await setDoc(ref, userData);
  return { eid, ...userData };
}

// Guarda datos de un usuario (solo toca su documento)
export async function saveUser(eid, userData) {
  const ref = doc(db, "users", eid);
  await setDoc(ref, userData);
}

// Obtiene todos los usuarios (para ranking)
export async function getAllUsers() {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ eid: d.id, ...d.data() }));
}

// ─── TRADES ──────────────────────────────────────────────────────────────────

// Obtiene todos los trades abiertos
export async function getTrades() {
  const snap = await getDocs(collection(db, "trades"));
  return snap.docs.map((d) => ({ docId: d.id, ...d.data() }));
}

// Crea un nuevo trade
export async function createTrade(trade) {
  const ref = await addDoc(collection(db, "trades"), trade);
  return { docId: ref.id, ...trade };
}

// Acepta un trade (actualiza estado)
export async function acceptTradeInDB(docId, acceptedBy) {
  const ref = doc(db, "trades", docId);
  await updateDoc(ref, { status: "done", acceptedBy });
}
