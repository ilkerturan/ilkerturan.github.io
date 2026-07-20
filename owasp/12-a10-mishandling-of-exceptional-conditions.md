# A10:2025 - Mishandling of Exceptional Conditions (İstisnai Durumların Yanlış Yönetimi)

**[2025 Yeni]** Modern uygulamalar (API'ler, Microservices) çok karmaşık olduğu için çok sık "Beklenmeyen Hatalar (Exceptions)" fırlatırlar. Ancak bu hataların "Nasıl" fırlatıldığı, Hacker'lara uygulamanın röntgenini (Haritasını) veren devasa bir güvenlik açığıdır. Eski SSRF maddesinin yerine listeye bomba gibi girmiştir.

---

## 1. Zafiyetin Mantığı
Uygulamanız bir veritabanına bağlanamadığında veya kullanıcı beklenmeyen bir karakter (Örn: `'`) gönderdiğinde sistem patlar (Crash).
Eğer siz bu patlamayı (Exception) yakalayıp şık bir şekilde "Beklenmeyen bir hata oluştu" demek yerine, sistemin ham hata mesajını (Stack Trace) ekrana basarsanız, saldırgana tüm cephaneliğinizi göstermiş olursunuz.

## 2. En Sık Görülen Saldırı Tipleri / Hatalar
- **Stack Trace (Hata Yığını) İfşası:** ASP.NET veya Spring Boot gibi framework'lerin detaylı hata sayfasını (Yellow Screen of Death) canlıda (Production) açık bırakmak. Hacker hata mesajına bakarak; kullanılan kütüphane versiyonlarını, dosya yollarını (Örn: `C:\inetpub\wwwroot\db.cs`), hatta bazen SQL tablo isimlerini anında öğrenir.
- **Bilgi İfşa Eden Özel Hatalar:** "Bu e-posta kayıtlı değil" veya "Kullanıcı adı doğru ama parola yanlış" gibi hatalar, Hacker'ların "Sistemde kimler kayıtlı" bilgisini (User Enumeration) taramasına (brute-force) olanak tanır.
- **Fail-Open (Açık Hata) Durumu:** Sistem bir hata verdiğinde, güvenli moda geçmek (erişimi reddetmek) yerine, hata yüzünden kontrolleri atlayıp işlemi yapmasına izin vermesi (Fail-Close yerine Fail-Open kurgusu).

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Global Exception Handling (Genel Hata Yakalama):** Uygulamanın neresinde hata çıkarsa çıksın, onu en tepede (Middleware / Interceptor) yakalayan tek bir mekanizma kurun.
2. **Kullanıcıya Standart, Admine Detaylı Mesaj:** Son kullanıcıya veya API yanıtına ASLA teknik detay döndürmeyin (Sadece: `HTTP 500: Sunucu Hatası, Lütfen daha sonra deneyin` veya `Kullanıcı adı veya şifre hatalı`). Ancak o anki teknik detayı arka planda (Log sunucusuna) UUID (Hata Kodu) ile birlikte kaydedin.
3. **Environment (Ortam) Yönetimi:** `ASPNETCORE_ENVIRONMENT` veya `NODE_ENV` gibi değişkenlerin Canlı (Production) sunucularda asla "Development" (Geliştirme) modunda unutulmadığına emin olun (Development modları detaylı hata basar).
