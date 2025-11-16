# 🧠 Yapay Sinir Ağı Türleri

Yapay Sinir Ağları (YSA), veriyi işleme yöntemlerine ve öğrenme kapasitelerine göre dört ana kategoride incelenir.

## 1. Temel Ağlar: İleri Beslemeli Sinir Ağları (FNN)

İleri Beslemeli Ağlar, bilginin tek bir yönde, girdiden başlayarak doğrudan çıktıya doğru hareket ettiği en temel YSA yapısıdır.

### Çok Katmanlı Algılayıcı (Multi-Layer Perceptron - MLP)

MLP, bir **Giriş Katmanı**, bir veya daha fazla **Gizli Katman** ve bir **Çıkış Katmanı** içeren standart ileri beslemeli mimaridir. Ağdaki nöronlar katmanlar arasında **tam bağlantılıdır**. Bu ağın en kritik özelliği, gizli katmanlarında yer alan **doğrusal olmayan (non-linear)** aktivasyon fonksiyonları sayesinde verideki karmaşık ve eğrisel ilişkileri öğrenebilmesidir. Eğitim, **Geri Yayılım (Backpropagation)** algoritması ile yapılır.

MLP'nin kilit özelliği, **hafızasız** çalışmasıdır; yani her girdi örneğini (veri noktasını) izole ve önceki girdilerden bağımsız olarak işler. MLP, genel amaçlı **sınıflandırma** (kedi/köpek ayırma) ve **regresyon** (fiyat tahmin etme) problemlerinde kullanılır.

---

## 2. Hafızalı Ağlar: Tekrarlayan Sinir Ağları (RNN)

Tekrarlayan Sinir Ağları, **sıralı veriler** (metin, ses, zaman serisi) için tasarlanmıştır. Bu ağlar, dahili bir döngü kullanarak **geçmiş bilgiyi (hafızayı)** bir sonraki kararına dahil edebilir.

### Uzun Kısa Süreli Bellek (Long Short-Term Memory - LSTM)

Temel RNN'lerin uzun sıralı verilerde yaşadığı **Kaybolan Gradyan** sorununu çözmek için geliştirilmişlerdir. LSTM'ler, standart bir nöron yerine bilgiyi kontrol eden özel bir hücre yapısı kullanır. Bu hücrenin içinde **Kapılar (Gates)** bulunur:

1.  **Unutma Kapısı:** Hücre durumundaki hangi bilginin atılması gerektiğini belirler.
2.  **Giriş Kapısı:** Hangi yeni bilginin hücre durumuna eklenmesi gerektiğini belirler.
3.  **Çıkış Kapısı:** Hücredeki bilginin hangi kısmının o andaki çıktı olarak kullanılacağını belirler.

Bu karmaşık kontrol mekanizması sayesinde LSTM'ler, bağlamsal ve **uzun süreli bağımlılık** gerektiren **Makine Çevirisi** ve **Konuşma Tanıma** gibi görevlerde üstün başarı gösterir.

---

## 3. Uzamsal Ağlar: Evrişimli Sinir Ağları (CNN)

Evrişimli Sinir Ağları, özellikle **görüntü ve video** gibi uzamsal hiyerarşi içeren verileri işlemek için tasarlanmıştır.

CNN'in mimarisi, ardışık **Evrişim (Convolution)** ve **Havuzlama (Pooling)** katmanlarından oluşur.

* **Evrişim Katmanı:** Görüntü üzerinde küçük bir matris olan **filtreler (çekirdekler)** gezdirilir. Bu filtreler, görüntüdeki kenar, köşe veya doku gibi **yerel özellikleri** çıkarır. **Ağırlık Paylaşımı** prensibi sayesinde, bir filtre görüntünün tamamını tarar; bu da parametre sayısını büyük ölçüde azaltır.
* **Havuzlama Katmanı:** Evrişimden çıkan özellik haritasının boyutunu küçülterek (genellikle maksimum değeri seçerek), ağın **konumdan bağımsız** (görüntünün neresinde olursa olsun) özellikleri tanımasını sağlar ve hesaplama yükünü hafifletir.

CNN'ler, **Görüntü Sınıflandırma**, **Nesne Tespiti** ve otonom araçlar gibi görsel analiz gerektiren alanların temelini oluşturur.

---

## 4. Üretken Ağlar (Generative Adversarial Networks - GAN)

Üretken Çekişmeli Ağlar, mevcut bir veri kümesinin dağılımını öğrenerek, o veri kümesine ait **yeni ve gerçekçi** örnekler üretir.

GAN'lar, birbirine karşı rekabet eden iki sinir ağından oluşur:

1.  **Üretici (Generator):** Sıfırdan, gerçekçi görünmeye çalışan sahte veri örnekleri (örneğin fotoğraflar) üretir.
2.  **Ayırt Edici (Discriminator):** Hem gerçek veri örneklerini hem de Üretici'den gelen sahte örnekleri girdi olarak alır ve hangisinin gerçek, hangisinin sahte olduğuna karar vermeye çalışır.

İki ağın bu **Min-Max Oyunu** (çekişmesi), Üretici'yi o kadar yetenekli hale getirir ki, ürettiği çıktılar gerçeğinden ayırt edilemez. GAN'lar, yüksek kaliteli **yapay görüntü oluşturma** (Deepfake) ve **sentetik veri üretimi** gibi görevlerde kullanılır. Ancak eğitilmeleri zordur ve **Mod Çökmesi (Mode Collapse)** riski taşırlar.

---

## Sözlük (Glosary)

* **Aktivasyon Fonksiyonu:** Bir nörondan çıkan sinyalin gücünü belirleyen ve ağa **doğrusal olmayan** yetenek katan matematiksel fonksiyondur (Örn: ReLU, Sigmoid).
* **Ağırlık Paylaşımı (Weight Sharing):** CNN'lerde kullanılan bir tekniktir. Aynı filtrenin tüm girdi görüntüsü üzerinde kullanılmasıdır. Bu, öğrenilen parametre (ağırlık) sayısını önemli ölçüde azaltır.
* **Backpropagation (Geri Yayılım):** Bir sinir ağını eğitmek için kullanılan ana algoritmadır. Ağın çıktısı ile istenen çıktı arasındaki hatayı (kaybı) hesaplar ve bu hatayı ağın en arkasından öne doğru yayarak ağırlıkları günceller.
* **Evrişim (Convolution):** CNN'lerde temel işlem birimidir. Bir filtrenin (çekirdeğin) girdi görüntüsü üzerinde kaydırılarak yerel özellikleri çıkarması işlemidir.
* **Hafızasız (Memoryless):** Bir sistemin veya ağın, kararını sadece o anki girdiye dayandırması ve önceki girdileri/çıktıları hatırlamaması durumudur (MLP'ler için geçerlidir).
* **Kaybolan Gradyan (Vanishing Gradient):** Derin sinir ağlarında, özellikle temel RNN'lerde, geri yayılım sırasında hatanın (gradyanın) geriye doğru gittikçe küçülmesi ve kaybolması sorunudur. Bu durum, ağın baştaki katmanlardaki ağırlıkları güncelleyememesine neden olur.
* **Regresyon:** Makine öğreniminde sürekli bir sayısal değer tahmin etme görevidir (Örn: Ev fiyatı, sıcaklık tahmini).
* **Sınıflandırma:** Makine öğreniminde bir veri noktasını belirli bir kategoriye (sınıfa) atama görevidir (Örn: Bir görüntünün "kedi" veya "köpek" olması).
* **Uzun Süreli Bağımlılık (Long-Term Dependency):** Bir dizideki (metin, zaman serisi) karar vermek için dizinin çok başındaki bir bilgiye ihtiyaç duyma durumudur (LSTM'lerin temel çözdüğü sorun).
