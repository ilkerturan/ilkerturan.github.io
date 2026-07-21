# Bölüm 06: Python ile Nesne Yönelimli Programlama (OOP) ve Kapsülleme

Python'da *her şey ama her şey* (sayılar, metinler, fonksiyonlar, hatta sınıfların kendisi bile) birer Objedir (Nesne). Kendi objelerinizi (Gerçek dünya taslaklarınızı) üretmek için Sınıf (Class) yapısını kullanırsınız.

## 1. Class (Sınıf), Obje ve `self` Felsefesi
Class, bir Fabrikanın Kalıbıdır (Mimari Plandir). Obje (Instance) ise o kalıptan üretilmiş Arabanın kendisidir. C#'tan farklı olarak Python'da `this` yerine `self` kullanılır ve metotlarda onu yazmak ZORUNLUDUR.

**Neden `self` yazmak zorundayız?**
Çünkü Python arka planda `araba1.gaz_ver()` dediğinizde, aslında bunu `Araba.gaz_ver(araba1)` şekline çevirir. Fonksiyon, hangi arabaya gaz verdiğini bilmek zorundadır. İşte `self`, **Bizzat o an işlem yapılan objenin kendisidir.**

```python
class Araba:
    # 1. Class Variable (Sınıf Değişkeni): Tüm arabalar için ORTAKTIR.
    tekerlek_sayisi = 4 
    
    # 2. Dunder Init (Constructor/Yapıcı): Kalıptan YENİ araba üretildiği an otomatik tetiklenir.
    def __init__(self, marka, renk):
        # Instance Variables (Obje Değişkenleri): Sadece BU arabaya aittir.
        self.marka = marka  
        self.renk = renk
        self.hiz = 0

    # 3. Instance Method (Obje Yeteneği)
    def gaz_ver(self):
        self.hiz += 20
        print(f"{self.marka} hızlandı. Yeni hız: {self.hiz}")

araba1 = Araba("Toyota", "Kırmızı")
araba1.gaz_ver() # Toyota hızlandı...
```

## 2. Kapsülleme (Encapsulation) ve `@property` Dekoratörü
Dışarıdan bir geliştirici gelip `araba1.hiz = -500` derse program mantığı bozulur (Eksi hız olmaz). Bu değişkenleri dış dünyadan KORUMAMIZ (Gizlememiz) gerekir.
Python'da Java'daki gibi `private` veya `public` kelimeleri YOKTUR! Centilmenlik anlaşması vardır:
- Değişkenin başına tek alt çizgi `_` koyarsanız "Lütfen buna dışarıdan dokunma, bu benim iç işim" mesajı verirsiniz. (Ama isteseler dokunabilirler).
- Değişkenin başına çift alt çizgi `__` koyarsanız, Python onu "Name Mangling" denilen bir işlemle ismini şifreler ve dışarıdan erişimi ÇOK ZORLAŞTIRIR.

Peki gizlediğimiz bu veriye güvenli yoldan nasıl erişeceğiz? **Property (Get/Set) Mimarisi:**
```python
class BankaHesabi:
    def __init__(self, bakiye):
        self.__bakiye = bakiye # __bakiye diyerek dışarıdan erişimi kilitledik.

    # GETTER (Okuma Yetkisi): Dışarıdan sanki bir değişkenmiş gibi okunmasını sağlar.
    @property
    def bakiye(self):
        return self.__bakiye

    # SETTER (Yazma Yetkisi): Dışarıdan değer atanırken (hesap.bakiye = 500) ARAYA GİRİP KONTROL EDER.
    @bakiye.setter
    def bakiye(self, yeni_deger):
        if yeni_deger < 0:
            raise ValueError("Bakiye eksi olamaz!")
        self.__bakiye = yeni_deger
```

## 3. Kalıtım (Inheritance) ve MRO (Çoklu Kalıtım)
Bir `Hayvan` sınıfı yazıp, `Kedi` sınıfını ondan miras aldırarak kod tekrarını (DRY) önleriz. `Kedi`, Hayvan'ın tüm yeteneklerini bedavaya alır.

Python'un C# ve Java'dan en büyük farkı **Multiple Inheritance (Çoklu Kalıtım)** desteklemesidir. Bir çocuk sınıfın İKİ BABADAN (Örn: Hem Aslan hem de Kaplan'dan) miras alabilmesidir (Liger).
Çoklu kalıtımda iki babada da aynı isimli (`kükre`) fonksiyon varsa, Python **MRO (Method Resolution Order)** denilen Soldan-Sağa derinlik öncelikli bir algoritma (C3 Linearization) kullanarak kimin kükremesini alacağına karar verir.

## 4. Dunder (Magic) Metotlar (Büyülü Fonksiyonlar)
Her iki yanında `__` (Double Underscore - Dunder) olan sihirli metotlardır. Python'daki objelerinizin sistemle entegre çalışmasını sağlarlar.
- `__str__(self)`: Sizin objenizi birisi `print(araba)` ile ekrana bastığında, RAM adresindeki çirkin yazıyı (`<__main__.Araba object>`) değil de, sizin belirleyeceğiniz şık bir metni ("Bu bir Toyota'dır") basmasını sağlar.
- `__len__(self)`: Sizin objenize biri `len(araba)` sorgusu attığında ne cevap verileceğini belirler.
- `__add__(self, other)`: İki araba objesi `araba1 + araba2` operatörüyle toplanmaya çalışıldığında Python'a nasıl toplanacaklarını öğretir!
