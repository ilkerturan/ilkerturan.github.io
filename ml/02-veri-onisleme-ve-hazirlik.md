# Bölüm 02: Veri Ön İşleme (Data Preprocessing)

Makine öğrenmesi modelleri sihirli kutular değildir. **"Çöp girerse, çöp çıkar" (Garbage In, Garbage Out)** kuralı geçerlidir. Dünyadaki verilerin %90'ı eksik, hatalı ve dağınıktır. Modeli eğitmeden önce veriyi temizlememiz ve matematiğin anlayacağı dile çevirmemiz gerekir.

---

## 1. Eksik Verilerle Başa Çıkmak (Missing Values)
Veri setinizdeki bazı satırlarda yaş, maaş gibi bilgiler boş olabilir (NaN veya Null).
- **Silmek (Drop):** Eğer eksik veri çok azsa o satırı silebilirsiniz. Ancak çoksa, değerli verileri kaybetmiş olursunuz.
- **Doldurmak (Imputation):** Eksik yerleri o sütunun ortalaması (Mean), ortancası (Median) veya en çok tekrar eden değeriyle (Mode) doldurmaktır.

```python
from sklearn.impute import SimpleImputer
# Boşlukları (NaN) ortalama ile doldur
imputer = SimpleImputer(strategy='mean')
X_doldurulmus = imputer.fit_transform(X)
```

## 2. Kategorik Verileri Sayısala Çevirmek (Encoding)
Makine öğrenmesi algoritmaları sadece sayılardan (Matrislerden) anlar. "Kırmızı", "Erkek", "İstanbul" gibi metin (String) ifadelerini sayılara çevirmemiz gerekir.

- **Label Encoding:** Genellikle sıralı (Ordinal) veriler için kullanılır (Örn: Kötü=0, Normal=1, İyi=2).
- **One-Hot Encoding:** Sıralı OLMAYAN (Nominal) veriler için kullanılır. Her bir kategori için yeni bir sütun açar (Örn: Renk_Kırmızı = 1 veya 0, Renk_Mavi = 1 veya 0).

## 3. Veri Ölçeklendirme (Feature Scaling)
Eğer bir sütunda Maaşlar (10.000 - 50.000 arası) diğer sütunda Yaş (18-60 arası) varsa, makine büyük sayıları (maaş) daha "önemli" sanabilir. Bu yüzden her şeyi aynı teraziye getirmeliyiz.

- **Standardization (Standartlaştırma):** Ortalama değeri 0, standart sapmayı 1 yapar (Genelde Z-Score kullanır).
- **Normalization (Normalizasyon - MinMax):** Tüm değerleri 0 ile 1 arasına sıkıştırır.

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_olceklenmis = scaler.fit_transform(X)
```

## 4. Train - Test Ayrımı (Train-Test Split)
Modeli eğittiğimiz verilerle (Train) aynı verileri kullanarak sınav yaparsak (Test), model soruları ezberlediği (Overfitting) için %100 başarılı gözükür ama gerçek hayatta çuvallar. 
Bu yüzden veriyi böleriz (Genelde %80 Eğitim, %20 Test).

```python
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```
