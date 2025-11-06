# C# Veri Tipleri

## Değer Tipleri (Value Types)

Değer tipleri verinin kendisini doğrudan saklar. Stack bellekte tutulur.

### Tam Sayı Tipleri

Ondalık kısım içermeyen sayıları saklar.

| Tip | Boyut | Aralık |
|-----|-------|--------|
| `sbyte` | 8 bit | -128 ile 127 |
| `byte` | 8 bit | 0 ile 255 |
| `short` | 16 bit | -32,768 ile 32,767 |
| `ushort` | 16 bit | 0 ile 65,535 |
| `int` | 32 bit | -2,147,483,648 ile 2,147,483,647 |
| `uint` | 32 bit | 0 ile 4,294,967,295 |
| `long` | 64 bit | -9,223,372,036,854,775,808 ile 9,223,372,036,854,775,807 |
| `ulong` | 64 bit | 0 ile 18,446,744,073,709,551,615 |

**Açıklama:** `s` ile başlayanlar işaretli (signed - negatif değer alabilir), `u` ile başlayanlar işaretsiz (unsigned - sadece pozitif) tam sayılardır.

```csharp
int yas = 25;
long nufus = 8000000000L;
byte puan = 100;
```

### Ondalık Sayı Tipleri

Ondalık kısım içeren sayıları saklar.

| Tip | Boyut | Hassasiyet |
|-----|-------|------------|
| `float` | 32 bit | 7 basamak |
| `double` | 64 bit | 15-16 basamak |
| `decimal` | 128 bit | 28-29 basamak |

**Açıklama:** `float` küçük ondalık sayılar için, `double` genel kullanım için, `decimal` finansal hesaplamalar için tercih edilir.

```csharp
float sicaklik = 36.5f;      // f son eki zorunlu
double pi = 3.14159265359;   // Varsayılan ondalık tip
decimal fiyat = 19.99m;      // m son eki zorunlu
```

### Diğer Değer Tipleri

| Tip | Boyut | Açıklama |
|-----|-------|----------|
| `char` | 16 bit | Tek bir Unicode karakter saklar |
| `bool` | 1 bit | Mantıksal değer (true/false) saklar |

```csharp
char harf = 'A';
bool aktif = true;
```

## Referans Tipleri (Reference Types)

Referans tipleri verinin bellekteki adresini saklar. Heap bellekte tutulur.

### String

Metin verilerini saklar. Değiştirilemez (immutable) bir tiptir.

```csharp
string isim = "Ahmet";
string soyisim = "Yılmaz";
string tamIsim = isim + " " + soyisim;
```

**Açıklama:** String'ler çift tırnak içinde yazılır. Her değişiklikte bellekte yeni bir string oluşur.

### Array (Dizi)

Aynı tipten birden fazla veriyi saklar. Sabit boyutludur.

```csharp
int[] sayilar = new int[5];           // 5 elemanlı boş dizi
int[] notlar = { 80, 90, 75, 85, 95 }; // Değerlerle tanımlama
```

**Açıklama:** Dizi elemanlarına index (0'dan başlar) ile erişilir. Örnek: `notlar[0]` ilk elemanı verir.

### Object

C#'taki tüm tiplerin atasıdır. Her türlü veriyi tutabilir.

```csharp
object veri = 42;
object metin = "Merhaba";
object ondalik = 3.14;
```

**Açıklama:** Herhangi bir tipi object olarak saklayabilirsiniz, ancak kullanırken tip dönüşümü gerekebilir.

---

## Teknik Terimler Sözlüğü

**Bit:** Bilgisayarın saklayabileceği en küçük veri birimi (0 veya 1).

**Byte:** 8 bitten oluşan veri birimi.

**Stack:** Değer tiplerinin saklandığı, hızlı erişimli bellek bölgesi.

**Heap:** Referans tiplerinin saklandığı, dinamik bellek bölgesi.

**Signed (İşaretli):** Negatif ve pozitif değerleri saklayabilen tip.

**Unsigned (İşaretsiz):** Sadece pozitif değerleri saklayabilen tip.

**Immutable (Değiştirilemez):** Bir kez oluşturulduktan sonra değeri değiştirilemeyen veri.

**Index:** Dizi elemanlarının sıra numarası (0'dan başlar).

**Hassasiyet:** Ondalık sayılarda virgülden sonra kaç basamak tutulabildiği.

**Unicode:** Dünyadaki tüm karakterleri temsil eden standart karakter kodlama sistemi.

**Referans:** Bellekte tutulan verinin adres bilgisi.

**Tip Dönüşümü (Type Casting):** Bir veri tipini başka bir veri tipine çevirme işlemi.