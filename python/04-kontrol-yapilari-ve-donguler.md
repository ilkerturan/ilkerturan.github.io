# Bölüm 04: Kontrol Yapıları, Döngüler ve Büyülü Comprehensions

Kodumuzun yukarıdan aşağı dümdüz bir su borusu gibi akması yerine, şartlara göre dallanmasını (If) ve kendini tekrarlamasını (For/While) sağlayan yapılar Karar mekanizmalarıdır. Python bu mekanizmaları çok daha esnek ve "İngilizce gibi" okunabilir bir tasarımla sunar.

## 1. Girinti (Indentation) Kuralı: Python'un Bel Kemiği!
Diğer dillerde (C#, JS, Java) bir `if` veya `for` bloğu başlattığınızda sınırları belirlemek için SÜSLÜ PARANTEZ `{ }` kullanırsınız.
Python'da ise süslü parantez YOKTUR! Python sınırları **BOŞLUKLARLA (Girinti - Tab veya 4 Space)** anlar. Boşluğu yanlış hizalarsanız program anında `IndentationError` verip çöker. Bu, kodun her zaman estetik ve zorunlu olarak "Clean Code" standartlarında düzenli yazılmasını sağlar.

```python
yas = 20

if yas >= 18:
    # 4 boşluk içerideyiz. Burası İF'in İÇİDİR.
    print("Reşitsiniz.")
# Boşluk bittiği an, İF bloğu kapanmış demektir. Burası DIŞARISI.
print("Sistem kapanıyor.") 
```

## 2. If - Elif - Else (Mantıksal Kararlar ve Ternary Operatörü)
Python'da `else if` yerine kısaca `elif` yazılır. Şartlarda `&&` veya `||` işaretleri yerine İngilizce olan `and`, `or`, `not` kelimeleri kullanılır. Bu da kodu şiir gibi okunabilir kılar.
```python
kredi_notu = 1500
kefil_var_mi = True

if kredi_notu > 1800 or (kredi_notu > 1400 and kefil_var_mi):
    print("Kredi Onaylandı")
elif kredi_notu == 0:
    print("Hesap bulunamadı")
else:
    print("Kredi Reddedildi")

# TERNARY (TEK SATIR) IF-ELSE MİMARİSİ
# Kısa kararlar için 4 satırlık IF yazmak gereksizdir.
durum = "Yetişkin" if yas >= 18 else "Çocuk"
```

## 3. Döngü Yapıları (For ve While)
Python'un For döngüsü, `i=0; i<10; i++` şeklinde iğrenç indeks sayacı kullanmaz. Direkt olarak bir koleksiyonun (Liste, Metin) elemanları üzerinde *Iterator Protocol* kullanarak gezinir (in operatörü).

**While Döngüsü:** Bir şart Doğru (True) olduğu SÜRECE dönmeye devam eder. Tehlikelidir, şart güncellenmezse sonsuz döngü (Infinite Loop) programı kilitler.
```python
sayac = 0
while sayac < 5:
    print("Dönüyorum...", sayac)
    sayac += 1
```

**For Döngüsü ve Döngü Kontrolleri (Break, Continue):**
```python
meyveler = ["Elma", "Armut", "Muz", "Kivi"]

for meyve in meyveler:
    if meyve == "Armut":
        continue # O anki turu İPTAL ET, atla ve bir sonraki turdan (Muz) devam et.
    if meyve == "Muz":
        break    # Döngünün FİŞİNİ ÇEK, döngüyü tamamen sonlandır, dışarı çık.
    print(meyve)
```

## 4. BÜYÜLÜ YAPILAR: List, Set ve Dict Comprehensions
Python'u Python yapan, C# ve Java yazılımcılarını kıskandıran en şık özelliktir. 5 satırlık döngüyü TEK SATIRDA yazmanızı ve üstelik klasik for döngüsünden çok daha hızlı (C düzeyinde optimize edilmiş) çalışmasını sağlar.

**List Comprehension (Liste Üretici):**
Diyelim ki 1'den 10'a kadar olan sayılardan sadece ÇİFT olanların karesini alıp yeni bir liste yapacağız:
```python
# KÖTÜ, UZUN VE YAVAŞ YOL:
kareler = []
for i in range(1, 11):
    if i % 2 == 0:
        kareler.append(i * i)

# HARİKA (PYTHONIC) YOL:
# Formül: [YAPILACAK_ISLEM for ELEMAN in KOLEKSIYON if SART]
kareler = [i * i for i in range(1, 11) if i % 2 == 0]
```

**Dict ve Set Comprehension (Sözlük ve Küme Üretimi):**
Aynı mantığı Set (Süslü Parantez) ve Dictionary için de tek satırda kullanabilirsiniz.
```python
# Sözlük (Dictionary) Comprehension örneği: Sayı ve karelerini eşleştir (Key: Value)
kare_sozlugu = {i: i * i for i in range(1, 6)}
# Sonuç: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Küme (Set) Comprehension örneği:
benzersiz_uzunluklar = {len(isim) for isim in ["Ali", "Ece", "Ahmet"]}
# Sonuç: {3, 5} -> (Ali ve Ece aynı uzunlukta olduğu için Set tekrarları sildi!)
```

## 5. Python'a Özgü: For ... Else Bloğu
Diğer dillerde olmayan garip ama çok yetenekli bir yapıdır. `else` sadece `if` ile kullanılmaz. Bir For döngüsünün arkasına da konabilir.
Mantığı şudur: Eğer döngü `break` yemeden (kesintiye uğramadan), doğal bir şekilde TÜM TURLARI BAŞARIYLA TAMAMLAYIP bittiyse, `else` bloğu çalışır. Döngü içinde `break` tetiklenirse, `else` bloğu EKS GEÇİLİR. Arama (Search) işlemlerinde "Arama bitti ama eleman bulunamadı" demek için harikadır!
