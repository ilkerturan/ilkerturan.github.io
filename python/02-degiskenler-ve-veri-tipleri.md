# Bölüm 02: Değişkenler, Derin Veri Tipleri ve Bellek Yönetimi

C# veya Java gibi "Statik Tipli" (Statically Typed) dillerde bir değişken yaratırken kutunun cinsini baştan söylemek zorundasınız: `int sayi = 5;`. O kutuya hayatı boyunca sadece tam sayı koyabilirsiniz. İçine "İlker" (Metin) koymaya çalışırsanız derleyici anında hata verir.

Python ise **Dinamik Tipli (Dynamically Typed)** ve **Güçlü Tipli (Strongly Typed)** bir dildir. Özgürdür. Kutuya etiket yapıştırmazsınız.
```python
x = 5         # Şu an x bir Tam Sayı (Integer)
x = "İlker"   # Şu an x aniden bir Metne (String) dönüştü. HATA YOK!
```
Python o an kutunun (değişkenin) içinde ne varsa, türünü (Type Inference) ona göre OTOMATİK tayin eder. Ancak "Güçlü" tiplidir; yani `5 + "Ali"` yazarsanız Javascript'teki gibi saçmalayıp "5Ali" demez, size hata fırlatır (Çünkü elma ile armut toplanmaz).

## 1. Bellek Yönetimi: Değişkenler Aslında Birer İşaretçidir (Pointer)
Python'da değişkenler aslında veriyi tutan "Kutular" değil, veriye bağlanan "Etiketler (İsim Cüzdanları)" dir. Her şey bir Objedir.
```python
a = 10
b = a
```
Siz `b = a` dediğinizde, bellekte ikinci bir `10` sayısı KOPYALANMAZ. Bellekte (RAM) tek bir `10` objesi yaratılır ve hem `a` hem de `b` etiketleri o tek `10` objesine İP İLE BAĞLANIR (Referans verir).
Bunu `id()` fonksiyonu ile görebiliriz (Objenin RAM'deki adresi):
```python
print(id(a)) # Çıktı: 140735706489440
print(id(b)) # Çıktı: 140735706489440 (Tıpatıp aynı adres!)
```
Bu sistem (Reference Counting), Python'un belleği çok verimli kullanmasını sağlar. Ne zaman ki bir objeye bağlanan HİÇBİR İP (Değişken) kalmaz, işte o zaman Python'un Çöp Toplayıcısı (Garbage Collector) gelip o objeyi bellekten siler.

## 2. Temel ve İleri Veri Tipleri
- **Integer (int):** Tam sayılar. Python'da Integer sınırları (Min/Max value) YOKTUR! RAM'iniz ne kadar yetiyorsa o kadar büyük bir sayıyı (Trilyonlarca basamaklı) tutabilirsiniz. C#'taki gibi Long taşması olmaz.
- **Float:** Ondalıklı sayılar. Nokta ile yazılır. `boy = 1.85`. Float'lar doğası gereği bilgisayar işlemcilerinde kusursuz değildir (Örn: `0.1 + 0.2` sonucu `0.30000000000000004` çıkabilir). Finansal işlemler için `decimal` modülü kullanılır.
- **Complex (Karmaşık Sayılar):** Python mühendislik ve matematik odaklı bir dil olduğu için karmaşık sayıları DAHİLİ olarak destekler. `c = 3 + 4j` (Buradaki `j` matematikteki sanal `i` harfidir).
- **String (str):** Metinler. Tırnak içinde yazılır. `isim = "Ahmet"`. 
- **Boolean (bool):** Mantıksal değerler. Python'da **BÜYÜK HARFLE** başlar! `evli_mi = True` veya `False`. Aslında arkaplanda 1 ve 0 olan Integer'lardır.
- **NoneType (None):** "Hiçlik" anlamına gelir. Diğer dillerdeki `null` kavramıdır. Bir değişkenin henüz değeri yoksa ona `x = None` atanır. Bellekte tek bir None objesi vardır (Singleton).

## 3. Değiştirilebilirlik (Mutability) vs Değiştirilemezlik (Immutability)
Bu, mülakatlarda en çok sorulan ve Python mimarisinin kalbini oluşturan konudur.
- **Değiştirilemez (Immutable) Tipler:** `int`, `float`, `bool`, `str`, `tuple`.
- **Değiştirilebilir (Mutable) Tipler:** `list`, `set`, `dict`.

Eğer bir değişken **Immutable** ise, o veri bellekte ASLA değiştirilemez. 
```python
isim = "İlker"
isim = "Ali"
```
Yukarıdaki kodda "İlker" metni bellekte "Ali" olarak GÜNCELLENMİŞ GİBİ görünür. OYSA HAYIR! Bellekteki "İlker" objesi sabit kalır, bellekten YENİ bir "Ali" objesi yaratılır ve `isim` etiketi o yeni objeye bağlanır. Eski "İlker" objesi çöpe atılır.
İşte bu yüzden String birleştirme işlemlerini sürekli `+` operatörü ile bir döngüde yapmak (Sürekli yeni kopya ürettiği için) performansı mahveder!

## 4. Tip Dönüşümleri (Type Casting)
```python
gelen_veri = "25"         # String
yas = int(gelen_veri)     # String -> Int'e dönüştü.

pi = int(3.14)            # Float -> Int'e dönüşürse küsüratı yuvarlamaz, KESİP ATAR! pi = 3 olur.
durum = bool(0)           # 0, None, "", [] gibi boş değerler Bool'da daima False üretir. Diğer her şey True'dur.
```

## 5. String Büyüleri (F-Strings ve Metotlar)
Python 3.6 ile gelen **f-string**, metin formatlamada devrim yarattı.
```python
ad = "Ali"
maas = 4500.5

# f-string: Değişkenleri direkt süslü paranteze gömer. Hatta matematik ve formatlama da yapabilir!
mesaj = f"Sayın {ad}, maaşınız: {maas:.2f} TL" # .2f ile ondalığı 2 basamakla sınırla.
print(mesaj) # Sayın Ali, maaşınız: 4500.50 TL

# Güçlü String Metotları:
metin = "   Python Çok Güzel   "
print(metin.strip())       # Baş ve sondaki boşlukları keser: "Python Çok Güzel"
print(metin.lower())       # hepsini küçük yapar
print(metin.replace(" ", "-")) # Boşlukları tire yapar
print(metin.split(" "))    # Boşluklara göre metni parçalar ve bir LİSTE döndürür.
```
