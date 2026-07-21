# Bölüm 06: Model Başarısını Ölçmek (Değerlendirme Metrikleri)

Modelinizi eğittiniz. Makine "Ben öğrendim patron, bana soru sor" dedi. Peki onun gerçekten iyi öğrendiğini nasıl bileceğiz? Belki de ezberledi?
Makineyi canlıya almadan önce Test verileriyle sınava sokarız ve karnesine (Metriklere) bakarız.

## 1. Sınıflandırma Karnesi (Karmaşıklık Matrisi - Confusion Matrix)

Bir hastanede yapay zekanız hastanın 100 röntgenine bakıp "Kanser (Pozitif)" veya "Sağlıklı (Negatif)" dedi. 4 temel sonuç çıkar:
- **True Positive (TP - Doğru Pozitif):** Hasta gerçekten kanserdi, model de Kanser dedi (Başarı!).
- **True Negative (TN - Doğru Negatif):** Adam sapa sağlamdı, model de Sağlıklı dedi (Başarı!).
- **False Positive (FP - Yanlış Pozitif / Tip 1 Hata):** Adam SAĞLIKLIYDI ama model adama "Kansersin!" dedi (Yanlış Alarm - Travma).
- **False Negative (FN - Yanlış Negatif / Tip 2 Hata):** EN KORKUNÇ HATA! Adam KANSERDİ ama model "Sapasağlamsın git evine yat" dedi. (Hasta ölebilir!).

### Metrikler:
1. **Accuracy (Doğruluk):** (TP + TN) / Tümü. Modelin genel bilme oranı. (Ama eğer 100 kişinin 99'u sağlamsa ve model "Herkese sağlam de" diyip tembellik ederse doğruluk %99 çıkar. Bu sahte bir başarıdır! İşe yaramaz.)
2. **Precision (Kesinlik):** Modelin "Kansersin" dediklerinin gerçekten kaçı kanser? (Yanlış alarm (FP) var mı ölçer).
3. **Recall / Sensitivity (Duyarlılık):** Gerçekten Kanser olan hastaların "Yüzde kaçını YAKALAYABİLDİK?" (Kaçıran (FN) ölümcül hatayı ölçer. Sağlık sektöründe Recall'un %99 olması hayat kurtarır, gerekirse yanlış alarm (Precision) düşsün ama kimseyi kaçırmayalım derler!).
4. **F1-Score:** Precision ile Recall'un (Denge) Harmonik ortalamasıdır. (Her ikisi de iyi olsun istiyorsak buna bakarız).

## 2. Regresyon Karnesi (Hata Ölçümleri)
Regresyonda sonuç "Kategori" değil, bir FİYAT (Örn: Ev 100.000 TL) olduğu için Doğru/Yanlış diyemeyiz. Evin asıl fiyatı 105.000 TL'dir. "Aradaki Farkı (Hatayı)" ölçeriz.

1. **MAE (Mean Absolute Error - Ortalama Mutlak Hata):**
   Model evi 110.000 TL tahmin etti, aslı 100.000 TL (Fark: 10). Diğer ev 95.000, aslı 100.000 (Fark: 5). Hataları toplar ve ortalamasını alır. "Modelimiz evlerin fiyatını ortalama 7.500 TL sapmayla (hatayla) biliyor" dedirtir. Müşteriye açıklaması en kolay olanıdır.
2. **MSE / RMSE (Hata Kareler Ortalaması):**
   Hataların (Farkların) Karesini alır. Neden? Eğer modeliniz bir tane eve 10.000.000 TL farkla saçma sapan bir tahmin yaptıysa, onun Karesi çok çok çok devasa bir sayı çıkar ve Modelin Karnesine BÜYÜK BİR KIRBAÇ (Ceza) vurur. "Büyük sapmaları (Outlier hatalarını) cezalandırmak" için kullanılır.

## 3. En Büyük Tuzak: Overfitting (Aşırı Uyum / Ezberleme)
Eğer modelinizin eğitim (Train) sırasındaki karnesi %99 Başarıysa, ama daha önce HİÇ GÖRMEDİĞİ yeni bir müşteri verisi (Test) geldiğinde başarısı %50'ye düşüyorsa, makine Mantığı (Kuralları) öğrenmemiş, **Sadece Geçmiş Soruları ve Cevapları EZBERLEMİŞTİR.**
- *Çözüm:* Modeli basitleştirmek, ağaç dallarını budamak (Pruning) veya Düzenlileştirme (Regularization/L1-L2) teknikleri uygulamaktır.
