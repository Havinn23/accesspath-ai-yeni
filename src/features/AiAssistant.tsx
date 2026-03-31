import React, { useState } from 'react';

const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    
    setTimeout(() => {
      let aiResponse = "";
      const lowerInput = input.toLowerCase();

      // --- AKILLI SENARYO MANTIĞI ---
      if (lowerInput.includes("araba") || lowerInput.includes("park")) {
        aiResponse = "🚨 AI Analizi: Hatalı park tespiti! Tekerlekli sandalye geçişi engellenmiş. En yakın güvenli rampa 20m gerideki market girişindedir. Rota güncellendi.";
      } else if (lowerInput.includes("merdiven") || lowerInput.includes("basamak")) {
        aiResponse = "📐 AI Analizi: Merdiven uyarısı! Seçilen rota fiziksel engel içeriyor. Asansörlü alternatif yol Yıldız Sarayı yönünden sağlandı.";
      } else if (lowerInput.includes("inşaat") || lowerInput.includes("çalışma")) {
        aiResponse = "🏗️ AI Analizi: Yol çalışması algılandı. Gürültü ve toz hassasiyeti için kapalı tünel rotası öneriliyor.";
      } else {
        aiResponse = `🤖 AI Analizi: "${input}" bildirimi değerlendirildi. Topluluk verileriyle doğrulandı ve en erişilebilir rota saniyeler içinde oluşturuldu.`;
      }

      setOutput(aiResponse);
      setLoading(false);
    }, 1200);
  };

  // Sesli Komut İllüzyonu (Demo Amaçlı)
  const toggleListening = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setInput("Davutpaşa fırın önünde hatalı park var"); // Örnek bir otomatik ses girişi
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '32px', marginTop: '20px', border: '1px solid #fce7f3', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#db2777', fontWeight: '900', fontSize: '14px', letterSpacing: '-0.5px' }}>🧠 ACCESS PATH AI (V2)</h3>
        <span style={{ fontSize: '10px', backgroundColor: '#fdf2f8', color: '#db2777', padding: '4px 10px', borderRadius: 'full', fontWeight: 'bold' }}>GÜN 4: AKTİF</span>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          style={{ width: '100%', padding: '12px 45px 12px 15px', marginBottom: '10px', border: '2px solid #fbcfe8', borderRadius: '15px', color: 'black', fontSize: '13px', outline: 'none' }}
          placeholder="Sesli konuşun veya engeli yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={toggleListening}
          style={{ position: 'absolute', right: '10px', top: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
          title="Sesli Komut"
        >
          {isListening ? '🛑' : '🎤'}
        </button>
      </div>

      <button
        onClick={handleAnalyze}
        style={{ width: '100%', padding: '12px', backgroundColor: '#db2777', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s' }}
      >
        {loading ? 'Yapay Zeka Analiz Ediyor...' : 'AI Analizi Başlat'}
      </button>

      {isListening && (
        <p style={{ fontSize: '10px', color: '#db2777', textAlign: 'center', marginTop: '5px', animation: 'pulse 1s infinite' }}>🎤 Sesiniz dinleniyor...</p>
      )}

      {output && (
        <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '15px', border: '1px solid #bbf7d0', fontSize: '12px', lineHeight: '1.5', fontWeight: '500' }}>
          {output}
        </div>
      )}
    </div>
  );
};

export default AiAssistant;