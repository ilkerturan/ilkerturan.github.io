# A01:2025 - Broken Access Control (Kırık Erişim Kontrolü)

OWASP 2021'de zirveye oturan ve 2025 listesinde de **1 Numaralı Tehlike** olmaya devam eden zafiyettir. 
Authentication (Kimlik Doğrulama - Sisteme Giriş) ile karıştırılmamalıdır. Bu zafiyet, sisteme giriş yapmış yetkili bir kullanıcının **"Kendi sınırlarını aşıp aşamadığını"** inceler.

---

## 1. Zafiyetin Mantığı
Bir siteye normal bir "Kullanıcı" olarak (Kullanıcı Adı / Şifre ile) başarıyla giriş yaptınız. İçeridesiniz.
- Eğer URL'deki `id=5` değerini `id=6` yapıp BAŞKA bir müşterinin faturasını görebiliyorsanız.
- Veya URL'nin sonuna `/admin` yazıp, Admin yetkisi olmadan yönetici paneline sızabiliyorsanız.
İşte buna Kırık Erişim Kontrolü denir.

## 2. En Sık Görülen Saldırı Tipleri
- **IDOR (Insecure Direct Object Reference):** Kullanıcı, tarayıcı üzerinden parametreleri değiştirerek (Örn: API isteğindeki `userId: 101` değerini `102` yaparak) başkasının verisine ulaşır.
- **Privilege Escalation (Yetki Yükseltme):**
  - *Yatay Geçiş:* Kendisiyle aynı yetkideki başka birinin verisini çalma.
  - *Dikey Geçiş:* Kullanıcıyken Admin haklarına erişme.
- **CORS Hataları:** API sunucusunun gelen isteğin sadece kendi güvendiği bir siteden (Örn: www.sirketim.com) gelip gelmediğini kontrol etmemesi.

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Never Trust the Client (İstemciye Asla Güvenme):** Frontend'den (Tarayıcı, Mobil Uygulama) gelen hiçbir gizli ID, Rol veya Yetki parametresine güvenmeyin. 
2. **Server-side Authorization:** İstek sunucuya (Backend) ulaştığında, işlemi yapacak olan kişinin ID'sini veya Rolünü URL'den değil, güvenli Session/JWT (JSON Web Token) içerisinden okuyun.
3. **Deny by Default:** Sistemin varsayılan kuralı "Her şeye izin ver, tehlikelileri yasakla" DEĞİL, "Her şeyi yasakla, sadece gerekenlere izin ver" olmalıdır.
