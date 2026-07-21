# Bölüm 02: Yaratılışsal Kalıplar (Creational Patterns)

Programlamada (OOP) bir nesne yaratmanın en temel yolu `new` anahtar kelimesini kullanmaktır (Örn: `Araba myAraba = new Araba()`). Ancak sistem büyüdükçe her yerde `new` kullanmak kodun sıkı sıkıya (Tightly Coupled) bağımlı olmasına yol açar. Yaratılışsal kalıplar, nesne yaratma sürecini gizleyerek veya kontrol altına alarak esneklik sağlar.

## 1. Singleton (Tekil Nesne) Kalıbı
En popüler ve bilmesi en zorunlu kalıplardan biridir.

- **Problem:** Uygulamanızda öyle bir nesne olmalı ki, sistemde O NESNENİN İKİNCİ BİR KOPYASI ASLA ÜRETİLEMEMELİDİR. Sistemdeki herkes o tek bir örneği kullanmalıdır. 
- **Gerçek Dünya Örneği:** Bir şirketteki tek bir veritabanı bağlantısı. Her sayfayı açtığınızda veritabanına yeniden bağlanmak (yeni bir bağlantı objesi yaratmak) sunucuyu çökertir. Ayarlar dosyası (Config) okunurken de dosya 1 kere okunup hafızada tutulmalı, her istekte baştan okunmamalıdır.
- **Çözüm:** Sınıfın kendi kendini (kendi içinde) sadece bir kez yaratmasına izin verilir. Dışarıdan `new` yapılması yasaklanır (Constructor private yapılır).

```csharp
// Singleton Uygulanmış Bir Loglayıcı (Logger) Sınıfı
public class Logger
{
    // Kendi referansını tutacağı, dışarıdan erişilemeyen static alan
    private static Logger _instance;

    // Dışarıdan "new Logger()" yazılmasını engellemek için private Constructor!
    private Logger() { }

    // Dış dünyanın objeye erişebileceği TEK kilit kapı
    public static Logger GetInstance()
    {
        // Eğer obje daha önce hiç yaratılmamışsa, İLK VE SON KEZ yarat.
        if (_instance == null)
        {
            _instance = new Logger();
        }
        // Zaten yaratılmışsa, eldeki mevcut kopyayı geri gönder.
        return _instance;
    }

    public void LogYaz(string mesaj)
    {
        Console.WriteLine("Sisteme Loglandı: " + mesaj);
    }
}

// KULLANIM:
// Logger log1 = new Logger(); // HATA! Yazılamaz!
Logger log1 = Logger.GetInstance(); // Obje üretildi.
Logger log2 = Logger.GetInstance(); // Yeni üretilmedi, ilk baştaki log1 geri döndü.
// log1 ve log2 bellekte TIPATIP aynı objedir.
```

## 2. Factory Method (Fabrika) Kalıbı
- **Problem:** Kodunuzun içinde sürekli `if-else` yazarak "Eğer müşteri bireyselse BireyselMusteri nesnesi yarat, eğer kurumsalsa KurumsalMusteri nesnesi yarat" gibi kontroller kod kirliliği yaratır.
- **Çözüm:** Nesne yaratma işini (fabrika üretimi gibi) özel bir Fabrika sınıfına devredersiniz. Siz sadece "Bana Kurumsal Müşteri ver" dersiniz, fabrika içindeki `if-else` karmaşasını çözer ve size doğru nesneyi üretip verir. Ana (Müşteri ekranı) kodunuz tertemiz kalır. İleride "Yabancı Müşteri" çıktığında ana koda değil, sadece Fabrika sınıfına müdahale edersiniz.

## 3. Builder (İnşaatçı) Kalıbı
- **Problem:** Bazı nesnelerin yapıcı metotları (Constructor) korkunç uzundur. `new Hamburger(true, false, true, "ketçap", 2, false);` Bu değerlerin ne anlama geldiği okunamaz (Buna Telescopic Constructor Anti-Patterni denir).
- **Çözüm:** Adım adım nesne inşa etmenizi sağlar.
  ```csharp
  // İnanılmaz okunaklı bir kod:
  Hamburger menum = new HamburgerBuilder()
      .PeynirEkle()
      .KofteKoy(2)
      .TursuCikar()
      .KetcapEkle()
      .Uret();
  ```
