# C# Operatörleri Ders Notu

## İçindekiler
1. [Giriş](#giriş)
2. [Aritmetik Operatörler](#aritmetik-operatörler)
3. [Atama Operatörleri](#atama-operatörleri)
4. [Karşılaştırma Operatörleri](#karşılaştırma-operatörleri)
5. [Mantıksal Operatörler](#mantıksal-operatörler)
6. [Bitsel Operatörler](#bitsel-operatörler)
7. [Artırma ve Azaltma Operatörleri](#artırma-ve-azaltma-operatörleri)
8. [Koşul Operatörü (Ternary)](#koşul-operatörü-ternary)
9. [Null-Coalescing Operatörleri](#null-coalescing-operatörleri)
10. [Tür Operatörleri](#tür-operatörleri)
11. [Diğer Operatörler](#diğer-operatörler)
12. [Operatör Önceliği](#operatör-önceliği)
13. [Teknik Terimler Sözlüğü](#teknik-terimler-sözlüğü)

---

## Giriş

Operatörler, C# programlama dilinde değişkenler ve değerler üzerinde işlemler yapmak için kullanılan sembollerdir. Her operatör belirli bir görevi yerine getirir ve programın mantığını oluşturan temel yapı taşlarıdır.

---

## Aritmetik Operatörler

Matematiksel işlemler yapmak için kullanılır.

| Operatör | Açıklama | Örnek | Sonuç |
|----------|----------|-------|-------|
| `+` | Toplama | `5 + 3` | `8` |
| `-` | Çıkarma | `5 - 3` | `2` |
| `*` | Çarpma | `5 * 3` | `15` |
| `/` | Bölme | `10 / 2` | `5` |
| `%` | Mod (Kalan) | `10 % 3` | `1` |

### Örnek Kod:
```csharp
int a = 10;
int b = 3;

int toplam = a + b;      // 13
int fark = a - b;        // 7
int carpim = a * b;      // 30
int bolum = a / b;       // 3 (tamsayı bölme)
int kalan = a % b;       // 1

double doubleBolum = (double)a / b;  // 3.333...
```

**Önemli Not:** Tamsayılar arasında bölme işlemi sonuç da tamsayı verir. Ondalıklı sonuç almak için en az bir değerin `double` veya `float` tipinde olması gerekir.

---

## Atama Operatörleri

Değişkenlere değer atamak veya mevcut değerleri değiştirmek için kullanılır.

| Operatör | Açıklama | Örnek | Eşdeğeri |
|----------|----------|-------|----------|
| `=` | Atama | `x = 5` | - |
| `+=` | Toplama ve atama | `x += 3` | `x = x + 3` |
| `-=` | Çıkarma ve atama | `x -= 3` | `x = x - 3` |
| `*=` | Çarpma ve atama | `x *= 3` | `x = x * 3` |
| `/=` | Bölme ve atama | `x /= 3` | `x = x / 3` |
| `%=` | Mod ve atama | `x %= 3` | `x = x % 3` |

### Örnek Kod:
```csharp
int sayi = 10;

sayi += 5;   // sayi = 15
sayi -= 3;   // sayi = 12
sayi *= 2;   // sayi = 24
sayi /= 4;   // sayi = 6
sayi %= 4;   // sayi = 2
```

---

## Karşılaştırma Operatörleri

İki değeri karşılaştırmak için kullanılır ve sonuç her zaman `bool` tipindedir (`true` veya `false`).

| Operatör | Açıklama | Örnek | Sonuç |
|----------|----------|-------|-------|
| `==` | Eşit mi? | `5 == 5` | `true` |
| `!=` | Eşit değil mi? | `5 != 3` | `true` |
| `>` | Büyük mü? | `5 > 3` | `true` |
| `<` | Küçük mü? | `5 < 3` | `false` |
| `>=` | Büyük veya eşit mi? | `5 >= 5` | `true` |
| `<=` | Küçük veya eşit mi? | `3 <= 5` | `true` |

### Örnek Kod:
```csharp
int x = 10;
int y = 20;

bool esitMi = (x == y);           // false
bool esitDegilMi = (x != y);      // true
bool buyukMu = (x > y);           // false
bool kucukMu = (x < y);           // true
bool buyukEsitMi = (x >= 10);     // true
bool kucukEsitMi = (y <= 20);     // true
```

---

## Mantıksal Operatörler

Boolean (mantıksal) değerler üzerinde işlem yapmak için kullanılır.

| Operatör | Açıklama | Örnek | Sonuç |
|----------|----------|-------|-------|
| `&&` | Mantıksal VE (AND) | `true && false` | `false` |
| `\|\|` | Mantıksal VEYA (OR) | `true \|\| false` | `true` |
| `!` | Mantıksal DEĞİL (NOT) | `!true` | `false` |

### Gerçek Tablosu:

**AND (&&) Operatörü:**
| A | B | A && B |
|---|---|--------|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

**OR (||) Operatörü:**
| A | B | A \|\| B |
|---|---|---------|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | false |

### Örnek Kod:
```csharp
int yas = 25;
bool ehliyetVar = true;

// Araç kullanabilir mi?
bool kullanabilir = (yas >= 18) && ehliyetVar;  // true

// Öğrenci veya yaşlı mı?
bool indirimliMi = (yas < 18) || (yas > 65);    // false

// Ehliyet yok mu?
bool ehliyetYok = !ehliyetVar;                  // false
```

**Kısa Devre Değerlendirmesi (Short-Circuit Evaluation):** `&&` operatöründe sol taraf `false` ise sağ taraf değerlendirilmez. `||` operatöründe sol taraf `true` ise sağ taraf değerlendirilmez.

---

## Bitsel Operatörler

Sayıların bit düzeyinde işlemler yapılmasını sağlar.

| Operatör | Açıklama | Örnek | Sonuç |
|----------|----------|-------|-------|
| `&` | Bitsel VE | `5 & 3` | `1` |
| `\|` | Bitsel VEYA | `5 \| 3` | `7` |
| `^` | Bitsel XOR | `5 ^ 3` | `6` |
| `~` | Bitsel DEĞİL | `~5` | `-6` |
| `<<` | Sola kaydırma | `5 << 1` | `10` |
| `>>` | Sağa kaydırma | `5 >> 1` | `2` |

### Örnek Kod:
```csharp
int a = 5;   // Binary: 0101
int b = 3;   // Binary: 0011

int bitwiseAnd = a & b;    // 0001 = 1
int bitwiseOr = a | b;     // 0111 = 7
int bitwiseXor = a ^ b;    // 0110 = 6
int bitwiseNot = ~a;       // ...1010 = -6 (two's complement)
int leftShift = a << 1;    // 1010 = 10 (5 * 2)
int rightShift = a >> 1;   // 0010 = 2 (5 / 2)
```

**Kullanım Alanları:** Bayrak (flag) yönetimi, düşük seviye programlama, performans optimizasyonu.

---

## Artırma ve Azaltma Operatörleri

Bir değişkenin değerini 1 artırmak veya azaltmak için kullanılır.

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| `++` | Artırma (Increment) | `x++` veya `++x` |
| `--` | Azaltma (Decrement) | `x--` veya `--x` |

### Prefix ve Postfix Farkı:

```csharp
int a = 5;
int b = 5;

// Postfix: Önce değer kullanılır, sonra artırılır
int sonuc1 = a++;  // sonuc1 = 5, a = 6

// Prefix: Önce artırılır, sonra değer kullanılır
int sonuc2 = ++b;  // sonuc2 = 6, b = 6
```

### Örnek Senaryo:
```csharp
int sayac = 0;

Console.WriteLine(sayac++);  // Ekrana 0 yazar, sonra sayac = 1
Console.WriteLine(++sayac);  // Önce sayac = 2, sonra ekrana 2 yazar
```

---

## Koşul Operatörü (Ternary)

Tek satırda basit if-else mantığı oluşturmak için kullanılır.

**Sözdizimi:** `kosul ? deger1 : deger2`

### Örnek Kod:
```csharp
int yas = 20;
string durum = (yas >= 18) ? "Reşit" : "Reşit Değil";
// durum = "Reşit"

int a = 10;
int b = 5;
int buyuk = (a > b) ? a : b;  // buyuk = 10

// İç içe kullanım
int not = 75;
string derece = (not >= 90) ? "AA" : 
                (not >= 80) ? "BA" : 
                (not >= 70) ? "BB" : "Kaldı";
// derece = "BB"
```

---

## Null-Coalescing Operatörleri

Null değerlerle çalışırken varsayılan değerler belirlemek için kullanılır.

### Null-Coalescing Operatörü (`??`)

Sol taraf `null` ise sağ tarafı döndürür.

```csharp
string isim = null;
string varsayilan = isim ?? "Bilinmiyor";
// varsayilan = "Bilinmiyor"

int? sayi = null;
int deger = sayi ?? 0;  // deger = 0

int? doluSayi = 42;
int sonuc = doluSayi ?? 0;  // sonuc = 42
```

### Null-Coalescing Assignment Operatörü (`??=`)

Sol taraf `null` ise sağ tarafı atar.

```csharp
int? sayi = null;
sayi ??= 100;  // sayi = 100

int? mevcutSayi = 50;
mevcutSayi ??= 100;  // mevcutSayi = 50 (değişmez)
```

---

## Tür Operatörleri

Nesne türlerini kontrol etmek ve dönüştürmek için kullanılır.

### `is` Operatörü

Bir nesnenin belirli bir türde olup olmadığını kontrol eder.

```csharp
object obj = "Merhaba";

if (obj is string)
{
    Console.WriteLine("Bu bir string'dir");
}

// Pattern matching ile
if (obj is string metin)
{
    Console.WriteLine($"Uzunluk: {metin.Length}");
}
```

### `as` Operatörü

Tür dönüşümü yapar. Başarısız olursa `null` döner (exception fırlatmaz).

```csharp
object obj = "Test";
string metin = obj as string;  // Başarılı

object sayi = 123;
string yanlis = sayi as string;  // yanlis = null
```

### `typeof` Operatörü

Bir türün `Type` nesnesini döndürür.

```csharp
Type tip = typeof(string);
Console.WriteLine(tip.Name);  // String
```

### `sizeof` Operatörü

Bir değer türünün bellekte kapladığı bayt sayısını döndürür.

```csharp
int boyut = sizeof(int);     // 4
int longBoyut = sizeof(long); // 8
```

---

## Diğer Operatörler

### Dizin Erişim Operatörü (`[]`)

Diziler ve koleksiyonlarda öğelere erişmek için kullanılır.

```csharp
int[] sayilar = { 10, 20, 30, 40 };
int ilkEleman = sayilar[0];  // 10
sayilar[2] = 35;  // Üçüncü elemanı 35 yap
```

### Üye Erişim Operatörü (`.`)

Nesne üyelerine (özellik, metod) erişmek için kullanılır.

```csharp
string metin = "Merhaba";
int uzunluk = metin.Length;
string buyuk = metin.ToUpper();
```

### Null-Conditional Operatör (`?.`)

Nesne `null` değilse üyesine erişir, `null` ise `null` döner.

```csharp
string metin = null;
int? uzunluk = metin?.Length;  // uzunluk = null (NullReferenceException vermez)

string doluMetin = "Test";
int? doluUzunluk = doluMetin?.Length;  // doluUzunluk = 4
```

### Lambda Operatörü (`=>`)

Lambda ifadeleri ve expression-bodied üyeler için kullanılır.

```csharp
// Lambda ifadesi
Func<int, int> kare = x => x * x;
int sonuc = kare(5);  // 25

// Expression-bodied metod
int Topla(int a, int b) => a + b;
```

### Nameof Operatörü

Değişken, tür veya üye adını string olarak döndürür.

```csharp
string degiskenAdi = "test";
Console.WriteLine(nameof(degiskenAdi));  // "degiskenAdi"
Console.WriteLine(nameof(String));       // "String"
```

---

## Operatör Önceliği

Operatörler belirli bir öncelik sırasına göre çalışır. Parantezler önceliği değiştirebilir.

### Öncelik Sırası (Yüksekten Düşüğe):

1. **Birincil:** `()` `.` `[]` `x++` `x--` `?.`
2. **Unary:** `+` `-` `!` `~` `++x` `--x` `(T)x`
3. **Çarpma:** `*` `/` `%`
4. **Toplama:** `+` `-`
5. **Kaydırma:** `<<` `>>`
6. **İlişkisel:** `<` `>` `<=` `>=` `is` `as`
7. **Eşitlik:** `==` `!=`
8. **Bitsel VE:** `&`
9. **Bitsel XOR:** `^`
10. **Bitsel VEYA:** `|`
11. **Mantıksal VE:** `&&`
12. **Mantıksal VEYA:** `||`
13. **Null-coalescing:** `??`
14. **Koşul:** `?:`
15. **Atama:** `=` `+=` `-=` `*=` `/=` vb.

### Örnek:
```csharp
int sonuc = 5 + 3 * 2;      // 11 (çarpma önce yapılır)
int sonuc2 = (5 + 3) * 2;   // 16 (parantez önceliği değiştirir)

bool test = 5 > 3 && 2 < 4;  // true (önce karşılaştırma, sonra &&)
```

---

## Teknik Terimler Sözlüğü

### A
**AND (VE) Operatörü:** İki koşulun da doğru olması durumunda true dönen mantıksal operatör (`&&`).

**Aritmetik Operatör:** Matematiksel işlemler yapmak için kullanılan operatörler (+, -, *, /, %).

**Artırma (Increment):** Bir değişkenin değerini 1 artırma işlemi (`++`).

**Assignment (Atama):** Bir değişkene değer verme işlemi.

### B
**Binary Operatör:** İki operand (değer) üzerinde işlem yapan operatörler.

**Bit:** Binary digit, 0 veya 1 değerini alan en küçük veri birimi.

**Bitwise (Bitsel):** Bit düzeyinde işlem yapan operatörler.

**Boolean:** Mantıksal değerleri temsil eden veri tipi (true/false).

### C
**Casting:** Bir veri tipini başka bir veri tipine dönüştürme işlemi.

**Coalescing:** Null değerleri kontrol ederek varsayılan değer atama.

**Compound Assignment:** Birleşik atama operatörleri (+=, -=, *=, vb.).

**Conditional Operator:** Koşul operatörü, ternary operatör (?:).

### D
**Decrement:** Bir değişkenin değerini 1 azaltma işlemi (`--`).

### E
**Expression (İfade):** Değer üreten kod parçası.

**Expression-bodied:** Lambda operatörü ile tek satırda tanımlanan metod veya özellik.

### F
**False:** Mantıksal yanlış değeri.

**Flag (Bayrak):** Bitsel operatörlerle yönetilen durum göstergeleri.

### I
**Increment:** Artırma operatörü (`++`).

### L
**Lambda Expression:** Anonim fonksiyon oluşturmak için kullanılan sözdizimi (`=>`).

**Left Shift:** Bitleri sola kaydırma operatörü (`<<`).

**Logical Operator:** Mantıksal operatörler (&&, ||, !).

### M
**Member Access:** Nesne üyelerine erişim operatörü (`.`).

**Modulo (Mod):** Bölme işleminden kalanı bulan operatör (`%`).

### N
**Nameof:** Değişken veya tür adını string olarak döndüren operatör.

**NOT (DEĞİL) Operatörü:** Mantıksal değeri tersine çeviren operatör (`!`).

**Null:** Boş referans değeri.

**Null-coalescing:** Null değerleri kontrol eden operatörler (`??`, `??=`).

**Null-conditional:** Null-safe erişim operatörü (`?.`).

**NullReferenceException:** Null bir referansa erişim yapıldığında oluşan hata.

### O
**Operand:** Operatörün işlem yaptığı değer veya değişken.

**Operator (Operatör):** Değişkenler ve değerler üzerinde işlem yapan sembol.

**Operator Precedence:** Operatör önceliği, işlem sırası.

**OR (VEYA) Operatörü:** En az bir koşul doğruysa true dönen mantıksal operatör (`||`).

### P
**Pattern Matching:** `is` operatörü ile tür kontrolü ve değişken atama.

**Postfix:** Operatörün değişkenden sonra kullanılması (x++).

**Precedence:** İşlem önceliği.

**Prefix:** Operatörün değişkenden önce kullanılması (++x).

### R
**Relational Operator:** İlişkisel/Karşılaştırma operatörleri (<, >, <=, >=).

**Right Shift:** Bitleri sağa kaydırma operatörü (`>>`).

### S
**Short-circuit Evaluation:** Mantıksal operatörlerde gereksiz değerlendirmeyi atlama.

**Sizeof:** Bir veri tipinin bellekte kapladığı alanı byte cinsinden döndüren operatör.

### T
**Ternary Operator:** Üç operand alan koşul operatörü (?:).

**True:** Mantıksal doğru değeri.

**Type:** Veri tipi.

**Typeof:** Bir türün Type nesnesini döndüren operatör.

### U
**Unary Operator:** Tek operand üzerinde işlem yapan operatörler (+, -, !, ~).

### X
**XOR (Exclusive OR):** İki değer farklı olduğunda true dönen bitsel operatör (`^`).

---

## Kaynaklar ve Önerilen Okumalar

- Microsoft C# Resmi Dokümantasyonu
- C# Language Specification
- Effective C# (Bill Wagner)

---

**Not:** Bu ders notu C# programlama dilinde operatörlerin temel kullanımını kapsamaktadır. Daha ileri seviye konular için resmi Microsoft dokümantasyonunu incelemeniz önerilir.