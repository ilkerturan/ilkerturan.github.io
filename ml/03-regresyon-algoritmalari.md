# Bölüm 03: Regresyon (Tahmin) Algoritmaları

Regresyon, Gözetimli Öğrenmenin (Supervised Learning) temelidir. Çıktı (hedef) değişkenimiz **Sürekli (Sayısal)** bir değer ise (Ev fiyatı tahmini, hava sıcaklığı tahmini, maaş tahmini) bu bir regresyon problemidir.

---

## 1. Basit Doğrusal Regresyon (Simple Linear Regression)
En temel tahmin algoritmasıdır. Sadece 1 adet bağımsız değişken (X) kullanarak 1 adet bağımlı değişkeni (y) tahmin etmeye çalışırız.
*Örnek: "Evin metrekare büyüklüğüne (X) bakarak, Evin fiyatını (y) tahmin etmek."*

Amaç, veri noktalarının arasından geçen ve **toplam hatanın en az olduğu** "En İyi Uyum Doğrusunu" (Best Fit Line) çizmektir.

Formülü Lisedeki doğru denklemidir: `y = mx + b` (veya `y = Wx + b`)
- **x:** Girdi (Metrekare)
- **W (Weight):** Ağırlık/Eğim (Metrekare başına fiyat artışı)
- **b (Bias):** Sabit değer (Sıfır metrekare arsanın baz fiyatı)

## 2. Çoklu Doğrusal Regresyon (Multiple Linear Regression)
Gerçek hayatta bir evin fiyatını sadece metrekaresi belirlemez. Oda sayısı, merkeze uzaklığı, bina yaşı da etkilidir. Birden fazla girdi (X1, X2, X3) varsa buna Çoklu Regresyon denir.

Formül uzar: `y = W1*X1 + W2*X2 + W3*X3 + b`

```python
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train) # Modeli eğit
tahminler = model.predict(X_test) # Tahmin yap
```

## 3. Polinomsal Regresyon (Polynomial Regression)
Verilerimiz her zaman dümdüz bir çizgi (Doğrusal) şeklinde ilerlemez. Bazen eğrisel (Kıvrımlı) artışlar olur (Örn: Virüsün yayılım hızı, roket fırlatılışı).

Doğrusal bir çizgi bu verilere uyum sağlayamayacağı (Underfitting olacağı) için, X değerlerinin karesini ($X^2$) veya küpünü alarak modelin kıvrılması (eğri çizmesi) sağlanır.
