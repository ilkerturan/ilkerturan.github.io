# Bölüm 06: Model Değerlendirme ve Performans Metrikleri

Eğittiğimiz modelin "Ne kadar iyi" olduğunu sadece %90 Başarılı (Accuracy) diyerek ölçemeyiz. Özellikle dengesiz veri setlerinde Accuracy devasa bir yalandır.

*(Örn: 100 hastanın sadece 1'i kanser, 99'u sağlıklıysa. Model hiçbir şey öğrenmeden herkese "Sağlıklı" derse bile %99 doğru bilmiş olur. Ama o 1 kanserli hastayı kaçırmak ölümcüldür!)*

---

## 1. Sınıflandırma Metrikleri (Confusion Matrix)
Modelin tahminlerini Gerçek Değerlerle karşılaştıran bir (2x2) matristir.

- **TP (True Positive):** Kanserliye kanser dedik (Doğru).
- **TN (True Negative):** Sağlıklıya sağlıklı dedik (Doğru).
- **FP (False Positive):** Sağlıklıya kanser dedik (Yanlış Alarm - Tip 1 Hata).
- **FN (False Negative):** Kanserliye sağlıklı dedik (ÖLÜMCÜL HATA - Tip 2 Hata).

### Precision (Kesinlik)
"Kanser" dediklerimizin yüzde kaçı GERÇEKTEN kanserdi? (FP'ye odaklanır).
*Spam mailler için çok önemlidir. Önemli bir maile Spam dersek kötü olur.*

### Recall (Duyarlılık - Hassasiyet)
Gerçekte "Kanser" olan hastaların yüzde kaçını TESPİT EDEBİLDİK? (FN'ye odaklanır).
*Sağlık ve güvenlik sektöründe en kritik metriktir.*

### F1-Score
Precision ve Recall'un Harmonik Ortalama değeridir. Tek bir sayı ile modelin genel performansını en adil şekilde yansıtır.

## 2. Regresyon Hata Metrikleri
Hedefimiz sayı (fiyat) tahmin etmek olduğu için, modelin tahmin ettiği fiyat ile gerçek fiyat arasındaki **Mesafeye (Hataya)** bakılır.

### MAE (Mean Absolute Error - Ortalama Mutlak Hata)
Tüm hataların mutlak değerini alıp ortalamasını bulur. Basittir ama uçuk (aykırı) hataları pek önemsemez.

### MSE (Mean Squared Error - Ortalama Kare Hata)
Hataların (mesafelerin) karesini alır. Böylece model büyük bir hata yaptıysa, karesi alındığı için hata devasa gözükür ve modeli fena cezalandırır.

### RMSE (Root Mean Squared Error)
MSE'nin kareköküdür. Karesi alınarak şişirilmiş sayıyı, tekrar evin fiyatı (Dolar, TL vs) birimine çevirerek bizim için anlaşılır kılar. Regresyonda en çok bu kullanılır.

```python
from sklearn.metrics import root_mean_squared_error, accuracy_score, classification_report

# Sınıflandırma Raporu (Precision, Recall, F1 aynı anda)
print(classification_report(y_test, siniflandirma_tahminler))
```
