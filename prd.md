# Ürün Gereksinim Belgesi (PRD): AccessPath AI (Güncel Sürüm)

## 1. Projenin Özeti ve Amacı
AccessPath AI, tekerlekli sandalye kullanıcıları için yapay zeka destekli, gerçek zamanlı bir erişilebilirlik ve yardımlaşma web uygulamasıdır. Statik haritaların aksine, kullanıcıların ve çevredekilerin anlık veri girdiği, gerektiğinde fiziksel yardım çağırabildiği ve yapay zekanın en güvenli rotayı çizdiği dinamik bir ekosistem sunar.

## 2. Kullanıcı Profilleri (Kimler Kullanacak?)
Uygulamada iki ana kullanıcı tipi bulunacaktır. Kullanıcıların sahada yardımlaşırken birbirlerini kolayca tanıyabilmeleri için gerçek fotoğraf kullanımı teşvik edilir (gizlilik tercih edenler için avatar opsiyonu da sunulmaya devam edecektir).

* **Engelli Kullanıcılar (Doğrulanmış Profil):** Uygulamaya üye olurken profil bilgilerini eksiksiz dolduran ve sisteme engellilik durumunu gösteren bir belge (rapor vb.) yükleyen kullanıcılar. Bu işlem onlara güvenilirliği artıran bir "Doğrulanmış Kullanıcı Rozeti" kazandırır.
* **Gönüllüler (Yardımseverler):** Yoldaki engellerin fotoğrafını çekip sisteme yükleyen veya çağrı geldiğinde fiziksel yardım için engelli bireyin yanına giden kişiler. Bu kişilerin platformda geçirdiği gönüllülük süreleri dijital olarak kayıt altına alınır; böylece kişilerin CV'lerinde ve profesyonel portföylerinde "sosyal sorumluluk ve gönüllülük deneyimi" olarak sergileyebilecekleri evrensel bir değer yaratılır.

## 3. Temel Özellikler (Uygulama Neler Yapacak?)

### A. Gerçekçi Kullanıcı Perspektifi ve Çoklu Ekran (Split-Screen)
* **Özellik:** Ekranın bir tarafında klasik, tepeden bakan, yüzeysel bir harita yerine; rotayı, engelleri ve yol durumunu kullanıcının göz hizasından yansıtan, daha gerçekçi ve detaylı bir arayüz/çizim bulunacak. Diğer tarafta ise o rotaya ait gerçek kullanıcıların çektiği güncel fotoğraflar yer alacak.
* **İşlev:** Kullanıcı rotaya girmeden önce çevreyi kendi perspektifinden net bir şekilde algılayacak. Görsellerin altında fotoğrafı yükleyen kullanıcının bilgisi yer alacak.

### B. Canlı Veri Girişi ve İletişim
* **Özellik:** Kullanıcılar yolda karşılaştıkları bir engeli anında fotoğraflayıp sisteme ekleyebilecek.
* **İşlev:** Görseli yükleyen kullanıcı ile doğrudan iletişime geçilebilmesi için mini bir mesajlaşma (Direct Message) altyapısı sunulacak.

### C. "Yol Arkadaşı" Çağrı Sistemi
* **Özellik:** Engelli bir birey tek başına aşamayacağı bir engelle karşılaştığında veya veriyi o an sisteme giremeyecek durumda olduğunda tek bir butona basarak çevredeki aktif gönüllülere bildirim gönderecek.
* **İşlev:** Gönüllü bildirimi kabul ettiğinde, profil fotoğrafları sayesinde taraflar kalabalık ortamlarda bile birbirini kolayca bulacak ve soruna birlikte çözüm üretecekler.

### D. Sık Kullanılan Rotalar ve Çevrimdışı (Offline) Erişim
* **Özellik:** Kullanıcılar sıkça tercih ettikleri belirli güzergahları (örneğin ev-okul, ev-iş rotası) sisteme "Favori Rota" olarak kaydedebilecek. Uygulamayı aktif ve verimli kullanan kullanıcılara, bu harita verilerini cihazlarına indirme ayrıcalığı sunulacak.
* **İşlev:** İnternet bağlantısının koptuğu veya hiç olmadığı durumlarda bile kullanıcılar, önceden indirdikleri bu rotalardaki yol durumunu ve erişilebilirlik verilerini sorunsuz bir şekilde görüntüleyebilecek. Bu özellik aynı zamanda uygulamanın düzenli kullanımını teşvik eden bir ödül mekanizması olarak çalışacak.

## 4. Yapay Zekanın (AI) Ekosistemdeki Rolü
Yapay zeka bu web uygulamasının "beyni" olarak arka planda şu işleri yapacak:

* **Akıllı Araç Tanıma:** Kullanıcı, kamerasını tekerlekli sandalyesine tuttuğunda yapay zeka aracı tarayarak modelini tespit eder. Kullanıcıya aracı hakkında (maksimum eğim çıkma kapasitesi, manevra kabiliyeti vb.) kısa bir bilgi kartı sunar ve kullanıcının aracını daha iyi tanımasını sağlar.
* **Motor Fonksiyonlara Göre Kişiselleştirilmiş Arayüz:** Kullanıcının fiziksel durumuna ve motor fonksiyon yetilerine göre arayüzdeki buton büyüklükleri, kaydırma (scroll) hassasiyeti, ekranın okunabilirliği ve etkileşim alanları yapay zeka tarafından otomatik olarak optimize edilir.
* **Görsel Veri İşleme:** Kullanıcıların yüklediği fotoğrafları anında tarayıp engelin tipini etiketler ve haritaya işler.
* **Akıllı Rotalama:** Gelen anlık raporlara ve taranan tekerlekli sandalyenin fiziksel limitlerine göre o anki en uygun alternatif rotayı öne çıkarır.

## 5. Başarı Kriterleri (Uygulamanın Tuttuğunu Nasıl Anlarız?)
* Günde/haftada oluşturulan rotalara başarıyla ulaşım oranı.
* "Yol Arkadaşı" butonuna basıldıktan sonra bir gönüllünün eşleşme ve olay yerine varma süresi.
* Sisteme yüklenen "doğrulanmış" güncel yol engeli fotoğrafı sayısı.
* Çevrimdışı kullanılmak üzere indirilen kaydedilmiş rota sayısı.