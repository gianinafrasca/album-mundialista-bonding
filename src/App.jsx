import "./styles.css";
import { useState, useEffect } from "react";
import { loadData, saveData } from "./firebase";

const ACCENT = "#A100FF";
const ACCENT2 = "#7800C4";
const ACCENT_LIGHT = "#F2E6FF";

const FIGU_IMAGES = {
  f01: "https://i.imgur.com/BLjKXmZ.png",
  f02: "https://i.imgur.com/oVBR9eb.png",
  f03: "https://i.imgur.com/Cf7Vciw.png",
  f04: "https://i.imgur.com/mI8TkR2.png",
  f05: "https://i.imgur.com/xnLgkuY.png",
  f06: "https://i.imgur.com/nYYdAva.png",
  f07: "https://i.imgur.com/1KC2F5P.png",
  f08: "https://i.imgur.com/mgSyqvo.png",
  f09: "https://i.imgur.com/PcxrsEo.png",
  f10: "https://i.imgur.com/kzOtB2p.png",
  f11: "https://i.imgur.com/KborEZf.png",
  f12: "https://i.imgur.com/UhDFfZG.png",
  f13: "https://i.imgur.com/ZIl3aPy.png",
  f14: "https://i.imgur.com/L1xP1uS.png",
  f15: "https://i.imgur.com/P7erXcR.png",
  f16: "https://i.imgur.com/Vbi6Sg5.png",
  f17: "https://i.imgur.com/zcZwgo5.png",
  f18: "https://i.imgur.com/coAkqvU.png",
  f19: "https://i.imgur.com/5G83ljM.png",
  f20: "https://i.imgur.com/Iup0MXE.png",
  f21: "https://i.imgur.com/vE0Gobm.png",
  f22: "https://i.imgur.com/lqK9y1c.png",
  f23: "https://i.imgur.com/C77HkG8.png",
  f24: "https://i.imgur.com/nCCVGAM.png",
  f25: "https://i.imgur.com/s4vCaOJ.png",
  f26: "https://i.imgur.com/aSeUKUs.png",
  f27: "https://i.imgur.com/dyfdfTc.png",
  f28: "https://i.imgur.com/2mPU6mU.png",
  f29: "https://i.imgur.com/bhUfPqI.png",
  f30: "https://i.imgur.com/6qU2MZv.png",
};

const FIGUS = [
  { id: "f01", name: "PulpiT&O Goleador", sub: "Mete el gol de la clasificación", rare: false },
  { id: "f02", name: "PulpiT&O Scat&oni", sub: "El técnico que nos cambió la historia", rare: true },
  { id: "f03", name: "PulpiT&O Campeón", sub: "Levanta la Copa del Mundo", rare: true },
  { id: "f04", name: "PulpiT&O Arquero", sub: "Ataja con 4 tentáculos a la vez", rare: false },
  { id: "f05", name: "PulpiT&O Penal", sub: "La definición que nadie para", rare: false },
  { id: "f06", name: "PulpiT&O Hincha", sub: "Con la camiseta albiceleste", rare: false },
  { id: "f07", name: "PulpiT&O en el Obelisco", sub: "Festejando campeón en Buenos Aires", rare: true },
  { id: "f08", name: "PulpiT&O Ping Pong", sub: "Campeón de la paleta en la oficina", rare: false },
  { id: "f09", name: "PulpiT&O Office Day", sub: "Trabajando en la oficina con headset", rare: false },
  { id: "f10", name: "PulpiT&O con Messi", sub: "La foto que todos quieren", rare: true },
  { id: "f11", name: "PulpiT&O Pulpilot", sub: "Co-piloteando con IA", rare: false },
  { id: "f12", name: "PulpiT&O Lunch Break", sub: "Almuerzo en la terraza con la tribu", rare: false },
  { id: "f13", name: "PulpiT&O Topo Gigio", sub: "El festejo más icónico del fútbol argentino", rare: false },
  { id: "f14", name: "PulpiT&O Pensamientos Panaderos", sub: "Sueña con medialunas, pastelitos y churros", rare: false },
  { id: "f15", name: "PulpiT&O Fideo", sub: "El caño de Di María", rare: false },
  { id: "f16", name: "PulpiT&O PTO", sub: "La figurita especial de la tribu", rare: true },
  { id: "f17", name: "PulpiT&O La Bondineta", sub: "En el bus del Mundial con la banda", rare: false },
  { id: "f18", name: "PulpiT&O Mirando el Partido", sub: "En el living con comida y emoción", rare: false },
  { id: "f19", name: "PulpiT&O New Joiner", sub: "El primer día en la oficina", rare: false },
  { id: "f20", name: "PulpiT&O T&O Plus", sub: "En el chat interno de la tribu", rare: false },
  { id: "f21", name: "PulpiT&O All Hands", sub: "En la reunión de toda la tribu", rare: false },
  { id: "f22", name: "PulpiT&O Accenfest", sub: "Con lentes de Accenfest, fiesta total", rare: true },
  { id: "f23", name: "PulpiT&O Coffee Break", sub: "En el food truck de la oficina", rare: false },
  { id: "f24", name: "PulpiT&O Parque Patricios", sub: "Representando la sede Buenos Aires", rare: false },
  { id: "f25", name: "PulpiT&O Córdoba", sub: "Representando la sede Córdoba", rare: false },
  { id: "f26", name: "PulpiT&O Rosario", sub: "Representando la sede Rosario", rare: false },
  { id: "f27", name: "PulpiT&O Mendoza", sub: "Representando la sede Mendoza", rare: false },
  { id: "f28", name: "PulpiT&O Salta", sub: "Representando la sede Salta", rare: false },
  { id: "f29", name: "PulpiT&O Mar del Plata", sub: "Representando la sede Mar del Plata", rare: false },
  { id: "f30", name: "PulpiT&O Federal", sub: "Con mate, gato y perro en casa", rare: false },
];

const TOTAL = FIGUS.length;
const avatarEmojis = ["🦊","🐻","🦁","🐯","🐼","🐨","🦝","🦉","🦋","🐬","🦈","🐙","🦑","🦀","🐢","🦎","🦜","🐧","🦚","🌟"];
const getAvatar = (n) => avatarEmojis[n.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % avatarEmojis.length];

function FiguModal({ figu, repeated, onClose }) {
  const rareBg = "linear-gradient(135deg,#fbbf24,#f59e0b,#d97706)";
  const ownedBg = `linear-gradient(160deg,${ACCENT_LIGHT},#e9d5ff)`;
  const imgUrl = FIGU_IMAGES[figu.id];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "#0009" }} onClick={onClose}>
      <div className="rounded-3xl p-6 w-64 flex flex-col items-center shadow-2xl relative"
        style={{ background: figu.rare ? rareBg : ownedBg, border: `3px solid ${figu.rare ? "#f59e0b" : ACCENT}` }}
        onClick={(e) => e.stopPropagation()}>
        {figu.rare && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">⭐</div>}
        {imgUrl
          ? <img src={imgUrl} alt={figu.name} className="rounded-2xl" style={{ width: "180px", height: "240px", objectFit: "contain" }} />
          : <div style={{ fontSize: "5rem" }}>🐙</div>
        }
        <div className="font-black text-center mt-3 text-base" style={{ color: "#1a0033" }}>{figu.name}</div>
        <div className="text-center text-xs mt-1 text-gray-500">{figu.sub}</div>
        <div className="mt-2 text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: figu.rare ? "#fbbf24" : ACCENT, color: "white" }}>
          {figu.rare ? "⭐ Figurita Especial" : "Figurita Normal"}
        </div>
        {repeated > 1 && <div className="mt-2 text-xs text-gray-500">Tenés <b>{repeated}</b> copias</div>}
        <button onClick={onClose} className="mt-4 px-6 py-2 rounded-full text-white text-sm font-bold"
          style={{ background: ACCENT }}>Cerrar</button>
      </div>
    </div>
  );
}

function FiguCard({ figu, owned, repeated, small, onClick }) {
  const sz = small ? "w-16 h-20" : "w-32 h-44";
  const rareBg = "linear-gradient(135deg,#fbbf24,#f59e0b,#d97706)";
  const ownedBg = `linear-gradient(160deg,${ACCENT_LIGHT},#e9d5ff)`;
  const imgUrl = FIGU_IMAGES[figu.id];
  return (
    <div className={`${sz} rounded-xl border-2 flex flex-col items-center justify-center relative select-none transition-all overflow-hidden`}
      onClick={owned && onClick ? onClick : undefined}
      style={{
        background: owned ? (figu.rare ? rareBg : ownedBg) : "#1a0033",
        borderColor: owned ? (figu.rare ? "#f59e0b" : ACCENT) : "#3d0070",
        opacity: owned ? 1 : 0.5,
        boxShadow: owned && figu.rare ? "0 0 14px #fbbf2466" : owned ? `0 2px 10px ${ACCENT}33` : "none",
        cursor: owned && !small ? "pointer" : "default",
      }}>
      {owned && imgUrl
        ? <img src={imgUrl} alt={figu.name} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px", padding: "2px" }} />
        : <div style={{ fontSize: small ? "1.6rem" : "3.2rem" }}>❓</div>
      }
      {!small && figu.rare && owned && <div className="absolute top-1 right-1" style={{ fontSize: "0.65rem", color: "#f59e0b" }}>⭐</div>}
      {repeated > 1 && owned && (
        <div className="absolute top-0 right-0 text-white rounded-full w-4 h-4 flex items-center justify-center"
          style={{ fontSize: "0.55rem", transform: "translate(35%,-35%)", background: ACCENT }}>×{repeated}</div>
      )}
      {!owned && !small && (
        <div className="absolute bottom-1 left-0 right-0 text-center" style={{ color: "#3d0070", fontSize: "0.48rem" }}>#{figu.id.slice(1)}</div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastPack, setLastPack] = useState([]);
  const [lastPackUser, setLastPackUser] = useState("");
  const [opening, setOpening] = useState(false);
  const [toast, setToast] = useState("");
  const [tradeGive, setTradeGive] = useState("");
  const [tradeWant, setTradeWant] = useState("");
  const [tradeTab, setTradeTab] = useState("open");
  const [modalFigu, setModalFigu] = useState(null);

  useEffect(() => {
    loadData().then((d) => { setData(d); setLoading(false); });
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const me = data?.users?.[username] || { cards: {}, lastPack: null };
  const owned = me.cards || {};
  const totalOwned = Object.keys(owned).length;
  const repeatedIds = Object.entries(owned).filter(([, v]) => v > 1).map(([k]) => k);
  const missingIds = FIGUS.filter((f) => !owned[f.id]).map((f) => f.id);
  const figu = (id) => FIGUS.find((f) => f.id === id);

  const canOpen = () => !me.lastPack || new Date(me.lastPack).toDateString() !== new Date().toDateString();

  const openPack = async () => {
    if (!canOpen()) { showToast("⏰ Ya abriste tu sobre hoy. ¡Volvé mañana!"); return; }
    setOpening(true);
    await new Promise((r) => setTimeout(r, 900));
    const rareIds = FIGUS.filter((f) => f.rare).map((f) => f.id);
    const normalIds = FIGUS.filter((f) => !f.rare).map((f) => f.id);
    const newPack = [];
    for (let i = 0; i < 2; i++) {
      const pickedId = Math.random() < 0.15
        ? rareIds[Math.floor(Math.random() * rareIds.length)]
        : normalIds[Math.floor(Math.random() * normalIds.length)];
      newPack.push(pickedId);
    }
    // Carga datos frescos antes de guardar para evitar race conditions
    const freshData = await loadData();
    const userCards = freshData.users[username]?.cards || {};
    const u = { ...freshData.users[username], cards: { ...userCards }, lastPack: new Date().toISOString() };
    newPack.forEach((id) => { u.cards[id] = (u.cards[id] || 0) + 1; });
    freshData.users[username] = u;
    setData(freshData);
    await saveData(freshData);
    setLastPack([...newPack]);
    setLastPackUser(username);
    setOpening(false);
    const news = newPack.filter((id) => !owned[id]).length;
    showToast(news > 0 ? `🎴 ¡${news} figurita${news > 1 ? "s nuevas" : " nueva"}!` : "🔄 Repetidas — ¡a intercambiar!");
  };

  const proposeTrade = async () => {
    if (!tradeGive || !tradeWant) { showToast("Seleccioná qué ofrecés y qué pedís"); return; }
    if ((owned[tradeGive] || 0) < 2) { showToast("Necesitás tenerla repetida para ofrecerla"); return; }
    // Carga datos frescos antes de guardar
    const freshData = await loadData();
    freshData.trades = [...(freshData.trades || []), {
      id: Date.now(), from: username, give: tradeGive, want: tradeWant, status: "open", ts: new Date().toISOString()
    }];
    setData(freshData);
    await saveData(freshData);
    setTradeGive(""); setTradeWant("");
    showToast("✅ ¡Oferta publicada!");
  };

  const acceptTrade = async (t) => {
    if (t.from === username) { showToast("No podés aceptar tu propia oferta"); return; }
    if (!owned[t.want]) { showToast("No tenés esa figurita"); return; }
    if (owned[t.give]) { showToast("¡Ya tenés esa figurita!"); return; }
    // Carga datos frescos antes de guardar
    const freshData = await loadData();
    const from = { ...freshData.users[t.from], cards: { ...freshData.users[t.from].cards } };
    from.cards[t.want] = (from.cards[t.want] || 0) + 1;
    from.cards[t.give] = Math.max(0, (from.cards[t.give] || 0) - 1);
    if (!from.cards[t.give]) delete from.cards[t.give];
    freshData.users[t.from] = from;
    const myU = { ...freshData.users[username], cards: { ...freshData.users[username].cards } };
    myU.cards[t.give] = (myU.cards[t.give] || 0) + 1;
    myU.cards[t.want] = Math.max(0, (myU.cards[t.want] || 0) - 1);
    if (!myU.cards[t.want]) delete myU.cards[t.want];
    freshData.users[username] = myU;
    freshData.trades = freshData.trades.map((x) => x.id === t.id ? { ...x, status: "done", acceptedBy: username } : x);
    setData(freshData);
    await saveData(freshData);
    showToast("🔄 ¡Intercambio realizado!");
  };

  const login = async () => {
    const n = inputName.trim(); if (!n) return;
    const currentData = await loadData();
    if (!currentData.users[n]) {
      currentData.users[n] = { cards: {}, lastPack: null };
      await saveData(currentData);
    }
    setData(currentData);
    setUsername(n);
    setScreen("album");
    setLastPack([]);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen text-3xl"
      style={{ background: `linear-gradient(145deg,#0a0014,${ACCENT2})` }}>🐙</div>
  );

  if (screen === "login") return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: `linear-gradient(145deg,#0a0014,${ACCENT2},${ACCENT})` }}>
      <div className="text-7xl mb-3" style={{ filter: "drop-shadow(0 4px 20px #A100FF88)" }}>🐙</div>
      <h1 className="text-3xl font-black text-white mb-1 tracking-tight">PulpiT&O</h1>
      <p className="mb-8 text-sm" style={{ color: "#d8b4fe" }}>Álbum de Figuritas · Mundial Edition ⚽</p>
      <div className="rounded-2xl p-7 shadow-2xl w-full max-w-xs"
        style={{ background: "#1a0033", border: `1px solid ${ACCENT}55` }}>
        <div className="mb-1 font-bold text-sm" style={{ color: "#d8b4fe" }}>Ingresá tu EID de Accenture</div>
        <div className="text-xs mb-3" style={{ color: "#9061c2" }}>(sin @accenture.com — ej: g.apellido)</div>
        <input className="w-full border-2 rounded-xl px-4 py-3 text-base mb-1 outline-none font-mono"
          style={{ borderColor: ACCENT, background: "#0a0014", color: "white" }}
          placeholder="g.apellido" value={inputName}
          onChange={(e) => setInputName(e.target.value.toLowerCase())}
          onKeyDown={(e) => e.key === "Enter" && login()} />
        <div className="text-xs mb-4" style={{ color: "#6b3fa0" }}>Usá siempre el mismo EID para conservar tu álbum</div>
        <button onClick={login} className="w-full py-3 rounded-xl font-black text-white text-base shadow-md"
          style={{ background: `linear-gradient(135deg,${ACCENT2},${ACCENT})` }}>
          ¡Entrar al Álbum!
        </button>
        {Object.keys(data.users).length > 0 && (
          <div className="mt-4">
            <div className="text-xs mb-2 text-center" style={{ color: "#9061c2" }}>¿Ya jugaste antes? Elegí tu EID:</div>
            <div className="flex flex-wrap gap-1 justify-center max-h-24 overflow-y-auto">
              {Object.keys(data.users).sort().map((u) => (
                <button key={u} onClick={() => setInputName(u)} className="px-2 py-1 rounded-lg text-xs font-mono"
                  style={{ background: inputName === u ? ACCENT : "#2d0050", color: inputName === u ? "white" : "#d8b4fe", border: `1px solid ${ACCENT}44` }}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const nav = [["album","📖","Álbum"],["pack","🎁","Sobre"],["trades","🔄","Cambios"],["ranking","🏆","Ranking"]];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#1a0033", maxWidth: 500, margin: "0 auto" }}>
      <div className="px-4 py-3 flex items-center justify-between text-white"
        style={{ background: `linear-gradient(135deg,#0a0014,${ACCENT})` }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getAvatar(username)}</span>
          <div>
            <div className="font-black text-sm">{username}</div>
            <div className="text-xs" style={{ color: "#d8b4fe" }}>{totalOwned}/{TOTAL} figuritas</div>
          </div>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <div className="text-xs" style={{ color: "#d8b4fe" }}>Completado</div>
          <div className="font-black text-xl">{Math.round((totalOwned / TOTAL) * 100)}%</div>
          <button onClick={() => { setUsername(""); setScreen("login"); setLastPack([]); }}
            className="text-xs px-2 py-0.5 rounded-full font-bold"
            style={{ background: "#3d0070", color: "#d8b4fe" }}>Salir</button>
        </div>
      </div>
      <div className="h-2" style={{ background: "#0a0014" }}>
        <div className="h-2 transition-all" style={{ width: `${(totalOwned / TOTAL) * 100}%`, background: `linear-gradient(90deg,${ACCENT},#fbbf24)` }} />
      </div>

      <div className="flex-1 overflow-auto pb-20">
        {screen === "album" && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-black" style={{ color: "#e9d5ff" }}>🐙 Colección PulpiT&O</h2>
              <span className="text-sm font-black" style={{ color: ACCENT }}>{totalOwned}/{TOTAL}</span>
            </div>
            <p className="text-xs mb-4" style={{ color: "#9061c2" }}>Clickeá una figurita obtenida para verla grande</p>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))" }}>
              {FIGUS.map((f) => (
                <FiguCard key={f.id} figu={f} owned={!!owned[f.id]} repeated={owned[f.id] || 0} onClick={() => setModalFigu(f)} />
              ))}
            </div>
          </div>
        )}

        {screen === "pack" && (
          <div className="p-4">
            <h2 className="text-xl font-black mb-1" style={{ color: "#e9d5ff" }}>🎁 Abrir Sobre</h2>
            <p className="text-sm mb-5" style={{ color: "#9061c2" }}>2 figuritas por día · 15% de chances de conseguir una especial ⭐</p>
            {!canOpen() && (
              <div className="rounded-xl p-3 mb-5 text-sm" style={{ background: "#2d0050", border: `1px solid ${ACCENT}44`, color: "#d8b4fe" }}>
                ⏰ Ya abriste tu sobre hoy. ¡Volvé mañana!
              </div>
            )}
            <div className="text-center mb-6">
              <div className="text-7xl cursor-pointer mb-4 inline-block"
                style={{ animation: opening ? "spin 0.8s linear infinite" : "none", filter: `drop-shadow(0 4px 20px ${ACCENT}55)` }}
                onClick={!opening ? openPack : undefined}>🎁</div>
              <div>
                <button onClick={!opening ? openPack : undefined}
                  className="px-8 py-3 rounded-full font-black text-white text-base shadow-lg"
                  style={{ background: opening ? "#4b0082" : `linear-gradient(135deg,${ACCENT2},${ACCENT})`, cursor: opening ? "not-allowed" : "pointer" }}>
                  {opening ? "Abriendo..." : "¡Abrir Sobre!"}
                </button>
              </div>
            </div>
            {lastPack.length > 0 && lastPackUser === username && (
              <div>
                <div className="font-semibold mb-3 text-sm" style={{ color: "#d8b4fe" }}>Último sobre ({lastPack.length} figuritas):</div>
                <div className="flex gap-3 flex-wrap justify-center">
                  {lastPack.map((id, i) => (
                    <FiguCard key={i} figu={figu(id)} owned={true} onClick={() => setModalFigu(figu(id))} />
                  ))}
                </div>
              </div>
            )}
            {repeatedIds.length > 0 && (
              <div className="mt-6">
                <div className="font-semibold mb-2 text-sm" style={{ color: "#d8b4fe" }}>Mis repetidas ({repeatedIds.length})</div>
                <div className="flex flex-wrap gap-2">
                  {repeatedIds.map((id) => (
                    <FiguCard key={id} figu={figu(id)} owned={true} repeated={owned[id]} small onClick={() => setModalFigu(figu(id))} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {screen === "trades" && (
          <div className="p-4">
            <h2 className="text-xl font-black mb-4" style={{ color: "#e9d5ff" }}>🔄 Intercambios</h2>
            <div className="flex gap-2 mb-4">
              {[["open","Publicar"],["my","Mis ofertas"]].map(([t, l]) => (
                <button key={t} onClick={() => setTradeTab(t)} className="px-4 py-1.5 rounded-full text-sm font-bold"
                  style={{ background: tradeTab === t ? ACCENT : "#2d0050", color: tradeTab === t ? "white" : "#d8b4fe" }}>{l}</button>
              ))}
            </div>
            {tradeTab === "open" && (
              <>
                <div className="rounded-2xl p-4 mb-5" style={{ background: "#2d0050", border: `1px solid ${ACCENT}44` }}>
                  <div className="font-bold mb-3 text-sm" style={{ color: "#d8b4fe" }}>Nueva oferta de cambio</div>
                  <div className="text-xs mb-1" style={{ color: "#9061c2" }}>Ofrezco (mis repetidas):</div>
                  <select className="w-full border rounded-xl p-2 text-sm mb-3"
                    style={{ background: "#1a0033", color: "#d8b4fe", borderColor: `${ACCENT}44` }}
                    value={tradeGive} onChange={(e) => setTradeGive(e.target.value)}>
                    <option value="">-- Elegí una repetida --</option>
                    {repeatedIds.map((id) => <option key={id} value={id}>#{id.slice(1)} {figu(id)?.name}</option>)}
                  </select>
                  <div className="text-xs mb-1" style={{ color: "#9061c2" }}>Pido a cambio:</div>
                  <select className="w-full border rounded-xl p-2 text-sm mb-3"
                    style={{ background: "#1a0033", color: "#d8b4fe", borderColor: `${ACCENT}44` }}
                    value={tradeWant} onChange={(e) => setTradeWant(e.target.value)}>
                    <option value="">-- Elegí una que te falte --</option>
                    {missingIds.map((id) => <option key={id} value={id}>#{id.slice(1)} {figu(id)?.name}</option>)}
                  </select>
                  <button onClick={proposeTrade} className="w-full py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: ACCENT }}>
                    Publicar oferta
                  </button>
                </div>
                <div className="font-semibold mb-2 text-sm" style={{ color: "#d8b4fe" }}>Ofertas disponibles</div>
                {(data.trades || []).filter((t) => t.status === "open" && t.from !== username).length === 0
                  ? <p className="text-sm" style={{ color: "#6b3fa0" }}>No hay ofertas disponibles ahora.</p>
                  : (data.trades || []).filter((t) => t.status === "open" && t.from !== username).map((t) => (
                    <div key={t.id} className="rounded-2xl p-3 mb-2 flex items-center justify-between"
                      style={{ background: "#2d0050", border: `1px solid ${ACCENT}33` }}>
                      <div className="text-sm flex-1 mr-2">
                        <div className="font-bold" style={{ color: "#e9d5ff" }}>{getAvatar(t.from)} {t.from}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#9061c2" }}>Da: <b style={{ color: "#d8b4fe" }}>{figu(t.give)?.name}</b></div>
                        <div className="text-xs" style={{ color: "#9061c2" }}>Pide: <b style={{ color: "#d8b4fe" }}>{figu(t.want)?.name}</b></div>
                      </div>
                      <button onClick={() => acceptTrade(t)} className="px-3 py-1.5 rounded-xl text-white text-xs font-bold shrink-0"
                        style={{ background: owned[t.want] && !owned[t.give] ? "#16a34a" : "#4b0082" }}>Aceptar</button>
                    </div>
                  ))
                }
              </>
            )}
            {tradeTab === "my" && (
              (data.trades || []).filter((t) => t.from === username).length === 0
                ? <p className="text-sm" style={{ color: "#6b3fa0" }}>No publicaste ofertas todavía.</p>
                : (data.trades || []).filter((t) => t.from === username).reverse().map((t) => (
                  <div key={t.id} className="rounded-2xl p-3 mb-2" style={{ background: "#2d0050", border: `1px solid ${ACCENT}33` }}>
                    <div className="flex justify-between items-start">
                      <div className="text-sm">
                        <div className="text-xs" style={{ color: "#9061c2" }}>Da: <b style={{ color: "#d8b4fe" }}>{figu(t.give)?.name}</b></div>
                        <div className="text-xs" style={{ color: "#9061c2" }}>Pide: <b style={{ color: "#d8b4fe" }}>{figu(t.want)?.name}</b></div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold shrink-0 ml-2 ${t.status === "done" ? "bg-green-900 text-green-300" : "bg-yellow-900 text-yellow-300"}`}>
                        {t.status === "done" ? `✅ ${t.acceptedBy}` : "⏳ Pendiente"}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        )}

        {screen === "ranking" && (
          <div className="p-4">
            <h2 className="text-xl font-black mb-4" style={{ color: "#e9d5ff" }}>🏆 Ranking de la Tribu</h2>
            {Object.entries(data.users)
              .map(([name, u]) => ({ name, count: Object.keys(u.cards || {}).length }))
              .sort((a, b) => b.count - a.count)
              .map((u, i) => (
                <div key={u.name} className="flex items-center gap-3 p-3 rounded-2xl mb-2"
                  style={{ border: `2px solid ${u.name === username ? ACCENT : `${ACCENT}33`}`, background: u.name === username ? "#3d0070" : "#2d0050" }}>
                  <div className="text-xl w-8 text-center font-black">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</div>
                  <div className="text-2xl">{getAvatar(u.name)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate" style={{ color: "#e9d5ff" }}>{u.name}{u.name === username ? " (vos)" : ""}</div>
                    <div className="w-full rounded-full h-1.5 mt-1" style={{ background: "#1a0033" }}>
                      <div className="h-1.5 rounded-full transition-all"
                        style={{ width: `${(u.count / TOTAL) * 100}%`, background: `linear-gradient(90deg,${ACCENT2},${ACCENT})` }} />
                    </div>
                  </div>
                  <div className="text-sm font-black" style={{ color: ACCENT }}>{u.count}/{TOTAL}</div>
                </div>
              ))
            }
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex border-t shadow-lg"
        style={{ maxWidth: 500, margin: "0 auto", background: "#1a0033", borderColor: `${ACCENT}44` }}>
        {nav.map(([id, icon, label]) => (
          <button key={id} onClick={() => setScreen(id)}
            className="flex-1 py-2 flex flex-col items-center text-xs transition-all"
            style={{ color: screen === id ? ACCENT : "#6b3fa0" }}>
            <span className="text-xl">{icon}</span>
            <span className="font-bold">{label}</span>
          </button>
        ))}
        <button onClick={() => { setUsername(""); setScreen("login"); setLastPack([]); }}
          className="flex-1 py-2 flex flex-col items-center text-xs transition-all"
          style={{ color: "#6b3fa0" }}>
          <span className="text-xl">🚪</span>
          <span className="font-bold">Salir</span>
        </button>
      </div>

      {modalFigu && <FiguModal figu={modalFigu} repeated={owned[modalFigu.id] || 1} onClose={() => setModalFigu(null)} />}

      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-white px-5 py-2 rounded-full text-sm shadow-xl z-50 whitespace-nowrap"
          style={{ background: "#1a0033", border: `1px solid ${ACCENT}66` }}>
          {toast}
        </div>
      )}
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
