# Bölüm 02: Aktivasyon Fonksiyonları (Sihirli Kapılar)

Bir yapay sinir ağına sadece toplama ve çarpma (W*X + b) işlemleri yaptırırsanız, trilyonlarca nöron bile ekleseniz elde edeceğiniz şey kocaman, tek bir DÜZ ÇİZGİDİR (Doğrusal - Linear). 
Hayat düz bir çizgi değildir. Kar fırtınası, trafik, borsa, resimdeki bir kedinin kulağının kavisi hep EĞRİLER, Dalgacıklar ve karmaşık şekillerden (Non-Linearity - Doğrusal Olmayan) oluşur.

İşte Sinir Ağının "Eğrilmesini, Kıvrılmasını" ve karmaşık zeki dünyayı anlamasını sağlayan sihir, Nöronun ucuna takılan ve dümdüz sayıyı bükerek karşı nörona ileten **Aktivasyon Fonksiyonlarıdır.**

## 1. Sigmoid (Tarihin İlk Yıldızı)
- **Matematiği:** Gelen (10.000 gibi devasa veya -500 gibi eksili) her türlü rakamı alır ve onu mikserden geçirip ZORLA **0 ile 1 arasında** bir sayıya (Örn: 0.85) sıkıştırır. Bir "S" harfi çizer.
- **Kullanımı:** Olasılık istendiğinde (Örn: Bu resmin %85 ihtimalle Köpek olması) veya Eveti/Hayırı kesin ayırmak istendiğinde "En Son Çıkış (Output) Katmanında" kullanılır.
- **Sorunu:** Geriye yayılım (Backpropagation) sırasında, çok büyük eksili sayılarda değer 0'a o kadar kitlenir ki, eğitim (gradyan) durur, Nöron ÖLÜR! (Vanishing Gradient Problemi). Bu yüzden modern ağların ortalarında ASLA kullanılmaz.

## 2. ReLU (Rectified Linear Unit - Modern Çağın Kralı)
Şu an dünyadaki tüm Chatbotların ve Görüntü İşleme modellerinin gizli katmanlarındaki (Hidden Layers) nöronların %99'u ReLU kullanır. Çok basittir!
- **Matematiği:** Formülü şudur: `Maksimum(0, X)`. 
  - Yani Nörondan çıkan sayı EKSİ (-) ise onu acımasızca 0 yapar (Nöronu uyutur, ışığını söndürür). 
  - Eğer çıkan sayı ARTI (+) ise (Örn: 15), sayıya hiç dokunmaz aynen (15 olarak) bir sonraki nörona geçirir (Ateşler!).
- **Avantajı:** Hem matematiği inanılmaz basittir (Bilgisayarı hiç yormaz), hem de Sigmoid'deki "Nöron Ölümü (Vanishing)" sorununu çözer. Eğitim çok hızlıdır.

## 3. Softmax (Çoktan Seçmeli Son Karar Mercii)
- **Matematiği:** Sigmoid'in çok sınıflı kuzenidir. En son çıkış (Output) katmanına konur.
- **Mantığı:** Ekranda "Kedi mi, Köpek mi, Kuş mu?" diye 3 ihtimal var. Çıkış nöronları saçma sapan puanlar (Örn: Kedi: 80, Köpek: 45, Kuş: 12) üretmiştir. Softmax bunları alır, toplamları kesinlikle **%100 (1.0)** yapacak şekilde onlara yüzdelik pay dağıtır.
- **Sonuç:** Kedi: %70, Köpek: %20, Kuş: %10 ihtimal çıkar. En yüksek olanı model çıktı olarak ekrana basar.
