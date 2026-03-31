# 🛠️ Teknoloji Yığını (Tech Stack) & Kurulum Rehberi

Bu belge, AccessPath AI projesinin geliştirilmesinde kullanılan teknolojileri ve projenin yerel ortamda (bilgisayarda) nasıl çalıştırılacağını içerir. Başlangıç seviyesine uygun, hızlı prototipleme (MVP) yapılabilen ve yapay zeka entegrasyonuna açık bir mimari seçilmiştir.

## 1. Kullanılan Teknolojiler

### 💻 Ön Yüz (Frontend): React (Vite ile) + Tailwind CSS
* **Neden Seçildi?** React, uygulamanın kullanıcı arayüzünü (harita, butonlar, profil) bileşenlere (component) bölerek yönetmeyi inanılmaz kolaylaştırır. Vite, projeyi çok hızlı başlatır. Tailwind CSS ise tasarımları ayrı bir dosyaya gitmeden, doğrudan kodun içinde hızlıca şekillendirmemizi sağlar.

### 🗺️ Harita Altyapısı: Leaflet.js (React-Leaflet)
* **Neden Seçildi?** Google Maps API başlangıçta karmaşık faturalandırma ayarları gerektirebilir. Leaflet ise tamamen ücretsiz, açık kaynaklı ve React ile entegrasyonu çok kolay olan bir harita kütüphanesidir. Gönüllü butonunu ve yol engellerini bu harita üzerine yerleştireceğiz.

### 🗄️ Arka Plan ve Veritabanı (Backend/DB): Firebase
* **Neden Seçildi?** Sıfırdan bir sunucu yazmak yerine Google'ın Firebase altyapısını kullanıyoruz. Kullanıcı kayıtları (Engelli/Gönüllü profilleri), fotoğraf yüklemeleri ve engellerin anlık konum verilerini tutmak için en hızlı ve güvenilir çözümdür.

### 🧠 Yapay Zeka (AI): Gemini API (Google AI Studio)
* **Neden Seçildi?** Kullanıcıların çektiği "engel" fotoğraflarını (hatalı park, bozuk zemin vb.) analiz edip haritaya otomatik etiketlemek ve arayüzü kişiselleştirmek için Google'ın güçlü Gemini modelini kullanıyoruz.

---

## 🚀 Kurulum Adımları (Yerel Geliştirme İçin)

Projeyi kendi bilgisayarında çalıştırmak için terminalde (komut satırında) sırasıyla aşağıdaki adımları izlemelisin (Bilgisayarında Node.js yüklü olduğu varsayılmıştır):

**Adım 1: Proje İskeletini Oluşturma**
Mevcut klasörde Vite kullanarak React şablonunu kurar:
`npm create vite@latest . -- --template react`

**Adım 2: Temel Bağımlılıkları Yükleme**
React'ın çalışması için gereken temel paketleri indirir:
`npm install`

**Adım 3: Harita ve AI Kütüphanelerini Ekleme**
Leaflet harita kütüphanesini ve Gemini API paketini projeye dahil eder:
`npm install leaflet react-leaflet @google/generative-ai`

**Adım 4: Tailwind CSS Kurulumu (Görsel Tasarım İçin)**
`npm install -D tailwindcss postcss autoprefixer`
`npx tailwindcss init -p`

**Adım 5: Uygulamayı Çalıştırma**
Her şey hazır olduğunda geliştirici sunucusunu başlatır:
`npm run dev`

*(Terminalde çıkan `http://localhost:5173` linkine tıklayarak uygulamayı tarayıcıda görebilirsin.)*