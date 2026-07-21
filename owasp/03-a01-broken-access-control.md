# Bölüm 03: A01 - Broken Access Control (Kırık Erişim Kontrolü)

2021 listesinin 1 Numaralı Belasıdır. Saldırganların %90'ı günümüzde bu açığı kullanır.

## 1. Erişim Kontrolü (Access Control) Nedir?
Bir siteye şifreyle girmek "Authentication (Kimlik Doğrulama)"dır. Ancak girdikten sonra "Sen Neleri Görebilirsin/Silebilirsin?" kuralı **Authorization (Erişim/Yetki Kontrolü)** dür.
Eğer standart bir kullanıcı, "Yöneticiye (Admin)" ait bir paneli görebiliyor veya bir Müşteri, sadece URL'deki ID'yi değiştirerek başka bir Müşterinin faturasını görebiliyorsa, orada "Kırık Erişim Kontrolü" vardır.

## 2. Insecure Direct Object Reference (IDOR) - En Yaygın Türü
IDOR, parametre manipülasyonudur.

**Nasıl Yapılır (Saldırı Senaryosu):**
- Müşteri sisteme girer ve kendi faturasına tıklar.
- Tarayıcı URL'si şöyledir: `https://site.com/Fatura/Goruntule?faturaId=1055`
- Kötü niyetli müşteri, URL'deki `1055` rakamını silip oraya `1056` yazar ve Enter'a basar.
- Arka plandaki kod sadece `SELECT * FROM Faturalar WHERE Id = 1056` sorgusunu çalıştırır. (KODDA GÜVENLİK YETKİ KONTROLÜ YOKTUR).
- Müşteri, başkasına ait faturayı (1056) ekranda şak diye görür.

## 3. Nasıl Engellenir (Savunma)?

**KÖTÜ KOD (Güvenlik Açıklı C# Kodu):**
```csharp
public IActionResult FaturaGoruntule(int faturaId)
{
    // CİNAYET! Sadece ID'yi alıp direkt veritabanından çekiyor.
    // Bu faturanın sahibi, şu an Login olan kişiyle aynı mı diye BAKMIYOR!
    var fatura = _db.Faturalar.Find(faturaId); 
    return View(fatura);
}
```

**GÜVENLİ KOD (Zero Trust / Sıfır Güven Yaklaşımı):**
```csharp
public IActionResult FaturaGoruntule(int faturaId)
{
    // 1. Önce login olan adamın kendi Müşteri ID'sini Session'dan (veya Token'dan) al
    int aktifMusteriId = int.Parse(User.FindFirst("MusteriId").Value);

    // 2. Faturayı veritabanından çekerken İKİ şart koy. 
    // Hem FaturaID'si uysun, HEM DE Faturanın Sahibi aktif adam olsun!
    var fatura = _db.Faturalar.FirstOrDefault(f => f.Id == faturaId && f.MusteriId == aktifMusteriId);

    if(fatura == null)
    {
        // Adam başkasının ID'sini girmişse veya fatura yoksa 403 Forbidden çak!
        return Forbid("Başkasına ait veriye erişmeye çalıştınız. Loglandınız.");
    }

    return View(fatura);
}
```
**Diğer Engelleme Yolu:** URL'lerde asla 1, 2, 3 gibi sıralı (tahmin edilebilir) ID'ler kullanmayın. Bunun yerine `GUID` veya `UUID` (Örn: `123e4567-e89b-12d3-a456-426614174000`) kullanın. Tahmin edilmesi imkansızdır.
