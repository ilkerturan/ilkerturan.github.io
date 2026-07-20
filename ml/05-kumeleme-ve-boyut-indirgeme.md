# Bölüm 05: Gözetimsiz Öğrenme (Kümeleme ve PCA)

Verilerimizde hedef bir sütun (Y) yoksa, yani elimizdeki binlerce müşterinin "İyi" mi "Kötü" mü olduğu belli değilse, algoritmaların bu veri içindeki "Gizli Örüntüleri" kendi kendine bulmasına **Gözetimsiz Öğrenme (Unsupervised Learning)** denir.

---

## 1. K-Means Clustering (Kümeleme)
Veri noktalarını özelliklerindeki benzerliklerine göre gruplara (Kümelere/Cluster) ayırır.
*Kullanım Alanı: Müşteri Segmentasyonu. (Örn: AVM müşterilerini "Çok harcayanlar, Az harcayanlar, Kararsızlar" gibi bizim bilmediğimiz 3 farklı gruba otomatik bölmek).*

**Nasıl Çalışır?**
1. Biz K sayısını belirleriz (Örn: K=3 küme olsun).
2. Uzayda rastgele 3 merkez noktası (Centroid) atanır.
3. Her veri kendisine en yakın merkeze bağlanır.
4. Merkezler, kendilerine bağlanan verilerin "Tam Ortasına (Ortalamasına)" doğru kayar.
5. Bu işlem merkezlerin yeri hiç değişmeyene kadar devam eder.

```python
from sklearn.cluster import KMeans

# Veriyi 3 kümeye ayır
kmeans = KMeans(n_clusters=3, random_state=42)
kumeler = kmeans.fit_predict(X)
```

## 2. Boyut İndirgeme (Dimensionality Reduction) - PCA
Günümüzde veri setleri yüzlerce, hatta binlerce sütundan (Boyuttan) oluşabilir (Örn: Resim pikselleri). 
Çok boyutlu veri:
1. Makineyi yavaşlatır.
2. Gereksiz sütunlar kafasını karıştırır (Curse of Dimensionality).
3. 2 veya 3 boyuttan yukarısı insanlar tarafından grafiklerle görselleştirilemez.

**PCA (Principal Component Analysis):** Verideki sütün sayısını düşürürken, verinin içerdiği temel bilgiyi (Varyansı) korumaya çalışan matematiksel bir formüldür.
Örneğin 100 sütunlu bir veriyi, içindeki bilginin %95'ini koruyarak sadece 10 sütuna indirebilir.
