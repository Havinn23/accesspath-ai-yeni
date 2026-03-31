import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AiAssistant from './features/AiAssistant';

// --- İkonlar ---
const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  iconSize: [25, 41], iconAnchor: [12, 41]
});

const redAlertIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [30, 48], iconAnchor: [15, 48]
});

const userIcon = new L.DivIcon({
  className: 'user-marker',
  html: `<div style="background-color: #ec4899; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 25px rgba(236, 72, 153, 0.8);" class="animate-pulse"></div>`,
  iconSize: [24, 24], iconAnchor: [12, 12]
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, 17); }, [center]);
  return null;
}

export default function App() {
  const [viewMode, setViewMode] = useState<'map' | 'camera' | 'both'>('both');
  const [userPos, setUserPos] = useState<[number, number]>([41.0253, 28.8894]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [chatUser, setChatUser] = useState<string | null>(null);
  const [destination, setDestination] = useState('');
  const [activeRoute, setActiveRoute] = useState<[number, number][] | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [addressDesc, setAddressDesc] = useState('');

  // OTOMATİK VERİ VE TOPLULUK VERİSİ
  const [autoAlerts] = useState([
    { id: 501, lat: 41.0280, lng: 28.8920, type: "Yol Çalışması", info: "Belediye çalışması nedeniyle kaldırım kapalı.", auto: true },
    { id: 502, lat: 41.0230, lng: 28.8850, type: "Kaza Bildirimi", info: "Kavşakta trafik yoğunluğu mevcut.", auto: true }
  ]);

  const [obstacles, setObstacles] = useState<any[]>([
    { id: 101, lat: 41.0260, lng: 28.8910, address: "Tarihi Hamam Girişi - Rampa Yok", user: "Mert Ö.", time: "2 gün önce", img: "https://images.unsplash.com/photo-1590059530472-881519782806?w=300" },
    { id: 102, lat: 41.0245, lng: 28.8880, address: "A Blok Kantin - Dar Kapı", user: "Selin K.", time: "5 saat önce", img: "https://images.unsplash.com/photo-1591123720164-de1348028a82?w=300" }
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => setUserPos([p.coords.latitude, p.coords.longitude]));
  }, []);

  const createRoute = () => {
    if (!destination) return;
    setActiveRoute([userPos, [41.0260, 28.8900], [41.0280, 28.8950], [41.0350, 28.9100]]);
    alert("Canlı yol durumu ve kaza verileri rotaya işlendi!");
  };

  const handleSOS = () => {
    setIsSOSActive(true); setCountdown(5);
    const t = setInterval(() => {
      setCountdown(p => { if (p <= 1) { clearInterval(t); setIsSOSActive(false); alert("Çağrı Gönderildi!"); return 5; } return p - 1; });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#1E293B] font-sans pb-24 relative overflow-x-hidden">
      
      {/* 🤖 AI 3D TARAMA */}
      {isScanning && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex flex-col items-center justify-center text-white p-6">
          {!scanResult ? (
            <>
              <div className="w-64 h-80 border-4 border-cyan-400 rounded-[40px] relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_#22d3ee] animate-[scan_2s_infinite]"></div>
              </div>
              <p className="mt-8 font-black text-cyan-400 animate-pulse tracking-widest uppercase">Lidar Tarama Aktif...</p>
              <button onClick={() => setScanResult(true)} className="mt-10 bg-cyan-500 px-8 py-3 rounded-full font-bold">ANALİZ ET</button>
            </>
          ) : (
            <div className="bg-white text-gray-800 p-8 rounded-[40px] max-w-md w-full shadow-2xl">
              <h3 className="text-xl font-black text-indigo-600 mb-4 italic text-center">3D Araç Analizi</h3>
              <p className="text-xs italic leading-relaxed text-gray-600">"<b>Titanium-X</b> sandalyeniz 68cm genişliktedir. Kampüs rotası %94 uyumlu hesaplanmıştır."</p>
              <button onClick={() => {setIsScanning(false); setScanResult(false);}} className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold uppercase text-xs">Kaydet</button>
            </div>
          )}
          <style>{`@keyframes scan { 0% { top: 0% } 100% { top: 100% } }`}</style>
        </div>
      )}

      {/* 💬 SOHBET */}
      {chatUser && (
        <div className="fixed bottom-28 right-6 z-[6000] w-72 bg-white rounded-[32px] shadow-2xl border border-pink-100 overflow-hidden">
          <div className="bg-pink-500 p-4 text-white font-black text-[10px] flex justify-between uppercase">
            <span>{chatUser}</span>
            <button onClick={() => setChatUser(null)}>✕</button>
          </div>
          <div className="h-40 p-4 bg-gray-50 overflow-y-auto text-[10px]">
             <p className="bg-white p-2 rounded-xl shadow-sm italic text-gray-500">"{chatUser}: Selam Havin! İstediğin rota üzerinde yardıma hazırım."</p>
          </div>
          <div className="p-3 border-t bg-white flex gap-2"><input type="text" placeholder="Yaz..." className="flex-1 bg-gray-100 rounded-lg p-2 text-xs outline-none" /><button className="text-pink-500 font-bold">👉</button></div>
        </div>
      )}

      {/* SOS MODAL */}
      {isSOSActive && (
        <div className="fixed inset-0 z-[9999] bg-red-600/95 flex flex-col items-center justify-center text-white">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce text-6xl font-black text-red-600">{countdown}</div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">SOS ÇAĞRISI!</h2>
          <button onClick={() => setIsSOSActive(false)} className="mt-8 bg-white text-red-600 px-10 py-3 rounded-full font-bold uppercase">Durdur</button>
        </div>
      )}

      {/* HEADER */}
      <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-md p-4 flex justify-between items-center border-b border-pink-100 shadow-sm">
        <div className="flex items-center gap-2 font-black text-xl text-pink-600 tracking-tighter italic">
          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">A</div>AccessPath
        </div>
        <div className="flex bg-pink-50 p-1 rounded-full border border-pink-100 shadow-inner">
          <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${viewMode === 'map' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-400'}`}>HARİTA</button>
          <button onClick={() => setViewMode('both')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${viewMode === 'both' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-400'}`}>İKİSİ</button>
          <button onClick={() => setViewMode('camera')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${viewMode === 'camera' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-400'}`}>KAMERA</button>
        </div>
        <div className="relative">
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="w-11 h-11 rounded-full border-2 border-pink-400 overflow-hidden shadow-lg hover:scale-105 transition">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Havin" alt="Havin" />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-[32px] shadow-2xl border border-pink-50 p-5 z-[5000] animate-in zoom-in-95">
               <div className="text-center pb-4 border-b mb-4">
                  <p className="font-black text-gray-800 italic uppercase">Havin Havin 👋</p>
                  <div className="flex justify-center gap-1 mt-2">
                    <span className="bg-yellow-100 text-yellow-700 text-[8px] font-black px-2 py-1 rounded-full border border-yellow-200 shadow-sm uppercase italic">🏅 ALTIN</span>
                    <span className="bg-blue-100 text-blue-700 text-[8px] font-black px-2 py-1 rounded-full border border-blue-200 shadow-sm uppercase italic">🔍 AVCI</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <button onClick={() => {setIsScanning(true); setIsProfileOpen(false);}} className="w-full py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black">🤖 ARACIMI TARA (AI)</button>
                  <button onClick={() => alert("Favori rotalar indiriliyor...")} className="w-full py-3 bg-pink-50 text-pink-600 rounded-xl text-[10px] font-black">📥 ROTALARI İNDİR</button>
                  <button onClick={() => alert("Yeni Rozet Görevi: 3 engel raporla!")} className="w-full py-3 border-2 border-dashed border-yellow-400 text-yellow-600 rounded-xl text-[10px] font-black">✨ ROZET KAZAN</button>
               </div>
            </div>
          )}
        </div>
      </header>

      {/* ROTA ARAMA */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="relative">
          <input 
             type="text" placeholder="Nereye gitmek istersin? (Kaza ve yol durumu otomatik analiz edilir)" 
             className="w-full bg-white border-2 border-pink-100 rounded-full py-4 px-12 text-sm shadow-xl focus:ring-4 focus:ring-pink-100 outline-none transition-all"
             value={destination} onChange={e => setDestination(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && createRoute()}
           />
           <button onClick={createRoute} className="absolute right-4 top-3 bg-pink-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase">GİT</button>
           <span className="absolute left-5 top-4.5 text-pink-300">🔍</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 space-y-6">
        <div className={`grid grid-cols-1 ${viewMode === 'both' ? 'lg:grid-cols-2' : ''} gap-6`}>
          
          {/* HARİTA VE AI ASİSTAN KISMI */}
          {(viewMode === 'map' || viewMode === 'both') && (
            <div className="flex flex-col gap-6">
              
              <div className="bg-white rounded-[40px] shadow-2xl border-[12px] border-white h-[500px] relative overflow-hidden">
                <MapContainer center={userPos} zoom={17} style={{ height: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                  <ChangeView center={userPos} />
                  <Marker position={userPos} icon={userIcon} />
                  {/* Otomatik Bildirimler */}
                  {autoAlerts.map(a => (
                    <Marker key={a.id} position={[a.lat, a.lng]} icon={redAlertIcon}>
                      <Popup><div className="w-40 p-1"><p className="text-[10px] font-black text-red-600 uppercase">🚨 OTOMATİK BİLDİRİM</p><p className="text-[9px] font-bold mb-1">{a.type}</p><p className="text-[8px] italic text-gray-500">{a.info}</p></div></Popup>
                    </Marker>
                  ))}
                  {/* Kullanıcı Bildirimleri */}
                  {obstacles.map(o => (
                    <Marker key={o.id} position={[o.lat, o.lng]} icon={orangeIcon}>
                      <Popup>
                        <div className="w-44 p-1 text-center">
                           {o.img && <img src={o.img} className="w-full h-24 object-cover rounded-xl mb-2 shadow-sm border border-gray-100" />}
                           <p className="text-[10px] font-black text-pink-600 mb-1 tracking-tighter uppercase">Rapor: {o.user} ({o.time})</p>
                           <p className="text-[9px] mb-3 leading-tight italic text-gray-500">"{o.address}"</p>
                           <button onClick={() => setChatUser(o.user)} className="w-full bg-blue-50 text-blue-600 text-[8px] font-black py-2 rounded-lg border border-blue-100 uppercase italic">Hala orada mı? Sor</button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  {activeRoute && <Polyline positions={activeRoute} color="#ec4899" weight={5} opacity={0.6} dashArray="10, 10" />}
                </MapContainer>
              </div>

              {/* 🧠 İŞTE AI ASİSTANI BURAYA GELDİ! */}
              <AiAssistant />

            </div>
          )}

          {/* SAĞ PANEL: KAMPÜS SOKAK ANALİZİ VE DİĞERLERİ */}
          {(viewMode === 'camera' || viewMode === 'both') && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-[32px] h-52 overflow-hidden relative shadow-2xl group">
                 <img src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&w=600" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-6 flex flex-col justify-end text-white text-[10px]">
                    <span className="font-black text-pink-400 uppercase tracking-widest font-mono mb-2">Live YTÜ Analyzer (Active)</span>
                    <p className="italic leading-relaxed border-l-2 border-pink-500 pl-3">"Sokak Analizi: Davutpaşa kampüs girişi rampa erişimi uygundur. Çevrede 2 aktif kaza bildirimi mevcut."</p>
                 </div>
              </div>

              <div className="bg-white p-6 rounded-[32px] shadow-xl border border-pink-50">
                <h3 className="text-xs font-black text-pink-700 mb-4 flex items-center gap-2 uppercase tracking-widest italic">🫂 Aktif Gönüllüler</h3>
                <div className="space-y-3">
                   {[ {n: "Ahmet Y.", r: "Kampüs Refakat", d: "150m"}, {n: "Selin K.", r: "Sandalye Destek", d: "420m"} ].map((v, i) => (
                     <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-lg shadow-inner">👤</div><div><p className="text-[10px] font-bold text-gray-800">{v.n}</p><p className="text-[8px] text-gray-500 font-bold uppercase">{v.r}</p></div></div>
                        <div className="text-right"><p className="text-[9px] font-black text-pink-600 mb-1">{v.d}</p><button onClick={() => setChatUser(v.n)} className="text-[9px] font-black text-blue-500 underline uppercase italic tracking-tighter">Mesaj At</button></div>
                     </div>
                   ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[40px] shadow-xl border-b-8 border-green-400">
                <h3 className="text-sm font-black text-green-700 mb-4 uppercase tracking-widest">📸 Yeni Rapor Oluştur</h3>
                <input type="file" onChange={(e:any) => {const r = new FileReader(); r.onload = () => setImage(r.result as string); r.readAsDataURL(e.target.files[0]);}} className="w-full text-[9px] mb-4 file:bg-green-50 file:text-green-700 file:border-0 file:rounded-full file:px-6 file:py-1 file:font-black" />
                {image && (
                  <div className="space-y-3 animate-in slide-in-from-bottom-2">
                    <img src={image} className="w-full h-32 object-cover rounded-2xl border-2 border-green-50 shadow-inner" />
                    <input placeholder="Yer Tarifi (Zorunlu)" className="w-full p-3 bg-gray-50 rounded-xl text-[10px] outline-none border-2 border-transparent focus:border-green-300" value={addressDesc} onChange={e => setAddressDesc(e.target.value)} />
                    <button onClick={() => {setObstacles([...obstacles, {id: Date.now(), lat: userPos[0], lng: userPos[1], address: addressDesc, user: "Havin", time: "Yeni", img: image}]); setImage(null); setAddressDesc(''); alert("Sistem Güncellendi!");}} disabled={!addressDesc} className={`w-full py-3 rounded-xl font-black text-[10px] transition-all uppercase ${addressDesc ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>Haritaya İşle</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[5000]">
        <button onClick={handleSOS} className="bg-red-600 text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.4)] border-8 border-white animate-pulse active:scale-90 transition-transform"><span className="text-[10px] font-black italic mb-0.5 uppercase tracking-tighter">ACİL</span><span className="text-2xl font-black italic tracking-tighter">SOS</span></button>
      </div>
    </div>
  );
}