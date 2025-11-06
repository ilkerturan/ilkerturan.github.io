# Söz Dizimi (Syntax)

## 1. Giriş

Söz dizimi (syntax), bir programlama dilinde komutların ve ifadelerin nasıl yazılması gerektiğini belirleyen temel kurallardır. C# dilinde söz dizimi kuralları, kodun doğru bir şekilde derlenmesi için kritik öneme sahiptir.

## 2. Büyük/Küçük Harf Duyarlılığı (Case Sensitivity)

C# büyük/küçük harf duyarlı bir dildir. 

**Örnekler:**
- `Isim` ≠ `isim` ≠ `ISIM` ≠ `iSim`
- `Console` ≠ `console`
- `WriteLine` ≠ `writeLine`

Bu isimler birbirinden tamamen farklıdır ve ayrı tanımlayıcılar olarak ele alınır.

## 3. Noktalı Virgül (;) Kullanımı

Her ifade (statement) noktalı virgül ile sonlandırılmalıdır.

**Doğru:**
```
Console.WriteLine("Merhaba");
int x = 5;
Hesapla();
```

**Yanlış:**
```
Console.WriteLine("Merhaba")
int x = 5
Hesapla()
```

## 4. Süslü Parantezler { }

Kod blokları süslü parantezlerle tanımlanır.

**Örnek:**
```
{
    // Bu bir kod bloğudur
    // Birden fazla ifade içerebilir
}
```

**İç içe bloklar:**
```
{
    // Dış blok
    {
        // İç blok
        {
            // Daha içteki blok
        }
    }
}
```

## 5. Parantezler ( )

Parantezler, ifadeleri gruplandırmak ve metod parametrelerini tanımlamak için kullanılır.

**Örnekler:**
```
(5 + 3) * 2
Hesapla(10, 20)
if (x > 5)
while (true)
```

## 6. Köşeli Parantezler [ ]

Dizileri ve indekslemeyi tanımlamak için kullanılır.

**Örnekler:**
```
int[] sayilar
sayilar[0]
matris[2, 3]
```

## 7. Girintileme (Indentation)

Girintileme zorunlu değildir ancak kodun okunabilirliği için şiddetle önerilir.

**İyi girintileme:**
```
class Program
{
    void Metod()
    {
        if (koşul)
        {
            // 4 boşluk veya 1 tab
        }
    }
}
```

**Kötü girintileme:**
```
class Program
{
void Metod()
{
if (koşul)
{
// Okunması zor
}
}
}
```

## 8. Yorum Satırları

### 8.1 Tek Satır Yorum

İki eğik çizgi (`//`) ile başlar.

**Örnekler:**
```
// Bu bir yorum satırıdır
int x = 5; // Satır sonunda yorum
// int y = 10; Bu satır çalışmaz
```

### 8.2 Çok Satırlı Yorum

`/*` ile başlar, `*/` ile biter.

**Örnek:**
```
/* Bu bir
   çok satırlı
   yorum bloğudur */

/* 
 * Yıldızlarla süslenmiş
 * yorum bloğu
 */
```

### 8.3 XML Dokümantasyon Yorumu

`///` ile başlar.

**Örnek:**
```
/// <summary>
/// Bu metod hakkında açıklama
/// </summary>
```

## 9. Beyaz Boşluklar (Whitespace)

Boşluk, tab ve yeni satır karakterleri genellikle göz ardı edilir.

**Aynı anlamdadır:**
```
int x=5;
int x = 5;
int    x    =    5;
int
x
=
5;
```

**Ancak anahtar kelimeler arasında boşluk gereklidir:**
```
// Doğru
int x;
public class

// Yanlış
intx;
publicclass
```

## 10. Tanımlayıcı (Identifier) Kuralları

Tanımlayıcılar, değişken, metod, sınıf gibi öğelere verilen isimlerdir.

### 10.1 Geçerli Tanımlayıcılar

**İlk karakter:**
- Harf: `a-z`, `A-Z`
- Alt çizgi: `_`
- `@` işareti (anahtar kelime kullanmak için)

**Sonraki karakterler:**
- Harf: `a-z`, `A-Z`
- Rakam: `0-9`
- Alt çizgi: `_`

**Geçerli örnekler:**
```
isim
isim1
_deger
@class
Toplam_Fiyat
değişken
```

**Geçersiz örnekler:**
```
1isim          // Rakamla başlayamaz
isim-soyisim   // Tire içeremez
isim soyisim   // Boşluk içeremez
class          // Anahtar kelime (@ olmadan)
#deger         // Özel karakter
```

## 11. İsimlendirme Konvansiyonları

### 11.1 PascalCase

Her kelimenin ilk harfi büyük.

**Örnekler:**
```
MusteriAdi
HesaplaToplamTutar
VeritabaniBaglantisi
Program
```

### 11.2 camelCase

İlk kelime küçük, diğerlerinin ilk harfi büyük.

**Örnekler:**
```
musteriAdi
hesaplaToplamTutar
yerelDegisken
parametre
```

### 11.3 _camelCase

Alt çizgi ile başlar, sonra camelCase.

**Örnekler:**
```
_musteriAdi
_toplamFiyat
_ozelAlan
```

### 11.4 UPPER_CASE

Tüm harfler büyük, kelimeler alt çizgi ile ayrılır.

**Örnekler:**
```
MAKSIMUM_DEGER
PI_SAYISI
VARSAYILAN_PORT
```

## 12. Anahtar Kelime ile Tanımlayıcı Kullanımı

Anahtar kelimeleri tanımlayıcı yapmak için `@` öneki kullanılır.

**Örnekler:**
```
int @class = 5;        // "class" anahtar kelimesi
string @namespace;     // "namespace" anahtar kelimesi
bool @if;              // "if" anahtar kelimesi
```

## 13. Nokta (.) Operatörü

Üye erişimi için kullanılır.

**Örnekler:**
```
Console.WriteLine
nesne.metod
sınıf.özellik
namespace.sınıf.metod
```

## 14. Virgül (,) Kullanımı

Öğeleri ayırmak için kullanılır.

**Örnekler:**
```
int x, y, z;
Metod(param1, param2, param3);
new int[] { 1, 2, 3, 4 };
```

## 15. İki Nokta Üst Üste (:) Kullanımı

Kalıtım ve etiket tanımlamaları için kullanılır.

**Örnekler:**
```
class Kopek : Hayvan
interface IOrnek : ITemel
public int Sayi { get; set; }
```

## 16. Noktalı Virgül ile İki Nokta Farkı

**Noktalı virgül (;)** - İfade sonlandırıcı:
```
int x = 5;
Console.WriteLine();
```

**İki nokta üst üste (:)** - İlişki belirteci:
```
class A : B
case 1:
public int X { get; set; }
```

## 17. Boşluk Karakteri Gerektiren Durumlar

**Gerekli boşluklar:**
```
int x          // "int" ve "x" arasında
public class   // "public" ve "class" arasında
return değer   // "return" ve "değer" arasında
new int        // "new" ve "int" arasında
```

**Opsiyonel boşluklar:**
```
x=5    veya    x = 5
(x+y)  veya    ( x + y )
{x=5;} veya    { x = 5; }
```

## 18. Satır Sonu ve Satır Devamı

C#'ta ifadeler satır sonlarından etkilenmez. Bir ifade birden fazla satıra yayılabilir.

**Aynı anlamdadır:**
```
int sonuc = (a + b + c + d);

int sonuc = (a + b +
             c + d);

int sonuc = 
    (a + 
     b + 
     c + 
     d);
```

## 19. String İçinde Özel Karakterler

### 19.1 Kaçış Dizileri (Escape Sequences)

Ters bölü (`\`) ile başlar.

**Örnekler:**
```
\n   // Yeni satır
\t   // Tab
\"   // Çift tırnak
\'   // Tek tırnak
\\   // Ters bölü
```

### 19.2 Verbatim String

`@` işareti ile başlar, kaçış dizileri kullanılmaz.

**Örnekler:**
```
"C:\\Klasor\\Dosya.txt"     // Normal
@"C:\Klasor\Dosya.txt"       // Verbatim

"Satır1\nSatır2"             // Normal
@"Satır1
Satır2"                      // Verbatim
```

## 20. Noktalama İşaretleri Özeti

| İşaret | Adı | Kullanım |
|--------|-----|----------|
| `;` | Noktalı virgül | İfade sonlandırıcı |
| `,` | Virgül | Öğe ayırıcı |
| `.` | Nokta | Üye erişimi |
| `:` | İki nokta üst üste | Kalıtım, etiket |
| `{ }` | Süslü parantez | Kod bloğu |
| `( )` | Parantez | Gruplama, parametreler |
| `[ ]` | Köşeli parantez | Diziler, indeksleme |
| `//` | Çift eğik çizgi | Tek satır yorum |
| `/* */` | Eğik çizgi yıldız | Çok satırlı yorum |
| `///` | Üç eğik çizgi | XML dokümantasyon |

---

# TERIMLER SÖZLÜĞÜ

**Anahtar Kelime (Keyword):** Programlama dilinde özel anlamı olan ve başka amaçla kullanılamayan kelimeler.

**Beyaz Boşluk (Whitespace):** Boşluk, tab ve yeni satır gibi görünmeyen karakterler.

**Blok (Block):** Süslü parantezler arasında yer alan kod bütünü.

**Büyük/Küçük Harf Duyarlılığı (Case Sensitivity):** Büyük ve küçük harflerin farklı karakterler olarak ele alınması.

**camelCase:** İlk kelime küçük, sonraki kelimelerin ilk harfi büyük yazım şekli.

**Derleyici (Compiler):** Kaynak kodu makine diline çeviren program.

**Girintileme (Indentation):** Kod bloklarını hizalamak için kullanılan boşluk veya tab karakterleri.

**İfade (Statement):** Bir işlem gerçekleştiren ve noktalı virgül ile sonlanan kod satırı.

**İsimlendirme Konvansiyonu (Naming Convention):** Kod öğelerine isim verirken kullanılan standart kurallar.

**Kaçış Dizisi (Escape Sequence):** Özel karakterleri temsil etmek için kullanılan ters bölü ile başlayan karakter dizileri.

**Kapsam (Scope):** Bir tanımlayıcının kullanılabileceği kod bölgesi.

**Noktalama İşareti (Punctuation):** Söz diziminde kullanılan özel karakterler (`;`, `,`, `.` gibi).

**Operatör (Operator):** İşlem yapmak için kullanılan semboller (`+`, `-`, `=` gibi).

**PascalCase:** Her kelimenin ilk harfi büyük yazım şekli.

**Söz Dizimi (Syntax):** Programlama dilinde komutların nasıl yazılacağını belirleyen kurallar.

**Tanımlayıcı (Identifier):** Değişken, metod, sınıf gibi öğelere verilen isimler.

**UPPER_CASE:** Tüm harflerin büyük ve kelimelerin alt çizgi ile ayrıldığı yazım şekli.

**Verbatim String:** `@` işareti ile başlayan ve kaçış dizilerini yorumlamayan metin ifadesi.

**XML Dokümantasyon:** `///` ile başlayan ve kod hakkında bilgi veren yorum satırları.

**Yorum (Comment):** Derleyici tarafından göz ardı edilen ve açıklama amaçlı yazılan metinler.
