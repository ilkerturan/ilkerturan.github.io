# C# SOLID Prensipleri Ders Notu

## İçindekiler
1. [Giriş](#giriş)
2. [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
3. [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
4. [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
5. [Interface Segregation Principle (ISP)](#interface-segregation-principle-isp)
6. [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip)
7. [Teknik Terimler Sözlüğü](#teknik-terimler-sözlüğü)

---

## Giriş

SOLID, nesne yönelimli programlamada yazılım tasarımını daha anlaşılır, esnek ve sürdürülebilir hale getiren beş temel prensibin baş harflerinden oluşur. Bu prensipler Robert C. Martin (Uncle Bob) tarafından popülerleştirilmiştir.

**SOLID'in Faydaları:**
- Kod tekrarını azaltır
- Bakımı kolaylaştırır
- Test edilebilirliği artırır
- Esneklik ve genişletilebilirlik sağlar
- Kod kalitesini yükseltir

---

## Single Responsibility Principle (SRP)

### Tanım
**"Bir sınıfın değişmek için yalnızca bir nedeni olmalıdır."**

Her sınıf veya modül tek bir sorumluluğa sahip olmalı ve bu sorumluluğu tamamen kapsüllemelidir.

### ❌ Kötü Örnek

```csharp
// Birden fazla sorumluluğu olan sınıf
public class Kullanici
{
    public string Ad { get; set; }
    public string Email { get; set; }
    
    // Sorumluluk 1: Kullanıcı doğrulama
    public bool EmailDogrula()
    {
        return Email.Contains("@");
    }
    
    // Sorumluluk 2: Veritabanı işlemleri
    public void Kaydet()
    {
        // Veritabanına kaydetme kodu
        Console.WriteLine("Veritabanına kaydedildi");
    }
    
    // Sorumluluk 3: Email gönderme
    public void HosgeldinEmailiGonder()
    {
        // Email gönderme kodu
        Console.WriteLine($"{Email} adresine hoşgeldin emaili gönderildi");
    }
}
```

**Sorun:** Bu sınıf üç farklı nedenden dolayı değişebilir:
- Email doğrulama kuralları değişirse
- Veritabanı teknolojisi değişirse
- Email gönderme sistemi değişirse

### ✅ İyi Örnek

```csharp
// Her sınıf tek bir sorumluluğa sahip
public class Kullanici
{
    public string Ad { get; set; }
    public string Email { get; set; }
}

public class EmailDogrulayici
{
    public bool Dogrula(string email)
    {
        return !string.IsNullOrEmpty(email) && email.Contains("@");
    }
}

public class KullaniciRepository
{
    public void Kaydet(Kullanici kullanici)
    {
        // Veritabanına kaydetme kodu
        Console.WriteLine($"{kullanici.Ad} veritabanına kaydedildi");
    }
}

public class EmailServisi
{
    public void HosgeldinEmailiGonder(string email)
    {
        // Email gönderme kodu
        Console.WriteLine($"{email} adresine hoşgeldin emaili gönderildi");
    }
}

// Kullanım
public class KullaniciKayitServisi
{
    private readonly EmailDogrulayici _emailDogrulayici;
    private readonly KullaniciRepository _repository;
    private readonly EmailServisi _emailServisi;
    
    public KullaniciKayitServisi()
    {
        _emailDogrulayici = new EmailDogrulayici();
        _repository = new KullaniciRepository();
        _emailServisi = new EmailServisi();
    }
    
    public void KayitOl(Kullanici kullanici)
    {
        if (_emailDogrulayici.Dogrula(kullanici.Email))
        {
            _repository.Kaydet(kullanici);
            _emailServisi.HosgeldinEmailiGonder(kullanici.Email);
        }
    }
}
```

---

## Open/Closed Principle (OCP)

### Tanım
**"Sınıflar genişletmeye açık, değişikliğe kapalı olmalıdır."**

Mevcut kodu değiştirmeden yeni özellikler ekleyebilmeliyiz. Bu, inheritance (kalıtım) ve abstraction (soyutlama) kullanılarak sağlanır.

### ❌ Kötü Örnek

```csharp
public class Dikdortgen
{
    public double Genislik { get; set; }
    public double Yukseklik { get; set; }
}

public class Daire
{
    public double Yaricap { get; set; }
}

public class AlanHesaplayici
{
    public double ToplamAlanHesapla(object[] sekiller)
    {
        double toplam = 0;
        
        foreach (var sekil in sekiller)
        {
            if (sekil is Dikdortgen)
            {
                var dikdortgen = (Dikdortgen)sekil;
                toplam += dikdortgen.Genislik * dikdortgen.Yukseklik;
            }
            else if (sekil is Daire)
            {
                var daire = (Daire)sekil;
                toplam += Math.PI * daire.Yaricap * daire.Yaricap;
            }
            // Yeni şekil eklendiğinde bu metod değiştirilmek zorunda!
        }
        
        return toplam;
    }
}
```

**Sorun:** Yeni bir şekil türü eklemek istediğimizde `AlanHesaplayici` sınıfını değiştirmek zorundayız.

### ✅ İyi Örnek

```csharp
public abstract class Sekil
{
    public abstract double AlanHesapla();
}

public class Dikdortgen : Sekil
{
    public double Genislik { get; set; }
    public double Yukseklik { get; set; }
    
    public override double AlanHesapla()
    {
        return Genislik * Yukseklik;
    }
}

public class Daire : Sekil
{
    public double Yaricap { get; set; }
    
    public override double AlanHesapla()
    {
        return Math.PI * Yaricap * Yaricap;
    }
}

public class Ucgen : Sekil
{
    public double Taban { get; set; }
    public double Yukseklik { get; set; }
    
    public override double AlanHesapla()
    {
        return (Taban * Yukseklik) / 2;
    }
}

public class AlanHesaplayici
{
    public double ToplamAlanHesapla(Sekil[] sekiller)
    {
        double toplam = 0;
        
        foreach (var sekil in sekiller)
        {
            toplam += sekil.AlanHesapla();
        }
        
        return toplam;
    }
}

// Kullanım
var sekiller = new Sekil[]
{
    new Dikdortgen { Genislik = 5, Yukseklik = 10 },
    new Daire { Yaricap = 7 },
    new Ucgen { Taban = 4, Yukseklik = 6 }
};

var hesaplayici = new AlanHesaplayici();
double toplam = hesaplayici.ToplamAlanHesapla(sekiller);
```

**Avantaj:** Yeni şekil eklemek için sadece yeni bir sınıf oluşturuyoruz, mevcut kodu değiştirmiyoruz.

---

## Liskov Substitution Principle (LSP)

### Tanım
**"Alt sınıflar, üst sınıfların yerine kullanılabilir olmalıdır."**

Bir üst sınıf referansı üzerinden alt sınıf nesneleri kullanıldığında program davranışı bozulmamalıdır.

### ❌ Kötü Örnek

```csharp
public class Kus
{
    public virtual void Uc()
    {
        Console.WriteLine("Kuş uçuyor");
    }
}

public class Penguen : Kus
{
    public override void Uc()
    {
        throw new NotSupportedException("Penguenler uçamaz!");
    }
}

// Kullanım
public class KusKontrol
{
    public void KusuUcur(Kus kus)
    {
        kus.Uc(); // Penguen için exception fırlatır!
    }
}
```

**Sorun:** `Penguen` sınıfı `Kus` sınıfının yerine kullanılamıyor çünkü davranışı bozuyor.

### ✅ İyi Örnek

```csharp
public abstract class Kus
{
    public abstract void Hareket();
}

public interface IUcabilir
{
    void Uc();
}

public class Serce : Kus, IUcabilir
{
    public override void Hareket()
    {
        Uc();
    }
    
    public void Uc()
    {
        Console.WriteLine("Serçe uçuyor");
    }
}

public class Penguen : Kus
{
    public override void Hareket()
    {
        Yuru();
    }
    
    public void Yuru()
    {
        Console.WriteLine("Penguen yürüyor");
    }
}

// Kullanım
public class KusKontrol
{
    public void KusuHareketEttir(Kus kus)
    {
        kus.Hareket(); // Tüm kuşlar için çalışır
    }
    
    public void UcabilenKusuUcur(IUcabilir ucabilenKus)
    {
        ucabilenKus.Uc(); // Sadece uçabilen kuşlar için
    }
}
```

---

## Interface Segregation Principle (ISP)

### Tanım
**"İstemciler, kullanmadıkları metotlara bağımlı olmaya zorlanmamalıdır."**

Büyük interface'ler yerine daha küçük ve özelleşmiş interface'ler kullanılmalıdır.

### ❌ Kötü Örnek

```csharp
public interface ICalisanIslemleri
{
    void Calis();
    void YemekYe();
    void MaasAl();
    void KodYaz();
    void TasarimYap();
    void RaporHazirla();
}

public class Yazilimci : ICalisanIslemleri
{
    public void Calis() { Console.WriteLine("Çalışıyor"); }
    public void YemekYe() { Console.WriteLine("Yemek yiyor"); }
    public void MaasAl() { Console.WriteLine("Maaş alıyor"); }
    public void KodYaz() { Console.WriteLine("Kod yazıyor"); }
    
    // Yazılımcı tasarım yapmaz ama implement etmek zorunda
    public void TasarimYap() 
    { 
        throw new NotImplementedException(); 
    }
    
    // Yazılımcı rapor hazırlamaz ama implement etmek zorunda
    public void RaporHazirla() 
    { 
        throw new NotImplementedException(); 
    }
}
```

**Sorun:** Sınıflar kullanmayacakları metotları implement etmeye zorlanıyor.

### ✅ İyi Örnek

```csharp
public interface ICalisan
{
    void Calis();
    void YemekYe();
    void MaasAl();
}

public interface IYazilimci
{
    void KodYaz();
}

public interface ITasarimci
{
    void TasarimYap();
}

public interface IYonetici
{
    void RaporHazirla();
}

public class Yazilimci : ICalisan, IYazilimci
{
    public void Calis() { Console.WriteLine("Çalışıyor"); }
    public void YemekYe() { Console.WriteLine("Yemek yiyor"); }
    public void MaasAl() { Console.WriteLine("Maaş alıyor"); }
    public void KodYaz() { Console.WriteLine("Kod yazıyor"); }
}

public class Tasarimci : ICalisan, ITasarimci
{
    public void Calis() { Console.WriteLine("Çalışıyor"); }
    public void YemekYe() { Console.WriteLine("Yemek yiyor"); }
    public void MaasAl() { Console.WriteLine("Maaş alıyor"); }
    public void TasarimYap() { Console.WriteLine("Tasarım yapıyor"); }
}

public class YazilimMuduru : ICalisan, IYazilimci, IYonetici
{
    public void Calis() { Console.WriteLine("Çalışıyor"); }
    public void YemekYe() { Console.WriteLine("Yemek yiyor"); }
    public void MaasAl() { Console.WriteLine("Maaş alıyor"); }
    public void KodYaz() { Console.WriteLine("Kod yazıyor"); }
    public void RaporHazirla() { Console.WriteLine("Rapor hazırlıyor"); }
}
```

---

## Dependency Inversion Principle (DIP)

### Tanım
**"Yüksek seviye modüller, düşük seviye modüllere bağımlı olmamalıdır. Her ikisi de soyutlamalara bağımlı olmalıdır."**

Concrete (somut) sınıflar yerine abstraction'lara (interface veya abstract class) bağımlı olunmalıdır.

### ❌ Kötü Örnek

```csharp
public class EmailGonderici
{
    public void EmailGonder(string mesaj)
    {
        Console.WriteLine($"Email gönderildi: {mesaj}");
    }
}

public class BildirimServisi
{
    private EmailGonderici _emailGonderici;
    
    public BildirimServisi()
    {
        // Somut sınıfa doğrudan bağımlılık
        _emailGonderici = new EmailGonderici();
    }
    
    public void BildirimGonder(string mesaj)
    {
        _emailGonderici.EmailGonder(mesaj);
    }
}
```

**Sorun:** 
- `BildirimServisi` doğrudan `EmailGonderici`'ye bağımlı
- SMS veya Push bildirimi eklemek için kodu değiştirmek gerekir
- Test etmek zor (mock oluşturulamaz)

### ✅ İyi Örnek

```csharp
// Soyutlama (Abstraction)
public interface IBildirimGonderici
{
    void BildirimGonder(string mesaj);
}

// Düşük seviye modüller
public class EmailGonderici : IBildirimGonderici
{
    public void BildirimGonder(string mesaj)
    {
        Console.WriteLine($"Email gönderildi: {mesaj}");
    }
}

public class SmsGonderici : IBildirimGonderici
{
    public void BildirimGonder(string mesaj)
    {
        Console.WriteLine($"SMS gönderildi: {mesaj}");
    }
}

public class PushBildirimGonderici : IBildirimGonderici
{
    public void BildirimGonder(string mesaj)
    {
        Console.WriteLine($"Push bildirimi gönderildi: {mesaj}");
    }
}

// Yüksek seviye modül
public class BildirimServisi
{
    private readonly IBildirimGonderici _bildirimGonderici;
    
    // Dependency Injection ile soyutlamaya bağımlılık
    public BildirimServisi(IBildirimGonderici bildirimGonderici)
    {
        _bildirimGonderici = bildirimGonderici;
    }
    
    public void BildirimGonder(string mesaj)
    {
        _bildirimGonderici.BildirimGonder(mesaj);
    }
}

// Kullanım
public class Program
{
    public static void Main()
    {
        // Email ile bildirim
        var emailServisi = new BildirimServisi(new EmailGonderici());
        emailServisi.BildirimGonder("Hoş geldiniz!");
        
        // SMS ile bildirim
        var smsServisi = new BildirimServisi(new SmsGonderici());
        smsServisi.BildirimGonder("Hoş geldiniz!");
        
        // Push bildirimi ile
        var pushServisi = new BildirimServisi(new PushBildirimGonderici());
        pushServisi.BildirimGonder("Hoş geldiniz!");
    }
}
```

**Avantajlar:**
- Gevşek bağlılık (loose coupling)
- Kolay test edilebilirlik
- Yeni bildirim tipleri eklemek kolay
- Değişiklik yapmadan davranışı değiştirebilme

---

## Teknik Terimler Sözlüğü

### A

**Abstraction (Soyutlama)**
- Karmaşık sistemlerin detaylarını gizleyerek sadece gerekli özellikleri gösterme tekniği. C#'ta abstract class ve interface'ler ile sağlanır.

**Abstract Class (Soyut Sınıf)**
- Instance'ı (örneği) oluşturulamayan, alt sınıflar için temel şablon görevi gören sınıf. `abstract` anahtar kelimesi ile tanımlanır.

### C

**Concrete Class (Somut Sınıf)**
- Instance'ı oluşturulabilen, tüm metotları implement edilmiş normal sınıf.

**Coupling (Bağlılık)**
- Bir sınıfın diğer sınıflara ne kadar bağımlı olduğunu gösteren kavram. Düşük bağlılık (loose coupling) istenir.

### D

**Dependency (Bağımlılık)**
- Bir sınıfın çalışabilmek için başka bir sınıfa ihtiyaç duyması durumu.

**Dependency Injection (Bağımlılık Enjeksiyonu)**
- Bir sınıfın ihtiyaç duyduğu bağımlılıkların dışarıdan (constructor, property, method) verilmesi tekniği.

### E

**Encapsulation (Kapsülleme)**
- Verileri ve metotları bir sınıf içinde bir araya getirme ve dış erişimi kontrol etme prensibi.

### G

**Genişletilebilirlik**
- Mevcut kodu bozmadan yeni özellikler ekleme yeteneği.

### I

**Implementation (Uygulama)**
- Bir interface veya abstract class'ın metotlarının gerçek kodlarla doldurulması.

**Inheritance (Kalıtım)**
- Bir sınıfın başka bir sınıftan özelliklerini ve metotlarını miras alması.

**Interface (Arayüz)**
- Sadece metot imzalarını içeren, implementation içermeyen sözleşme tanımı. `interface` anahtar kelimesi ile tanımlanır.

### L

**Loose Coupling (Gevşek Bağlılık)**
- Sınıflar arasındaki bağımlılığın minimum seviyede tutulması. SOLID prensiplerinin temel hedefidir.

### M

**Mock (Taklit)**
- Test amaçlı gerçek nesnelerin yerine kullanılan sahte nesneler.

### O

**Override (Geçersiz Kılma)**
- Alt sınıfta, üst sınıftan gelen virtual veya abstract metodun yeniden tanımlanması.

### P

**Polymorphism (Çok Biçimlilik)**
- Aynı interface'i implement eden farklı sınıfların farklı davranışlar sergilemesi.

### R

**Refactoring (Yeniden Yapılandırma)**
- Kodun dış davranışını değiştirmeden iç yapısını iyileştirme süreci.

### S

**Separation of Concerns (Sorumlulukların Ayrılması)**
- Her modülün veya sınıfın belirli bir sorumluluğa odaklanması prensibi.

**Single Responsibility (Tek Sorumluluk)**
- Bir sınıfın sadece bir iş yapması veya değişmek için tek bir nedeni olması prensibi.

### T

**Tight Coupling (Sıkı Bağlılık)**
- Sınıflar arası yüksek bağımlılık. Kaçınılması gereken bir durumdur.

### U

**Unit Test (Birim Test)**
- Kodun en küçük birimlerini (metot, sınıf) izole şekilde test etme yaklaşımı. SOLID prensipleri test edilebilirliği artırır.

### V

**Virtual Method (Sanal Metot)**
- Alt sınıflar tarafından override edilebilen metot. `virtual` anahtar kelimesi ile tanımlanır.

---

## Özet

SOLID prensipleri, kaliteli ve sürdürülebilir yazılım geliştirmenin temel taşlarıdır:

1. **SRP**: Her sınıf bir iş yapsın
2. **OCP**: Değiştirme değil, genişletme
3. **LSP**: Alt sınıflar, üst sınıfların yerini alabilsin
4. **ISP**: Küçük ve özelleşmiş interface'ler
5. **DIP**: Soyutlamalara bağlan, somut sınıflara değil

Bu prensipleri uygulamak başlangıçta zaman alsa da uzun vadede kod kalitesini, test edilebilirliği ve bakım kolaylığını önemli ölçüde artırır.