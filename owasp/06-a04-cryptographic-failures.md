# Bölüm 06: A02 - Cryptographic Failures (Kriptografik Hatalar)

Eski adıyla "Hassas Veri İfşası (Sensitive Data Exposure)". Kredi kartı numaraları, Şifreler, TC Kimlik Numaraları veya Hastane kayıtları gibi verilerin Veritabanında (Data at Rest) veya İnternet üzerinden iletilirken (Data in Transit) açık metin (Düz Yazı) halinde bırakılması veya yanlış şifreleme algoritmalarının kullanılmasıdır.

## 1. Veri İletimi (Data in Transit) Hatası
- **Problem:** Müşteri, web sitesine şifresini yazıp Enter'a basar. Eğer o web sitesinin adresi `http://` (S'si yok) ile başlıyorsa, müşterinin tarayıcısından çıkan şifre, evin internet kablolarından geçerken "Düz Yazı" olarak gider. Aynı kafede Wi-Fi ağına bağlı olan bir hacker, havayı koklayarak (Packet Sniffing) şifreyi aynen görebilir.
- **Çözüm:** Tüm web siteleri zorunlu olarak **HTTPS** (TLS/SSL Sertifikası) kullanmalıdır. HTTPS sayesinde veri daha tarayıcıdan çıkarken kilitlenir, havada uçuşan veri anlamsız (Ajsdk12!3124sddsa) karakterlerdir, sadece karşıdaki sunucu bu kilidi açabilir.

## 2. Veri Depolama (Data at Rest) Hatası ve Şifreler (Passwords)
Dünya üzerindeki hiçbir şirket (Banka dahil), sizin şifrenizi (Örn: `Galatasaray1905`) veritabanında düz bir yazı olarak SAKLAMAMALIDIR! Eğer saklarsa ve veritabanı çalınırsa milyonlarca insanın şifresi ifşa olur.

**Şifreleme (Encryption) vs Hashleme (Hashing):**
- **Şifreleme (Encryption) Çift Yönlüdür:** "Anahtar" kullanılarak `1234` verisi `Abx9` yapılır. Anahtar kimdeyse tekrar `1234` yapabilir. Kredi kartı numaraları için kullanılır (Çünkü para çekerken bize asıl numara lazım). AES-256 algoritması kullanılmalıdır.
- **Hashleme (Tek Yönlüdür):** Şifreler İÇİN ZORUNLUDUR! Bir kelimeyi mikserden geçirip çorbaya çevirmektir. `Ilker` kelimesinin Hash değeri her zaman `9A8B7C` çıkar. Ama dünyadaki hiçbir süper bilgisayar `9A8B7C` yi geriye çevirip de bunun "Ilker" olduğunu BULAMAZ. Geri dönüş yoktur!

**GÜVENLİ ŞİFRE SAKLAMA (Hashing ve Salt):**
- Asla MD5 veya SHA-1 gibi çok eski algoritmaları kullanmayın. Hackerlar Rainbow Tables ile (önceden hesaplanmış milyarlarca hash listesi) bunları 5 saniyede kırar.
- Mutlaka **Argon2, BCrypt veya PBKDF2** gibi yavaş (Kırılması çok uzun süren) algoritmalar kullanın.
- **Salt (Tuzlama):** İki kullanıcının şifresi de "12345" ise, veritabanında Hashleri aynı görünür. Bunu önlemek için şifreyi hashlmeden önce yanına rastgele bir metin (Tuz) eklenir: `12345+xzKw21` -> Hashlenir. Böylece herkesin hash sonucu eşsiz olur.
