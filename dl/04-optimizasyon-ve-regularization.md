# Bölüm 04: Eğitimi Başarmak (Loss, Optimizer ve Overfitting)

Bir sinir ağını kurmak işin kolayıdır (Keras ile 5 satır kod). Asıl zor olan ve mühendislik gerektiren kısım o ağı EĞİTMEK (Ona mükemmel Ağırlıkları/W'leri buldurmak) ve ezberlemesini önlemektir.

## 1. Hata (Kayıp) Fonksiyonu: Loss Function (Maliyet)
Model eğitime başlarken Ağırlıklar (W) rastgele olduğu için ilk tahminleri BERBATTIR! Bir Setosa çiçeği fotoğrafına "Bu Versicolor" der. 
Loss Function, Modelin "NE KADAR YANILDIĞINI" hesaplayan cezalandırıcı bir metrik veya öğretmendir.
- Kategorik işlerde (Çiçek, Kedi/Köpek) **Cross-Entropy Loss** kullanılır.
- Ev fiyatı (Sayısal Regresyon) işlerinde **Mean Squared Error (MSE)** kullanılır.
Amacımız Loss (Hata) değerini sürekli düşürerek **Sıfıra** yaklaştırmaktır.

## 2. Optimizatör (Optimizer): Dağdan İniş Sanatı
Model Hata (Loss) yaptığını anladı, peki kendini nasıl düzeltecek? Nöronlardaki o 100.000 tane Ağırlığı (W) hangi yöne doğru (Artırarak mı, azaltarak mı) değiştireceğini nasıl bulacak?
İşte bu matematiksel sihrin adı **Gradient Descent (Gradyan İnişi)** dir.
- **Analoji:** Zifiri karanlık, sisli bir dağın tepesindesiniz (Loss: Yüksek / Hatalısınız). En aşağı vadiye (Loss: 0 / Mükemmeliyet) ulaşmak istiyorsunuz. Etrafınızı göremiyorsunuz, bu yüzden ayağınızla yeri yollayıp "Eğim (Türev / Gradyan)" nerede aşağı iniyorsa o tarafa doğru adım atıyorsunuz. Sonunda vadiye ulaşıyorsunuz.
- **Adam (Adaptive Moment Estimation):** Şu an sektördeki en zeki, en popüler Optimizatör motorudur. Dağdan inerken düzlüğe gelirse koşar, vadinin dibine yaklaşınca adımlarını (Learning Rate) otomatik yavaşlatır ki karşı tepeye fırlamasın.

## 3. Ezberlemeyi Önlemek (Regularization / Düzenlileştirme)
Eğer Modelinize binlerce kedi fotoğrafı verirseniz ve modeli kapasitesinden çok fazla Nöronla (Örn: 1000 Katman) donatırsanız, model "Kedinin Mantığını (Kulak/Tüy)" öğrenmeyi BIRAKIR! Modeli eğitirken kullandığınız fotoğraflardaki "Güneşin açısını, arka plandaki ağacı veya piksel lekelerini" EZBERLER (Overfitting - Aşırı Öğrenme/Uyum). Yeni bir kedi fotoğrafı gösterdiğinizde "Arkasında ağaç yok bu kedi değil" diyerek çuvallar.

**Savunma Yöntemleri:**
1. **Dropout (Unutma / Seyreltme):** Eğitim sırasında, gizli katmandaki nöronların (Örn: %20'sini) her adımda RASTGELE OLARAK FİŞTEN ÇEKER (Kapatır/Uyutur). Ağın içindeki hücreler "Nasıl olsa yandaki hücre bu işi çözüyor" diye tembellik edemez veya ezber yapamaz, herkes her şeyi genel hatlarıyla öğrenmek ZORUNDA KALIR. Muazzam bir "Zorla Mantık Öğretme" tekniğidir.
2. **L1/L2 Regularization:** Çok büyüyen ve ezber yapan Ağırlıklara (W) matematiksel olarak ağır "Cezalar" keserek onları küçültür.
3. **Early Stopping (Erken Durdurma):** Model eğitim grafiğinde başarıyı ezberlemeye çevirdiği noktayı (Test hatasının artmaya başladığı V noktasını) tespit eder ve işlemi o saniye Çat! diye durdurur. Eğitimi erken bitirerek beyni yanmaktan kurtarır.
