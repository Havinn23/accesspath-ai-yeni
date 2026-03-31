import React, { useState } from 'react';

// onRouteUpdate özelliği eklendi
const AiAssistant: React.FC<{ onRouteUpdate?: () => void }> = ({ onRouteUpdate }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

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

  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes("araba") || lowerInput.includes("park") || lowerInput.includes("merdiven") || lowerInput.includes("inşaat")) {
        aiResponse = `🚨 AI Analizi: "${input}" engeli nedeniyle rota yeniden hesaplandı. Güvenli bölgeye yönlendiriliyorsunuz.`;
        // EĞER ÖZEL BİR ENGEL VARSA HARİTAYI GÜNCELLE!
        if (onRouteUpdate) onRouteUpdate(); 
      } else {
        aiResponse = `🤖 AI Analizi: "${input}" bildirimi alındı. Mevcut rota güvenli görünüyor.`;
      }

      setOutput(aiResponse);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '32px', marginTop: '20px', border: '1px solid #fce7f3', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: '#db2777', fontWeight: '900', fontSize: '14px', marginBottom: '15px' }}>🧠 ACCESS PATH AI (CONNECTED)</h3>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          style={{ width: '100%', padding: '12px 45px 12px 15px', marginBottom: '10px', border: '2px solid #fbcfe8', borderRadius: '15px', color: 'black' }}
          placeholder="Konuşun veya engeli yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleListen} style={{ position: 'absolute', right: '12px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>
          {isListening ? '🛑' : '🎤'}
        </button>
      </div>
      <button onClick={handleAnalyze} style={{ width: '100%', padding: '12px', backgroundColor: '#db2777', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold' }}>
        {loading ? 'Yapay Zeka Rotayı Değiştiriyor...' : 'Analiz Et ve Rotayı Güncelle'}
      </button>
      {output && <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '15px', fontSize: '12px', fontWeight: '500' }}>{output}</div>}
    </div>
  );
};

export default AiAssistant;