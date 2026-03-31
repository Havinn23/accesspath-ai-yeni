# AccessPath AI — Geliştirme Görev Listesi

Bu liste, `prd.md` içeriğine göre uygulamayı **adım adım** geliştirmek için hazırlanmıştır.  
Kutucukları ilerledikçe işaretleyin.

## 0) Proje kapsamı ve kararlar (başlangıç)
- [ ] **Tek platform hedefi**: Web (PWA) mı, klasik web mi? (Offline/indirme için PWA önerilir)
- [ ] **Harita sağlayıcı**: Mapbox / Google Maps / OpenStreetMap (Leaflet) seçimi
- [ ] **Konum servisleri**: GPS izni, arka planda takip gereksinimi, gizlilik sınırları
- [ ] **Bildirim kanalı**: Web push (PWA), e-posta, SMS (opsiyonel) seçimi
- [ ] **AI yaklaşımı**: MVP’de kural tabanlı etiketleme + sonra model mi, doğrudan model entegrasyonu mu?
- [ ] **Gizlilik varsayılanları**: Fotoğraf/konum paylaşımında varsayılan görünürlük ve saklama süresi

## 1) Temel altyapı (MVP’nin zemini)
- [ ] **Repo iskeleti**: frontend + backend + ortak `README`
- [ ] **Ortam yönetimi**: `.env.example`, geliştirme/prod konfigürasyonu
- [ ] **Veritabanı şeması (ilk sürüm)**:
  - [ ] Kullanıcılar (engelli/gönüllü), profil alanları, foto/avatar
  - [ ] Doğrulama belgesi yükleme + inceleme durumu + rozet
  - [ ] Engel raporları (konum, zaman, foto, etiket, güven skoru)
  - [ ] Mesajlaşma (DM) konuşmaları + mesajlar
  - [ ] Yol arkadaşı çağrıları (istek, konum, durum, eşleşen gönüllü)
  - [ ] Favori rotalar + offline paketleri (metadata)
- [ ] **Kimlik doğrulama**:
  - [ ] Kayıt / giriş / çıkış
  - [ ] Kullanıcı tipi seçimi (Engelli / Gönüllü)
- [ ] **Yetkilendirme**:
  - [ ] Doğrulanmış rozet görünürlüğü
  - [ ] DM ve çağrı sisteminde spam/istismar önlemleri (rate limit, bloklama)
- [ ] **Gözlemlenebilirlik**: loglama, hata yakalama, temel metrik altyapısı

## 2) Profil ve doğrulama (PRD: Doğrulanmış engelli profili)
- [ ] **Profil ekranı**:
  - [ ] Profil fotoğrafı yükleme + avatar seçeneği
  - [ ] Temel bilgiler (ad/soyad veya takma ad, şehir vb. gerekli alanlar)
- [ ] **Engelli kullanıcı doğrulaması**:
  - [ ] Belge yükleme akışı (rapor vb.)
  - [ ] Doğrulama durumu: beklemede / onaylandı / reddedildi
  - [ ] “Doğrulanmış Kullanıcı Rozeti” UI gösterimi
- [ ] **Gönüllülük kayıtları (PRD: dijital kayıt/CV değeri)**:
  - [ ] Gönüllünün kabul ettiği çağrılar ve sürelerin kaydı
  - [ ] Profilde “gönüllülük süresi/etkinlikleri” özet görünümü
  - [ ] Basit dışa aktarma (PDF/CSV) (opsiyonel)

## 3) Harita + “gerçekçi perspektif” split-screen (PRD: A)
- [ ] **Harita temel ekranı**:
  - [ ] Mevcut konum gösterimi
  - [ ] Başlangıç/varış seçimi + rota çizimi (baseline)
- [ ] **Split-screen düzen**:
  - [ ] Sol: rota/engel bilgisi (harita veya alternatif çizim)
  - [ ] Sağ: rotaya ait güncel fotoğraflar akışı
  - [ ] Fotoğraf kartı: yükleyen kullanıcı bilgisi + zaman
- [ ] **“Kullanıcı perspektifi” katmanı**:
  - [ ] MVP: 2D harita + eğim/engel yoğunluğu overlay (kolay başlatma)
  - [ ] V2: “göz hizası” görünüm için 3D/StreetView benzeri yaklaşım (sağlayıcıya bağlı)
- [ ] **Rota üzerindeki engel işaretleri**:
  - [ ] Engel pin/heatmap
  - [ ] Filtreleme (engel tipi, tarih, doğrulanmış kaynak vb.)

## 4) Canlı veri girişi: engel fotoğrafı yükleme + işleme (PRD: B, AI: görsel işleme)
- [ ] **Engel ekle akışı**:
  - [ ] Fotoğraf çek/yükle
  - [ ] Konum otomatik alma + manuel düzeltme
  - [ ] Kısa açıklama + (varsa) “aşılamaz” işareti
- [ ] **AI/etiketleme (MVP)**:
  - [ ] İlk sürüm: kullanıcı seçimi + basit sınıflar (kaldırım, rampa, merdiven, çukur vb.)
  - [ ] Sonraki: fotoğraftan otomatik etiket önerisi
- [ ] **Haritaya işleme**:
  - [ ] Yükleme sonrası engel kaydı + haritada görünürlük
  - [ ] Engel “tazelik” mantığı (eski kayıtların düşürülmesi/uyarısı)

## 5) Mini mesajlaşma (Direct Message) (PRD: B)
- [ ] **DM başlatma**:
  - [ ] Engel fotoğrafını yükleyen kişiyle “mesaj gönder” butonu
- [ ] **Konuşma ekranı**:
  - [ ] Mesaj listesi + yeni mesaj gönderme
  - [ ] Okundu/iletilmedi durumu (opsiyonel)
- [ ] **Güvenlik/anti-abuse**:
  - [ ] Spam limiti
  - [ ] Kullanıcı engelleme/şikayet (opsiyonel)

## 6) “Yol Arkadaşı” çağrı sistemi (PRD: C)
- [ ] **Çağrı oluşturma**:
  - [ ] Tek tuş çağrı (konum + kısa not)
  - [ ] Yakındaki aktif gönüllülere bildirim (yarıçap + uygunluk)
- [ ] **Gönüllü tarafı**:
  - [ ] Çağrı listesi / anlık bildirim
  - [ ] “Kabul et” → eşleşme ve yönlendirme
- [ ] **Eşleşme deneyimi**:
  - [ ] Tarafların profil fotoğrafı + temel tanıma bilgisi
  - [ ] Navigasyon / “ben geldim” akışı
- [ ] **Çağrı yaşam döngüsü**:
  - [ ] Oluşturuldu → eşleşti → yolda → tamamlandı / iptal
  - [ ] Süre ölçümü (eşleşme ve varış süreleri) (PRD başarı kriteri)

## 7) Favori rotalar + çevrimdışı erişim (PRD: D)
- [ ] **Favori rota kaydetme**:
  - [ ] Ev-okul / ev-iş gibi rotayı adlandırma ve saklama
- [ ] **Offline paketleme (PWA önerisi)**:
  - [ ] Favori rotayı “indir” (rota geometrisi + ilgili engel kayıtları + foto metadata)
  - [ ] İnternet yokken görüntüleme
- [ ] **Ödül mekanizması (PRD: aktif kullanıcıya ayrıcalık)**:
  - [ ] Aktiflik skoru tanımı (ör. haftalık katkı, oturum sayısı)
  - [ ] Offline indirme yetkisini koşula bağlama

## 8) AI özellikleri (PRD bölüm 4)
### 8.1 Akıllı araç tanıma (tekerlekli sandalye)
- [ ] **Kamera ile tarama akışı** (web camera permission + UX)
- [ ] **Model tespiti** (MVP: sınırlı model listesi veya manuel seçim fallback)
- [ ] **Bilgi kartı**: maksimum eğim, manevra kabiliyeti gibi alanlar

### 8.2 Motor fonksiyonlara göre kişiselleştirilmiş arayüz
- [ ] **Erişilebilirlik ayarları ekranı**:
  - [ ] Buton boyutu, kontrast, yazı boyutu
  - [ ] Scroll hassasiyeti / etkileşim alanı genişliği
- [ ] **Otomatik öneri**:
  - [ ] Basit onboarding soruları + önerilen ayarlar (MVP)
  - [ ] Sonraki: davranışa göre ince ayar

### 8.3 Görsel veri işleme (engel sınıflama)
- [ ] **Etiket seti tanımı** + eğitim/iyileştirme döngüsü
- [ ] **Model entegrasyonu** (servis veya yerel inference stratejisi)
- [ ] **Kalite kontrol**: yanlış etiket bildirme, topluluk doğrulaması (opsiyonel)

### 8.4 Akıllı rotalama (tekerlekli sandalye limitlerine göre)
- [ ] **Tekerlekli sandalye limitleri verisi** (eğim, kaldırım yüksekliği vb.)
- [ ] **Rota skorlaması**:
  - [ ] Engellerin ağırlıklandırılması
  - [ ] Tazelik/güven skoru ekleme
- [ ] **Alternatif rota önerisi** (UI: “en güvenli rota” vurgusu)

## 9) Başarı kriterleri için ölçümleme (PRD bölüm 5)
- [ ] **KPI tanımları ve event’ler**:
  - [ ] Rotaya başarıyla ulaşım oranı
  - [ ] Yol arkadaşı: eşleşme süresi, varış süresi
  - [ ] Doğrulanmış güncel engel fotoğrafı sayısı
  - [ ] Offline indirilen favori rota sayısı
- [ ] **Dashboard (minimum)**:
  - [ ] Admin veya internal sayfa: KPI özetleri

## 10) Yayına hazırlık
- [ ] **Gizlilik/KVKK metinleri** + fotoğraf/konum rızası
- [ ] **Performans**: harita marker optimizasyonu, görsel sıkıştırma
- [ ] **Güvenlik**: dosya upload güvenliği, erişim kontrolleri, rate limit
- [ ] **Dağıtım**: staging + prod ortamları

# 📋 AccessPath AI - Görev Listesi (Tasks)

## ✅ Hazırlık Aşaması
- [x] Proje klasörü oluşturuldu.
- [x] PRD (Ürün Gereksinim Belgesi) hazırlandı ve kaydedildi.
- [ ] Uygulama arayüz taslağı (Wireframe) belirlenecek.

## 🛠️ Teknik Geliştirme (Yazılım)
- [ ] Web projesinin temel iskeletinin kurulması (React/Next.js).
- [ ] Harita entegrasyonu (Mapbox veya Google Maps API).
- [ ] Kullanıcı kayıt ve giriş sistemi (Auth).
- [ ] Belge yükleme ve "Doğrulanmış Rozet" sistemi.

## 🧠 Yapay Zeka Özellikleri
- [ ] Tekerlekli sandalye tanıma (Görüntü İşleme) modülü.
- [ ] Yol engeli fotoğraf analizi algoritması.
- [ ] Kişiselleştirilmiş arayüz optimizasyon sistemi.

## 🤝 Sosyal ve Gönüllülük
- [ ] "Yol Arkadaşı" (Yardım Çağrısı) butonu ve bildirim sistemi.
- [ ] Gönüllü profil ve puanlama/portfolyo altyapısı.

## 📱 İleri Özellikler
- [ ] Çevrimdışı (Offline) harita indirme özelliği.
- [ ] Gerçekçi perspektif çizim modu.
