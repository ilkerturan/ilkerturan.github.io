# C# Döngüleri - Ders Notları

## 📚 İçindekiler
1. [Döngü Nedir?](#döngü-nedir)
2. [for Döngüsü](#for-döngüsü)
3. [while Döngüsü](#while-döngüsü)
4. [do-while Döngüsü](#do-while-döngüsü)
5. [foreach Döngüsü](#foreach-döngüsü)
6. [Döngü Kontrol İfadeleri](#döngü-kontrol-ifadeleri)
7. [İç İçe Döngüler](#iç-içe-döngüler)
8. [Sonsuz Döngüler](#sonsuz-döngüler)
9. [Teknik Terimler Sözlüğü](#teknik-terimler-sözlüğü)

---

## Döngü Nedir?

Döngüler, belirli bir kod bloğunun belirli bir koşul sağlandığı sürece tekrar tekrar çalıştırılmasını sağlayan programlama yapılarıdır. C# dilinde dört temel döngü türü bulunmaktadır: `for`, `while`, `do-while` ve `foreach`.

**Döngülerin Kullanım Amaçları:**
- Tekrarlayan işlemleri otomatikleştirme
- Koleksiyonlar üzerinde gezinme
- Belirli bir koşul sağlanana kadar işlem yapma
- Kod tekrarını azaltma ve okunabilirliği artırma

---

## for Döngüsü

`for` döngüsü, kaç kez tekrarlanacağı önceden bilinen durumlar için idealdir. Başlangıç değeri, koşul ve artış/azalış ifadesi tek satırda tanımlanır.

### Sözdizimi (Syntax)
```csharp
for (başlangıç; koşul; artış/azalış)
{
    // Çalıştırılacak kod
}
```

### Örnekler

**Örnek 1: Basit Sayma**
```csharp
// 1'den 5'e kadar sayıları yazdırma
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Sayı: {i}");
}
// Çıktı: 1, 2, 3, 4, 5
```

**Örnek 2: Geriye Doğru Sayma**
```csharp
// 10'dan 1'e kadar geriye sayma
for (int i = 10; i >= 1; i--)
{
    Console.WriteLine($"Geri sayım: {i}");
}
```

**Örnek 3: İkişer İkişer Artırma**
```csharp
// Çift sayıları yazdırma
for (int i = 0; i <= 10; i += 2)
{
    Console.WriteLine($"Çift sayı: {i}");
}
// Çıktı: 0, 2, 4, 6, 8, 10
```

**Örnek 4: Dizi Elemanlarını Gezme**
```csharp
string[] meyveler = { "Elma", "Armut", "Muz", "Çilek" };
for (int i = 0; i < meyveler.Length; i++)
{
    Console.WriteLine($"{i + 1}. Meyve: {meyveler[i]}");
}
```

---

## while Döngüsü

`while` döngüsü, koşul doğru olduğu sürece çalışmaya devam eder. Döngüye girmeden önce koşul kontrol edilir. Tekrar sayısının önceden bilinmediği durumlarda kullanılır.

### Sözdizimi
```csharp
while (koşul)
{
    // Çalıştırılacak kod
}
```

### Örnekler

**Örnek 1: Basit Sayaç**
```csharp
int sayac = 0;
while (sayac < 5)
{
    Console.WriteLine($"Sayaç: {sayac}");
    sayac++;
}
```

**Örnek 2: Kullanıcı Girişi Kontrolü**
```csharp
string sifre = "";
while (sifre != "1234")
{
    Console.Write("Şifre girin: ");
    sifre = Console.ReadLine();
    
    if (sifre != "1234")
    {
        Console.WriteLine("Yanlış şifre! Tekrar deneyin.");
    }
}
Console.WriteLine("Giriş başarılı!");
```

**Örnek 3: Toplam Hesaplama**
```csharp
int toplam = 0;
int sayi = 1;
while (sayi <= 10)
{
    toplam += sayi;
    sayi++;
}
Console.WriteLine($"1'den 10'a kadar toplam: {toplam}"); // 55
```

---

## do-while Döngüsü

`do-while` döngüsü, `while` döngüsüne benzer ancak koşul döngünün sonunda kontrol edilir. Bu sayede döngü en az bir kez mutlaka çalışır.

### Sözdizimi
```csharp
do
{
    // Çalıştırılacak kod
} while (koşul);
```

### Örnekler

**Örnek 1: Menü Sistemi**
```csharp
int secim;
do
{
    Console.WriteLine("\n=== MENÜ ===");
    Console.WriteLine("1. Yeni Kayıt");
    Console.WriteLine("2. Listeleme");
    Console.WriteLine("3. Çıkış");
    Console.Write("Seçiminiz: ");
    secim = int.Parse(Console.ReadLine());
    
    switch (secim)
    {
        case 1:
            Console.WriteLine("Yeni kayıt eklendi.");
            break;
        case 2:
            Console.WriteLine("Kayıtlar listeleniyor...");
            break;
        case 3:
            Console.WriteLine("Çıkış yapılıyor...");
            break;
        default:
            Console.WriteLine("Geçersiz seçim!");
            break;
    }
} while (secim != 3);
```

**Örnek 2: Geçerli Giriş Alma**
```csharp
int yas;
do
{
    Console.Write("Yaşınızı girin (0-120): ");
    yas = int.Parse(Console.ReadLine());
    
    if (yas < 0 || yas > 120)
    {
        Console.WriteLine("Geçersiz yaş! Lütfen tekrar deneyin.");
    }
} while (yas < 0 || yas > 120);

Console.WriteLine($"Yaşınız kaydedildi: {yas}");
```

---

## foreach Döngüsü

`foreach` döngüsü, koleksiyonlar (diziler, listeler, vb.) üzerinde gezinmek için kullanılır. Her iterasyonda koleksiyonun bir elemanına erişir.

### Sözdizimi
```csharp
foreach (tip değişken in koleksiyon)
{
    // Çalıştırılacak kod
}
```

### Örnekler

**Örnek 1: Dizi Elemanlarını Yazdırma**
```csharp
string[] sehirler = { "İstanbul", "Ankara", "İzmir", "Antalya" };
foreach (string sehir in sehirler)
{
    Console.WriteLine($"Şehir: {sehir}");
}
```

**Örnek 2: Liste ile Çalışma**
```csharp
List<int> sayilar = new List<int> { 10, 20, 30, 40, 50 };
int toplam = 0;

foreach (int sayi in sayilar)
{
    toplam += sayi;
}
Console.WriteLine($"Toplam: {toplam}"); // 150
```

**Örnek 3: Dictionary ile Çalışma**
```csharp
Dictionary<string, int> notlar = new Dictionary<string, int>
{
    { "Ali", 85 },
    { "Ayşe", 92 },
    { "Mehmet", 78 }
};

foreach (KeyValuePair<string, int> ogrenci in notlar)
{
    Console.WriteLine($"{ogrenci.Key}: {ogrenci.Value}");
}
```

---

## Döngü Kontrol İfadeleri

### break İfadesi
`break` ifadesi, döngüyü anında sonlandırır ve döngüden çıkar.

```csharp
// İlk negatif sayıyı bulana kadar devam et
int[] sayilar = { 5, 10, -3, 15, 20 };
foreach (int sayi in sayilar)
{
    if (sayi < 0)
    {
        Console.WriteLine($"İlk negatif sayı: {sayi}");
        break; // Döngüden çık
    }
}
```

### continue İfadesi
`continue` ifadesi, o iterasyonun geri kalanını atlar ve bir sonraki iterasyona geçer.

```csharp
// Tek sayıları atla, sadece çift sayıları yazdır
for (int i = 1; i <= 10; i++)
{
    if (i % 2 != 0) // Tek sayı mı?
    {
        continue; // Bu iterasyonu atla
    }
    Console.WriteLine(i); // Sadece çift sayılar yazdırılır
}
```

### return İfadesi
`return` ifadesi, metodun tamamını sonlandırır ve döngüden de çıkar.

```csharp
public bool SayiBul(int[] dizi, int aranan)
{
    foreach (int sayi in dizi)
    {
        if (sayi == aranan)
        {
            return true; // Metodu ve döngüyü sonlandır
        }
    }
    return false;
}
```

---

## İç İçe Döngüler

İç içe döngüler, bir döngünün içinde başka bir döngünün bulunması durumudur. Genellikle çok boyutlu veri yapılarıyla çalışırken kullanılır.

### Örnekler

**Örnek 1: Çarpım Tablosu**
```csharp
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= 5; j++)
    {
        Console.Write($"{i * j,4}"); // 4 karakter genişliğinde yazdır
    }
    Console.WriteLine(); // Yeni satıra geç
}
```

**Örnek 2: Yıldız Deseni**
```csharp
// Piramit oluşturma
for (int i = 1; i <= 5; i++)
{
    for (int j = 1; j <= i; j++)
    {
        Console.Write("* ");
    }
    Console.WriteLine();
}
// Çıktı:
// *
// * *
// * * *
// * * * *
// * * * * *
```

**Örnek 3: İki Boyutlu Dizi**
```csharp
int[,] matris = {
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

for (int satir = 0; satir < 3; satir++)
{
    for (int sutun = 0; sutun < 3; sutun++)
    {
        Console.Write($"{matris[satir, sutun]} ");
    }
    Console.WriteLine();
}
```

---

## Sonsuz Döngüler

Sonsuz döngüler, koşul hiçbir zaman false olmadığı için sürekli çalışan döngülerdir. Genellikle hata olarak ortaya çıkar, ancak bazı durumlarda kasıtlı olarak kullanılır.

### Örnekler

**Sonsuz for Döngüsü**
```csharp
// DİKKAT: Bu döngü sonsuza kadar çalışır!
for (;;)
{
    Console.WriteLine("Sonsuz döngü");
    // break ile çıkış yapılmalı
}
```

**Sonsuz while Döngüsü**
```csharp
// Sunucu uygulamaları için kullanılabilir
while (true)
{
    Console.WriteLine("Komut bekleniyor...");
    string komut = Console.ReadLine();
    
    if (komut == "exit")
    {
        break; // Döngüden çık
    }
    
    // Komut işleme...
}
```

**Kasıtlı Sonsuz Döngü Kullanımı**
```csharp
// Oyun döngüsü örneği
while (true)
{
    // Oyun durumunu güncelle
    GuncelleDurum();
    
    // Ekranı çiz
    EkranaCiz();
    
    // Oyun bitti mi kontrol et
    if (OyunBittiMi())
    {
        break;
    }
}
```

---

## Teknik Terimler Sözlüğü

### A
- **Artış Operatörü (Increment Operator)**: Bir değişkenin değerini 1 artıran operatör (++)
- **Azalış Operatörü (Decrement Operator)**: Bir değişkenin değerini 1 azaltan operatör (--)

### B
- **break**: Döngüyü anında sonlandıran kontrol ifadesi
- **Body (Gövde)**: Döngü içinde tekrar tekrar çalıştırılan kod bloğu

### C
- **Collection (Koleksiyon)**: Birden fazla öğeyi içeren veri yapısı (dizi, liste, vb.)
- **Condition (Koşul)**: Döngünün devam edip etmeyeceğini belirleyen mantıksal ifade
- **continue**: O anki iterasyonu atlayıp bir sonrakine geçiren kontrol ifadesi

### D
- **do-while**: Koşulu sonda kontrol eden, en az bir kez çalışan döngü türü
- **Döngü (Loop)**: Belirli bir kod bloğunun tekrar tekrar çalıştırılması işlemi

### F
- **for**: Başlangıç, koşul ve artış ifadelerini tek satırda tanımlayan döngü türü
- **foreach**: Koleksiyonlar üzerinde gezinmek için kullanılan döngü türü

### I
- **Index (İndeks)**: Bir koleksiyondaki elemanın sıra numarası (0'dan başlar)
- **Infinite Loop (Sonsuz Döngü)**: Sonlanma koşulu hiçbir zaman sağlanmayan döngü
- **Iteration (İterasyon)**: Döngünün bir kez çalışması

### İ
- **İç İçe Döngü (Nested Loop)**: Bir döngünün içinde başka bir döngünün bulunması

### K
- **KeyValuePair**: Dictionary koleksiyonunda anahtar-değer çiftini temsil eden yapı
- **Koşul İfadesi (Conditional Expression)**: True veya false döndüren mantıksal ifade

### L
- **Length**: Bir dizinin eleman sayısını veren özellik
- **Loop Control Statement**: Döngü akışını kontrol eden ifadeler (break, continue, return)

### R
- **return**: Metodu ve içindeki döngüyü sonlandıran ifade

### S
- **Scope (Kapsam)**: Bir değişkenin erişilebilir olduğu kod bölgesi
- **Syntax (Sözdizimi)**: Programlama dilinin gramer kuralları

### T
- **Tip Dönüşümü (Type Conversion)**: Bir veri tipinin başka bir veri tipine çevrilmesi

### W
- **while**: Koşul doğru olduğu sürece çalışan döngü türü

---

## 💡 İpuçları ve En İyi Uygulamalar

1. **Döğü seçimi**: Eleman sayısı belliyse `for`, belli değilse `while` kullanın
2. **foreach kullanımı**: Koleksiyonlarda indeks gerekmiyorsa `foreach` tercih edin
3. **Sonsuz döngülerden kaçının**: Her döngünün bir çıkış koşulu olmalı
4. **Performans**: İç içe döngülerde dikkatli olun, zaman karmaşıklığı artar
5. **Okunabilirlik**: Döngü değişkenlerine anlamlı isimler verin
6. **Güvenlik**: Döngü koşullarını dikkatli kontrol edin

---

**Hazırlayan:** C# Eğitim Notları  
**Tarih:** 2024  
**Versiyon:** 1.0