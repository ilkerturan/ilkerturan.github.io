# Bölüm 06: Python ile Nesne Yönelimli Programlama (OOP)

Python'da *her şey ama her şey* (sayılar, metinler, fonksiyonlar bile) birer Objedir (Nesne). Kendi objelerinizi (Gerçek dünya taslaklarınızı) üretmek için Sınıf (Class) yapısını kullanırsınız.

## 1. Class (Sınıf / Taslak) ve Obje Üretimi
Class, bir Fabrikanın Kalıbıdır (Mimari Plandir). Obje ise o kalıptan üretilmiş Arabanın kendisidir. Planda (Class) tekerlek sayısı yazar; ancak üretilen arabanın (Obje) rengi kırmızı, model yılı 2024 olabilir.

```python
# Sınıf İsimleri Büyük Harfle Başlar (PascalCase)
class Araba:
    # 1. Constructor (Yapıcı Metot) - Dunder Init
    # Bu metot, fabrikadan YENİ bir araba üretildiği SANİYE otomatik olarak 1 kez tetiklenir.
    def __init__(self, marka, renk):
        # self: 'Bizzat şu an üretilmekte olan objenin KENDİSİ' demektir.
        self.marka = marka  # Objenin marka özelliğine, dışarıdan gelen markayı kazı.
        self.renk = renk
        self.hiz = 0

    # 2. Objenin Yetenekleri (Metotlar)
    # Class içindeki tüm fonksiyonların İLK parametresi mecburen "self" olmak zorundadır!
    def gaz_ver(self):
        self.hiz += 20
        print(f"{self.marka} hızlandı. Yeni hız: {self.hiz}")

# KULLANIMI:
# Kalıptan (Class) 2 tane canlı Obje (Kopya) ürettik!
araba1 = Araba("Toyota", "Kırmızı")
araba2 = Araba("BMW", "Mavi")

araba1.gaz_ver() # Toyota hızlandı...
```

## 2. Kapsülleme (Encapsulation) - Gizlilik
Dışarıdan bir geliştirici gelip `araba1.hiz = -500` derse program mantığı bozulur (Eksi hız olmaz). Bu değişkenleri dış dünyadan KORUMAMIZ (Gizlememiz) gerekir.
Python'da `private` veya `public` kelimeleri yoktur! Değişkenin başına GİZLİCE iki tane alt çizgi `__` koyarsanız, Python onu sihirli bir şekilde gizler.
```python
class BankaHesabi:
    def __init__(self, bakiye):
        self.__bakiye = bakiye # Başına __ koyduk. Dışarıdan ERİŞİLEMEZ!
```
*Not: Aslında Python'da gerçek bir private yoktur (Name Mangling yapar). Ama centilmenlik gereği kurala uyulur.*

## 3. Kalıtım (Inheritance) - Miras Alma
Bir "Kedi" ve "Köpek" sınıfı yazıyorsunuz. İkisi de nefes alır, uyur. İkisine de aynı kodu (Nefes al) tekrar yazmak (DRY) kötüdür.
Bunun yerine bir `Hayvan` (Üst/Baba) sınıfı açılır. Kedi ve Köpek sınıfları Hayvan sınıfından "Miras" alır, böylece kodlar bedavaya kedinin içine kopyalanmış olur. Sadece kendi özel yeteneklerini (Miyavla) kedinin içine yazarsınız.

## 4. Dunder (Magic) Metotlar (Büyülü Fonksiyonlar)
Python sınıflarına özgü, her iki yanında `__` (Double Underscore - Dunder) olan sihirli metotlardır.
Örneğin bir objeyi `print(araba1)` diye ekrana basarsanız, ekranda çirkin bir `<__main__.Araba object at 0x7f...>` yazar.
Ama sınıfın içine `__str__(self)` adında büyülü bir fonksiyon yazarsanız, obje print'e sokulduğunda nasıl güzel bir yazı çıkaracağını kendisi belirler!
