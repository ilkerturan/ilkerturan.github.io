# Bölüm 02: Değişkenler, Veri Tipleri ve Bellek Yönetimi

C# veya Java gibi "Statik Tipli" (Sıkı kurallı) dillerde bir değişken yaratırken kutunun cinsini baştan söylemek zorundasınız: `int sayi = 5;`. O kutuya hayatı boyunca sadece tam sayı koyabilirsiniz. İçine "İlker" (Metin) koymaya çalışırsanız program çöker.

Python ise **Dinamik Tipli (Dynamically Typed)** bir dildir. Özgürdür. Kutuya etiket yapıştırmazsınız.
```python
x = 5         # Şu an x bir Tam Sayı (Integer)
x = "İlker"   # Şu an x aniden bir Metne (String) dönüştü. HATA YOK!
x = 3.14      # Şimdi Ondalıklı (Float) oldu.
```
Python o an kutunun (değişkenin) içinde ne varsa, türünü ona göre OTOMATİK tayin eder.

## 1. Temel Veri Tipleri

- **Integer (int):** Tam sayılar. `yas = 30`
- **Float:** Ondalıklı sayılar. Nokta ile yazılır. `boy = 1.85`
- **String (str):** Metinler. Tırnak içinde yazılır. Tek veya çift tırnak fark etmez. `isim = "Ahmet"`
- **Boolean (bool):** Mantıksal Doğru/Yanlış değerleri. Python'da **BÜYÜK HARFLE** başlar! `evli_mi = True` veya `False`.

## 2. Tip Dönüşümleri (Type Casting)
Bazen Python'un kendi kendine atadığı tür işimize yaramaz. Kullanıcıdan bir yaş girmesini istediğimizde (Örn: "25"), Python bunu klavyeden geldiği için bir METİN (String) olarak algılar.
Siz "25" ile 5'i toplamak isterseniz, biri metin biri sayı olduğu için sistem hata verir.
Bunu çözmek için dönüştürme yaparız:
```python
gelen_veri = "25"         # Bu şu an String
yas = int(gelen_veri)     # Zorla Integer'a (Tam sayıya) çevirdik!

pi = int(3.14)            # Ondalıklı sayıyı int yaparsan küsüratı SİLER! pi = 3 olur.
```

## 3. String (Metin) Büyüleri (F-Strings)
Python'da metinleri birleştirmek için eskiden `+` işareti kullanılırdı ki bu çok çirkindi.
Python 3.6 ile gelen harika özellik **f-string** hayatımızı kurtardı. Metnin başına sadece ufak bir `f` harfi koyarız ve değişkenleri direkt süslü parantezle metnin içine gömeriz!

```python
ad = "Ali"
yas = 25
# KÖTÜ YÖNTEM
mesaj = "Benim adım " + ad + " ve ben " + str(yas) + " yaşındayım." 

# HARİKA YÖNTEM (f-string)
mesaj = f"Benim adım {ad} ve ben {yas} yaşındayım."
```
