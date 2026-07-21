# Bölüm 02: OWASP Top 10'un Yıllara Göre Evrimi

Siber güvenlik sürekli kedi-fare oyunudur. Geliştiriciler eski açıkları (Örn: XSS) tamamen kapatacak Framework'ler (React, Angular) üretirler; bu sefer hackerlar sistemlerin "Mimari Tasarımındaki" (Insecure Design) veya "Erişim Yetkilerindeki" (Broken Access Control) mantıksal hatalara saldırırlar.

## 2017 ve 2021 OWASP Top 10 Karşılaştırması

**En Büyük Değişim:** Eskiden (2017) en büyük sorun geliştiricinin kod satırlarında yaptığı hatalardı (Injection, XSS). Bugün (2021+) en büyük sorun, yazılımın Mimari olarak yanlış tasarlanması (Insecure Design) ve Karmaşık Bulut/Mikroservis yapılarında yetki kontrollerinin (Broken Access Control) atlanmasıdır.

### 2021 Güncel Top 10 Listesi:
1. **A01: Broken Access Control (Kırık Erişim Kontrolü)** (1. Sıraya Yükseldi!)
2. **A02: Cryptographic Failures (Kriptografik Hatalar)** (Eski Adı: Hassas Veri İfşası)
3. **A03: Injection (Enjeksiyon)** (Tahtından düştü, 3. sıraya geriledi)
4. **A04: Insecure Design (Güvensiz Tasarım)** (Listeye ilk kez girdi!)
5. **A05: Security Misconfiguration (Güvenlik Yanlış Yapılandırması)**
6. **A06: Vulnerable and Outdated Components (Savunmasız ve Modası Geçmiş Bileşenler)**
7. **A07: Identification and Authentication Failures (Kimlik Doğrulama Hataları)**
8. **A08: Software and Data Integrity Failures (Yazılım ve Veri Bütünlüğü Hataları)**
9. **A09: Security Logging and Monitoring Failures (Güvenlik Loglama ve İzleme Hataları)**
10. **A10: Server-Side Request Forgery - SSRF (Sunucu Tarafı İstek Sahteciliği)**

> **Önemli Not:** Eskiden herkesin dilinde olan **XSS (Cross-Site Scripting)**, modern Frontend kütüphaneleri (React, Vue vb.) sayesinde otomatik engellendiği için tek başına bir kategori olmaktan çıkmış, A03 Injection'ın altına küçücük bir alt madde olarak erimiştir.
