# Bölüm 01: Makine Öğrenmesi Nedir ve Ana Türleri

Geleneksel programlamada yazılımcı kuralları (If-Else) yazar, bilgisayara veriyi verir ve bir sonuç elde eder.
**Makine Öğrenmesi (Machine Learning - ML)** ise bunun tam tersidir: Bilgisayara "Veriyi" ve "Sonuçları" verirsiniz, bilgisayar aradaki KURALI (If-Else) kendisi bulur ve yeni gelen verilere bu kuralı uygulayarak tahmin yapar.

*Örnek:* Bir banka yazılımcısı, kredi vereceği müşteriler için "Maaşı 5 binden düşükse veya yaşı 20'den küçükse kredi verme" diye yüzlerce if-else kuralı yazmak zorundadır (Geleneksel). 
Makine Öğrenmesi ise şöyle çalışır: Bankanın son 10 yıldaki 100 bin müşterisinin (yaş, maaş) verisini ve "Krediyi ödedi / Ödemedi" sonucunu sisteme dökersiniz. Makine o devasa veri yığınındaki MANTIKLARI (Kalıpları / Pattern) kendisi keşfeder ve kuralı kendi yazar. Yeni bir müşteri geldiğinde "Bu adam %80 ödemez" diye tahminde bulunur.

## 1. Supervised Learning (Gözetimli Öğrenme)
En çok kullanılan, en popüler ve garantici yöntemdir.
- **Mantığı:** Çocuğa hayvanları öğretmek gibidir. Çocuğa bir fotoğraf gösterirsiniz ve "Bu Kedi" dersiniz. Başka bir fotoğraf gösterip "Bu Köpek" dersiniz (Etiketleme / Labeling). Makine "Etiketlenmiş (Cevabı belli olan)" verilerle eğitilir. 
- **Amacı:** Yeni bir fotoğraf gösterildiğinde eski cevaplara bakarak bunun "Kedi" mi "Köpek" mi olduğunu TAHMİN etmektir.
- **Kullanım Alanı:** Spam e-posta tespiti, Hastalık (Tümör) teşhisi, Ev fiyatı tahmini.

## 2. Unsupervised Learning (Gözetimsiz Öğrenme)
Daha gizemli bir yöntemdir.
- **Mantığı:** Modele devasa bir veri kümesi atarsınız ama "ETİKET" (Cevap Anahtarı) vermezsiniz. 
- "İşte sana 1 milyon müşterimin satın alma geçmişi... Bana bir şeyler bul, aralarında bir mantık var mı çıkar" dersiniz.
- **Amacı:** Verideki gizli kümeleri (Grupları) keşfetmektir.
- **Kullanım Alanı:** Müşteri Segmentasyonu (Örn: "Senin müşterilerinin %20'si sadece akşam 9'da bebek bezi alan bir grup" diye size yeni bir bilgi sunar). 

## 3. Reinforcement Learning (Pekiştirmeli Öğrenme)
Tıpkı bir köpeği eğitmeye benzer. Etiket yoktur, veri de yoktur. Ortada bir "Ajan (Karakter)" ve bir "Çevre" vardır.
- **Mantığı:** Ödül ve Ceza sistemidir. Model rastgele hareketler yapar. Doğru (Amaca giden) bir hareket yaptığında ona +10 Ödül (Puan) verilir. Yanlış (Duvara çarpma) hareketinde -5 Ceza verilir. 
- Model milyonlarca kez deneyip (Deneme-Yanılma) cezadan kaçarak ödülü maksimize etmeyi öğrenir.
- **Kullanım Alanı:** Otonom (Kendi Kendine Giden) Araçlar, Satranç şampiyonlarını yenen AlphaGo yapay zekası, Robotik kodlama.
