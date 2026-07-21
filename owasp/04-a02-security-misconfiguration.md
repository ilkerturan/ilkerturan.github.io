# Bölüm 04: A05 - Security Misconfiguration (Güvenlik Yanlış Yapılandırması)

Yazılımınızın kodu ne kadar mükemmel (kusursuz) yazılmış olursa olsun, eğer kodunuzun koştuğu Sunucu (Server), Veritabanı veya Framework'lerin "Ayarları (Config)" varsayılan (Default) halde unutulmuşsa saldırıya uğrarsınız.

"Ben yeni bir veritabanı kurdum, hiç ayarlarına dokunmadım çalışıyor işte" demek, "Evimin kapısını herkese açık bıraktım" demektir.

## 1. Klasik Yanlış Yapılandırma Örnekleri

- **Varsayılan (Default) Şifreler:** Bir IP Kamera, Router veya Veritabanı alırsınız. Kullanıcı adı "admin", şifresi "admin" dir. Bunu canlıya aldığınızda hackerların "Bot" programları interneti sürekli tarar ve saniyeler içinde şifrenizi bulup girer.
- **Dizin Listeleme (Directory Listing):** Bir web sitesinde `images` klasörüne girdiğinizde, web sunucusu size o klasördeki tüm resimlerin ve BAZEN KOD DOSYALARININ bir klasör ağacı listesini döküyorsa bu büyük felakettir.
- **Hata Mesajlarının Ekrana Basılması (Stack Trace Leakage):** Canlı sistemde kod patladığında (Örn: Veritabanına bağlanamadığında) ekranda kocaman kırmızı yazılarla "Server: 192.168.1.10, SQL Sürümü 2019, Tablo adı: Musteriler bulunamadı" gibi detaylı kod hataları çıkmasıdır. Bu hata mesajı hacker için "Paha biçilemez bir hazine haritasıdır." Sistemin iç yapısını öğrenir.

## 2. Nasıl Engellenir (Savunma)?

- **Hardening (Sertleştirme):** İşletim sistemlerinde, web sunucularında kullanılmayan tüm ekstra özellikleri, gereksiz portları ve gereksiz servisleri (Örn: FTP sunucusu) KALDIRIN. Sistem ne kadar çıplaksa (Minimal), saldırı yüzeyi (Attack Surface) o kadar küçüktür.
- **Hata Ekranlarını Gizleyin (Custom Error Pages):** 

**KÖTÜ KOD (ASP.NET Core - Startup.cs):**
```csharp
// Canlıda (Production) bile detaylı geliştirici hatalarını açık bırakmak
app.UseDeveloperExceptionPage(); 
```

**GÜVENLİ KOD:**
```csharp
if (env.IsDevelopment())
{
    // SADECE Geliştirici kendi bilgisayarındayken hataları görsün
    app.UseDeveloperExceptionPage();
}
else
{
    // CANLI Sunucuda (Production) asla hata detayı gösterme.
    // Kullanıcıya şirin bir 500 sayfası göster, gerçek hatayı arka planda Log dosyasına yaz.
    app.UseExceptionHandler("/Home/HataOlustu");
    app.UseHsts();
}
```
