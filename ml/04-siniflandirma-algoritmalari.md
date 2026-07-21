# Bölüm 04: Sınıflandırma (Classification) Algoritmaları

Eğer hedefiniz bir sayı değil, bir "Kategori" (Evet/Hayır, Hasta/Sağlam, Kedi/Köpek, Lise/Üni) bulmak ise, Sınıflandırma yöntemlerini kullanırsınız. En meşhur 3 algoritmayı (Gerçek hayat analojileriyle) inceleyelim.

## 1. Karar Ağaçları (Decision Trees)
İnsan beyninin karar verme şekline en çok benzeyen ve bir çocuğa anlatsanız anlayacağı kadar "Yorumlanabilir (Şeffaf)" bir algoritmadır.

**Mantığı (Soru Sorma Oyunu):**
Algoritma veriyi en iyi bölen (En çok bilgiyi veren - Information Gain) soruyu sorarak başlar.
- "Müşterinin maaşı 10 Bin TL'den fazla mı?" 
  - EVET İSE (Sağ Dal) -> "Önceden kredi çekmiş mi?" 
    - HAYIR İSE -> "KREDİ VER!"
  - HAYIR İSE (Sol Dal) -> "Yaşı 25'ten büyük mü?" 
    - HAYIR İSE -> "KREDİ VERME (RET)!"

**Avantajı:** Yönetim kuruluna "Neden bu adama kredi vermedik?" dediklerinde ağacın yapraklarını okuyarak net bir açıklama (İnsan dilinde) yapabilirsiniz.
**Dezavantajı:** Ağaç çok fazla büyürse (Yüzlerce soru sorarsa), sırf elindeki o anki verilere aşırı uyum sağlar (Ezberler / Overfitting) ve yepyeni bir dış veri geldiğinde çok kötü tahmin yapar.

## 2. Rastgele Orman (Random Forest) - Ensemble (Topluluk) Gücü
Karar ağaçlarının zayıf yönünü (Ezberleme hatasını) kapatmak için yaratılmış bir "Komite / Meclis" sistemidir.

**Mantığı:** Sadece 1 tane süper zeki ama ezberci Karar Ağacı yapmak yerine; verilerinizi yüzlerce parçaya böler ve arka planda **100 farklı küçük Karar Ağacı** üretirsiniz (Bu bir ormandır).
Bir hasta geldiğinde (Tümör var mı yok mu?), 100 ağaca birden bu hastayı sorarsınız. 
- 80 ağaç "HASTA" der.
- 20 ağaç "SAĞLAM" der.
**Oylama (Voting) Yapılır:** Çoğunluğun kararı alınır ve sonuç HASTA (Kanser) olarak müşteriye basılır. Komitenin kararı, tek bir uzmanın (ağacın) kararından her zaman daha kararlı ve güvenilirdir.

## 3. Destek Vektör Makineleri (SVM - Support Vector Machines)
Matematiksel olarak çok havalı ve çok sert sınırlar çizen bir algoritmadır.

**Mantığı (Masa Analojisi):**
Bir bilardo masasına (2 Boyutlu) Elmalar ve Armutlar serpiştirdiniz. Amacınız, masaya elinize bir TAHTA (Çizgi) alıp öyle bir noktaya koymak ki; elmalar tamamen tahtanın bir tarafında, armutlar diğer tarafında kalsın (Sınıflandırma).
Ancak SVM öyle sıradan bir tahta koymaz; Elmalara VE Armutlara (Destek noktalarına / Support Vectors) "Eşit Uzaklıkta olan ve Aralarındaki Yolu (Marjini) EN GENİŞ YAPAN" en güvenli sokağı bulup tahtayı oraya çizer.
Eğer masada elmalar ve armutlar iç içe geçmişse ve düz çizgi çizilemiyorsa; SVM "Kernel Trick (Çekirdek Hilesi)" denen bir matematik sihri yapar. Masayı ortadan ikiye katlayıp yukarı kaldırır (3. Boyuta çeker) ve aralarına havadan bir kağıt (Hiper-Düzlem) sokarak onları mükemmel şekilde ayırır.
