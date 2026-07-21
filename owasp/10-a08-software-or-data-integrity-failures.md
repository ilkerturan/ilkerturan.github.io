# Bölüm 10: A08 - Software and Data Integrity Failures (Veri Bütünlüğü)

Bu madde, kodların, yazılım güncellemelerinin veya sistemin içindeki çok kritik verilerin (Örn: Serialize edilmiş dataların) GÜVENİLİRLİĞİ (Integrity) ile ilgilidir. Sistemin "Arkadan bıçaklanması" veya "Kandırılması" durumudur.

## 1. Yazılım Bütünlüğü Hataları (Software Update Failures)

Büyük şirketlerin başına gelen devasa bir sorundur (Örn: SolarWinds Hack olayı).
- **Senaryo:** Siz güvendiğiniz bir programın (Örn: Antivirüs veya oyun) güncellemesini indiriyorsunuz. Ancak programınız güncellemeyi indirirken dosyanın "Gerçekten O Şirketten mi geldiğini (İmzalı mı?)" KONTROL ETMİYOR. Hacker, ağ arasına girip size güncelleme adında "Virüslü" bir kod paketi yediriyor. Sisteminiz bunu seve seve kurup tüm bilgisayarı hackliyor.
- **Savunma:** İndirilen tüm paketler, yamalar ve güncellemeler (CI/CD pipeline dahil) kesinlikle Dijital Olarak İmzalanmalı (Code Signing) ve Hash özetleri (SHA-256 Checksum) kontrol edilerek doğrulanmalıdır.

## 2. Insecure Deserialization (Güvensiz Deserializasyon)

Son derece teknik ve tehlikeli bir açık türüdür.
- **Serialization (Serileştirme) Nedir?** Yazılımınızdaki Canlı bir Objenin (Örn: Müşteri nesnesi) dondurularak JSON, XML veya Binary formata çevrilmesi ve bir dosyaya veya çereze (Cookie) yazılması işlemidir.
- **Deserialization (Geri Çevirme) Nedir?** O JSON metnini alıp, tekrar Canlı ve Çalışan bir Koda/Objeye çevirmektir.

- **Saldırı Nasıl Olur?**
  Web siteniz, kullanıcının rolünü (Örn: Role: "User") bir JSON formatında (veyahut Base64) kullanıcının tarayıcısında saklıyor olsun.
  Hacker bu çerezi alır, JSON içindeki "User" kelimesini "Admin" olarak değiştirir. Bazen daha da ileri gider, JSON'ın içine "Sunucu başladığında şu Bash komutunu (Dosyaları sil) çalıştır" diyen ZEHİRLİ BİR KOD (Payload) gömer.
  Sizin arka plandaki yazılımınız, kullanıcıdan gelen bu zehirli JSON paketini alır ve SORGUSUZ SUALSİZ "Deserialize" ederek tekrar Canlı bir Obje haline getirir. O obje canlıya dönüştüğü saniye içindeki zehirli kod sunucuda çalışır (Remote Code Execution - RCE) ve sunucuyu komple ele geçirir!

- **Savunma:** 
  1. GÜVENMEYİN! Kullanıcıdan gelen (İstemci tarafında manipüle edilebilecek) hiçbir serialize datayı asla kabul edip kendi içinizde okumayın! (Sadece Token kullanın).
  2. Eğer okumak zorundaysanız, Deserializasyon işleminden önce Gelen paketin "Dijital İmzasını" (Örn: JWT Token imzası) kontrol edin. İmza bozulmuşsa (Hacker değiştirdiyse) paketi reddedin.
