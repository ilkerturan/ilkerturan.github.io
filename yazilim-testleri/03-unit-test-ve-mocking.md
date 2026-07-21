# Bölüm 03: Unit Test Anatomisi (AAA Pattern) ve Mocking

Unit (Birim) testlerin felsefesini anladık: Dış dünyadan izole, sadece tek bir fonksiyona saldıran ışık hızındaki testler. Peki bir Unit Test kodu yapısal olarak nasıl yazılır ve gerçek veritabanı olmadan nasıl izole edilir?

## 1. AAA Prensibi (Arrange, Act, Assert)
Dünya üzerindeki tüm Unit testler (hangi dil olursa olsun) 3 bloktan (AAA) oluşur: Düzenle, Eyleme Geç, İddia Et.

```csharp
// ÖRNEK: IndirimUygula() metodunu test ediyoruz
[Fact] // Test fonksiyonu olduğunu belirtir
public void IndirimUygula_Yuzde10_DogruHesaplamali()
{
    // 1. ARRANGE (DÜZENLE / HAZIRLIK)
    // Savaş alanını hazırlarız. Objeleri üretiriz, sahte (mock) verileri gireriz.
    var sepetHesaplayici = new SepetHesaplayici();
    decimal urunFiyati = 1000m;
    decimal indirimYuzdesi = 10m; // Beklenen indirim: 100 TL. Fiyat: 900 olmalı.

    // 2. ACT (EYLEME GEÇ / TETİKLE)
    // Asıl kodumuzun bulunduğu hedef metodu çalıştırır, sonucu bir değişkene alırız.
    decimal cikanSonuc = sepetHesaplayici.IndirimUygula(urunFiyati, indirimYuzdesi);

    // 3. ASSERT (İDDİA ET / DOĞRULA)
    // "Çıkan sonucun, benim BEYNİMDEKİ beklenen sonuca EŞİT OLMASINI iddia ediyorum!" deriz.
    // Eğer 900 == 900 çıkarsa test YEŞİL yanar. Kodunuz 800 döndürseydi KIRMIZI yanar, hata koda yönlendirirdi.
    Assert.Equal(900m, cikanSonuc);
}
```

## 2. Dış Dünyadan Kopuş: Mocking (Sahtekârlık) Felsefesi

Farz edelim ki "Kullanıcı Kaydet ve Ona Hoşgeldin Maili At" adında bir fonksiyonu test edeceğiz.
Bu fonksiyon içinde `MailServisi` kullanılarak internet üzerinden giden gerçek bir Gmail isteği var.
Unit Test kuralları der ki: **Ağa (İnternete) çıkamazsın! Çıkarsan yavaşlarsın!** Peki bu kodu ağa çıkmadan nasıl test edeceğiz?

İşte burada **Mock (Dublör / Sahte Obje)** kavramı devreye girer.

Sisteme Gerçek `MailServisi` objesi yerine, Moq (veya NSubstitute vb.) kütüphaneleriyle yapılmış bir "Kukla" (Mock Obje) enjekte edilir (Dependency Injection ile).
Siz sahte objeye şunu tembihlersiniz:
*"Ey sahte mail servisi! Benim fonksiyonum içeriden sana 'MailAt(adres)' diye bir istek yolladığında, internete falan bağlanma. Sadece bana yalandan (true) döndür ve işlemin yapıldığını varsay."*

```csharp
[Fact]
public void KullaniciKaydet_BasariliIse_MailAtilmalidir()
{
    // ARRANGE
    // 1. Gerçek mail sunucusunu kullanma, içi boş bir KUKLA (Dublör) üret.
    var mockMailServisi = new Mock<IMailServisi>(); 
    
    // Kuklaya ezberlet: Sana bir mail atma emri gelirse yalandan True (başarılı) dön.
    mockMailServisi.Setup(x => x.MailAt(It.IsAny<string>())).Returns(true);
    
    // Gerçek sınıfımıza, sahte mail motorunu takıyoruz (Enjeksiyon). Artık internete bağlı değil!
    var kayitSistemi = new KullaniciKayitMerkezi(mockMailServisi.Object);

    // ACT
    kayitSistemi.YeniKullaniciEkle("İlker", "ilker@test.com");

    // ASSERT
    // İddia ediyorum ki, o kodların içinde sana (Kuklaya) en az 1 defa "MailAt" fonksiyonu çağrıldı mı?
    // Doğruluyorsa Test geçer. İnternete harcanan süre 0 milisaniye.
    mockMailServisi.Verify(x => x.MailAt("ilker@test.com"), Times.Once);
}
```
