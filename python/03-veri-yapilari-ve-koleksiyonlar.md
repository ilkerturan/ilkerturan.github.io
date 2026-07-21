# Bölüm 03: Veri Yapıları (List, Tuple, Set, Dictionary)

Python'un dünyada en çok kullanılmasının ana sebebi, sahip olduğu Dahili (Built-in) veri yapılarının inanılmaz güçlü ve kullanımı çok kolay olmasıdır. Sadece 4 ana yapı vardır ve hepsi farklı bir işe yarar.

## 1. Listeler (List) - Dinamik Kutular `[ ]`
En çok kullanılan yapıdır. İçine istediğiniz her şeyi, karışık türlerde atabilirsiniz. Boyutu esnektir (ekleyip çıkarabilirsiniz). Köşeli parantez ile yaratılır.
```python
sepet = ["Elma", "Armut", 10, True, 3.14]

sepet.append("Muz") # Sona eleman ekler
sepet.insert(0, "Çilek") # En başa (0. index) Çilek ekler
silinen = sepet.pop() # En sondaki elemanı çıkarır
```

## 2. Demetler (Tuple) - Sabit Kayalar `( )`
Listenin tıpatıp aynısıdır, TEK BİR FARKI VARDIR: **Tuple'lar Değiştirilemez (Immutable)**.
Yarattıktan sonra içine eleman ekleyemezsiniz, silemezsiniz. (Salt Okunur).
- *Neden var?* Listeler esnek olduğu için bellekte (RAM) çok yer kaplar ve yavaştır. Tuple'lar ise sabit olduğu için bellekte kapandığı yer bellidir, inanılmaz **HIZLIDIR**. Sabit kalacak ayarları, haftanın günlerini Tuple içinde tutarız.
```python
gunler = ("Pazartesi", "Salı", "Çarşamba")
# gunler.append("Perşembe") --> PROGRAM ÇÖKER! Tuple değiştirilemez.
```

## 3. Kümeler (Set) - Eşsizler Topluluğu `{ }`
Matematikteki kümelerle birebir aynıdır. İki kritik özelliği vardır:
1. **İçinde ASLA aynı elemandan iki tane barındırmaz.** (Tekrar eden verileri filtrelemek için muazzam bir silahtır).
2. **Sırasızdır.** İçine attığınız sırayla kalmazlar. İndexi (0. eleman) yoktur!
```python
rakamlar = {1, 2, 2, 2, 3, 4, 4}
print(rakamlar) # Çıktı: {1, 2, 3, 4} (Tekrarları otomatik yuttu!)
```

## 4. Sözlükler (Dictionary) - Anahtar/Kilit `{"key": "value"}`
İnternetin dili olan JSON'ın Python'daki karşılığıdır. Verileri sırayla değil, Anahtar (Key) ve Değer (Value) eşleşmesiyle tutar. Çok hızlı veri aramak için kullanılır.
```python
ogrenci = {
    "isim": "Ahmet",
    "yas": 22,
    "notlar": [90, 85, 100]
}

print(ogrenci["isim"]) # Çıktı: Ahmet
ogrenci["yas"] = 23    # Değeri günceller
ogrenci["sehir"] = "Istanbul" # Yepyeni bir Anahtar-Değer çifti ekler
```
