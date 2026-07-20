# Bölüm 04: Model Eğitimi (Optimizasyon ve Regularizasyon)

Derin öğrenme modelleri milyarlarca parametreye (ağırlığa) sahip olabilir. Bu devasa ağın nasıl "öğrendiğini" ve daha önemlisi, ezberlemeden (overfitting) nasıl gerçek bir öğrenme gerçekleştirdiğini bilmek çok önemlidir.

---

## 1. Hata (Loss) Fonksiyonları
Ağın ne kadar "kötü" performans gösterdiğini hesaplayan matematiksel formüllerdir. Amaç her zaman bu Loss değerini (hatayı) sıfıra yaklaştırmaktır.

- **MSE (Mean Squared Error):** Regresyon (Sürekli sayısal tahmin) problemlerinde kullanılır. Hatanın karesini aldığı için büyük hataları acımasızca cezalandırır.
- **Cross-Entropy Loss (Log Loss):** Sınıflandırma (Kedi/Köpek) problemlerinde kullanılır. Model "Bu kesinlikle bir Kedi (%99)" deyip cevap "Köpek" çıkarsa, Cross-Entropy cezası devasa olur. Güvene dayalı hata ölçer.

---

## 2. Optimizasyon Algoritmaları (Optimizer)
Model hatasını (Loss) ölçtükten sonra, "Bu hatayı düzeltmek için hangi ağırlıkları (W) ne kadar değiştirmeliyim?" sorusuna cevap veren algoritmalardır.

- **Gradient Descent (GD):** Hatayı azaltmak için bir dağın zirvesinden kör bir şekilde aşağı (minimum noktasına) inmeye çalışmaktır. Eğim (Türev) hesaplar.
- **SGD (Stochastic Gradient Descent):** GD'nin aksine tüm veriyi aynı anda işlemek yerine rastgele parçalarla işler. Daha hızlıdır ama daha zikzaklı ilerler.
- **Adam (Adaptive Moment Estimation):** Günümüz Derin Öğrenme dünyasının endüstri standardıdır. SGD'nin hızını ve RMSprop'un yön tayini yeteneğini birleştirir. Neredeyse tüm projelerde ilk tercih edilir.

---

## 3. Regularizasyon (Ezberlemeyi Önleme)
Eğer modeliniz Eğitim (Train) verisinde %99 başarılıyken, Test (Yeni) veride %60'a düşüyorsa, model "Öğrenmemiş", soruları "Ezberlemiştir". Buna **Overfitting (Aşırı Öğrenme)** denir.

Derin öğrenmede Overfitting ile başa çıkmak için şu yöntemler kullanılır:

### A. Dropout (Nöron Düşürme)
Eğitim esnasında ağdaki nöronların belirli bir yüzdesini (örn: %20) rastgele kapatır (öldürür). Böylece ağ, belirli nöronlara bağımlı kalmamayı, karar verme sürecini tüm ağa yaymayı öğrenir.

### B. Early Stopping (Erken Durdurma)
Eğitim sırasında Epoch (Döngü) sayısı arttıkça Train hatası hep düşer ama bir yerden sonra Test (Validation) hatası artmaya başlar (Ezberleme o an başlamıştır). Validation hatasının artmaya başladığı noktada eğitimi anında kesmeye "Early Stopping" denir.

### C. L1 ve L2 Regularization (Ağırlık Cezalandırma)
Ağın aşırı karmaşık kurallar (dev ağırlıklar - W) üretmesini engellemek için, ağırlıkları çok büyüyen nöronlara "Matematiksel Ceza" kesilir. Model basitleşmeye zorlanır.
