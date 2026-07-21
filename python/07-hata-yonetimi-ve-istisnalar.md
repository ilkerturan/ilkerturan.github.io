# Bölüm 07: Hata Yönetimi, Traceback ve Exception Hiyerarşisi

Kullanıcıdan "Yaşınızı girin" diye Input istediniz. Adam sayıyla "Yirmi" (Metin) yazdı. Siz o veriyi `int()` ile matematiksel sayıya çevirmeye kalktığınız an, Python metni sayıya çeviremez ve `ValueError` fırlatarak (Exception) **Programı Oracıkta Acımasızca ÇÖKERTİR.**

Profesyonel bir yazılım, hata olduğunda "Çökmeyen", aksine hatayı yastık gibi yumuşatarak karşılayan ve hatayı bir Dosyaya (Log) kaydeden sistemdir.

## 1. Try - Except - Else - Finally Blokları
Riskli (Bomba) olduğunu düşündüğünüz kodları bir `try` (Dene) yastığının içine koyarsınız. Eğer bomba patlarsa program çökmez, alttaki ilgili `except` (Yakala) bloğu devreye girer.

```python
try:
    dosya = open("veriler.txt", "r")
    yas = int(input("Yaşınızı girin: ")) # Adam metin girerse ValueError patlar
    sonuc = 100 / yas                    # Adam 0 girerse ZeroDivisionError patlar

except ValueError:
    print("HATA: Lütfen rakamlarla sayı giriniz (Yazıyla değil)!")

except ZeroDivisionError:
    print("HATA: Matematikte hiçbir sayı 0'a bölünemez!")

except Exception as e:
    # Exception Sınıfı, HATA HİYERARŞİSİNİN (Neredeyse) EN TEPESİNDEKİ BABASIDIR.
    # Yukarıdakilerden kaçan diğer her türlü öngörülemeyen hatayı yakalayan AĞDIR (Catch-all).
    print(f"Bilinmeyen korkunç bir hata oluştu. Sebebi: {e}")

else:
    # TRY İÇİNDE HİÇBİR HATA ÇIKMAZSA ÇALIŞACAK ÖDÜL BLOĞUDUR.
    print(f"Her şey başarılı, puanınız: {sonuc}")

finally:
    # HATA ÇIKSA DA, ÇIKMASA DA KESİNLİKLE (GARANTİLİ) ÇALIŞAN BLOKTUR.
    # Görevi: Çöküş olsa bile açık kalan dosyaları/veritabanlarını kapatıp RAM'i temizlemektir!
    dosya.close()
    print("Sistem temizliği yapıldı, bağlantılar kesildi.")
```

## 2. Kendi Özel Hata Sınıflarını Yazmak (Custom Exceptions)
Python'daki hatalar da aslında birer Class'tır (Sınıf). Siz de kendi şirket kurallarınız için özel hatalar yaratabilirsiniz. Bu sınıflar mutlaka temel `Exception` sınıfından miras almalıdır (Inheritance).

```python
# Kendi özel hata şablonumuzu yarattık
class NegatifYasHatasi(Exception):
    pass

yas = int(input("Yaşınız: "))
if yas < 0:
    # Programı BİLEREK VE İSTEYEREK bizim özel hatamızı fırlatarak durdur! (Raise)
    raise NegatifYasHatasi("İnsan yaşı sıfırdan küçük olamaz!")
```

## 3. Traceback Modülü (Hatayı Loglamak)
`except Exception as e:` dediğinizde, "e" size sadece "Division by zero" gibi kısacık bir mesaj verir. Oysa siz bir sunucu yazılımı yapıyorsanız, hatanın **hangi dosyanın hangi satırında** çıktığını bilmek istersiniz (Buna Stack Trace veya Traceback denir).

```python
import traceback

try:
    1 / 0
except Exception as e:
    # Sadece küçük hata mesajını değil, hatanın tüm KANLI GEÇMİŞİNİ ve satırlarını bir txt dosyasına kaydet:
    with open("error_log.txt", "a") as f:
        f.write(traceback.format_exc())
```
