# Bölüm 07: Hata Yönetimi (Try-Except) ve Programın Çökmesini Engelleme

Kullanıcıdan "Yaşınızı girin" diye Input istediniz. Adam sayıyla "Yirmi" (Metin) yazdı. Siz o veriyi `int()` ile matematiksel sayıya çevirmeye kalktığınız an, Python metni sayıya çeviremez ve `ValueError` fırlatarak (Exception) **Programı Oracıkta Acımasızca ÇÖKERTİR.**

Profesyonel bir yazılım, hata olduğunda "Çökmeyen", aksine hatayı yastık gibi yumuşatarak karşılayan ve müşteriye "Lütfen sayı giriniz" diye şık bir uyarı veren yazılımdır.

## 1. Try - Except Blokları
Riskli (Bomba) olduğunu düşündüğünüz kodları bir `try` (Dene) yastığının içine koyarsınız. Eğer bomba patlarsa program çökmez, alttaki `except` (Kabul et/Yakala) bloğu devreye girer.

```python
try:
    yas = int(input("Yaşınızı girin: ")) # Adam metin girerse bomba burada patlar!
    sonuc = 100 / yas                    # Adam 0 (Sıfır) girerse bomba patlar!
    print(f"Puanınız: {sonuc}")

# Eğer bomba 'Veri Tipi Hatası' ise burası çalışır
except ValueError:
    print("HATA: Lütfen rakamlarla sayı giriniz (Yazıyla değil)!")

# Eğer bomba 'Sıfıra Bölünme Hatası' ise burası çalışır
except ZeroDivisionError:
    print("HATA: Matematikte hiçbir sayı 0'a bölünemez!")

# Ne hatası çıkarsa çıksın (Öngörülemeyen), hepsini yakalayan GENEL ÇÖP TENEKESİ
except Exception as e:
    print(f"Bilinmeyen korkunç bir hata oluştu. Sebebi: {e}")
```

## 2. Else ve Finally Blokları
`try-except` bloğunun sonuna isterseniz iki özel blok daha ekleyebilirsiniz.
- **`else:` Bloğu:** `try` içindeki kodlarda HİÇBİR HATA ÇIKMAZSA (Her şey yolunda giderse) çalışacak ödül bloğudur.
- **`finally:` Bloğu:** Hata ÇIKSA DA, ÇIKMASA DA, program çökse bile en son **KESİNLİKLE ÇALIŞTIRILACAĞI GARANTİ EDİLEN** bloktur. (Genellikle açılan bir veritabanı veya dosya bağlantısını kapatmak/temizlemek için kullanılır ki arkada açık kalıp sistemi yormasın).

```python
try:
    dosya = open("belge.txt", "r")
    # Dosya okunurken internet koptu hata verdi diyelim...
except FileNotFoundError:
    print("Dosya bulunamadı.")
finally:
    # Hata verse de vermese de o RAM'deki dosya bağlantısını kapatmak boynumuzun borcudur!
    dosya.close()
    print("Temizlik yapıldı.")
```

## 3. Kendi Hatanı Fırlatmak (Raise)
Bazen sistem açısından hata olmayan bir şey, Sizin "Şirket/İş Kurallarınız" açısından hatadır. (Örn: Adam yaşını -5 girdi. Bu matematiksel bir hata değildir ama insan yaşı eksi olamaz). Bu durumda bilerek kendi hatanızı fırlatarak (Raise) programın gidişatını kesersiniz.
```python
yas = int(input("Yaşınız: "))
if yas < 0:
    # Programı bilerek ve isteyerek (İstisna fırlatarak) hata moduna sok!
    raise ValueError("İnsan yaşı negatif olamaz arkadaşım!")
```
