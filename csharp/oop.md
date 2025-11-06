# C# Nesne Yönelimli Programlama (OOP) 

## OOP Nedir?

Nesne Yönelimli Programlama (Object-Oriented Programming), yazılım geliştirmede gerçek dünya nesnelerini modelleyerek kod yazmayı sağlayan bir programlama paradigmasıdır. OOP, kodun yeniden kullanılabilirliğini, bakımını ve anlaşılırlığını artırır.

### OOP'nin Temel Prensipleri:
- **Encapsulation (Kapsülleme)**
- **Inheritance (Kalıtım)**
- **Polymorphism (Çok Biçimlilik)**
- **Abstraction (Soyutlama)**

---

## Sınıflar ve Nesneler

### Sınıf (Class)
Sınıf, nesnelerin blueprint'i (taslağı) olarak düşünülebilir. Bir nesnenin özelliklerini (properties) ve davranışlarını (methods) tanımlar.

```csharp
public class Araba
{
    // Properties (Özellikler)
    public string Marka { get; set; }
    public string Model { get; set; }
    public int Yil { get; set; }
    public string Renk { get; set; }
    
    // Constructor (Yapıcı Metod)
    public Araba(string marka, string model, int yil)
    {
        Marka = marka;
        Model = model;
        Yil = yil;
    }
    
    // Method (Davranış)
    public void Calistir()
    {
        Console.WriteLine($"{Marka} {Model} çalıştırıldı.");
    }
    
    public void Durdur()
    {
        Console.WriteLine($"{Marka} {Model} durduruldu.");
    }
}
```

### Nesne (Object)
Nesne, sınıftan türetilen somut bir örnektir. Bir sınıftan birden fazla nesne oluşturulabilir.

```csharp
// Nesne oluşturma
Araba araba1 = new Araba("Toyota", "Corolla", 2023);
araba1.Renk = "Kırmızı";
araba1.Calistir(); // Output: Toyota Corolla çalıştırıldı.

Araba araba2 = new Araba("BMW", "320i", 2024);
araba2.Renk = "Siyah";
```

---

## Encapsulation (Kapsülleme)

Kapsülleme, verilerin ve metodların bir sınıf içinde gizlenmesi ve dış dünyadan korunmasıdır. Bu, veri güvenliğini sağlar ve kodun bakımını kolaylaştırır.

### Access Modifiers (Erişim Belirleyiciler):
- **public**: Her yerden erişilebilir
- **private**: Sadece sınıf içinden erişilebilir
- **protected**: Sınıf ve türetilen sınıflardan erişilebilir
- **internal**: Aynı assembly içinden erişilebilir

```csharp
public class BankaHesabi
{
    // Private field (dışarıdan erişilemez)
    private decimal bakiye;
    
    // Public property ile kontrollü erişim
    public string HesapNo { get; set; }
    public string SahipAdi { get; set; }
    
    // Constructor
    public BankaHesabi(string hesapNo, string sahipAdi)
    {
        HesapNo = hesapNo;
        SahipAdi = sahipAdi;
        bakiye = 0;
    }
    
    // Public metodlar ile kontrollü işlemler
    public void ParaYatir(decimal miktar)
    {
        if (miktar > 0)
        {
            bakiye += miktar;
            Console.WriteLine($"{miktar} TL yatırıldı. Yeni bakiye: {bakiye} TL");
        }
        else
        {
            Console.WriteLine("Geçersiz miktar!");
        }
    }
    
    public bool ParaCek(decimal miktar)
    {
        if (miktar > 0 && miktar <= bakiye)
        {
            bakiye -= miktar;
            Console.WriteLine($"{miktar} TL çekildi. Kalan bakiye: {bakiye} TL");
            return true;
        }
        Console.WriteLine("Yetersiz bakiye veya geçersiz miktar!");
        return false;
    }
    
    public decimal BakiyeGoruntule()
    {
        return bakiye;
    }
}
```

**Kullanım:**
```csharp
BankaHesabi hesap = new BankaHesabi("TR123456", "Ahmet Yılmaz");
hesap.ParaYatir(1000);
hesap.ParaCek(300);
Console.WriteLine($"Güncel bakiye: {hesap.BakiyeGoruntule()} TL");
```

---

## Inheritance (Kalıtım)

Kalıtım, bir sınıfın başka bir sınıftan özelliklerini ve metodlarını miras almasıdır. Bu, kod tekrarını azaltır ve hiyerarşik ilişkiler kurmayı sağlar.

```csharp
// Base Class (Temel Sınıf)
public class Hayvan
{
    public string Ad { get; set; }
    public int Yas { get; set; }
    
    public virtual void SesCikar()
    {
        Console.WriteLine("Hayvan ses çıkarıyor...");
    }
    
    public void Beslen()
    {
        Console.WriteLine($"{Ad} besleniyor.");
    }
}

// Derived Class (Türetilmiş Sınıf)
public class Kopek : Hayvan
{
    public string Cins { get; set; }
    
    // Override - metodun yeniden yazılması
    public override void SesCikar()
    {
        Console.WriteLine("Hav hav!");
    }
    
    public void KuyrukSalla()
    {
        Console.WriteLine($"{Ad} kuyruğunu sallıyor.");
    }
}

public class Kedi : Hayvan
{
    public override void SesCikar()
    {
        Console.WriteLine("Miyav miyav!");
    }
    
    public void Tirmanma()
    {
        Console.WriteLine($"{Ad} tırmanıyor.");
    }
}
```

**Kullanım:**
```csharp
Kopek kopek = new Kopek { Ad = "Karabaş", Yas = 3, Cins = "Golden Retriever" };
kopek.SesCikar();      // Output: Hav hav!
kopek.Beslen();        // Output: Karabaş besleniyor.
kopek.KuyrukSalla();   // Output: Karabaş kuyruğunu sallıyor.

Kedi kedi = new Kedi { Ad = "Tekir", Yas = 2 };
kedi.SesCikar();       // Output: Miyav miyav!
kedi.Tirmanma();       // Output: Tekir tırmanıyor.
```

---

## Polymorphism (Çok Biçimlilik)

Polymorphism, aynı metodun farklı sınıflarda farklı şekillerde davranabilmesidir. İki türü vardır:

### 1. Compile-Time Polymorphism (Method Overloading)

```csharp
public class Hesaplama
{
    // Aynı isimde farklı parametrelerle metodlar
    public int Topla(int a, int b)
    {
        return a + b;
    }
    
    public int Topla(int a, int b, int c)
    {
        return a + b + c;
    }
    
    public double Topla(double a, double b)
    {
        return a + b;
    }
}
```

### 2. Run-Time Polymorphism (Method Overriding)

```csharp
public class Sekil
{
    public virtual double AlanHesapla()
    {
        return 0;
    }
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
    public double YariCap { get; set; }
    
    public override double AlanHesapla()
    {
        return Math.PI * YariCap * YariCap;
    }
}
```

**Kullanım:**
```csharp
Sekil sekil1 = new Dikdortgen { Genislik = 5, Yukseklik = 10 };
Sekil sekil2 = new Daire { YariCap = 7 };

Console.WriteLine($"Dikdörtgen alanı: {sekil1.AlanHesapla()}");
Console.WriteLine($"Daire alanı: {sekil2.AlanHesapla()}");
```

---

## Abstraction (Soyutlama)

Soyutlama, karmaşık sistemlerin sadece gerekli özelliklerini gösterip, detayları gizlemeyi sağlar. Abstract class ve interface ile gerçekleştirilir.

### Abstract Class

```csharp
public abstract class Calisan
{
    public string Ad { get; set; }
    public string Soyad { get; set; }
    
    // Abstract method (gövdesi yok, türetilen sınıflarda implement edilmeli)
    public abstract decimal MaasHesapla();
    
    // Normal method
    public void BilgileriGoster()
    {
        Console.WriteLine($"Çalışan: {Ad} {Soyad}");
    }
}

public class TamZamanliCalisan : Calisan
{
    public decimal AylikMaas { get; set; }
    
    public override decimal MaasHesapla()
    {
        return AylikMaas;
    }
}

public class YariZamanliCalisan : Calisan
{
    public decimal SaatlikUcret { get; set; }
    public int CalisilanSaat { get; set; }
    
    public override decimal MaasHesapla()
    {
        return SaatlikUcret * CalisilanSaat;
    }
}
```

**Kullanım:**
```csharp
Calisan calisan1 = new TamZamanliCalisan 
{ 
    Ad = "Ayşe", 
    Soyad = "Demir", 
    AylikMaas = 15000 
};

Calisan calisan2 = new YariZamanliCalisan 
{ 
    Ad = "Mehmet", 
    Soyad = "Kaya", 
    SaatlikUcret = 100, 
    CalisilanSaat = 80 
};

calisan1.BilgileriGoster();
Console.WriteLine($"Maaş: {calisan1.MaasHesapla()} TL");

calisan2.BilgileriGoster();
Console.WriteLine($"Maaş: {calisan2.MaasHesapla()} TL");
```

---

## Interface (Arayüz)

Interface, sınıfların uygulaması gereken bir sözleşme tanımlar. Sadece metod imzaları içerir, implementasyon içermez. Bir sınıf birden fazla interface implement edebilir.

```csharp
public interface IUcabilir
{
    void Uc();
    void Inis();
}

public interface IYuzebilir
{
    void Yuz();
}

// Bir sınıf birden fazla interface implement edebilir
public class Ordek : Hayvan, IUcabilir, IYuzebilir
{
    public void Uc()
    {
        Console.WriteLine($"{Ad} uçuyor.");
    }
    
    public void Inis()
    {
        Console.WriteLine($"{Ad} iniş yapıyor.");
    }
    
    public void Yuz()
    {
        Console.WriteLine($"{Ad} yüzüyor.");
    }
    
    public override void SesCikar()
    {
        Console.WriteLine("Vak vak!");
    }
}

public class Ucak : IUcabilir
{
    public string Model { get; set; }
    
    public void Uc()
    {
        Console.WriteLine($"{Model} havada.");
    }
    
    public void Inis()
    {
        Console.WriteLine($"{Model} yere indi.");
    }
}
```

**Kullanım:**
```csharp
Ordek ordek = new Ordek { Ad = "Donald" };
ordek.SesCikar();  // Output: Vak vak!
ordek.Uc();        // Output: Donald uçuyor.
ordek.Yuz();       // Output: Donald yüzüyor.

Ucak ucak = new Ucak { Model = "Boeing 737" };
ucak.Uc();         // Output: Boeing 737 havada.
```

---

## Teknik Terimler Sözlüğü

### A
- **Abstract Class (Soyut Sınıf)**: Doğrudan nesne oluşturulamayan, sadece kalıtım için kullanılan sınıf türü. En az bir abstract metod içerebilir.
- **Abstraction (Soyutlama)**: Karmaşık sistemlerin sadece gerekli özelliklerini gösterip, detayları gizleme prensibi.
- **Access Modifier (Erişim Belirleyici)**: Sınıf üyelerine erişimi kontrol eden anahtar kelimeler (public, private, protected, internal).

### B
- **Base Class (Temel Sınıf)**: Kalıtım hiyerarşisinde üst sınıf. Diğer sınıflar tarafından miras alınır.

### C
- **Class (Sınıf)**: Nesnelerin özelliklerini ve davranışlarını tanımlayan şablon veya blueprint.
- **Constructor (Yapıcı Metod)**: Bir sınıftan nesne oluşturulurken otomatik çalışan özel metod. Genellikle başlangıç değerlerini ayarlamak için kullanılır.

### D
- **Derived Class (Türetilmiş Sınıf)**: Başka bir sınıftan kalıtım alan alt sınıf.

### E
- **Encapsulation (Kapsülleme)**: Verilerin ve metodların bir arada tutulup, dış erişimden korunması prensibi.

### F
- **Field (Alan)**: Sınıf içinde tanımlanan değişken. Genellikle private olarak tanımlanır.

### I
- **Inheritance (Kalıtım)**: Bir sınıfın başka bir sınıftan özellik ve metodları miras alması prensibi.
- **Instance (Örnek)**: Bir sınıftan oluşturulan nesne.
- **Interface (Arayüz)**: Sınıfların uygulaması gereken metod imzalarını tanımlayan sözleşme.

### M
- **Method (Metod)**: Sınıf içinde tanımlanan, belirli bir işlevi yerine getiren fonksiyon.
- **Method Overloading (Metod Aşırı Yükleme)**: Aynı isimde farklı parametrelerle birden fazla metod tanımlama.
- **Method Overriding (Metod Geçersiz Kılma)**: Türetilmiş sınıfta, temel sınıfın virtual veya abstract metodunu yeniden tanımlama.

### O
- **Object (Nesne)**: Sınıftan türetilen somut örnek. Bellek üzerinde yer kaplar ve gerçek verilerle çalışır.
- **OOP (Object-Oriented Programming)**: Nesne Yönelimli Programlama paradigması.

### P
- **Polymorphism (Çok Biçimlilik)**: Aynı metodun farklı sınıflarda farklı şekillerde davranabilmesi prensibi.
- **Property (Özellik)**: Sınıfın özelliklerini temsil eden, get ve set erişimcileri ile kontrollü erişim sağlayan üye.
- **Protected**: Sadece sınıf içinden ve türetilmiş sınıflardan erişilebilen erişim belirleyici.
- **Private**: Sadece tanımlandığı sınıf içinden erişilebilen erişim belirleyici.
- **Public**: Her yerden erişilebilen erişim belirleyici.

### S
- **Sealed Class (Mühürlü Sınıf)**: Kendisinden kalıtım yapılamayan sınıf.

### V
- **Virtual Method (Sanal Metod)**: Türetilmiş sınıflarda override edilebilen metod türü.

---

## Özet

C# ile Nesne Yönelimli Programlama, yazılım geliştirmede güçlü ve esnek bir yaklaşım sunar. Dört temel prensip:

1. **Encapsulation**: Veri gizleme ve koruma
2. **Inheritance**: Kod yeniden kullanımı ve hiyerarşi
3. **Polymorphism**: Esneklik ve genişletilebilirlik
4. **Abstraction**: Karmaşıklığı yönetme ve basitleştirme

Bu prensipler sayesinde daha bakımı kolay, anlaşılır ve ölçeklenebilir yazılımlar geliştirebilirsiniz.
