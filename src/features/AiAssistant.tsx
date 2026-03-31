import React, { useState } from 'react';

export default function AiAssistant() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!input) return;
    setLoading(true);
    
    // Yapay Zeka Düşünme Simülasyonu (Demo Amaçlı)
    setTimeout(() => {
      setOutput(`🤖 AI Analizi: "${input}" engeli başarıyla tespit edildi. Güvenliğiniz için lütfen 15 metre gerideki alternatif yaya geçidini kullanın. Harita rotanız güncelleniyor...`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-4 border border-blue-200">
      <h3 className="text-lg font-bold mb-2 text-blue-600">🧠 AccessPath AI Asistanı</h3>
      <p className="text-sm text-gray-600 mb-3">Anlık karşılaştığınız engeli bildirin, yapay zeka size yeni rota çizsin.</p>
      
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-2 text-black"
        placeholder="Örn: Rampa önünde hatalı park var"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      
      <button
        onClick={handleAnalyze}
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        {loading ? 'Yapay Zeka Analiz Ediyor...' : 'AI ile Alternatif Rota Bul'}
      </button>

      {output && (
        <div className="mt-4 p-3 bg-green-50 text-green-800 rounded-md border border-green-200 font-medium">
          {output}
        </div>
      )}
    </div>
  );
}