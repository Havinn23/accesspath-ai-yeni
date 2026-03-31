import React, { useState } from 'react';

const AiAssistant: React.FC<{ onRouteUpdate?: () => void }> = ({ onRouteUpdate }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // --- 🎤 SESİ YAZIYA DÖKME (DİNLEME) ---
  const handleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'tr-TR';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setInput(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.start();
  };

  // --- 🔊 YAZIYI SESE DÖKME (OKUMA) ---
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR'; // Türkçe konuş
    utterance.rate = 1;       // Okuma hızı
    window.speechSynthesis.speak(utterance);
  };

  // --- 🧠 ANALİZ VE AKSİYON ---
  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    
    setTimeout(() => {
      if (onRouteUpdate) onRouteUpdate();

      let aiResponse = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("araba") || lowerInput.includes("park")) {
        aiResponse = "Dikkat! Araç engeli tespit edildi. Rota güvenli bölgeye kaydırıldı.";
      } else if (lowerInput.includes("merdiven") || lowerInput.includes("basamak")) {
        aiResponse = "Merdiven uyarısı! Asansör ve rampa öncelikli yeni rota oluşturuldu.";
      } else {
        aiResponse = `${input} bildirimi alındı. Yapay zeka rotayı sizin için optimize etti.`;
      }

      setOutput(aiResponse);
      setLoading(false);
      
      // ✨ İŞTE SİHİR BURADA: Cevabı sesli oku!
      speak(aiResponse);
      
    }, 1200);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '32px', marginTop: '20px', border: '1px solid #fce7f3', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#db2777', fontWeight: '900', fontSize: '14px' }}>🧠 ACCESS PATH AI (SESLİ)</h3>
        <span style={{ fontSize: '10px', backgroundColor: '#fdf2f8', color: '#db2777', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold' }}>FULL ERİŞİLEBİLİRLİK</span>
      </div>
      
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          style={{ width: '100%', padding: '12px 45px 12px 15px', marginBottom: '10px', border: '2px solid #fbcfe8', borderRadius: '15px', color: 'black', outline: 'none' }}
          placeholder="Konuşun veya engeli yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleListen} style={{ position: 'absolute', right: '12px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
          {isListening ? '🛑' : '🎤'}
        </button>
      </div>

      <button
        onClick={handleAnalyze}
        style={{ width: '100%', padding: '12px', backgroundColor: '#db2777', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        {loading ? 'Yapay Zeka Analiz Ediyor...' : 'Analiz Et ve Sesli Dinle'}
      </button>

      {output && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '15px', border: '1px solid #bbf7d0', fontSize: '12px', fontWeight: '500' }}>
          <p style={{ marginBottom: '5px' }}>📢 {output}</p>
          <button 
            onClick={() => speak(output)} 
            style={{ background: 'none', border: 'none', color: '#166534', textDecoration: 'underline', fontSize: '10px', cursor: 'pointer', padding: 0 }}
          >
            Tekrar Dinle
          </button>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;