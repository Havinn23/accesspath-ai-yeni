# 🤖 Temel Özellik: Gerçek Zamanlı AI Engel Analizi (AccessPath AI)

Bu özellik, kullanıcının bulunduğu konumdaki çevresel verileri ve anlık bildirimleri işleyerek, engelli bireyler için "dinamik ve güvenli" bir rota oluşturur. Sadece statik bir harita değil, yaşayan bir rehberlik sunar.

### 🛤️ Nasıl Çalışır? (User Input -> AI Output)
1. **Girdi (Input):** Kullanıcı anlık konumunu paylaşır ve hedef noktayı belirler. Sistem, kullanıcının önündeki güzergahın sensör verilerini, belediye/kampüs bildirimlerini ve diğer kullanıcıların girdiği anlık verileri toplar.
2. **AI İşleme:** AI motoru, rotadaki kaldırımların durumunu, bozuk zeminleri veya anlık oluşan engelleri (yol çalışması, hatalı park, bozuk asansör) gerçek zamanlı analiz eder.
3. **Çıktı (Output):** Kullanıcıya en verimli rota çizilir. Eğer kullanıcının tam önünde yeni bir engel çıktıysa, AI anlık bir uyarı verir: *"Dikkat! 50 metre ilerideki rampa girişi hatalı araç parkı nedeniyle kapalı. En verimli geçiş için 20 metre geriden sağa dönün."*

### 💡 Fark Yaratan Vizyon
- **Statik Değil, Dinamik:** Harita verisi eski olsa bile, AI gerçek zamanlı verilerle kullanıcıyı yarı yolda bırakmaz.
- **Verimlilik Odaklı:** En kısa yolu değil, kullanıcının fiziksel durumuna göre "en az enerji tüketen ve en engelsiz" yolu hesaplar.

### 🛠️ Teknik Altyapı
- **Dinamik Rotalama:** React Leaflet + Routing Engine
- **AI Motoru:** Gemini Pro (Anlık veri analizi ve metin tabanlı rehberlik)
- **Veri Kaynağı:** Crowdsourcing (Kullanıcı bildirimleri) + API Entegrasyonları