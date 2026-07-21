# Bölüm 08: A04 - Insecure Design (Güvensiz Tasarım)

2021 yılında OWASP Top 10 listesine "Patron" olarak direkt 4. sıradan giren yepyeni bir kategoridir.

**Felsefesi:** Bir kodun mükemmel (hatasız) yazılması, o yazılımın "Güvenli" olduğu anlamına gelmez. Eğer o yazılımın iş kuralları ve mimarisi MASADA (Tasarlanırken) yanlış düşünülmüşse, yazılımcı ne kadar iyi kod yazarsa yazsın o sistem hacklenecektir.

> "Güvenli tasarım, kodlama hatalarını engellemek değildir; MANTIK hatalarını engellemektir."

## 1. Güvensiz Tasarıma Örnekler (Mantık Hataları)

- **Sinema Bileti Satış Mantığı:**
  Sitenizde aynı anda maksimum "5 Bilet" alınabiliyor. Geliştirici kodu kusursuz yazdı. Ancak mimar, biletleri sepete atarken bir "Süre Sınırı (10 Dakika içinde almazsan sepetten düşer)" TASARLAMAYI UNUTTU. Hacker bir yazılım yazar, saniyede binlerce istek atarak sinemadaki tüm koltukları (Satın almadan) 5'er 5'er kendi sepetine (Sonsuza dek) kitler. Film gişesi kilitlenir, şirket para kaybeder. (Tasarım hatası).
  
- **Şifremi Unuttum Senaryosu:**
  Tasarımcı, Şifremi Unuttum için sadece "Gizli Soru (Annenizin kızlık soyadı)" sorulmasını tasarlamıştır. Güvenlik dünyasında gizli sorular 10 yıl önce çöpe atılmıştır (Facebook/Sosyal Mühendislik ile çok kolay bulunur). Tasarım en baştan yanlıştır, kodun suçu yoktur.

## 2. Nasıl Engellenir (Savunma)?

Geliştiriciler kod yazmaya BAŞLAMADAN AYLAR ÖNCE, sistemin Mimarı veya Analistleri masada toplanıp şu pratikleri uygulamalıdır:

- **Threat Modeling (Tehdit Modelleme):** Bir özellik tasarlanırken tahtaya şu yazılır: "Birisi bu sistemi kötüye kullanmak istese ne yapardı?" Mimariler buna göre oluşturulur.
- **Business Logic Defense:** İş kurallarında boşluk bırakılmamalıdır (Örn: Sepetteki ürüne 10 dakika süre limiti koy, Şifremi unuttum için Gizli soru değil E-mail veya SMS onayı (OTP) gönder).
- **Zayıf Parola Politikaları:** Sistem tasarlanırken şifrenin "En az 8 karakter, Büyük Harf, Sayı ve Özel Karakter" içermesi kuralı (Password Complexity) en baştan mimariye oturtulmalıdır.
