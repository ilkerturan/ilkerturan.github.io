# Bölüm 09: A07 - Identification and Authentication Failures

Eski adıyla "Kırık Kimlik Doğrulama" (Broken Authentication). Sistemlerin giriş (Login) mekanizmalarındaki veya Oturum (Session) yönetimindeki zayıflıklardır. Eğer bir web sitesine yetkisiz (şifresiz) girebiliyorsanız veya başkasının kimliğine (Oturumuna) bürünebiliyorsanız bu açık vardır.

## 1. Saldırı Türleri (Hacker Nasıl Sızar?)

- **Credential Stuffing (Kimlik Bilgisi Doldurma):** İnsanların %80'i tüm sitelerde (Netflix, Twitter, Banka, Yemeksepeti) aynı e-mail ve şifreyi kullanır. Hacker, daha önce hacklenmiş ve karanlık ağda (Dark Web) yayınlanmış devasa e-mail:şifre listelerini indirir. Yazdığı bir bot programla SİZİN web sitenizde saniyede binlerce kombinasyonu dener. İllaki birkaçı sizin sisteminize giriş yapmayı başaracaktır.
- **Brute Force (Kaba Kuvvet):** Bilinen şifreleri tek tek sırayla denemektir (Örn: admin/123456, admin/qwerty).
- **Session Hijacking (Oturum Çalma):** Siz bir siteye girdiğinizde sunucu size bileklik gibi bir "Session ID (Cookie)" verir. Eğer hacker kafe ortamında veya XSS açığı sayesinde sizin tarayıcınızdaki o "Session ID" metnini çalarsa, KENDİ tarayıcısına yapıştırır ve kullanıcı adı/şifre bilmesine gerek kalmadan SİZİN hesabınıza direkt girer!

## 2. Nasıl Engellenir (Savunma)?

1. **MFA / 2FA (Çok Faktörlü Kimlik Doğrulama):** Kesinlikle ZORUNLUDUR! Artık sadece şifre (Bildiğin şey) yeterli değildir. Sisteme girişte mutlaka telefona gelen bir SMS kodu veya Authenticator (Sahip olduğun şey) kodu istenmelidir. Hacker şifrenizi bilse bile telefonunuz elinde olmadığı için içeri giremez!
2. **Rate Limiting ve Brute Force Koruması:** Bir IP adresi veya e-mail hesabı arka arkaya 5 kez yanlış şifre denerse, o hesabı 15 dakikalığına KİLİTLEYİN veya sistem karşısına çözmesi zor bir "CAPTCHA" çıkarın. Botların işi felç olur.
3. **Güvenli Oturum (Session) Yönetimi:**
   - Kullanıcı "Çıkış Yap (Logout)" butonuna bastığında, sunucudaki o bilekliği (Session objesini) kesinlikle SİLİN (Destroy).
   - Çerezleri (Cookies) oluştururken kesinlikle `HttpOnly` ve `Secure` flag'lerini (işaretlerini) **True** yapın. 
   - `HttpOnly`: Hacker'ın zararlı Javascript (XSS) kodu yazarak çerezlerinizi çalmasını (document.cookie) tamamen yasaklar.
   - `Secure`: Çerezin sadece güvenli HTTPS ağında gönderilmesini sağlar.
