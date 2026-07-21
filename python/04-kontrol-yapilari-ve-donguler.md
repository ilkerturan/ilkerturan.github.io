# Bölüm 04: Kontrol Yapıları, Döngüler ve Büyülü Comprehension

Kodumuzun "düz bir su borusu" gibi yukarıdan aşağı akması yerine, şartlara göre sağa/sola dallanmasını sağlayan yapılar Karar (If) ve Döngü (For/While) yapılarıdır.

## 1. Girinti (Indentation) Kuralı: Python'un Bel Kemiği!
Diğer dillerde (C#, JS, Java) bir `if` veya `for` bloğu başlattığınızda sınırları belirlemek için SÜSLÜ PARANTEZ `{ }` kullanırsınız.
Python'da ise süslü parantez YOKTUR! Python sınırları **BOŞLUKLARLA (Girinti - Tab/4 Space)** anlar. Boşluğu yanlış hizalarsanız program anında `IndentationError` verip çöker. Bu, kodun her zaman estetik ve zorunlu olarak düzenli yazılmasını sağlar.

```python
yas = 20

if yas >= 18:
    # 4 boşluk içerideyiz. Burası İF'in İÇİDİR.
    print("Reşitsiniz.")
    print("Ehliyet alabilirsiniz.")
# Boşluk bittiği an, İF bloğu kapanmış demektir. Burası DIŞARISI.
print("Sistem kapanıyor.") 
```

## 2. If - Elif - Else (Mantıksal Kararlar)
Python'da `else if` yerine kısaca `elif` yazılır.
```python
notum = 75

if notum >= 90:
    print("Harika, A aldın!")
elif notum >= 70:
    print("İyi, B aldın.")
else:
    print("Kaldın!")
```

## 3. For Döngüsü ve In Operatörü
Python'un For döngüsü, diğer dillerdeki gibi `i=0; i<10; i++` şeklinde iğrenç ve karmaşık değildir. Direkt olarak bir listenin (veya metnin) elemanları üzerinde "içinde gezin (in)" mantığıyla çalışır. Efsanevidir.
```python
meyveler = ["Elma", "Armut", "Muz"]

for meyve in meyveler:
    # Listedeki her bir elemanı sırayla 'meyve' değişkenine atar ve tur döner.
    print(f"Ben {meyve} severim.")

# Sadece sayı saymak istiyorsanız range() kullanılır:
for sayi in range(1, 5):
    print(sayi) # 1, 2, 3, 4 yazar. (5 dahil edilmez!)
```

## 4. BÜYÜ: List Comprehension (Tek Satırda Döngü)
Python'u Python yapan en şık özelliktir. 5 satırlık döngüyü TEK SATIRDA yazmanızı sağlar.
Diyelim ki 1'den 10'a kadar olan sayıların karelerinden oluşan yeni bir liste yaratacağız:

*Eski, Uzun (Kötü) Yol:*
```python
kareler = []
for i in range(1, 11):
    kareler.append(i * i)
```

*Pythonic (Mükemmel) Yol - List Comprehension:*
```python
# SÖZ DİZİMİ: [ YAPILACAK_ISLEM for ELEMAN in KOLEKSIYON ]
kareler = [i * i for i in range(1, 11)]

# Hatta işin içine IF şartı bile ekleyebilirsiniz (Sadece çift olanların karesi):
cift_kareler = [i * i for i in range(1, 11) if i % 2 == 0]
```
