# C# 12 - Bölüm 13: Delegeler, Lambdalar ve Olaylar (Events)

Delegeler (Delegates), **"Metotları (Fonksiyonları) bir değişkenin içinde tutabilmemizi"** sağlayan yapılardır. C#'ı modern ve fonksiyonel kılan en önemli konseptlerden biridir.

## 1. Klasik Delege (Delegate) Tanımlama
Eskiden delegeler uzun ve zahmetli tanımlanırdı.

```csharp
// 1. Delege Tanımı (Geriye int dönen, iki int parametre alan metotları tutabilir)
public delegate int MatematikIslemi(int x, int y);

public int Topla(int a, int b) => a + b;

// 2. Kullanımı
MatematikIslemi islem = Topla;
Console.WriteLine(islem(5, 10)); // Çıktı: 15
```

## 2. Modern .NET Delegeleri: `Action`, `Func`, `Predicate`
Yukarıdaki gibi amelece delege tanımlamak yerine, Microsoft bize hazır delege türleri sunar. Günümüzde (LINQ dahil) hep bunlar kullanılır.

### A) `Action` (Geriye değer DÖNMEYEN - void - metotlar için)
```csharp
Action<string> ekranaYazdir = mesaj => Console.WriteLine(mesaj);
ekranaYazdir("Merhaba C# 12!");
```

### B) `Func` (Geriye değer DÖNEN metotlar için)
En sondaki tip, metodun geri dönüş (return) tipidir. Öncesindekiler ise aldığı parametrelerdir.

```csharp
// İki int alır, geriye bool döner
Func<int, int, bool> kiyasla = (sayi1, sayi2) => sayi1 > sayi2;
bool sonuc = kiyasla(10, 5); // True
```

### C) `Predicate` (Geriye SADECE bool dönen metotlar için)
Genellikle filtreleme (`Where`) işlemlerinde kullanılır. Sadece tek parametre alır.

```csharp
Predicate<int> ciftMi = sayi => sayi % 2 == 0;
```

## 3. Lambda İfadeleri (`=>`)
İsimsiz (Anonymous) metotlar yazmak için kullanılır. Modern C#'ın belkemiğidir.

```csharp
// Uzun Yazım:
Func<int, int> kareAl = delegate(int x) { return x * x; };

// Kısa (Lambda) Yazım:
Func<int, int> kareAlLambda = x => x * x;
```

## 4. Olaylar (Events)
Event'ler, sistemde bir şey olduğunda (örneğin butona tıklandığında, sıcaklık arttığında) dışarıya haber vermek için kullanılır. Arka planda **Delege** altyapısını kullanır. (Örn: Observer Design Pattern).
