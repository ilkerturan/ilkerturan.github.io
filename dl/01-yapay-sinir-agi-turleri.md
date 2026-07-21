# Bölüm 01: Derin Öğrenme Nedir ve Nöronların Anatomisi

Makine Öğrenmesinde (Örn: Ev fiyatı, kanser tespiti), geliştirici oturup veriyi "Elle" hazırlamak (Feature Engineering - Öznitelik Çıkarımı) zorundadır. "Bak bu kedi fotoğrafı, şurasında iki üçgen kulak var, şurası kuyruk" diye makineye sütunlar halinde tüyolar vermesi gerekir.

Ancak veri çok karmaşıklaşırsa (Örn: 10 Megapiksellik bir görüntüde milyonlarca piksel renk varsa veya binlerce kelimelik bir kitapsa), insanın elle "kulak" tespit edip Excel'e girmesi imkansızdır.

İşte insan beynindeki biyolojik ağlardan ilham alınarak yaratılan **Derin Öğrenme (Deep Learning - Yapay Sinir Ağları)** bu yüzden vardır. Siz ona çıplak fotoğrafı atarsınız (Kedi veya Köpek); o resmin içindeki Kenarları, Kulakları, Çizgileri HİÇBİR İNSAN YARDIMI OLMADAN, Kendi Kendisine **Gizli Katmanlarında (Hidden Layers)** keşfeder.

## 1. Bir Nöronun (Yapay Hücrenin) Matematiği - Perceptron

Biyolojik beynimizde 86 Milyar Nöron (Hücre) birbirine Elektrik/Kimyasal sinyaller (Sinaps) atarak çalışır.
Bilgisayarda **Perceptron (Tek bir Yapay Nöron)** ise tamamen basitleştirilmiş bir matematiksel ifadedir:

**Denklem:** `Çıktı = Toplam(Girdiler * Ağırlıklar) + Bias (Eşik/Hata Payı)`

1. **Girdiler (X):** Fotoğrafın pikselleri veya ev fiyatı tahmin edilecekse Evin Metrekaresi, Oda sayısı gibi sayılardır (Örn: 150).
2. **Ağırlıklar (W - Weights):** Nöronun "Kritik Karar" noktasıdır! O girdinin NE KADAR ÖNEMLİ (Etkili) olduğunu belirleyen Çarpan katsayısıdır (Örn: 0.8). Evin Metrekaresi çok önemli olduğu için W'su 0.9'dur, Rengi az önemli olduğu için W'su 0.1'dir.
3. **Toplam Sembolü:** Tüm Girdiler ve Ağırlıklar çarpılır, sonra hepsi uç uca toplanır. (Örn: Sonuç 1500 çıktı).
4. **Aktivasyon Fonksiyonu:** Çıkan 1500 sayısı tek başına anlamsızdır ve çok büyük bir sayıdır. Bu sayıyı beynin (Nöronun) "Ateşlenip (Işık yakıp) / Sönmesine (Uykuya geçmesine)" yani 0 ile 1 arasına veya evet/hayır karar modeline sıkıştıran filtre/kapı görevini Aktivasyon Fonksiyonu yapar.

**Eğitim (Training) Ne Demektir?**
Bir Sinir Ağı aslında bomboş bir bebek beyni olarak doğar. Ağırlıkları (W) rastgele rakamlardır. "Eğitim" dediğimiz süreç; Milyonlarca kedi fotoğrafını nörondan geçirip, her seferinde hata payına bakarak (Geriye Yayılım - Backpropagation ile) aradaki AĞIRLIK (W) RAKAMLARINI güncelleyerek "Mükemmel Çarpanları (Doğru kuralı)" bulma işlemidir.
