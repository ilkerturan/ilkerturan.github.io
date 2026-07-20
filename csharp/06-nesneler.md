# C# Nesneleri

## Giriş

C# programlama dilinde nesneler, veri ve işlevselliği bir araya getiren temel yapı taşlarıdır. Her şey bir nesnedir ve nesneler, programlarımızın çalışma zamanında bellekte yer kaplayan somut varlıklardır.

## Nesne Nedir?

Nesne, bir sınıfın (class) somut bir örneğidir. Sınıf bir taslak (blueprint) iken, nesne bu taslaktan üretilen gerçek bir yapıdır. Nesneler bellekte yer kaplar ve program çalışırken kullanılır.

```csharp
// Sınıf tanımı (taslak)
class Araba
{
    public string Marka;
    public string Model;
    public int Yil;
}

// Nesne oluşturma
Araba benimArabam = new Araba();
benimArabam.Marka = "Toyota";
benimArabam.Model = "Corolla";
benimArabam.Yil = 2023;
```

## Nesne Oluşturma

### new Anahtar Kelimesi

C#'ta nesne oluşturmak için `new` anahtar kelimesi kullanılır. Bu işlem, bellekte yeni bir alan tahsis eder ve nesneyi başlatır.

```csharp
// Temel nesne oluşturma
Araba araba1 = new Araba();

// C# 9.0 ve sonrası - hedef tipli new ifadesi
Araba araba2 = new();

// Tek satırda birden fazla nesne
Araba araba3 = new(), araba4 = new();
```

### Nesne Başlatıcılar (Object Initializers)

Nesne başlatıcılar, nesne oluşturulurken özelliklere değer atamayı kolaylaştırır.

```csharp
// Klasik yöntem
Araba araba1 = new Araba();
araba1.Marka = "BMW";
araba1.Model = "320i";
araba1.Yil = 2024;

// Nesne başlatıcı ile
Araba araba2 = new Araba
{
    Marka = "BMW",
    Model = "320i",
    Yil = 2024
};
```

## Nesne Referansları

C#'ta nesneler referans tipleridir. Bir değişken nesnenin kendisini değil, bellekteki adresini tutar.

```csharp
Araba araba1 = new Araba { Marka = "Audi" };
Araba araba2 = araba1; // araba2, araba1'in gösterdiği nesneyi gösterir

araba2.Marka = "Mercedes"; // Her iki değişken de aynı nesneyi gösterdiği için
Console.WriteLine(araba1.Marka); // Çıktı: Mercedes
```

### null Değeri

Nesneler `null` değerini alabilir, bu da bir referansın hiçbir nesneyi göstermediği anlamına gelir.

```csharp
Araba araba = null; // Hiçbir nesneyi göstermiyor

// Null kontrolü
if (araba == null)
{
    Console.WriteLine("Araba nesnesi oluşturulmamış");
}

// Null-coalescing operatörü
Araba yeniAraba = araba ?? new Araba();
```

## Nesne ile Çalışma

### Özelliklere Erişim

Nokta operatörü (.) kullanılarak nesnenin alanlarına ve özelliklerine erişilir.

```csharp
Araba araba = new Araba();
araba.Marka = "Ford";
string marka = araba.Marka;
```

### Metotları Çağırma

Nesneler üzerinde tanımlı metotlar da nokta operatörü ile çağrılır.

```csharp
class Araba
{
    public string Marka;
    public int Hiz;
    
    public void Hizlan()
    {
        Hiz += 10;
    }
    
    public void Yavasla()
    {
        Hiz -= 10;
    }
}

Araba araba = new Araba();
araba.Hizlan();
araba.Hizlan();
Console.WriteLine(araba.Hiz); // Çıktı: 20
```

## Anonim Tipler

Anonim tipler, geçici olarak kullanılacak nesneler için hızlı bir şekilde tip tanımlamayı sağlar.

```csharp
var kisi = new { Ad = "Ali", Soyad = "Yılmaz", Yas = 30 };
Console.WriteLine($"{kisi.Ad} {kisi.Soyad}, {kisi.Yas} yaşında");

// Anonim tipler read-only'dir
// kisi.Ad = "Veli"; // HATA!
```

## Dynamic Nesneler

`dynamic` anahtar kelimesi, derleme zamanında tip kontrolü yapılmayan nesneler oluşturmayı sağlar.

```csharp
dynamic nesne = "Merhaba";
Console.WriteLine(nesne); // String olarak davranır

nesne = 123;
Console.WriteLine(nesne + 10); // Şimdi sayı olarak davranır

nesne = new Araba { Marka = "Tesla" };
Console.WriteLine(nesne.Marka); // Nesne olarak davranır
```

## Object Sınıfı

C#'ta tüm tipler `object` sınıfından türetilir. Bu, herhangi bir değerin `object` tipinde saklanabileceği anlamına gelir.

```csharp
object obj1 = 42;
object obj2 = "Merhaba";
object obj3 = new Araba();

// Geri dönüşüm için casting gerekir
int sayi = (int)obj1;
string metin = (string)obj2;
Araba araba = (Araba)obj3;
```

### Object Sınıfının Temel Metotları

```csharp
class Araba
{
    public string Marka;
    
    // ToString() metodu override
    public override string ToString()
    {
        return $"Araba: {Marka}";
    }
    
    // Equals() metodu override
    public override bool Equals(object obj)
    {
        if (obj is Araba diger)
        {
            return this.Marka == diger.Marka;
        }
        return false;
    }
}

Araba araba = new Araba { Marka = "Honda" };
Console.WriteLine(araba.ToString()); // Çıktı: Araba: Honda
```

## Boxing ve Unboxing

Boxing, değer tiplerinin referans tiplerine dönüştürülmesi; unboxing ise tam tersi işlemdir.

```csharp
// Boxing - değer tipi object'e dönüştürülür
int sayi = 123;
object kutu = sayi; // Boxing

// Unboxing - object'ten değer tipine dönüş
int geriDonen = (int)kutu; // Unboxing

// Boxing/Unboxing performans kaybına neden olabilir
// Mümkün olduğunda generic kullanımı tercih edilmelidir
```

## Nesne Koleksiyonları

Birden fazla nesne ile çalışırken koleksiyonlar kullanılır.

```csharp
// Dizi
Araba[] arabalar = new Araba[3];
arabalar[0] = new Araba { Marka = "Toyota" };
arabalar[1] = new Araba { Marka = "Honda" };
arabalar[2] = new Araba { Marka = "Ford" };

// List kullanımı
List<Araba> arabaListesi = new List<Araba>();
arabaListesi.Add(new Araba { Marka = "BMW" });
arabaListesi.Add(new Araba { Marka = "Audi" });

// Döngü ile erişim
foreach (Araba araba in arabaListesi)
{
    Console.WriteLine(araba.Marka);
}
```

## Nesne Yaşam Döngüsü

### Oluşturma

Nesne `new` anahtar kelimesi ile heap bellekte oluşturulur.

```csharp
Araba araba = new Araba(); // Heap'te alan tahsis edilir
```

### Kullanım

Nesne referans üzerinden kullanılır ve işlemler yapılır.

```csharp
araba.Marka = "Volvo";
araba.Hizlan();
```

### Yok Edilme (Garbage Collection)

C#'ta nesnelerin bellekten temizlenmesi otomatik olarak Garbage Collector tarafından yapılır. Bir nesneye artık hiçbir referans göstermiyorsa, GC onu bellekten temizler.

```csharp
Araba araba = new Araba();
araba = null; // Artık nesneye referans yok, GC tarafından temizlenebilir

// Destructor (Finalizer)
class Araba
{
    ~Araba()
    {
        // Nesne yok edilirken çalışır
        Console.WriteLine("Araba nesnesi temizleniyor");
    }
}
```

## this Anahtar Kelimesi

`this`, mevcut nesne örneğine referans verir.

```csharp
class Araba
{
    private string marka;
    
    public void MarkaAta(string marka)
    {
        this.marka = marka; // this ile alan ve parametre ayrımı
    }
    
    public Araba GetThis()
    {
        return this; // Mevcut nesneyi döndürür
    }
}
```

## Null Güvenliği

C# 8.0 ile gelen nullable reference types özelliği, null hatalarını önlemeye yardımcı olur.

```csharp
// Nullable reference type
Araba? araba = null; // ? işareti null olabileceğini belirtir

// Null-conditional operator
string? marka = araba?.Marka; // araba null ise marka da null olur

// Null-forgiving operator
string kesinMarka = araba!.Marka; // Derleyiciye null olmadığını söyler

// Pattern matching
if (araba is not null)
{
    Console.WriteLine(araba.Marka);
}
```

## with İfadesi (Records için)

C# 9.0 ile gelen `with` ifadesi, mevcut bir nesneden değiştirilerek yeni nesne oluşturmayı sağlar.

```csharp
record Araba(string Marka, string Model, int Yil);

Araba araba1 = new("Toyota", "Corolla", 2023);
Araba araba2 = araba1 with { Yil = 2024 }; // Sadece yıl değişti

Console.WriteLine(araba1.Yil); // 2023
Console.WriteLine(araba2.Yil); // 2024
```

## Örnek Uygulama

```csharp
class Kitap
{
    public string Baslik;
    public string Yazar;
    public int SayfaSayisi;
    public bool OkunduMu;
    
    public void BilgiYazdir()
    {
        Console.WriteLine($"Kitap: {Baslik}");
        Console.WriteLine($"Yazar: {Yazar}");
        Console.WriteLine($"Sayfa: {SayfaSayisi}");
        Console.WriteLine($"Durum: {(OkunduMu ? "Okundu" : "Okunmadı")}");
    }
    
    public void OkunduIsaretle()
    {
        OkunduMu = true;
        Console.WriteLine($"{Baslik} kitabı okundu olarak işaretlendi.");
    }
}

// Kullanım
Kitap kitap1 = new Kitap
{
    Baslik = "Suç ve Ceza",
    Yazar = "Dostoyevski",
    SayfaSayisi = 671,
    OkunduMu = false
};

kitap1.BilgiYazdir();
kitap1.OkunduIsaretle();

// Kitap koleksiyonu
List<Kitap> kutuphane = new List<Kitap>();
kutuphane.Add(kitap1);
kutuphane.Add(new Kitap 
{ 
    Baslik = "1984", 
    Yazar = "George Orwell", 
    SayfaSayisi = 328 
});

foreach (Kitap kitap in kutuphane)
{
    kitap.BilgiYazdir();
    Console.WriteLine("---");
}
```

---

## Teknik Terimler Sözlüğü

**Nesne (Object)**: Bir sınıfın bellekte oluşturulmuş somut örneği. Veri ve davranışları bir araya getirir.

**Sınıf (Class)**: Nesnelerin nasıl oluşturulacağını tanımlayan şablon veya taslak.

**Referans (Reference)**: Bellekte bir nesnenin konumunu gösteren adres bilgisi.

**new Anahtar Kelimesi**: Heap bellekte yeni bir nesne oluşturmak için kullanılan operatör.

**null**: Bir referansın hiçbir nesneyi göstermediğini belirten özel değer.

**Heap**: Dinamik olarak ayrılan bellek alanı; nesneler burada saklanır.

**Stack**: Yerel değişkenlerin ve referansların saklandığı bellek alanı.

**Boxing**: Değer tipinin referans tipine (object) dönüştürülmesi işlemi.

**Unboxing**: Referans tipinin (object) değer tipine geri dönüştürülmesi işlemi.

**Garbage Collector (GC)**: Kullanılmayan nesneleri otomatik olarak bellekten temizleyen mekanizma.

**this**: Mevcut nesne örneğine referans veren anahtar kelime.

**Nokta Operatörü (.)**: Bir nesnenin üyelerine (alan, özellik, metot) erişmek için kullanılan operatör.

**Nesne Başlatıcı (Object Initializer)**: Nesne oluşturulurken özelliklerine değer atamayı sağlayan sözdizimi.

**Anonim Tip (Anonymous Type)**: İsimsiz, geçici kullanım için oluşturulan tip yapısı.

**dynamic**: Derleme zamanında tip kontrolü yapılmayan, çalışma zamanında belirlenen tip.

**Nullable Reference Type**: Null değer alabileceği açıkça belirtilen referans tipi.

**Pattern Matching**: Bir değerin belirli bir yapıya veya değere uyup uymadığını kontrol etme tekniği.

**Record**: C# 9.0 ile gelen, değişmez (immutable) veri taşıyan tip yapısı.

**with İfadesi**: Record tiplerinde var olan nesneden değişikliklerle yeni nesne oluşturma sözdizimi.

**Destructor (Finalizer)**: Nesne bellekten silinmeden önce çalışan özel metot (~).

**Casting**: Bir tipin başka bir tipe dönüştürülmesi işlemi.

**Override**: Üst sınıftan gelen bir metodun yeniden tanımlanması.

**ToString()**: Nesnenin string gösterimini döndüren metot.

**Equals()**: İki nesnenin eşit olup olmadığını kontrol eden metot.

**Koleksiyon (Collection)**: Birden fazla nesneyi gruplar halinde saklayan yapılar (Array, List, vb.).

**Referans Tipi (Reference Type)**: Heap bellekte saklanan ve referans ile erişilen tipler.

**Değer Tipi (Value Type)**: Stack bellekte saklanan ve doğrudan değer içeren tipler (int, bool, vb.).
