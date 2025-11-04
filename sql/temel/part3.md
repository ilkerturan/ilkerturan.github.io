# SQL Temelleri - Bölüm 3: Sıralama, Gruplama ve Agregasyon Fonksiyonları

## İçindekiler
1. ORDER BY - Sıralama
2. LIMIT - Sonuç Kısıtlama
3. Agregasyon Fonksiyonları
4. GROUP BY - Gruplama
5. HAVING - Grup Filtreleme

---

## 1. ORDER BY - Sıralama

ORDER BY, sorgu sonuçlarını belirli bir sütuna göre sıralamak için kullanılır.

### Temel Sözdizimi

```sql
SELECT sütun1, sütun2
FROM tablo_adi
ORDER BY sütun1 [ASC|DESC];
```

### Artan Sıralama (ASC - Ascending)

```sql
SELECT isim, soyad, maas
FROM calisanlar
ORDER BY maas ASC;
```

**Not**: ASC varsayılan değerdir, yazmasanız da artan sıralama yapılır.

### Azalan Sıralama (DESC - Descending)

```sql
SELECT isim, soyad, maas
FROM calisanlar
ORDER BY maas DESC;
```

### Birden Fazla Sütuna Göre Sıralama

```sql
SELECT isim, soyad, sehir, maas
FROM calisanlar
ORDER BY sehir ASC, maas DESC;
```

Bu sorgu önce şehre göre alfabetik, sonra aynı şehirdeki çalışanları maaşa göre azalan sırada listeler.

### Sütun Numarası ile Sıralama

```sql
SELECT isim, soyad, maas
FROM calisanlar
ORDER BY 3 DESC;  -- 3. sütun (maas) için
```

---

## 2. LIMIT - Sonuç Kısıtlama

LIMIT, dönen kayıt sayısını sınırlamak için kullanılır.

### MySQL ve PostgreSQL Sözdizimi

```sql
SELECT * FROM calisanlar
ORDER BY maas DESC
LIMIT 5;
```

### OFFSET ile Kullanım

```sql
-- İlk 5'i atla, sonraki 10'u getir
SELECT * FROM calisanlar
ORDER BY maas DESC
LIMIT 10 OFFSET 5;
```

### SQL Server'da TOP

```sql
SELECT TOP 5 * FROM calisanlar
ORDER BY maas DESC;
```

### Oracle'da ROWNUM

```sql
SELECT * FROM calisanlar
WHERE ROWNUM <= 5
ORDER BY maas DESC;
```

---

## 3. Agregasyon Fonksiyonları

Agregasyon fonksiyonları, birden fazla satır üzerinde hesaplama yaparak tek bir sonuç döndürür.

### COUNT() - Sayma

```sql
-- Toplam çalışan sayısı
SELECT COUNT(*) FROM calisanlar;

-- NULL olmayan telefon sayısı
SELECT COUNT(telefon) FROM calisanlar;

-- Benzersiz şehir sayısı
SELECT COUNT(DISTINCT sehir) FROM calisanlar;
```

### SUM() - Toplam

```sql
-- Toplam maaş ödemesi
SELECT SUM(maas) FROM calisanlar;

-- Toplam satış tutarı
SELECT SUM(tutar) FROM siparisler;
```

### AVG() - Ortalama

```sql
-- Ortalama maaş
SELECT AVG(maas) FROM calisanlar;

-- İstanbul'daki ortalama maaş
SELECT AVG(maas) FROM calisanlar WHERE sehir = 'İstanbul';
```

### MIN() ve MAX() - Minimum ve Maksimum

```sql
-- En düşük ve en yüksek maaş
SELECT MIN(maas) AS en_dusuk, MAX(maas) AS en_yuksek
FROM calisanlar;

-- En eski ve en yeni sipariş tarihi
SELECT MIN(tarih) AS ilk_siparis, MAX(tarih) AS son_siparis
FROM siparisler;
```

### Alias (AS) Kullanımı

```sql
SELECT 
    COUNT(*) AS toplam_calisan,
    AVG(maas) AS ortalama_maas,
    SUM(maas) AS toplam_maas_gideri,
    MIN(maas) AS minimum_maas,
    MAX(maas) AS maksimum_maas
FROM calisanlar;
```

---

## 4. GROUP BY - Gruplama

GROUP BY, verileri belirli sütunlara göre gruplar ve her grup için agregasyon fonksiyonları çalıştırır.

### Temel Kullanım

```sql
-- Her şehirdeki çalışan sayısı
SELECT sehir, COUNT(*) AS calisan_sayisi
FROM calisanlar
GROUP BY sehir;
```

**Sonuç:**
```
sehir      | calisan_sayisi
-----------|---------------
İstanbul   | 150
Ankara     | 80
İzmir      | 45
```

### Birden Fazla Sütunla Gruplama

```sql
-- Her şehir ve departmandaki çalışan sayısı
SELECT sehir, departman, COUNT(*) AS calisan_sayisi
FROM calisanlar
GROUP BY sehir, departman;
```

### GROUP BY ile Agregasyon Fonksiyonları

```sql
-- Her departmanın istatistikleri
SELECT 
    departman,
    COUNT(*) AS calisan_sayisi,
    AVG(maas) AS ortalama_maas,
    MIN(maas) AS min_maas,
    MAX(maas) AS max_maas,
    SUM(maas) AS toplam_maas
FROM calisanlar
GROUP BY departman;
```

### Önemli Kural

**GROUP BY kullanırken, SELECT'te yer alan sütunlar ya GROUP BY'da olmalı ya da bir agregasyon fonksiyonu içinde olmalıdır.**

```sql
-- ❌ YANLIŞ
SELECT sehir, departman, COUNT(*)
FROM calisanlar
GROUP BY sehir;  -- departman GROUP BY'da yok!

-- ✅ DOĞRU
SELECT sehir, departman, COUNT(*)
FROM calisanlar
GROUP BY sehir, departman;
```

---

## 5. HAVING - Grup Filtreleme

HAVING, GROUP BY ile oluşturulan grupları filtrelemek için kullanılır. WHERE, gruplamadan önce filtreleme yaparken, HAVING gruplamadan sonra filtreler.

### WHERE vs HAVING

```sql
-- WHERE: Gruplama öncesi filtreleme
SELECT departman, AVG(maas) AS ort_maas
FROM calisanlar
WHERE sehir = 'İstanbul'  -- Önce İstanbul'u seç
GROUP BY departman;       -- Sonra grupla

-- HAVING: Gruplama sonrası filtreleme
SELECT departman, AVG(maas) AS ort_maas
FROM calisanlar
GROUP BY departman
HAVING AVG(maas) > 7000;  -- Ortalama maaşı 7000'den fazla olanları seç
```

### HAVING Örnekleri

```sql
-- 10'dan fazla çalışanı olan departmanlar
SELECT departman, COUNT(*) AS calisan_sayisi
FROM calisanlar
GROUP BY departman
HAVING COUNT(*) > 10;

-- Toplam satışı 100000'den fazla olan müşteriler
SELECT musteri_id, SUM(tutar) AS toplam_satis
FROM siparisler
GROUP BY musteri_id
HAVING SUM(tutar) > 100000;

-- En az 3 çalışanı olan ve ortalama maaşı 8000'in üzerinde olan şehirler
SELECT sehir, COUNT(*) AS calisan_sayisi, AVG(maas) AS ort_maas
FROM calisanlar
GROUP BY sehir
HAVING COUNT(*) >= 3 AND AVG(maas) > 8000;
```

### WHERE ve HAVING Birlikte Kullanımı

```sql
SELECT departman, AVG(maas) AS ortalama_maas, COUNT(*) AS calisan_sayisi
FROM calisanlar
WHERE sehir IN ('İstanbul', 'Ankara')  -- Önce şehir filtrele
GROUP BY departman                      -- Departmana göre grupla
HAVING COUNT(*) >= 5                    -- En az 5 çalışanı olanları seç
ORDER BY ortalama_maas DESC;           -- Ortalama maaşa göre sırala
```

---

## SQL Sorgu Sırası

SQL sorgularının yazılış ve çalışma sırası farklıdır:

### Yazılış Sırası
```sql
SELECT
FROM
WHERE
GROUP BY
HAVING
ORDER BY
LIMIT
```

### Çalışma Sırası
```sql
FROM      -- Hangi tablodan
WHERE     -- Hangi satırlar (gruplama öncesi)
GROUP BY  -- Nasıl grupla
HAVING    -- Hangi gruplar (gruplama sonrası)
SELECT    -- Hangi sütunlar
ORDER BY  -- Nasıl sırala
LIMIT     -- Kaç tane göster
```

---

## Kapsamlı Örnekler

### Örnek 1: Satış Analizi

```sql
SELECT 
    kategori,
    COUNT(DISTINCT urun_id) AS urun_sayisi,
    COUNT(*) AS toplam_satis,
    SUM(miktar * fiyat) AS toplam_ciro,
    AVG(miktar * fiyat) AS ortalama_satis,
    MAX(miktar * fiyat) AS en_buyuk_satis
FROM satislar
WHERE satis_tarihi >= '2024-01-01'
GROUP BY kategori
HAVING SUM(miktar * fiyat) > 50000
ORDER BY toplam_ciro DESC
LIMIT 10;
```

### Örnek 2: Çalışan Performans Raporu

```sql
SELECT 
    departman,
    sehir,
    COUNT(*) AS calisan_sayisi,
    ROUND(AVG(maas), 2) AS ort_maas,
    ROUND(AVG(prim), 2) AS ort_prim
FROM calisanlar
WHERE ise_giris_tarihi < '2024-01-01'
GROUP BY departman, sehir
HAVING COUNT(*) >= 3
ORDER BY departman, ort_maas DESC;
```

---

## Alıştırmalar

1. Her şehirdeki toplam çalışan sayısını ve ortalama maaşı gösterin
2. En az 5 çalışanı olan departmanları ve ortalama maaşlarını listeleyin
3. 2024 yılında en çok satış yapan 5 ürünü bulun
4. Her kategoride kaç ürün olduğunu, toplam stok miktarını gösterin
5. Maaşı departman ortalamasının üzerinde olan çalışan sayısını departmanlara göre gruplandırın

---

## Özet

Bu bölümde verileri sıralamayı (ORDER BY), sonuç sayısını sınırlamayı (LIMIT), agregasyon fonksiyonlarını (COUNT, SUM, AVG, MIN, MAX) ve gruplama işlemlerini (GROUP BY, HAVING) öğrendik. Bu kavramlar, veri analizi ve raporlama için temeldir.

**Sonraki Bölüm**: JOIN İşlemleri ve İlişkiler
