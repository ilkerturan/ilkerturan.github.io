# Bölüm 07: A03 - Injection (Enjeksiyon) ve SQL Injection

İnternet dünyasının en eski, en bilinen ama hala en çok baş ağrıtan açıklarından biridir.
Enjeksiyon felsefesi şudur: Uygulama, kullanıcının girdiği "Veriyi", arkada çalışan bilgisayarın "Kodları/Komutları" ile BİRBİRİNE KARIŞTIRIR (Ayrıştıramaz). Sistem, kullanıcının girdiği veriyi sanki bir Kod parçasıymış gibi okuyup ÇALIŞTIRIR (İcra eder).

## 1. Efsanevi SQL Injection (SQLi) Nedir?
Veritabanına gönderilen sorgunun (Query) içine, kötü niyetli bir verinin "Şırınga edilmesi" işlemidir.

**Saldırı Senaryosu:**
Bir giriş (Login) ekranınız var.
Sizin arka plandaki C# kodunuz, kullanıcının kutulara yazdığı değeri alıp şöyle bir metin (String) birleştirmesi yapıyor:
```csharp
// KÖTÜ KOD (Felaket!) - Araya "+" koyarak string birleştirme!
string sql = "SELECT * FROM Users WHERE UserName='" + girilenKullaniciAd + "' AND Password='" + girilenSifre + "'";
```

Eğer hacker, Kullanıcı Adı kutusuna şunu yazarsa:
`admin' OR '1'='1`

Sizin arka plandaki SQL sorgunuz şu korkunç şekle dönüşür:
`SELECT * FROM Users WHERE UserName='admin' OR '1'='1' AND Password='xxx'`

**Ne Oldu?** SQL Motoru buna bakar ve der ki: "Kullanıcı adı admin mi? Bilmiyorum. VEYA (OR) 1 rakamı 1'e eşit mi? EVET KESİNLİKLE EŞİT!"
`1=1` her zaman Doğru (TRUE) olduğu için SQL sunucusu hiçbir şifre sormadan hacker'ı "Admin" olarak sisteme giriş yaptırır! Veritabanı komple çalınabilir veya "DROP TABLE" yazılarak silinebilir.

## 2. Nasıl Engellenir (Savunma)?

SQL Injection'dan korunmanın DÜNYA STANDARDI tek bir kuralı vardır: **Parameterized Queries (Parametreli Sorgular) veya ORM (Entity Framework) Kullanmak.**

Veriyi asla "+" ile SQL cümlesinin içine DİREKT GÖMMEYİN. Veriyi kapalı bir paket (Parametre) olarak gönderin.

**GÜVENLİ KOD (Parametreli):**
```csharp
// 1. SQL cümlesinin içinde verinin geleceği yerlere sadece "@KullaniciAdi" gibi değişken (yer tutucu) isimleri yazın.
string sql = "SELECT * FROM Users WHERE UserName = @kAd AND Password = @kSifre";
SqlCommand cmd = new SqlCommand(sql, dbConnection);

// 2. Parametre paketlerini GÜVENLİ ve TIP dönüşümlü olarak SQL'e gönderin.
// SQL Motoru bunu alır, bunun ASLA kod olmadığını, DÜZ YAZI bir değişken olduğunu anlar. 
// "admin' OR '1'='1" yollasa bile SQL bunu dümdüz bir isim sanar ve böyle bir isim bulamayacağı için işlem başarısız olur. Hacker dışarıda kalır!
cmd.Parameters.AddWithValue("@kAd", girilenKullaniciAd);
cmd.Parameters.AddWithValue("@kSifre", girilenSifre);
```
*(Not: C# tarafında Entity Framework veya LINQ kullanıyorsanız, onlar arka planda bunu sizin yerinize otomatik (Güvenli) olarak yapmaktadır).*
