# SQL Temelleri - Bölüm 2: SELECT Sorguları ve Veri Filtreleme

## İçindekiler
1. SELECT Komutu
2. WHERE Clause (Filtreleme)
3. Karşılaştırma Operatörleri
4. Mantıksal Operatörler
5. LIKE Operatörü
6. IN ve BETWEEN Operatörleri

---

## 1. SELECT Komutu

SELECT, SQL'de en çok kullanılan komuttur. Veritabanından veri çekmek için kullanılır.

### Temel Sözdizimi

```sql
SELECT sütun1, sütun2, ...
FROM tablo_adi;
```

### Tüm Sütunları Seçme

```sql
SELECT * FROM calisanlar;
```

**Uyarı**: `*` kullanımı pratik olsa da, performans için sadece ihtiyaç duyduğunuz sütunları seçin.

### Belirli Sütunları Seçme

```sql
SELECT isim, maas FROM calisanlar;
```

### DISTINCT - Tekrarlı Kayıtları Eleme

```sql
SELECT DISTINCT sehir FROM calisanlar;
```

Bu sorgu, her şehri sadece bir kez listeler.

---

## 2. WHERE Clause (Filtreleme)

WHERE ifadesi, belirli koşullara uyan kayıtları filtrelemek için kullanılır.

### Temel Sözdizimi

```sql
SELECT sütun1, sütun2
FROM tablo_adi
WHERE koşul;
```

### Örnek

```sql
SELECT isim, soyad, maas
FROM calisanlar
WHERE maas > 5000;
```

Bu sorgu, maaşı 5000'den büyük olan çalışanları getirir.

---

## 3. Karşılaştırma Operatörleri

| Operatör | Açıklama | Örnek |
|----------|----------|-------|
| `=` | Eşit | `WHERE maas = 5000` |
| `!=` veya `<>` | Eşit değil | `WHERE sehir != 'İstanbul'` |
| `>` | Büyüktür | `WHERE yas > 30` |
| `<` | Küçüktür | `WHERE yas < 25` |
| `>=` | Büyük eşit | `WHERE maas >= 5000` |
| `<=` | Küçük eşit | `WHERE maas <= 10000` |

### Örnekler

```sql
-- Maaşı tam olarak 6000 olan çalışanlar
SELECT * FROM calisanlar WHERE maas = 6000;

-- İstanbul'da olmayanlar
SELECT * FROM calisanlar WHERE sehir <> 'İstanbul';

-- 30 yaşından büyük çalışanlar
SELECT * FROM calisanlar WHERE yas > 30;
```

---

## 4. Mantıksal Operatörler

Birden fazla koşulu birleştirmek için kullanılır.

### AND Operatörü

Tüm koşulların doğru olması gerekir.

```sql
SELECT * FROM calisanlar
WHERE maas > 5000 AND sehir = 'İstanbul';
```

### OR Operatörü

Koşullardan en az birinin doğru olması yeterlidir.

```sql
SELECT * FROM calisanlar
WHERE sehir = 'İstanbul' OR sehir = 'Ankara';
```

### NOT Operatörü

Koşulu tersine çevirir.

```sql
SELECT * FROM calisanlar
WHERE NOT sehir = 'İstanbul';
```

### Karmaşık Koşullar

Parantez kullanarak öncelik belirleyebilirsiniz.

```sql
SELECT * FROM calisanlar
WHERE (sehir = 'İstanbul' OR sehir = 'Ankara')
  AND maas > 6000;
```

---

## 5. LIKE Operatörü

Metin aramalarında desen eşleştirmesi için kullanılır.

### Joker Karakterler

- `%` - Sıfır veya daha fazla karakter
- `_` - Tam olarak bir karakter

### Örnekler

```sql
-- 'A' harfi ile başlayanlar
SELECT * FROM calisanlar WHERE isim LIKE 'A%';

-- 'an' ile bitenler
SELECT * FROM calisanlar WHERE isim LIKE '%an';

-- İçinde 'er' geçenler
SELECT * FROM calisanlar WHERE isim LIKE '%er%';

-- İkinci harfi 'h' olanlar
SELECT * FROM calisanlar WHERE isim LIKE '_h%';

-- Tam 5 karakterli isimler
SELECT * FROM calisanlar WHERE isim LIKE '_____';
```

### LIKE Kullanım Senaryoları

```sql
-- Gmail kullananlar
SELECT * FROM kullanicilar WHERE email LIKE '%@gmail.com';

-- 0555 ile başlayan telefonlar
SELECT * FROM musteriler WHERE telefon LIKE '0555%';

-- Adında 'Soft' geçen şirketler
SELECT * FROM sirketler WHERE isim LIKE '%Soft%';
```

---

## 6. IN ve BETWEEN Operatörleri

### IN Operatörü

Birden fazla değerden birini aramak için kullanılır.

```sql
SELECT * FROM calisanlar
WHERE sehir IN ('İstanbul', 'Ankara', 'İzmir');
```

Bu sorgu şuna eşdeğerdir:
```sql
SELECT * FROM calisanlar
WHERE sehir = 'İstanbul' 
   OR sehir = 'Ankara' 
   OR sehir = 'İzmir';
```

### NOT IN

```sql
SELECT * FROM calisanlar
WHERE sehir NOT IN ('İstanbul', 'Ankara');
```

### BETWEEN Operatörü

Bir aralıktaki değerleri seçmek için kullanılır (dahil).

```sql
SELECT * FROM calisanlar
WHERE maas BETWEEN 5000 AND 8000;
```

Bu sorgu şuna eşdeğerdir:
```sql
SELECT * FROM calisanlar
WHERE maas >= 5000 AND maas <= 8000;
```

### BETWEEN ile Tarih Kullanımı

```sql
SELECT * FROM siparisler
WHERE siparis_tarihi BETWEEN '2024-01-01' AND '2024-12-31';
```

---

## Pratik Örnekler

### Örnek 1: Karmaşık Filtreleme

```sql
SELECT isim, soyad, maas, sehir
FROM calisanlar
WHERE (maas > 6000 AND sehir = 'İstanbul')
   OR (maas > 7000 AND sehir = 'Ankara');
```

### Örnek 2: NULL Değer Kontrolü

```sql
-- NULL olan kayıtlar
SELECT * FROM calisanlar WHERE telefon IS NULL;

-- NULL olmayan kayıtlar
SELECT * FROM calisanlar WHERE telefon IS NOT NULL;
```

### Örnek 3: Kombine Kullanım

```sql
SELECT isim, soyad, maas
FROM calisanlar
WHERE departman IN ('IT', 'Satış', 'Pazarlama')
  AND maas BETWEEN 5000 AND 10000
  AND isim LIKE 'A%'
  AND telefon IS NOT NULL;
```

---

## Alıştırmalar

1. Maaşı 7000 ile 12000 arasında olan çalışanları listeleyin
2. Adı 'M' harfi ile başlayan ve İstanbul'da çalışan personeli bulun
3. Ankara, İzmir veya Bursa'da çalışan ve maaşı 6000'den fazla olanları sorgulayın
4. Email adresi boş olmayan müşterileri listeleyin
5. Soyadı 'oğlu' ile biten çalışanları bulun

---

## Özet

Bu bölümde SELECT sorguları ile veri çekmeyi ve WHERE clause kullanarak verileri filtrelemeyi öğrendik. Karşılaştırma operatörleri, mantıksal operatörler ve özel operatörler (LIKE, IN, BETWEEN) ile karmaşık sorgular oluşturmayı gördük.

**Sonraki Bölüm**: Sıralama, Gruplama ve Agregasyon Fonksiyonları