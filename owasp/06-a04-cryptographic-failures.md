# A04:2025 - Cryptographic Failures (Kriptografik Hatalar)

Eski adıyla "Hassas Veri İfşası (Sensitive Data Exposure)". Parolalar, kredi kartı numaraları, TC kimlik numaraları veya sağlık kayıtları gibi paha biçilemez verilerin "Kötü Şifrelenmesi" veya "Hiç Şifrelenmemesi" sorunudur.

---

## 1. Zafiyetin Mantığı
Sisteminizin veritabanı çalınırsa (ki er ya da geç çalınma ihtimali her zaman vardır), Hacker bu verileri okuyabilecek mi?
Eğer veriler düz metin (Plain Text) veya zayıf/eski algoritmalarla (Örn: MD5) şifrelenmişse, veriler "ifşa olmuş" sayılır.

## 2. En Sık Görülen Hatalar
- **Transit (Yoldaki) Verinin Şifrelenmemesi:** Kullanıcının bilgisayarı ile sunucunuz arasındaki trafiğin HTTP üzerinden (HTTPS / SSL olmadan) akması. Araya giren biri (Man in the Middle) tüm parolaları okur.
- **At Rest (Duran) Verinin Şifrelenmemesi:** Veritabanına kredi kartı veya TC Kimlik numaralarının açık bir şekilde (şifrelenmeden) yazılması.
- **Zayıf Hashing (MD5, SHA1):** Kullanıcı şifrelerini veritabanına kaydederken çok hızlı ve kolayca geri döndürülebilen (Kırılabilen) MD5 gibi eski yöntemleri kullanmak.
- **Kendi Kriptografini Yazmak:** Yazılımcıların, güvenliği kanıtlanmış kütüphaneleri kullanmak yerine "kendi şifreleme mantıklarını" icat etmeye çalışması (Siber güvenlikte her zaman hüsranla biter).

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **HTTPS Everywhere:** Tüm iç (mikroservisler arası) ve dış iletişim mutlaka TLS (HTTPS) üzerinden akmalıdır. HTTP kesinlikle engellenmelidir.
2. **Güçlü Hashing ve Salting:** Parolaları kaydederken MD5 değil; **Argon2**, **Bcrypt** veya **PBKDF2** gibi yavaş (kırılması zor) algoritmalar kullanın. Parolaların sonuna mutlaka rastgele bir tuz (Salt) değeri ekleyin (Rainbow Table saldırılarına karşı).
3. **Anahtar Yönetimi (Key Management):** Verileri şifrelediğiniz "Anahtarları (Secret/Key)" uygulamanın kaynak kodunda (`appsettings.json`, GitHub) değil; Azure Key Vault, AWS KMS veya HashiCorp Vault gibi "Özel Kasalarda" saklayın.
