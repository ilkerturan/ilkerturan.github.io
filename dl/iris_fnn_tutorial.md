# Derin Öğrenme ile Iris Veri Seti Sınıflandırması

## 1. Giriş

Iris veri seti, makine öğrenmesi ve derin öğrenme konularında en klasik veri setlerinden biridir. Bu ders notunda, basit bir Yapay Sinir Ağı (FNN - Feedforward Neural Network) kullanarak Iris çiçeklerini sınıflandırmayı öğreneceksiniz.

### Veri Seti Hakkında
- **Özellikleri**: 4 adet (Sepal Length, Sepal Width, Petal Length, Petal Width)
- **Sınıflar**: 3 adet (Setosa, Versicolor, Virginica)
- **Örnek Sayısı**: 150

---

## 2. Gerekli Kütüphaneler

```python
import numpy as np
import pandas as pd
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Derin öğrenme için
import keras
from keras import layers
from keras.models import Sequential
from keras.layers import Dense
from keras.optimizers import Adam
from keras.saving import load_model
```

---

## 3. Veri Yükleme ve Ön İşleme

### 3.1 Veri Yükleme
```python
# Iris veri setini yükle
iris = load_iris()
X = iris.data  # Özellikler (4x150)
y = iris.target  # Hedef (150x1)

# Özellikleri ve sınıfları görüntüle
print(f"Veri şekli: {X.shape}")
print(f"Sınıf sayısı: {len(np.unique(y))}")
print(f"Sınıf adları: {iris.target_names}")
```

### 3.2 Eğitim-Test Ayrılması
```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Eğitim seti: {X_train.shape}")
print(f"Test seti: {X_test.shape}")
```

### 3.3 Veri Normalizasyonu
Sinir ağlarının daha iyi performans göstermesi için veriler aynı ölçeğe indirilmelidir.

```python
# StandardScaler kullanarak normalizasyon
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"Normalizasyon sonrası ortalama: {X_train_scaled.mean(axis=0)}")
print(f"Normalizasyon sonrası standart sapma: {X_train_scaled.std(axis=0)}")
```

---

## 4. Model Mimarisi

### 4.1 FNN Modeli Oluşturma
```python
model = Sequential([
    layers.Input(shape=(4,)),  # Giriş katmanı: 4 özellik
    layers.Dense(64, activation='relu'),  # 1. Gizli katman: 64 nöron
    layers.Dense(32, activation='relu'),  # 2. Gizli katman: 32 nöron
    layers.Dense(16, activation='relu'),  # 3. Gizli katman: 16 nöron
    layers.Dense(3, activation='softmax')  # Çıkış katmanı: 3 sınıf
])

model.summary()
```

### 4.2 Model Parametreleri

| Katman | Nöron | Aktivasyon | Amaç |
|--------|-------|-----------|------|
| Giriş | 4 | - | Veri giriş katmanı |
| Gizli 1 | 64 | ReLU | Öğrenme kapasitesi |
| Gizli 2 | 32 | ReLU | Öğrenme kapasitesi |
| Gizli 3 | 16 | ReLU | Boyut azaltma |
| Çıkış | 3 | Softmax | Sınıf olasılığı |

**ReLU (Rectified Linear Unit)**: f(x) = max(0, x)
**Softmax**: Multinomial sınıflandırma için çıkış olasılıklarını normalleştirir.

---

## 5. Modelin Derlenmesi

```python
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)
```

### Parametreler Açıklaması

- **Optimizer**: Adam - Adaptif Moment Tahmini, güçlü bir optimizasyon algoritması
- **Loss**: sparse_categorical_crossentropy - Çok sınıflı sınıflandırma için kayıp fonksiyonu
- **Metrics**: accuracy - Model performansı ölçüsü

**2025 Kasım Notu**: Keras artık `tensorflow.keras` yerine doğrudan `keras` paketinden import edilir. TensorFlow 2.13+ sürümleriyle `tensorflow.keras` deprecate olmaktadır.

---

## 6. Modelin Eğitilmesi

```python
# Modeli eğit
history = model.fit(
    X_train_scaled, y_train,
    epochs=100,
    batch_size=10,
    validation_split=0.2,
    verbose=1
)
```

### Parametreler
- **epochs**: 100 - Veri seti kaç kez tamamen işlenecek
- **batch_size**: 10 - Her adımda kaç örnek işlenecek
- **validation_split**: 0.2 - Eğitim verilerinin %20'si doğrulama için kullanılacak

---

## 7. Modelin Değerlendirilmesi

### 7.1 Test Seti Performansı
```python
test_loss, test_accuracy = model.evaluate(X_test_scaled, y_test)
print(f"Test Doğruluğu: {test_accuracy:.4f}")
print(f"Test Kaybı: {test_loss:.4f}")
```

### 7.2 Tahmin Yapma
```python
# Tahminler
y_pred = model.predict(X_test_scaled)
y_pred_class = np.argmax(y_pred, axis=1)

# Detaylı metrikler
print(classification_report(y_test, y_pred_class, 
                          target_names=iris.target_names))

# Karışıklık Matrisi
cm = confusion_matrix(y_test, y_pred_class)
```

### 7.3 Görselleştirme
```python
# Eğitim tarihçesi
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Eğitim Doğruluğu')
plt.plot(history.history['val_accuracy'], label='Doğrulama Doğruluğu')
plt.xlabel('Epoch')
plt.ylabel('Doğruluk')
plt.legend()
plt.title('Model Doğruluk Eğrisi')

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Eğitim Kaybı')
plt.plot(history.history['val_loss'], label='Doğrulama Kaybı')
plt.xlabel('Epoch')
plt.ylabel('Kayıp')
plt.legend()
plt.title('Model Kayıp Eğrisi')

plt.tight_layout()
plt.show()

# Karışıklık Matrisi
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=iris.target_names,
            yticklabels=iris.target_names)
plt.title('Karışıklık Matrisi')
plt.ylabel('Gerçek')
plt.xlabel('Tahmin')
plt.show()
```

---

## 8. Hiperparametre Ayarlaması (Tuning)

### İncelenecek Parametreler
1. **Katman Sayısı**: 2-5 gizli katman
2. **Nöron Sayısı**: 16-128 nöron
3. **Learning Rate**: 0.0001 - 0.01
4. **Batch Size**: 5-32
5. **Activation Function**: ReLU, Tanh, Sigmoid
6. **Dropout**: Overfitting önlemek için

### Örnek: Dropout Eklemek
```python
model_improved = Sequential([
    layers.Input(shape=(4,)),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),  # %30 dropout
    layers.Dense(32, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(16, activation='relu'),
    layers.Dense(3, activation='softmax')
])
```

---

## 9. Overfitting ve Underfitting

### Belirtiler
- **Overfitting**: Eğitim doğruluğu yüksek, test doğruluğu düşük
- **Underfitting**: Hem eğitim hem test doğruluğu düşük

### Çözümleri
- Overfitting: Dropout, L1/L2 regularization, erken durdurma
- Underfitting: Daha karmaşık model, daha fazla eğitim, özellik mühendisliği

---

## 10. Modeli Kaydetme ve Yükleme

### 10.1 Modern Format: .keras (Önerilen)

Keras 3 ile birlikte yeni .keras formatı tanıtılmıştır. Bu, H5 formatından daha verimli ve günceldir.

```python
# Modeli .keras formatında kaydet (Önerilen)
model.save('iris_model.keras')

# Modeli yükle
from keras.saving import load_model
loaded_model = load_model('iris_model.keras')

# Tahmin yap
predictions = loaded_model.predict(X_test_scaled)
```

### 10.2 Eski Format: H5 (Legacy - Artık Önerilmiyor)

H5 formatı artık legacy olarak kabul edilmekte ve deprecate (kullanımı sonlandırılmakta) olmaktadır. Yeni projeler için .keras kullanmalısınız.

```python
# NOT: Aşağıdaki kod çalışır ancak uyarı verecektir
# H5 formatı artık tercih edilmemektedir
model.save('iris_model.h5')  # Uyarı alacaksınız

# Yükleme
loaded_model = load_model('iris_model.h5')
```

### 10.3 Ağırlıkları Ayrı Kaydetme

Sadece model ağırlıklarını kaydetmek istiyorsanız:

```python
# Ağırlıkları kaydet
model.save_weights('iris_weights.weights.h5')

# Ağırlıkları yükle (model yapısı aynı olmalı)
model.load_weights('iris_weights.weights.h5')
```

### 10.4 Format Karşılaştırması

| Format | Uzantı | Durum | Açıklama |
|--------|--------|-------|----------|
| Keras v3 | .keras | ✅ Önerilen | Yeni, verimli, zip arşivi formatı |
| H5 | .h5 | ⚠️ Legacy | Eski format, deprecate olmakta |
| SavedModel | (klasör) | ✓ Desteklenen | TensorFlow format, taşınabilir |
| Ağırlıklar | .weights.h5 | ✓ Desteklenen | Sadece ağırlıklar, model yapısı gerekli |

---

## 11. Anahtar Kavramlar Özeti

| Kavram | Açıklama |
|--------|----------|
| **FNN** | Geri beslemesiz yapay sinir ağı |
| **ReLU** | Çıkış katmanı hariç gizli katmanlarda |
| **Softmax** | Çok sınıflı sınıflandırma çıkışında |
| **Batch Size** | Ağırlık güncellemesi için örnek sayısı |
| **Epoch** | Tüm verilerin bir kez işlenmesi |
| **Dropout** | Overfitting önlemek için rastgele nöronları devre dışı bırakma |
| **Normalizasyon** | Verileri ortalama 0, standart sapma 1'e ölçekleme |

---

## 12. Sonuç

Iris veri seti ile FNN kullanarak başarılı bir sınıflandırma modeli oluşturabiliriz. Tipik olarak %95-98 doğruluk elde edilebilir. Bu proje, derin öğrenme temellerini öğrenmek için mükemmel bir başlangıç noktasıdır.