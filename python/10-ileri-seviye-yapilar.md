# Bölüm 10: Ustalığa Geçiş (Decorators, Generators, Iterators)

Eğer bu bölümdeki 3 kavramı kendi kodlarınızda aktif olarak kullanmaya başlarsanız, Mid-Level / Senior (Kıdemli) geliştirici sularına girmişsiniz demektir. Bu yapılar, kodunuzu inanılmaz "Şık", "Hafif (Performanslı)" ve "Mimari açıdan esnek" hale getirir.

## 1. Süsleyiciler (Decorators) - Kodun Üstüne Giydirilen Kıyafet
Bir fonksiyonun orijinal İÇ KODUNA HİÇ DOKUNMADAN (Değiştirmeden), ona dışarıdan "Ekstra bir yetenek veya davranış" ekleme sanatıdır. Başına `@` işareti konularak kullanılır.
(Django veya Flask/FastAPI'de çok sık gördüğünüz `@app.route` veya `@login_required` yapıları bunlardır).

**Nasıl Çalışır?**
Python'da fonksiyonlar değişkendir. Bir Decorator, asıl fonksiyonu parametre olarak içine alan, "Önce şu güvenlik kontrolünü yap, sonra asıl fonksiyonu çalıştır" diyen bir kapsayıcı (Wrapper) fonksiyondur.

*(Örnek: Fonksiyonun ne kadar sürdüğünü ölçen bir Decorator)*
```python
import time
from functools import wraps # Asıl fonksiyonun ismini ve docstring'ini kaybetmemek için gereklidir!

def sure_olcer(fonk):
    # Orijinal fonksiyonu sarmalayan Zarf (Wrapper) fonksiyon
    @wraps(fonk)
    def wrapper(*args, **kwargs):
        baslangic = time.time()
        
        sonuc = fonk(*args, **kwargs) # ASIL KOD BURADA ÇALIŞIR
        
        bitis = time.time()
        print(f"{fonk.__name__} fonksiyonu {bitis - baslangic:.4f} saniyede bitti.")
        return sonuc
    return wrapper

# Asıl fonksiyonumuz (Bunun kodlarına HİÇ dokunmadık, sadece üstüne kıyafet giydirdik)
@sure_olcer
def agir_islem():
    time.sleep(2) # 2 saniye uyur
    print("İşlem tamamlandı")

agir_islem() # Çalıştığında "2 saniyede bitti" mesajını otomatik araya girip basacak!
```

## 2. Üreteçler (Generators) ve "yield" Mucizesi (Bellek Kurtarıcı)
**Büyük Problem:** 1'den 1 Milyara kadar olan sayıları tutan bir liste `[1, 2, ..., 1000000000]` yaratırsanız ne olur? O sayıların HEPSİ AYNI ANDA bilgisayarın Geçici Belleğine (RAM) yüklenir. RAM'iniz anında dolar, sistem kilitlenir ve bilgisayarınız çöker (MemoryError). Oysa sizin bir döngüde o an sadece "sıradaki 1 Sayısına" ihtiyacınız vardı!

**Çözüm (Generators):** `return` yerine `yield` (Üret/Ver) anahtar kelimesi kullanırsanız, Python o 1 Milyar sayıyı RAM'de ASLA TUTMAZ! Siz her "Bana yeni sayıyı ver" (`next()`) dediğinizde, SAYIYI O SANİYE FORMÜLDEN ÜRETİR, size verir, RAM'i temizler, ve fonksiyonun fişini çekip o satırda DONDURUR! Bir sonraki çağırışınızda donduğu yerden uyanır. RAM tüketimi inanılmaz düşüktür.
```python
def milyar_sayi_ureteci():
    i = 1
    while i <= 1000000000:
        yield i  # Return derseniz fonksiyon ölür. Yield derseniz 1'i verir, fonksiyonu DURDURUR ve UYUTUR!
        i += 1   # Bir sonraki istenişinde uyanır, i'yi arttırıp döngüye devam eder.

# 1 milyar sayı RAM'e yüklenmedi, for döngüsü içinde her turda 1 tane havadan üretildi!
for sayi in milyar_sayi_ureteci():
    print(sayi)
    if sayi == 5: break # Sonsuza gitmesin diye 5'te kestik
```

## 3. İteratörler (Iterators) ve Protokoller
Generators'ın perde arkasında dayandığı asıl kavramdır. Üzerinde for döngüsü kurabildiğimiz objelere (Liste, String) "Iterable" denir. O an nerede olduğunuzu hatırlayan ve size sıradaki (`next()`) elemanı getiren kilit sisteme "Iterator" denir. 

Eğer siz kendi yazdığınız bir `ArabaFabrikasi` sınıfının içinde "For döngüsü" kurmak isterseniz, o sınıfın içine `__iter__()` ve `__next__()` dunder (sihirli) metotlarını manuel olarak yazmalısınız. (Buna Iterator Protokolü denir). İşte `yield` kelimesi, bizi bu iki dunder metodu amele gibi manuel olarak yazmaktan kurtaran muazzam bir Pythonik kısayoldur.
