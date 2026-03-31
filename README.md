
# 🗺️ AccessPath AI

## 🎯 Problem
Engelli bireyler için şehir içi ulaşım, statik fiziksel engellerin ötesinde; anlık değişen hatalı araç parkları, yol çalışmaları, bozuk asansörler ve rampalar gibi dinamik engeller nedeniyle zorlu bir sürece dönüşmektedir. Mevcut harita uygulamaları bu anlık engelleri raporlamadığı için engelli bireyler güvenli, tahmin edilebilir ve verimli bir rota çizememektedir.

## 💡 Çözüm
AccessPath AI, engelli kullanıcılar için statik bir harita değil, yapay zeka destekli dinamik bir yol arkadaşı sunar. Uygulama, Gemini Pro API entegrasyonu sayesinde topluluk bildirimlerini gerçek zamanlı analiz eder. AI motoru, kullanıcının tam önündeki engelleri tespit ederek, mesafe yerine "en az engel ve en yüksek erişilebilirlik" prensibine dayalı "en verimli" rotayı saniyeler içinde yeniden hesaplar ve sunar.

## 🚀 Canlı Demo
**Yayın Linki:** [https://accesspath-ai-yeni.vercel.app/](https://accesspath-ai-yeni.vercel.app/)  
**Demo Video:** https://www.loom.com/share/6ea68e9dc2d74d19bcdbcd5df8ce8c79 

## ✨ Temel Özellikler (AI Güncellemesi)
* 🎤 **Sesli Engel Bildirimi:** Kullanıcılar mikrofon kullanarak anlık engelleri raporlayabilir (Speech-to-Text).
* 🗺️ **Dinamik Rota Optimizasyonu:** Yapay zeka, bildirilen engele göre haritadaki rotayı canlı olarak yeniden hesaplar.
* 🔊 **Sesli Asistan Rehberliği:** AI analiz sonuçlarını ve yeni rota bilgilerini kullanıcıya sesli olarak okur (Erişilebilirlik odaklı).
* 🤖 **Anlık Veri Girişi:** Kullanıcı karşılaitığı engelin veya yol durumun görselini bulunduğu konum üzerindne sisteme yükleyerek diğer kullanıcılara sorunu bildirebilir.

## 🛠️ Kullanılan Teknolojiler
- **Framework:** React.js + Vite
- **Tasarım:** Tailwind CSS
- **Harita Altyapısı:** Leaflet.js
- **Yapay Zeka (AI):** Google Gemini Pro API
- **Deployment:** Vercel

## 💻 Nasıl Çalıştırılır?
Projeyi yerel ortamınızda ayağa kaldırmak için şu adımları izleyin:

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/Havinn23/accesspath-ai-yeni.git](https://github.com/Havinn23/accesspath-ai-yeni.git)
   ```
2. Proje klasörüne girin:
   ```bash
   cd accesspath-ai-yeni
   ```
3. Gerekli paketleri yükleyin:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```
```
