# Bölüm 10: Ustalığa Geçiş (Decorators, Generators ve Iterators)

Eğer bu bölümdeki 3 kavramı kendi kodlarınızda kullanmaya başlarsanız, Mid-Level / Senior (Kıdemli) geliştirici sularına girmişsiniz demektir. Bu yapılar, kodunuzu inanılmaz "Şık", "Hafif (Performanslı)" ve "Kopyala-Yapıştırdan uzak" hale getirir.

## 1. Süsleyiciler (Decorators) - Kodun Üstüne Giydirilen Kıyafet
Bir fonksiyonun orijinal İÇ KODUNA HİÇ DOKUNMADAN (Değiştirmeden), ona dışarıdan "Ekstra bir davranış" ekleme sanatıdır. Başına `@` işareti konularak kullanılır.
- **Kullanım Yeri:** Web geliştirirken "Bu sayfayı sadece Adminler görsün" kontrolünü veya "Bu fonksiyonun çalışması kaç saniye sürdü (Performans ölçümü)" işlerini yapmak içindir. Her fonksiyonun içine tek tek "Admin mi?" if-else'i yazmak yerine, `@admin_check` dekoratörü giydirilir!

*(Örnek Performans Ölçücü Dekoratör)*
```python
import time

def sure_olcer(fonk):
    # Orijinal fonksiyonu sarmalayan Zarf (Wrapper) fonksiyon
    def wrapper(*args, **kwargs):
        baslangic = time.time()
        sonuc = fonk(*args, **kwargs) # Asıl kod burada çalışır
        bitis = time.time()
        print(f"{fonk.__name__} fonksiyonu {bitis - baslangic} saniyede bitti.")
        return sonuc
    return wrapper

# Asıl fonksiyonumuz (Bunun kodlarına HİÇ dokunmadık, sadece üstüne kıyafet giydirdik)
@sure_olcer
def yavas_islem():
    time.sleep(2) # 2 saniye uyur
    print("İşlem bitti")

yavas_islem() # Çalıştığında "2 saniyede bitti" mesajını otomatik basacak!
```

## 2. Üreteçler (Generators) ve "yield" Mucizesi (Bellek Kurtarıcı)
**Büyük Problem:** 1'den 1 Milyara kadar olan sayıları tutan bir liste `[1, 2, ..., 1000000000]` yaratırsanız ne olur? O sayıların HEPSİ AYNI ANDA bilgisayarın Geçici Belleğine (RAM) yüklenir ve RAM 16GB olsa bile sistem kilitlenir, bilgisayarınız çöker (MemoryError). Oysa sizin bir döngüde o an sadece "1 Sayısına" ihtiyacınız vardı!

**Çözüm (Generators):** `return` yerine `yield` (Üret/Ver) anahtar kelimesi kullanırsanız, Python o 1 Milyar sayıyı RAM'de TUTMAZ! Sayıları hafızaya kaydetmez. Siz her "Bana yeni sayıyı ver" dediğinizde (Örn: Döngü dönerken), SAYIYI O SANİYE HAVADAN (Formülden) ÜRETİR, size verir, bir sonraki adımı beklerken uykuda kalır. RAM tüketimi 0'a (sıfıra) iner!
```python
def milyar_sayi_ureteci():
    i = 1
    while i <= 1000000000:
        yield i  # Return yaparsan biter. Yield dersen, 1'i verir, fonksiyonu DURDURUR ve DONDURUR!
        i += 1   # Bir sonraki istenişinde donduğu yerden uyanır, devam eder.

# Döngüde kullanım: (1 milyar sayı RAM'e yüklenmedi, her turda 1 tane havadan üretildi)
for sayi in milyar_sayi_ureteci():
    print(sayi)
    if sayi == 5: break # Sonsuza gitmesin diye durdurduk
```

## 3. İteratörler (Iterators)
Generators'ın perde arkasında dayandığı asıl kavramdır. Üzerinde gezinebileceğimiz (For döngüsü kurabildiğimiz) objelere (Liste, String) "Iterable" denir. O an nerede olduğunuzu hatırlayan ve size sıradaki (`next()`) elemanı getiren sisteme "Iterator" denir. `yield` bunu arkaplanda otomatik yapan mükemmel bir kısa yoldur.
