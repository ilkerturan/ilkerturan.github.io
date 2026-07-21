# Bölüm 11: A09 - Security Logging and Monitoring Failures (Kayıt ve İzleme Hataları)

Bir web sitesinin hacklendiğinin (verilerinin çalındığının) dünyadaki ortalama fark edilme süresi **yaklaşık 200 GÜNDÜR!** (FireEye İstatistikleri).
Çünkü yazılımcılar sistemin çöktüğünü yakalayacak hata kayıtlarını (Error Logging) tutarlar, ancak GÜVENLİK olaylarını kayıt altına almayı (Security Logging) hep unuturlar. Karda yürüyen bir korsanın ayak izlerini silmesine bile gerek yoktur, çünkü sistem kar yağdırmıyordur.

## 1. Neler Loglanmıyor (Eksik Bırakılıyor)?

Yazılımcılar genellikle sadece kod patladığında Log atarlar (Sistem çöktü vs.). Oysa şunlar birer güvenlik uyarısıdır ve kayıt edilmezse felaket olur:
- **Giriş (Login) Denemeleri:** Bir kullanıcı ardı ardına 50 kez şifreyi yanlış giriyorsa (Brute Force), bu bir hata değil, SİBER SALDIRIDIR. Mutlaka Loglanmalıdır!
- **Yetkisiz Erişimler:** Normal bir kullanıcı `Admin` paneline girmeye çalışmış ve 403 (Yasak) hatası almış. Bu bir saldırı keşfidir. Loglanmalıdır!
- **Yüksek İşlemler:** Gece saat 03:00'da sistemden saniyede 10.000 veri çekiliyorsa bu bir Data Exfiltration (Veri Kaçırma) işlemidir. 

## 2. Alerting (Alarm Üretme) Eksikliği
Log dosyalarının var olması da yetmez. Eğer bir Log dosyasına 1 saat içinde "20.000 adet Başarısız Login" mesajı yazıldıysa ve bu dosyayı kimse okumuyorsa, log tutmanın anlamı yoktur.

## 3. Doğru Loglama Nasıl Yapılmalıdır?

- **Kritik Olayları Loglayın:** Başarılı/Başarısız loginler, şifre değişimleri, yüksek tutarlı para transferleri, yetki (role) değişimleri. Mutlaka Saat (Timestamp) ve yapan kişinin IP/Kullanıcı Adı ile birlikte kaydedin.
- **Hassas Verileri Loglamayın! (Data Leakage):** Asla ama asla kullanıcıların Şifrelerini (Plain Text), Kredi Kartı numaralarını veya TC Kimlik Numaralarını log dosyalarına YAZMAYIN! Hacker sunucuya sızarsa veritabanını geçip dümdüz Text (Log) dosyalarından tüm dünyayı çalar.
- **SIEM / Merkezi İzleme Kurun:** Uygulamanın ürettiği bu logları (ElasticSearch, Splunk, Datadog gibi) harici ve güvenli bir sunucuya gönderin. Alarm sistemleri kurun (Örn: 1 dakikada 50 başarısız log gelirse Sistem Yöneticisinin telefonuna SMS at).
