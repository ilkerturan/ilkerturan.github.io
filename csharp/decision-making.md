# C# Karar Mekanizmaları Ders Notu

## Giriş

Karar mekanizmaları, programların belirli koşullara göre farklı işlemler yapmasını sağlayan yapılardır. C# dilinde programın akışını kontrol etmek için çeşitli karar yapıları kullanılır. Bu yapılar sayesinde programlarımız dinamik ve esnek hale gelir.

---

## 1. if Yapısı

En temel karar mekanizmasıdır. Belirtilen koşul doğruysa (true) kod bloğu çalışır.

### Söz Dizimi

```csharp
if (koşul)
{
    // Koşul doğruysa çalışacak kod
}
```

### Örnek

```csharp
int yas = 18;

if (yas >= 18)
{
    Console.WriteLine("Ehliyet alabilirsiniz.");
}
```

**Açıklama:** Bu örnekte `yas` değişkeni 18 veya daha büyükse ekrana "Ehliyet alabilirsiniz." mesajı yazdırılır.

---

## 2. if-else Yapısı

Koşul doğruysa bir işlem, yanlışsa başka bir işlem yapılmasını sağlar.

### Söz Dizimi

```csharp
if (koşul)
{
    // Koşul doğruysa çalışacak kod
}
else
{
    // Koşul yanlışsa çalışacak kod
}
```

### Örnek

```csharp
int not = 45;

if (not >= 50)
{
    Console.WriteLine("Geçtiniz!");
}
else
{
    Console.WriteLine("Kaldınız!");
}
```

**Açıklama:** Not 50 veya üzerindeyse "Geçtiniz", değilse "Kaldınız" mesajı gösterilir.

---

## 3. if-else if-else Yapısı

Birden fazla koşulu sırayla kontrol etmek için kullanılır.

### Söz Dizimi

```csharp
if (koşul1)
{
    // Koşul1 doğruysa
}
else if (koşul2)
{
    // Koşul2 doğruysa
}
else if (koşul3)
{
    // Koşul3 doğruysa
}
else
{
    // Hiçbir koşul doğru değilse
}
```

### Örnek

```csharp
int puan = 75;

if (puan >= 90)
{
    Console.WriteLine("Harf Notu: A");
}
else if (puan >= 80)
{
    Console.WriteLine("Harf Notu: B");
}
else if (puan >= 70)
{
    Console.WriteLine("Harf Notu: C");
}
else if (puan >= 60)
{
    Console.WriteLine("Harf Notu: D");
}
else
{
    Console.WriteLine("Harf Notu: F");
}
```

**Açıklama:** Puan değerine göre harf notu belirlenir. İlk doğru koşul bulunduğunda o blok çalışır ve diğerleri kontrol edilmez.

---

## 4. İç İçe if Yapısı (Nested if)

Bir if bloğunun içinde başka if bloklarının kullanılmasıdır.

### Örnek

```csharp
int yas = 20;
bool ehliyetVar = true;

if (yas >= 18)
{
    if (ehliyetVar)
    {
        Console.WriteLine("Araba kiralayabilirsiniz.");
    }
    else
    {
        Console.WriteLine("Ehliyet almanız gerekiyor.");
    }
}
else
{
    Console.WriteLine("18 yaşından küçüksünüz.");
}
```

**Açıklama:** Önce yaş kontrolü yapılır, ardından ehliyet durumu kontrol edilir. Her iki koşul da sağlandığında araba kiralanabilir.

---

## 5. switch-case Yapısı

Bir değişkenin farklı değerlerine göre farklı işlemler yapmak için kullanılır. Genellikle if-else if zincirlerine alternatif olarak tercih edilir.

### Söz Dizimi

```csharp
switch (değişken)
{
    case değer1:
        // değer1 için işlemler
        break;
    case değer2:
        // değer2 için işlemler
        break;
    default:
        // Hiçbir case eşleşmezse
        break;
}
```

### Örnek

```csharp
int gun = 3;

switch (gun)
{
    case 1:
        Console.WriteLine("Pazartesi");
        break;
    case 2:
        Console.WriteLine("Salı");
        break;
    case 3:
        Console.WriteLine("Çarşamba");
        break;
    case 4:
        Console.WriteLine("Perşembe");
        break;
    case 5:
        Console.WriteLine("Cuma");
        break;
    case 6:
        Console.WriteLine("Cumartesi");
        break;
    case 7:
        Console.WriteLine("Pazar");
        break;
    default:
        Console.WriteLine("Geçersiz gün");
        break;
}
```

**Açıklama:** Gün değişkeninin değerine göre ilgili gün adı yazdırılır. `break` anahtar kelimesi, case bloğundan çıkışı sağlar.

---

## 6. switch Expression (C# 8.0+)

Modern C# sürümlerinde daha kısa ve okunabilir switch kullanımı.

### Örnek

```csharp
int ay = 12;

string mevsim = ay switch
{
    12 or 1 or 2 => "Kış",
    3 or 4 or 5 => "İlkbahar",
    6 or 7 or 8 => "Yaz",
    9 or 10 or 11 => "Sonbahar",
    _ => "Geçersiz ay"
};

Console.WriteLine(mevsim);
```

**Açıklama:** `or` operatörü ile birden fazla değer tek satırda kontrol edilebilir. `_` karakteri default durumu temsil eder.

---

## 7. Ternary Operator (Üçlü Koşul Operatörü)

Kısa if-else yapıları için kullanılan tek satırlık koşullu ifadedir.

### Söz Dizimi

```csharp
sonuç = (koşul) ? doğruysa_değer : yanlışsa_değer;
```

### Örnek

```csharp
int sayi = 10;
string sonuc = (sayi % 2 == 0) ? "Çift" : "Tek";
Console.WriteLine(sonuc); // Çift
```

**Açıklama:** Sayı çift ise "Çift", tek ise "Tek" değeri atanır. Basit koşullar için kod okunabilirliğini artırır.

---

## 8. Mantıksal Operatörler

Karar yapılarında birden fazla koşulu birleştirmek için kullanılır.

### Operatörler

- `&&` (VE - AND): Her iki koşul da doğru olmalı
- `||` (VEYA - OR): Koşullardan en az biri doğru olmalı
- `!` (DEĞİL - NOT): Koşulun tersini alır

### Örnekler

```csharp
int yas = 25;
bool ogrenciMi = true;

// VE operatörü
if (yas >= 18 && yas <= 30)
{
    Console.WriteLine("Genç yetişkin");
}

// VEYA operatörü
if (yas < 18 || ogrenciMi)
{
    Console.WriteLine("İndirim hakkınız var");
}

// DEĞİL operatörü
if (!ogrenciMi)
{
    Console.WriteLine("Öğrenci değilsiniz");
}
```

**Açıklama:** Mantıksal operatörler sayesinde karmaşık koşullar oluşturulabilir. `&&` operatöründe her iki koşul, `||` operatöründe ise en az bir koşul doğru olmalıdır.

---

## 9. Karşılaştırma Operatörleri

Karar yapılarında kullanılan temel karşılaştırma operatörleri:

- `==` : Eşit mi?
- `!=` : Eşit değil mi?
- `>` : Büyük mü?
- `<` : Küçük mü?
- `>=` : Büyük veya eşit mi?
- `<=` : Küçük veya eşit mi?

### Örnek

```csharp
int a = 10, b = 20;

if (a == b) Console.WriteLine("Eşit");
if (a != b) Console.WriteLine("Eşit değil");
if (a > b) Console.WriteLine("a büyük");
if (a < b) Console.WriteLine("a küçük");
```

---

## 10. Null-Coalescing ve Null-Conditional Operatörleri

C# dilinde null değerleri kontrol etmek için özel operatörler vardır.

### Null-Coalescing Operator (`??`)

```csharp
string isim = null;
string sonuc = isim ?? "Varsayılan İsim";
Console.WriteLine(sonuc); // Varsayılan İsim
```

**Açıklama:** İlk değer null ise, ikinci değer kullanılır.

### Null-Conditional Operator (`?.`)

```csharp
string isim = null;
int? uzunluk = isim?.Length;
Console.WriteLine(uzunluk); // null
```

**Açıklama:** Nesne null ise işlem yapılmaz ve null döndürülür, aksi halde işlem gerçekleştirilir.

---

## En İyi Uygulamalar

1. **Okunabilirlik**: Karmaşık koşulları parantezlerle netleştirin
2. **Basitlik**: Mümkünse switch yerine pattern matching kullanın
3. **Performans**: Çok fazla iç içe if yerine erken dönüş (early return) tercih edin
4. **Break Kullanımı**: switch-case yapısında break ifadesini unutmayın
5. **Default Case**: switch yapısında her zaman default case ekleyin
6. **Mantıksal Operatörler**: Kısa devre değerlendirmesinden (short-circuit evaluation) yararlanın

---

## Teknik Terimler Sözlüğü

**Boolean (bool)**: Mantıksal değer tipi. Sadece `true` (doğru) veya `false` (yanlış) değerlerini alabilir.

**Break**: switch-case veya döngü yapılarından çıkmak için kullanılan anahtar kelime.

**Case**: switch yapısında kontrol edilecek değerleri tanımlayan anahtar kelime.

**Condition (Koşul)**: Programın akışını belirleyen, true veya false döndüren ifade.

**Default**: switch yapısında hiçbir case eşleşmediğinde çalışacak bloku tanımlar.

**Early Return**: Fonksiyonun erken sonlanması tekniği. Gereksiz kod çalıştırılmasını önler.

**Else**: if koşulu yanlış olduğunda çalışacak kod bloğunu tanımlar.

**Expression**: Bir değer döndüren kod parçası. Örneğin, `2 + 3` bir expression'dır.

**If**: Belirtilen koşul doğruysa kod bloğunun çalışmasını sağlayan kontrol yapısı.

**Nested (İç İçe)**: Bir yapının başka bir yapının içinde bulunması durumu.

**Null**: Bir referans tipinin herhangi bir nesneyi göstermediğini belirten özel değer.

**Null-Coalescing Operator (`??`)**: Sol taraf null ise sağ taraftaki değeri döndüren operatör.

**Null-Conditional Operator (`?.`)**: Nesne null ise işlem yapmadan null döndüren operatör.

**Operator (Operatör)**: Değişkenler ve değerler üzerinde işlem yapan sembol. Örneğin: `+`, `-`, `==`, `&&`.

**Pattern Matching**: Değerleri yapısal olarak karşılaştırma ve ayrıştırma tekniği.

**Short-Circuit Evaluation (Kısa Devre Değerlendirmesi)**: Mantıksal operatörlerde sonuç belli olduğunda geri kalan koşulların değerlendirilmemesi.

**Statement**: Bir işlemi gerçekleştiren kod satırı veya bloğu.

**Switch Expression**: Modern C# (8.0+) ile gelen, değer döndüren switch yapısı.

**Switch-Case**: Bir değişkenin farklı değerlerine göre farklı kod bloklarının çalıştırılmasını sağlayan yapı.

**Ternary Operator (Üçlü Operatör)**: Tek satırda koşullu değer atama yapan `? :` operatörü.

**True/False**: Boolean veri tipinin iki olası değeri. True doğru, False yanlış anlamına gelir.

---

## Sonuç

C# dilindeki karar mekanizmaları, programların dinamik ve esnek olmasını sağlar. if-else, switch-case ve ternary operatör gibi yapılar sayesinde programlarımız farklı durumlara uygun tepkiler verebilir. Bu yapıları doğru ve etkili kullanmak, temiz ve sürdürülebilir kod yazmak için önemlidir.