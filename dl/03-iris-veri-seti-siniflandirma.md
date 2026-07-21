# Bölüm 03: Pratik Örnek - İris (Çiçek) Veri Seti ve Katmanlı Ağ

Şimdi teori ile pratiği birleştirip, dünyanın en ünlü "Hello World" veri seti olan **İris Veri Seti** ile bir "Tam Bağlantılı Yapay Sinir Ağı (Multi-Layer Perceptron / Dense Network)" mimarisini kağıt üzerinde tasarlayalım.

## Problem (Sınıflandırma):
Elinde 3 farklı Zambak (İris) türü (Setosa, Versicolor, Virginica) olan bir botanikçisiniz. Ormanda yeni bir çiçek buldunuz. Çiçeğin 4 özelliğini cetvelle ölçtünüz:
1. Çanak yaprak uzunluğu (Sepal Length)
2. Çanak yaprak genişliği (Sepal Width)
3. Taç yaprak uzunluğu (Petal Length)
4. Taç yaprak genişliği (Petal Width)

Bu 4 sayıyı Yapay Zekaya vereceksiniz ve O size bunun HANGİ TÜR (3 ihtimal) çiçek olduğunu söyleyecek.

## Mimarinin Kurulması (TensorFlow/Keras Mantığı)

### 1. Girdi Katmanı (Input Layer)
Ağımızın giriş kapısıdır. Biz çiçeğin "4 farklı fiziksel özelliğini" ölçeceğimiz için, bu katmanda **Tam 4 Adet Nöron (Girdi)** olmak ZORUNDADIR. Dışarıdan veriler (Sayılar) buradan ağa girer.

### 2. Gizli Katmanlar (Hidden Layers)
"Derin (Deep)" kelimesinin geldiği yer burasıdır. Çiçeğin yaprak özelliklerinin arasındaki GİZLİ MANTIKLARI, orantıları (Örn: Taç yaprak genişse çanak kısadır vs.) öğrenecek olan asıl Düşünme/Zeka Merkezidir.
- Biz buraya 2 tane katman ekleyelim.
- 1. Gizli Katman: 16 Adet Nöron koyalım. Aktivasyon fonksiyonu: **ReLU** (Hızlı öğrensin ve eksi değerleri sıfırlasın).
- 2. Gizli Katman: 8 Adet Nöron koyalım. Aktivasyon fonksiyonu: **ReLU**.
*(Nöron sayıları tamamen yazılımcının deneme/yanılma (Hiperparametre optimizasyonu) ile bulduğu, tecrübe işidir).*

### 3. Çıktı Katmanı (Output Layer)
Kararın (Cevabın) basılacağı ekrandır.
Biz botanikçi olarak "3 farklı Çiçek Türü" aradığımız için, burada mecburen **Tam 3 Adet Çıkış Nöronu** olmak ZORUNDADIR! (Eğer sadece kedi/köpek olsaydı 1 nöron yeterdi).
Aktivasyon Fonksiyonu: 3 tane sınıf (İhtimal) olduğu için ve bu üçünün toplamının Yüzde 100 (%100) olmasını istediğimiz için kesinlikle **Softmax** kullanılmalıdır!

### 4. Sonuç (Tahmin)
Ormanda bulduğunuz çiçeğin değerlerini `[5.1, 3.5, 1.4, 0.2]` olarak girdiniz. Ağ, içindeki yüzlerce "Ağırlığı (W)" birbiriyle çarpıp topladı, ReLU kapılarından geçirdi.
Sonuçta Output katmanındaki 3 Nöron şu yüzdeleri (Softmax) verdi:
- 1. Nöron (Setosa): **%95**
- 2. Nöron (Versicolor): **%4**
- 3. Nöron (Virginica): **%1**

Model kararını verdi: "Bu Çiçek kesinlikle SETOSA!"
