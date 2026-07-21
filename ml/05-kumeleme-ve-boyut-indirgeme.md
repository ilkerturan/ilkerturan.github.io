# Bölüm 05: Kümeleme (Clustering) ve Gözetimsiz Öğrenme

Elimizde etiket (Cevap/Hedef/Para/Kategori) yok! Sadece devasa, yığınla veri (Örn: Müşteri hareketleri) var. Gözetimsiz öğrenmenin (Unsupervised Learning) amacı kaosun içinden bir düzen çıkarmaktır.

## 1. K-Means Kümeleme (Clustering)
Müşteri Segmentasyonu veya Pazar Analizi yapmak isteyen şirketlerin (Trendyol, Netflix, Amazon) bel kemiği algoritmasıdır.

**Amaç:** Verileri (Müşterileri) "Benzer özelliklerine göre" X adet farklı gruba/kümeye ayırmaktır.

**Mantığı (Nasıl Çalışır?):**
Siz algoritmaya **K sayısı** (Örn: K=3 olsun, yani "Bana bu müşterileri 3 farklı gruba ayır") verirsiniz.
1. Algoritma haritanın içine rastgele 3 tane nokta (Merkez Nokta / Centroid) atar. (Örn: Kırmızı, Mavi, Yeşil liderler).
2. Haritadaki her bir müşteri, kendisine en yakın olan "Liderin" rengini (Takımını) alır. Herkes bir takım seçer.
3. Takımlar oluştuktan sonra, her takım kendi içindeki insanların "Tam Orta Noktasını (Ortalamasını)" hesaplar ve takım lideri (Nokta) o yeni merkeze taşınır.
4. Liderler yer değiştirdiği için müşteriler tekrar kendine en yakın olan lideri hesaplar ve bazılarının takımı değişir.
5. Bu süreç (İterasyon), liderler artık GIDIM BİLE hareket etmeyene kadar döner. Durduğunda işlem biter.

**Sonuç:** Bir bakarsınız ki elinizde 3 kusursuz küme oluşmuş.
- Küme 1: Gündüz alışveriş yapan 50 yaş üstü kadınlar (Bebek bezi grubu).
- Küme 2: Gece saat 3'te PC parçası alan gençler (Gamer grubu).
Siz de Pazarlama ekibine gidip "Gece kampanyasını 2. Kümeye yollayın" dersiniz.

## 2. Boyut İndirgeme (PCA - Temel Bileşen Analizi)
Veri bilimcilerin sistem çökmelerini ve aşırı donanım maliyetini engellemek için kullandığı "Veri Sıkıştırma" sanatıdır (WinRAR gibidir ama mantığı farklıdır).

**Problem:** Modern bir ev tahmini veri setinde sadece Oda ve Metrekare yoktur. "Balkon var mı? Güneş görüyor mu? Okula 100m mi? Hastane 3km mi? Duvar rengi? Çatı tipi?" gibi tam 250 farklı ÖZELLİK (Sütun/Boyut - Dimension) vardır. Makineye 250 boyutlu veri atarsanız "Boyutların Laneti (Curse of Dimensionality)" yaşanır. Model aşırı yavaşlar, bilgisayarın RAM'i patlar ve ezberleme (Overfitting) başlar.

**Çözüm (PCA):**
PCA der ki: "250 sütunun hepsini alma! Birbiriyle çok bağlantılı olan sütunları EZIP TEK BİR SÜTUN YAP."
Örneğin; "Evin Genişliği", "Evin Uzunluğu" ve "Oda Sayısı" gibi 3 farklı sütun aslında hep aynı şeyi (Evin Büyüklüğünü) anlatıyor. PCA matematiği (Matris varyansları) kullanarak bu 3 sütunu eritip "Büyüklük-Skoru" adında YEPYENİ, uydurma tek bir sütun yapar.
Siz 250 boyutlu veriyi, Verinin KÖK BİLGİSİNİN (Özünün) %95'ini koruyarak sadece 10 Boyuta (10 Sütuna) indirgersiniz (Sıkıştırırsınız). Makine 10 sütunu saniyeler içinde eğitip size cevabı mükemmel bir şekilde verir.
