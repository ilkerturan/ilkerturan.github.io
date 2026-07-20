# A08:2025 - Software and Data Integrity Failures (Yazılım ve Veri Bütünlüğü Hataları)

Modern mimaride uygulamalar dış sistemlere çok fazla güvenir. Dışarıdan gelen güncellemeler, veriler veya kütüphaneler (plugins) "Gerçekten orjinal mi? Değiştirilmediğine (Bütünlüğüne) emin miyiz?" sorusunun sorulmaması felaketlere yol açar.

---

## 1. Zafiyetin Mantığı
Sisteminizin, ağ üzerinden gelen bir paketin, eklentinin (plugin) veya yazılım güncellemesinin kimliğini doğrulamadan (İmzasını kontrol etmeden) körü körüne güvenip sistemde çalıştırmasıdır.

## 2. En Sık Görülen Saldırı Tipleri
- **Insecure Deserialization (Güvensiz Tersine Çevirme):** Sunucular veriyi (Örn: Kullanıcı yetkilerini veya ayarlarını) ağda taşımak için Serialize eder (Düz bir metne / byte'a çevirir). Hacker, bu serialize edilmiş paketin arasına zararlı bir komut sıkıştırır. Sunucu bu veriyi güvenip tekrar objeye (Deserialize) çevirdiğinde virüs doğrudan sunucu hafızasında çalışır. (Eskiden listede ayrı bir zafiyetti, şimdi bu maddeye dahil edildi).
- **Zararlı Yazılım Güncellemeleri:** Sistemin (veya router'ların) üreticiden geldiğini sandığı bir güncellemeyi (update) imzasını kontrol etmeden indirip kurması.
- **Otomatik CI/CD Dağıtımları:** Hiçbir Code-Review (Kod İncelemesi) veya güvenlik taramasından geçmeden CI/CD boru hattına gönderilen kodun, bütünlük kontrolü olmadan doğrudan Canlı (Production) sunucuya alınması.

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Dijital İmzalar (Digital Signatures):** Sisteminize entegre edilecek veya indirilecek tüm eklentilerin, kütüphanelerin veya güncellemelerin kaynağını PGP, SSL Sertifikaları veya Hash (SHA-256) doğrulamalarıyla onaylayın. (İndirdiğiniz dosyanın hash'i ile üreticinin sitesindeki hash uyuşuyor mu?)
2. **Güvenli Deserialization:** Dış dünyadan (Client'tan) gelen serialize edilmiş hiçbir veriyi körü körüne kendi sisteminizdeki nesnelere (Objelere) dönüştürmeyin. Mümkünse sadece JSON gibi basit (ve komut çalıştıramayan) veri tipleri kullanın ve çok sıkı tip/şema (Schema) doğrulamasından (Validation) geçirin.
3. **CI/CD Güvenliği:** Boru hattında bütünlük kontrollerini (Artifact Signing vb.) devreye alın.
