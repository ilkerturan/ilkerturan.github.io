# A05:2025 - Injection (Enjeksiyon Zafiyetleri)

Siber güvenliğin en eski, en bilinen ve hala inatla sistemleri yok eden efsanevi zafiyetidir. Injection (Enjeksiyon) sadece SQL'den ibaret değildir; Cross-Site Scripting (XSS), Command Injection, LDAP Injection gibi sistemin veriyi "Komut" sanıp çalıştırmasıdır.

---

## 1. Zafiyetin Mantığı
İstemciden (Kullanıcıdan, Formdan, URL'den) gelen veri, uygulamanın arka planında çalışan "Yorumlayıcıya" (Veritabanı, İşletim Sistemi Terminali, Tarayıcı HTML Motoru) doğrudan, kontrol edilmeden gönderilir. 
Yorumlayıcı, gönderilen bu zararlı veriyi bir "Veri" olarak değil, bir "Komut/Kod" olarak algılar ve çalıştırır.

## 2. En Sık Görülen Saldırı Tipleri
- **SQL Injection (SQLi):** Kullanıcı girişindeki "Kullanıcı Adı" kutusuna `admin' OR '1'='1` yazılarak, veritabanına gönderilen sorgunun (Query) mantığının tamamen değiştirilmesi ve sisteme şifresiz girilmesi.
- **Cross-Site Scripting (XSS):** Saldırganın bir forumun yorum bölümüne zararlı `<script>` JavaScript kodu yazması. O sayfayı açan tüm normal kullanıcıların tarayıcılarında bu kod çalışır ve çerezleri (Session) çalınır. *(XSS 2021 itibariyle Injection kategorisine dahil edilmiştir)*.
- **Command Injection:** Kullanıcıdan IP adresi alıp sunucuda "Ping" atan bir sistemin, IP kutusuna `127.0.0.1; rm -rf /` yazılarak sunucuya Linux komutu çalıştırılması (Sunucunun silinmesi).

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **ORM Kullanımı (Entity Framework, Hibernate):** SQL Injection'dan korunmanın en kesin yolu, klasik SQL (string birleştirme) yazmayı bırakıp ORM araçlarını veya **Parametrik Sorgular (Parameterized Queries)** kullanmaktır.
2. **Veriyi Temizleme (Sanitization / Escaping):** Kullanıcıdan alınan her türlü metin (Özellikle XSS'e karşı) ekrana basılmadan önce mutlaka HTML Encode edilmeli (Zararlı `<` `>` işaretleri metne çevrilmeli) dir.
3. **Strict Type Checking (Sıkı Tip Kontrolü):** Sisteme bir 'Yaş' girilmesi gerekiyorsa, bunu String olarak değil, zorunlu Integer (Tam Sayı) olarak kabul edin.
