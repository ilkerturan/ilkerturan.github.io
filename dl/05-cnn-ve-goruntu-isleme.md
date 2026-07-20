# Bölüm 05: Evrişimsel Sinir Ağları (CNN)

Geleneksel Yapay Sinir Ağları (MLP / ANN), resim gibi verileri işlemek için korkunç derecede kötüdür. Resimdeki pikselleri düz bir çizgi halinde ağa verdiğimizde resmin tüm uzamsal (spatial) yapısı bozulur.
Ayrıca 1000x1000 piksel bir renkli resim 3 Milyon girdi demektir. Bunu standart bir ağa sokmak bilgisayarı kilitler.

İşte tam burada imdada **CNN (Convolutional Neural Networks)** yetişir. Otonom araçlar, yüz tanıma ve kanser tespiti gibi tüm görüntü işleme teknolojilerinin kalbidir.

---

## 1. Bilgisayar Görüntüyü Nasıl Görür?
Bizim gördüğümüz bir kedi resmi, bilgisayar için sadece **Piksellerden** oluşan koca bir sayı (Matris) tablosudur. Renkli resimler RGB (Kırmızı, Yeşil, Mavi) olmak üzere üst üste binmiş 3 farklı matristen oluşur.

## 2. Convolution (Evrişim) İşlemi
Resmin her pikselini tek tek incelemek yerine, resmin üzerinde küçük bir **Filtre (Kernel)** (örn: 3x3 bir büyüteç) gezdirilir.
- İlk katmandaki filtreler resimdeki **Kenarları (Dikey, Yatay)** tespit eder.
- İleriki katmanlardaki filtreler kenarları birleştirip **Şekilleri (Yuvarlak, Üçgen)** bulur.
- Son katmanlardaki filtreler şekilleri birleştirip **Nesneleri (Göz, Kulak, Kuyruk)** tespit eder.

## 3. Pooling (Havuzlama)
Evrişim işleminden çıkan veri haritası hala çok büyüktür. Pooling (Genelde Max Pooling kullanılır), resmi sıkıştırarak (Örn: 2x2'lik piksel grubundaki en büyük sayıyı alarak) görüntünün boyutunu yarıya indirir.
- Bilgisayarın hesaplama yükünü inanılmaz oranda azaltır.
- Resimdeki kedinin sağda veya solda olmasından (konumdan) bağımsız olarak kediyi tanımasını sağlar (Translation Invariance).

## 4. Flattening (Düzleştirme) ve Çıktı
Yeterince Convolution ve Pooling yapıldıktan sonra, en son elde edilen özellik haritası tek boyutlu düz bir çizgiye (Flatten) dönüştürülür ve klasik (ANN) sinir ağına bağlanır. Ağ bu özelliklere bakarak resmin "%80 Kedi, %20 Köpek" olduğuna karar verir.

---

## 5. Transfer Learning (Transfer Öğrenme)
Görüntü işleme modellerini sıfırdan eğitmek devasa veri seti ve haftalar süren GPU (Ekran Kartı) gücü gerektirir. 

Bunun yerine, Google (Inception), Microsoft (ResNet) veya Oxford (VGG16) gibi devlerin günlerce eğitip milyarlarca resmi tanımasını öğrettiği modelleri alırız. Bu modellerin sadece **son karar verme katmanını** kesip atar, kendi projemize (örn: Röntgen'den zatürre bulma) uygun yeni bir katman takarız.

Böylece binlerce resimle ve 10 dakikalık eğitimle devasa bir doğruluk elde edebiliriz!
