# A02:2025 - Security Misconfiguration (Güvenlik Yanlış Yapılandırmaları)

Önceki yıllarda daha alt sıralardayken 2025 listesinde **2. Sıraya** yükselmiştir. Neden? Çünkü artık monolitik sunucular yerine Cloud (Bulut), Docker, Kubernetes, CI/CD ve sayısız mikroservis kullanıyoruz. Sistemler çok karmaşıklaştı ve tek bir küçük "ayar" hatası felaket getirebiliyor.

---

## 1. Zafiyetin Mantığı
Uygulamanızın kodu kusursuz olabilir. Hatta dünyanın en güvenli kodunu yazmış olabilirsiniz. Ancak kodun çalıştığı sunucunun (veya veritabanının) **ayarları** yanlış yapılandırılmışsa, uygulama tamamen savunmasız kalır.

## 2. En Sık Görülen Hatalar (Hacker'ın Aradığı Şeyler)
- **Varsayılan Parolalar (Default Passwords):** Veritabanı kurarken admin parolasını `admin`, `12345` veya boş bırakmak. Tomcat/Jenkins gibi araçları varsayılan şifreleriyle internete açmak.
- **Açık Bırakılan Portlar ve Servisler:** Sadece kendi iç ağınızda (localhost) kullanmanız gereken Redis veya MongoDB veritabanlarını tüm dış dünyaya (0.0.0.0) açmak.
- **S3 Bucket / Blob Storage Sızıntıları:** AWS veya Azure üzerinde dosya yüklemek için oluşturulan klasörlerin "Public Read" (Herkese Açık Okuma) modunda unutulması (Milyonlarca kimlik verisi bu şekilde çalınmıştır).
- **Gereksiz Özellikler:** Sunucuda kullanılmayan gereksiz portların (Örn: FTP, Telnet), sayfaların, eski versiyon API'lerin açık bırakılması.

## 3. Nasıl Korunuruz? (Mimari Savunma)
1. **Hardening (Sıkılaştırma):** Bir sunucuyu veya Docker imajını yayına almadan önce gereksiz olan HER ŞEYİ silin. İşletim sisteminde sadece uygulamanın çalışması için gereken paketler kalsın (Örn: Docker Alpine imajları).
2. **Değiştirilmemiş Şifre Bırakmayın:** Tüm default (varsayılan) şifreleri kurulum anında otomatik değiştiren betikler yazın.
3. **Least Privilege (En Az Yetki):** Uygulama veritabanına bağlanırken "SA/Root" yetkisiyle değil, sadece "Okuma ve Ekleme" yetkisi olan kısıtlı bir kullanıcı (User) ile bağlansın.
