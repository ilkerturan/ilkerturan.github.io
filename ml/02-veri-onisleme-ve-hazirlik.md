# Bölüm 02: Veri Ön İşleme (Data Preprocessing) ve Temizlik

Makine Öğrenmesinin %80'i kod yazmak veya algoritma seçmek DEĞİLDİR. İşin %80'i veriyi temizlemek, düzenlemek ve makinenin "Midesinin bulanmayacağı" hale getirmektir (Veri Ön İşleme).
"Çöp Giren, Çöp Çıkar" (Garbage In, Garbage Out) kuralı en çok burada geçerlidir. Eğer Excel tablonuzda hatalı, boş veya saçma sapan veriler varsa, dünyanın en iyi yapay zeka algoritması bile size saçma sapan bir sonuç verecektir.

## 1. Eksik Verilerle Başa Çıkmak (Missing Values)
Elinizde 10.000 kişilik bir anket sonucu var. Ancak 300 kişi "Yaş" kısmını boş (Null/NaN) bırakmış. Ne yapacaksınız?
- **Silmek (Drop):** Eğer çok az bir veri boşsa, o 300 satırı (Kişiyi) tamamen silip atarsınız. Ama çok fazlaysa silmek veri kaybıdır.
- **Doldurmak (Imputation):** Boş olan yaş değerlerine, "Diğer tüm insanların Yaş Ortalamasını (Örn: 35)" veya "Medyannı" yazarsınız. Böylece satır kurtulur ve istatistiği çok bozmaz.

## 2. Aykırı Değerler (Outliers)
Hatalı girilmiş veya sistemi yanıltacak uç verilerdir. 
- *Örnek:* Bir sınıftaki öğrencilerin maaş ortalamasını hesaplayacaksınız. Sınıftaki 19 kişinin maaşı 20.000 TL, ancak sınıfa Elon Musk (Aylık 1 Milyar TL) girdi. Eğer ortalama alırsanız tüm sınıf zengin çıkar ve modeliniz bozulur!
- **Çözüm:** Bu tarz aykırı ve uç noktalar (Outliers), analiz aşamasında (Grafiklerle tespiti yapılarak) sistemden zorla dışlanmalı (Silinmeli) veya baskılanmalıdır.

## 3. Kategorik Verileri Rakamlara Çevirmek (Encoding)
Bir makine (Bilgisayar) "Mavi", "Kırmızı" veya "İstanbul" gibi kelimeleri ANLAMAZ. O sadece sayılardan, Matrislerden ve Matematikten anlar. Bu yüzden "Yazı" olan her şeyi rakama dönüştürmek ZORUNDASINIZ.

**A. Label Encoding (Sıralı Kodlama):**
Bir hiyerarşi varsa kullanılır.
Örn: Eğitim Durumu = İlkokul (1), Lise (2), Üniversite (3).
Bunu yaparsanız makine "Üniversitenin (3), Liseden (2) matematiksel olarak daha büyük/önemli" olduğunu anlar.

**B. One-Hot Encoding (Kukla Değişkenler):**
Hiyerarşi YOKSA kullanılır.
Örn: Renkler = Kırmızı (1), Mavi (2), Yeşil (3). Eğer böyle yaparsanız, makine zannedecek ki "Yeşil (3), Kırmızıdan (1) daha büyüktür." Bu bir felakettir!
Bunu engellemek için her renk için ayrı bir sütun açılır. (Kırmızı Mı? Evet/Hayır -> 1/0). (Mavi mi? -> 0/1). Kimse kimseden büyük olmaz.

## 4. Ölçeklendirme (Feature Scaling / Normalization)
Ev fiyatı tahmin edeceksiniz. Elinizde 2 özellik var: "Oda Sayısı (1 ile 5 arası)" ve "Evin Metrekaresi (100 ile 500 arası)". 
Makine matematiksel işlem yaparken (Örn: 500 sayısı ile 3 sayısını çarparken), Metrekare (500) çok büyük bir sayı olduğu için tüm algoritmayı SADECE METREKARE yönetmeye başlar, Oda sayısını ezer geçer!
- **Çözüm:** Tüm değerleri, kendi içindeki büyüklüklerini koruyarak (Oransal olarak) **0 ile 1 arasına sıkıştırmaktır** (Min-Max Scaler). 5 oda 1 olur, 1 oda 0 olur. 500 metrekare 1 olur, 100 metrekare 0 olur. Artık iki özellik de eşit güçte (Adil) kapışır!
