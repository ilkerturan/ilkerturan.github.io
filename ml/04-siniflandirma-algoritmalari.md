# Bölüm 04: Sınıflandırma (Classification) Algoritmaları

Hedef değişkenimiz sayısal (fiyat, sıcaklık) değil de, **Kategorik** ise (Hasta / Sağlıklı, Kedi / Köpek, Kredi Onaylandı / Reddedildi) o zaman "Sınıflandırma" algoritmaları kullanılır.

---

## 1. Lojistik Regresyon (Logistic Regression)
İsminde "Regresyon" geçmesine rağmen bir sınıflandırma algoritmasıdır. Çıktı olarak bir sayının olabilirlik oranını (Probability) 0 ile 1 arasında tahmin eder. (Sigmoid Fonksiyonu kullanır).
*Örn: Hastanın kanser olma ihtimali %85 (0.85). Eğer eşik değer %50 (0.50) ise, hasta sınıfına girer.*

## 2. K-Nearest Neighbors (KNN - K-En Yakın Komşu)
Çok basit ve mantıksal bir algoritmadır. "Bana arkadaşını söyle, sana kim olduğunu söyleyeyim" mantığıyla çalışır.
Ekrana yeni bir veri geldiğinde, kendisine **en yakın (mesafe olarak) K tane komşusuna** bakar. Komşular çoğunlukla hangi sınıftaysa, yeni gelen veriyi de o sınıfa atar.

## 3. Support Vector Machines (SVM - Destek Vektör Makineleri)
Verileri birbirinden ayıran ve iki sınıf arasındaki "Sokağı (Margin)" en geniş şekilde çizen algoritmadır. Veriler iç içe girmişse (Non-linear) "Kernel Trick" adlı matematiksel numarayla verileri 3 Boyutlu uzaya taşıyıp yukarıdan bir kılıç darbesiyle (Hyperplane) ikiye böler.

## 4. Karar Ağaçları (Decision Trees)
Nasıl ki biz insanlar "Maaşı 10 binden büyük mü? -> Evet -> Yaşı 30'dan küçük mü? -> Hayır" gibi sorularla karar veriyorsak, model de aynı mantıkla dallara (If-Else yapılarına) ayrılarak sonuca (Yaprak) ulaşır.
**Dezavantaj:** Veriyi ezberlemeye (Overfitting) aşırı müsaittir.

## 5. Rastgele Orman (Random Forest)
Karar ağaçlarının ezberleme sorununu çözen muazzam bir "Ensemble" (Topluluk) modelidir. 
Tek bir karar ağacı yerine, verinin farklı parçalarıyla birbirinden habersiz yüzlerce (veya binlerce) küçük Karar Ağacı eğitilir. Sonunda hepsi oy kullanır ve "Çoğunluğun Oyuna (Majority Voting)" göre karar verilir.

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100) # 100 tane ağaç
model.fit(X_train, y_train)
tahminler = model.predict(X_test)
```
