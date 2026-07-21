# Bölüm 03: Veri Yapıları ve Koleksiyonlar Kapsamlı Analizi

Python'un diğer dillere karşı ezici üstünlüğünün temel sebebi, sunduğu veri yapılarının son derece güçlü, esnek ve bellek yönetimini arkaplanda C/C++ hızında kendisinin yapmasıdır. Dört ana yapı (`List`, `Tuple`, `Set`, `Dict`) vardır ve hepsinin farklı yetenekleri/kullanım senaryoları mevcuttur.

---

## 1. Listeler (List) - Dinamik Arrayler `[ ]`
Listeler (Lists), C veya Java'daki sabit boyutlu diziler (Arrays) GİBİ DEĞİLDİR. Python'daki listeler, boyutları kendi kendine büyüyüp küçülebilen, içine hem metin hem sayı hem de başka listeleri koyabileceğiniz **Dinamik Dizilerdir**.

Arka planda (CPython mimarisi), Listeler verilerin YAN YANA sıralandığı bir bellek bloğudur. Dolayısıyla bir Listenin *sonuna* eleman eklemek (`append`) **O(1)** sabittir (çok hızlıdır). Ancak Listenin *başına* eleman eklerseniz (`insert(0, X)`), sistem arkadaki milyonlarca veriyi birer adım sağa kaydırmak zorunda kaldığı için **O(N)** sürede çalışır ve ÇOK YAVAŞTIR. (Baştan ekleme yapacaksanız `collections.deque` kullanılmalıdır).

**Kapsamlı Liste Metotları:**
```python
sepet = ["Elma", "Armut", "Muz"]

# 1. Eleman Ekleme
sepet.append("Çilek")        # En sona tek eleman ekler.
sepet.extend(["Karpuz", "Kivi"]) # Başka bir listeyi (Birden fazla elemanı) alıp sona YAPIŞTIRIR. (Çok kullanışlı)
sepet.insert(1, "Portakal")  # 1. index'e (Armut'un olduğu yere) Portakal'ı araya kaynak yapar.

# 2. Eleman Çıkarma
silinen = sepet.pop()        # Listenin EN SONUNDAKİ elemanı koparır, listeden siler ve size geri döndürür.
sepet.remove("Elma")         # Gördüğü İLK "Elma"yı siler. Elma yoksa ValueError hatası fırlatır!
sepet.clear()                # Listenin içini tamamen boşaltır: []

# 3. Bilgi Alma ve Sıralama
sayilar = [5, 1, 9, 3, 5]
sayilar.count(5)             # Liste içinde kaç tane 5 var? Sonuç: 2
sayilar.index(9)             # 9 rakamı kaçıncı index'te duruyor? Sonuç: 2
sayilar.sort()               # Listeyi küçükten büyüğe GÜNCELLER (Kalıcı olarak sıralar) -> [1, 3, 5, 5, 9]
sayilar.sort(reverse=True)   # Büyükten küçüğe sıralar.
sayilar.reverse()            # Listeyi tamamen ters yüz eder.
```

**Sığ Kopya (Shallow Copy) Tuzağı:**
Python'da bir listeyi diğerine eşitlerseniz, verileri kopyalamazsınız; aynı belleğe 2. bir etiket bağlarsınız.
```python
a = [1, 2, 3]
b = a          # DİKKAT! Bu kopyalama DEĞİLDİR.
b[0] = 99      # B'yi değiştirdim sanırsınız.
print(a)       # Çıktı: [99, 2, 3] -> A da değişti! Çünkü A ve B aynı evde oturuyor.

# Gerçek (Sığ) kopyalama için:
b = a.copy()   # Veya b = list(a) Veya b = a[:] kullanılır.
```

---

## 2. Demetler (Tuple) - Sabit Kayalar `( )`
Tuple'lar, Listelerin **Değiştirilemez (Immutable)** ikiz kardeşleridir. İçine veri eklenemez, çıkarılamaz, güncellenemez.

- **Neden var? Neden List kullanmıyoruz?**
  1. **Performans ve Hız:** Tuple'lar sabittir. Python onların ne kadar yer kaplayacağını baştan bilir. `sys.getsizeof()` ile ölçüldüğünde Tuple, eşdeğer bir Liste'den çok daha az RAM harcar ve çok daha hızlı yaratılır.
  2. **Güvenlik:** Haftanın günleri, veritabanı ayarları gibi programın akışı sırasında kaza eseri birisinin gelip `gunler.append("Hata")` yazarak bozmasını engellemek istediğiniz "Salt Okunur (Read-Only)" veriler için mükemmeldir.
  3. **Hashable Özelliği:** Kümelerde ve Sözlük Anahtarlarında (Keys) sadece Değiştirilemez veriler kullanılır. Listeleri anahtar yapamazsınız, ama Tuple'ı yapabilirsiniz!

**Kapsamlı Tuple Metotları (Sadece Okuma):**
Tuple'ın zaten sadece 2 tane metodu vardır:
```python
t = (10, 20, 30, 20)
print(t.count(20)) # 20'den kaç tane var? -> 2
print(t.index(30)) # 30 nerede? -> 2. index

# MÜKEMMEL ÖZELLİK: Tuple Unpacking (Paket Açma)
koordinat = (41.01, 28.97)
enlem, boylam = koordinat  # Tek satırda enlem=41.01 ve boylam=28.97 oldu!
```

---

## 3. Kümeler (Set) - Benzersizler Topluluğu `{ }`
Kümeler, Listelerden tamamen farklı bir mimariye sahiptir. Arka planda **Hash Table** (Arama tablosu) mantığıyla çalışırlar. Bu yüzden bir Set içinde eleman aramak (`x in setim`) Milyonlarca veri olsa bile anında **O(1)** hızında sonuçlanır (Liste içinde aramak O(N)'dir).

**Özellikleri:**
1. Aynı elemandan 2 tane olamaz (Benzersizlik garantisi).
2. Sırasızdır (Unordered). `setim[0]` derseniz program ÇÖKER! Çünkü index veya sıra garantisi yoktur.

**Kapsamlı Set Metotları ve Küme Teorisi:**
```python
kume = {1, 2, 3}
kume.add(4)        # Eleman ekler (append değil, add)
kume.update([5,6]) # Birden fazla eleman ekler
kume.remove(2)     # 2'yi siler. Yoksa KeyError hatası verir!
kume.discard(99)   # 99'u silmeyi Dener. Yoksa HATA VERMEZ! (Güvenli silme).

# KÜMELER ARASI MATEMATİKSEL İŞLEMLER (Python'un gücü)
a = {"Ali", "Ayşe", "Veli"}
b = {"Ayşe", "Fatma", "Ahmet"}

print(a.union(b))            # BİRLEŞİM (a | b): Tüm isimleri birleştirir, tekrarı siler.
print(a.intersection(b))     # KESİŞİM (a & b): İki kümede ORTAK olanları bulur ("Ayşe").
print(a.difference(b))       # FARK (a - b): Sadece A'da olup B'de olmayanlar ("Ali", "Veli").
print(a.symmetric_difference(b)) # Sadece A'da veya sadece B'de olanlar (Ortak olanları dışlar).
```
*Not: İçi boş bir küme tanımlamak için `x = {}` yazılmaz (Bu boş Sözlük üretir). Boş küme için `x = set()` yazılmalıdır.*

---

## 4. Sözlükler (Dictionary) - Anahtar/Kilit `{"key": "value"}`
İnternetin veri taşıma dili olan JSON formatının kalbidir. Verileri 0, 1, 2 gibi sıra numarasıyla (Index) değil; sizin belirlediğiniz **Eşsiz bir Anahtar (Key)** ve ona karşılık gelen **Değer (Value)** yapısıyla tutar. 

Set'ler gibi Hash Table mimarisi kullandığı için, milyonlarca kayıt arasından `TC_Kimlik_No`'ya göre arama yapmak anında **O(1)** hızıyla (Işık hızında) gerçekleşir. Şart şudur: **Sözlüğün KEY (Anahtarı) mutlaka değiştirilemez (String, Integer, Tuple) olmalıdır. Ancak VALUE (Değeri) istediğiniz her şey olabilir.**

**Kapsamlı Dictionary Metotları:**
```python
ogrenci = {
    "tc": 123456789,
    "isim": "Zeynep",
    "notlar": [90, 85, 100]
}

# 1. Veri Okuma ve Hata Engelleme
# print(ogrenci["soyisim"]) # Eğer soyisim yoksa KeyError verip PROGRAMI ÇÖKERTİR!
print(ogrenci.get("soyisim")) # Güvenli! Yoksa çökmez, 'None' döner.
print(ogrenci.get("soyisim", "Bulunamadı")) # Yoksa varsayılan olarak "Bulunamadı" döndürür.

# 2. Veri Ekleme, Güncelleme, Silme
ogrenci["sehir"] = "Ankara"   # Yeni key:value ekler.
ogrenci.update({"isim": "Ayşe", "yas": 25}) # Birden fazla kaydı aynı anda günceller veya ekler.

silinen_isim = ogrenci.pop("isim")  # İsim anahtarını bul, KOPAR VE SİL.
son_eklenen = ogrenci.popitem()     # En son eklenen (Key:Value) çiftini Tuple olarak siler.

# 3. Sözlük İçinde Gezinme (For Döngüleri İçin Mükemmel Metotlar)
print(ogrenci.keys())   # Sadece Anahtarları getirir (tc, notlar, sehir)
print(ogrenci.values()) # Sadece Değerleri getirir (123456789, [90,85,100], Ankara)
print(ogrenci.items())  # Her ikisini de paket halinde (Tuple olarak) getirir.

# Doğru kullanım:
for anahtar, deger in ogrenci.items():
    print(f"{anahtar} -> {deger}")
```
