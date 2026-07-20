# A07:2025 - Authentication Failures (Kimlik Doğrulama Hataları)

Eski adıyla Broken Authentication. Kullanıcının (veya bir API'nin) kim olduğunu (Identity) kanıtlama aşamasında yapılan kritik hatalardır. Hacker'ların en sevdiği yöntemdir çünkü "Sistemi hacklemekle uğraşmazlar, doğrudan kapıdan girerler."

---

## 1. Zafiyetin Mantığı
Sisteminizin kapısında bekleyen güvenliğin, gelen kişinin gerçekten "İlker" olup olmadığını doğru kontrol edememesidir. Parola yönetimi, oturum (Session/Token) yönetimi ve MFA (Çok Faktörlü Doğrulama) eksiklikleri bu kategoriye girer.

## 2. En Sık Görülen Saldırı Tipleri
- **Credential Stuffing (Kimlik Bilgisi Doldurma):** Başka bir sitenin (Örn: Bir oyun forumunun) çalınan kullanıcı adı ve şifre veritabanını alıp, aynı şifrelerin şirketinizin portalında (veya e-posta servisinde) botlar aracılığıyla denenmesi. İnsanlar aynı şifreyi kullandığı için bu yöntem ölümcül derecede etkilidir.
- **Session Hijacking (Oturum Çalma):** Başarılı girişten sonra kullanıcıya verilen Oturum Kimliğinin (Session ID / JWT Token) URL'de görünür olması veya XSS açıklarıyla çalınması. Hacker şifreyi bilmese bile bu kimlikle hesaba erişir.
- **Zayıf Parola Politikaları:** Kullanıcıların "123456" veya "qweasd" gibi parolalar kullanmasına izin veren sistemler.
- **Session Fixation:** Çıkış yap (Logout) butonuna basıldığında oturumun sunucu tarafında (Backend) gerçekten öldürülmemesi (Sadece tarayıcıdan silinmesi).

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **MFA (Multi-Factor Authentication) Zorunluluğu:** Kritik tüm sistemlerde (özellikle admin panellerinde) parola haricinde ikinci bir güvenlik katmanı (Authenticator uygulaması veya SMS OTP) zorunlu olmalıdır.
2. **Güçlü Parola Kontrolü:** Şifrenin en az 8-12 karakter olması sağlanmalı ve daha da önemlisi; Pwned Passwords gibi veritabanlarıyla şifrenin "daha önce sızdırılmış bir şifre olup olmadığı" kayıt anında kontrol edilmelidir.
3. **Session Yönetimi:** JWT (Token) kullanılıyorsa süreleri (Expiration Date) çok kısa tutulmalı (Örn: 15 dakika) ve Refresh Token mekanizması kurulmalıdır. Tarayıcıda saklanan Cookie'ler (Çerezler) mutlaka `HttpOnly` ve `Secure` flag (bayrakları) ile işaretlenmelidir.
