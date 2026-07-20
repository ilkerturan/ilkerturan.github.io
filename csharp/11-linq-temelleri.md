# C# 12 - Bölüm 11: LINQ Temelleri

LINQ (Language Integrated Query), koleksiyonlar, veritabanları veya XML üzerinde SQL benzeri sorgular yazmamızı sağlayan muazzam bir C# özelliğidir.

## 1. Neden LINQ?
Döngüler (`for`, `foreach`) ile onlarca satırda yazacağınız filtreleme ve sıralama işlemlerini, LINQ ile tek satırda yazabilirsiniz.

```csharp
List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // C# 12 Collection Expression

// Geleneksel Yöntem (Zor)
List<int> evenNumbers = new List<int>();
foreach (var n in numbers)
{
    if (n % 2 == 0)
        evenNumbers.Add(n);
}

// LINQ Yöntemi (Kolay ve Temiz)
var linqEvenNumbers = numbers.Where(n => n % 2 == 0).ToList();
```

## 2. LINQ Söz Dizimi (Syntax)

### Method Syntax (En Çok Kullanılan)
Lambda ifadeleri (`=>`) ile kullanılır. Metotlar birbirine zincirlenebilir.

```csharp
var result = kisiler
    .Where(k => k.Yas > 18)
    .OrderBy(k => k.Ad)
    .Select(k => k.Ad)
    .ToList();
```

### Query Syntax (SQL Benzeri)
```csharp
var result = from k in kisiler
             where k.Yas > 18
             orderby k.Ad
             select k.Ad;
```

## 3. Sık Kullanılan LINQ Metotları

*   **`Where`**: Filtreleme yapar. (SQL `WHERE` karşılığı)
*   **`Select`**: Sadece belirli sütunları/özellikleri çeker. Veriyi dönüştürür. (SQL `SELECT` karşılığı)
*   **`OrderBy` / `OrderByDescending`**: Sıralama yapar. (SQL `ORDER BY` karşılığı)
*   **`FirstOrDefault`**: Koleksiyondaki ilk elemanı getirir, eleman yoksa varsayılan değeri (`null` veya `0`) döner. Kodun patlamasını engeller.
*   **`Any`**: Koleksiyonda şarta uyan **en az bir** eleman var mı diye bakar (`bool` döner). `Count() > 0` yazmaktan çok daha performanslıdır.
*   **`GroupBy`**: Verileri belirli bir özelliğe göre gruplar.

## 4. Ertelenmiş Çalıştırma (Deferred Execution)
LINQ sorguları yazıldığı an **çalışmaz**. Veri tabanına veya belleğe olan sorgu, ancak veriyi gerçekten okuduğunuz an (örneğin `.ToList()`, `.ToArray()` veya `foreach` çağrıldığında) çalıştırılır. Bu duruma *Deferred Execution* denir ve inanılmaz bir performans tasarrufu sağlar.
