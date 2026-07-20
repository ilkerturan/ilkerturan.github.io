# Bölüm 02: OWASP Top 10 Değişimleri (2017 - 2021 - 2025)

Siber güvenlik, sürekli bir "kedi-fare" oyunudur. Hacker'lar yeni saldırı yolları buldukça, OWASP listesi de değişir. Listelerin evrimine bakmak, teknolojinin nereye gittiğini anlamanın en iyi yoludur.

---

## 2017 Yılı: Kodlama Hataları Zirvedeydi
2017 yılında yazılımcılar güvenlik konusunda daha bilinçsizdi.
- **A1 - SQL Injection:** Zirvedeydi. Çünkü herkes veritabanı sorgularını string (metin) birleştirerek yazıyordu.
- **XSS (Cross-Site Scripting):** Listede apayrı bir maddeydi. Sitelerde yorum satırlarına JavaScript kodları gömülerek saldırılar yapılıyordu.

## 2021 Yılı: Bulut ve Mimariye Geçiş
2021 listesi, framework'lerin (React, Angular, EF Core vb.) SQL ve XSS gibi kodlama hatalarını "varsayılan" olarak kapatmaya başlamasıyla büyük bir evrim geçirdi.
- **Broken Access Control (Kırık Erişim Kontrolü):** 1. sıraya oturdu. Çünkü framework'ler kod hatasını önlese de, "A kişisi, B kişisinin faturasına ulaşabilir mi?" gibi MİMARİ/MANTIKSAL (Business Logic) hatalarını framework'ler yakalayamazdı.
- **Insecure Design (Güvensiz Tasarım):** Listeye 4. sıradan bomba gibi düştü. Kod mükemmel yazılsa bile, iş mantığı baştan hatalı kurgulanmışsa (Örn: Şifremi unuttum sorusuna "Annenizin kızlık soyadı?" diye sormak) hacklenmenin kaçınılmaz olduğu kabul edildi.

## 2025 Yılı (Güncel Standart): Tedarik Zinciri ve Karmaşıklık
Bugün (2025/2026), DevOps ve CI/CD pipeline'larının, Cloud (AWS, Azure) mimarilerinin zirve yaptığı bir çağdayız. Uygulamalar devasa bir hızla güncelleniyor.
- **Security Misconfiguration (Güvenlik Yanlış Yapılandırması) (2. Sıra):** AWS/Azure'da tek bir yanlış tik atmak veya Docker'ı yanlış konfigüre etmek, tüm verilerin internete açılmasına (S3 Bucket sızıntıları) neden oldu.
- **[YENİ] Software Supply Chain Failures (Yazılım Tedarik Zinciri):** Hacker'lar artık şirketin uygulamasını değil, uygulamanın kullandığı 3. parti npm/nuget paketlerini veya GitHub Actions süreçlerini hackliyorlar.
- **[YENİ] Mishandling of Exceptional Conditions (Hata Yönetimi):** Sistemin hata fırlattığı anda Stack Trace (sunucu kodları) veya kritik bilgileri ekrana basıp basmadığı başlı başına bir kategori haline geldi.

Kısacası evrim şudur: **"Satır içi kod hataları"** devrinden, **"Sistem ve Mimari hataları"** devrine geçiş yapılmıştır.
