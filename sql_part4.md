# SQL Temelleri - Bölüm 4: JOIN İşlemleri ve Tablo İlişkileri

## İçindekiler
1. JOIN Nedir?
2. INNER JOIN
3. LEFT JOIN (LEFT OUTER JOIN)
4. RIGHT JOIN (RIGHT OUTER JOIN)
5. FULL OUTER JOIN
6. CROSS JOIN
7. SELF JOIN

---

## 1. JOIN Nedir?

JOIN, iki veya daha fazla tabloyu birleştirerek ilişkili verileri tek bir sonuç kümesinde göstermeye yarar.

### Örnek Tablolar

**calisanlar** tablosu:
```
id | isim    | departman_id | maas
---|---------|--------------|------
1  | Ahmet   | 1            | 5000
2  | Ayşe    | 2            | 6000
3  | Mehmet  | 1            | 5500
4  | Zeynep  | 3            | 7000
5  | Can     | NULL         | 4500
```

**departmanlar** tablosu:
```
id | departman_adi | lokasyon
---|---------------|----------
1  | IT            | İstanbul
2  | Satış         | Ankara
3  | Pazarlama     | İzmir
4  | İK            | Bursa
```

---

## 2. INNER JOIN

INNER JOIN, her iki tabloda da eşleşen kayıtları getirir. Eşleşmeyen kayıtlar sonuca dahil edilmez.

### Sözdizimi

```sql
SELECT sütunlar
FROM tablo1
INNER JOIN tablo2 ON tablo1.sütun = tablo2.sütun;
```

### Örnek

```sql
SELECT 
    calisanlar.isim,
    calisanlar.maas,
    departmanlar.departman_adi,
    departmanlar.lokasyon
FROM calisanlar
INNER JOIN departmanlar ON calisanlar.departman_id = departmanlar.id;
```

**Sonuç:**
```
isim    | maas | departman_adi | lokasyon
--------|------|---------------|----------
Ahmet   | 5000 | IT            | İstanbul
Ayşe    | 6000 | Satış         | Ankara
Mehmet  | 5500 | IT            | İstanbul
Zeynep  | 7000 | Pazarlama     | İzmir
```

**Not**: Can departmanı olmadığı için, İK departmanı çalışanı olmadığı için sonuçta görünmüyor.

### Tablo Alias (Takma Ad) Kullanımı

```sql
SELECT 
    c.isim,
    c.maas,
    d.departman_adi,
    d.lokasyon
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id;
```

### Birden Fazla JOIN

```sql
SELECT 
    c.isim,
    d.departman_adi,
    p.proje_adi,
    p.baslangic_tarihi
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id
INNER JOIN projeler p ON c.id = p.calisan_id;
```

---

## 3. LEFT JOIN (LEFT OUTER JOIN)

LEFT JOIN, sol tablodaki tüm kayıtları ve sağ tabloda eşleşen kayıtları getirir. Eşleşme yoksa NULL değerler döner.

### Sözdizimi

```sql
SELECT sütunlar
FROM tablo1
LEFT JOIN tablo2 ON tablo1.sütun = tablo2.sütun;
```

### Örnek

```sql
SELECT 
    c.isim,
    c.maas,
    d.departman_adi,
    d.lokasyon
FROM calisanlar c
LEFT JOIN departmanlar d ON c.departman_id = d.id;
```

**Sonuç:**
```
isim    | maas | departman_adi | lokasyon
--------|------|---------------|----------
Ahmet   | 5000 | IT            | İstanbul
Ayşe    | 6000 | Satış         | Ankara
Mehmet  | 5500 | IT            | İstanbul
Zeynep  | 7000 | Pazarlama     | İzmir
Can     | 4500 | NULL          | NULL
```

**Not**: Can'ın departmanı olmasa da (NULL) sonuçta görünüyor.

### Yalnızca Eşleşmeyenleri Getirme

```sql
SELECT 
    c.isim,
    c.maas
FROM calisanlar c
LEFT JOIN departmanlar d ON c.departman_id = d.id
WHERE d.id IS NULL;
```

Bu sorgu, departmanı olmayan çalışanları getirir.

---

## 4. RIGHT JOIN (RIGHT OUTER JOIN)

RIGHT JOIN, sağ tablodaki tüm kayıtları ve sol tabloda eşleşen kayıtları getirir.

### Sözdizimi

```sql
SELECT sütunlar
FROM tablo1
RIGHT JOIN tablo2 ON tablo1.sütun = tablo2.sütun;
```

### Örnek

```sql
SELECT 
    c.isim,
    c.maas,
    d.departman_adi,
    d.lokasyon
FROM calisanlar c
RIGHT JOIN departmanlar d ON c.departman_id = d.id;
```

**Sonuç:**
```
isim    | maas | departman_adi | lokasyon
--------|------|---------------|----------
Ahmet   | 5000 | IT            | İstanbul
Ayşe    | 6000 | Satış         | Ankara
Mehmet  | 5500 | IT            | İstanbul
Zeynep  | 7000 | Pazarlama     | İzmir
NULL    | NULL | İK            | Bursa
```

**Not**: İK departmanının çalışanı olmasa da sonuçta görünüyor.

### LEFT JOIN ile Eşdeğerlik

```sql
-- Bu iki sorgu aynı sonucu verir
SELECT * FROM calisanlar c
LEFT JOIN departmanlar d ON c.departman_id = d.id;

SELECT * FROM departmanlar d
RIGHT JOIN calisanlar c ON c.departman_id = d.id;
```

---

## 5. FULL OUTER JOIN

FULL OUTER JOIN, her iki tablodaki tüm kayıtları getirir. Eşleşme yoksa NULL değerler döner.

### Sözdizimi

```sql
SELECT sütunlar
FROM tablo1
FULL OUTER JOIN tablo2 ON tablo1.sütun = tablo2.sütun;
```

### Örnek

```sql
SELECT 
    c.isim,
    c.maas,
    d.departman_adi,
    d.lokasyon
FROM calisanlar c
FULL OUTER JOIN departmanlar d ON c.departman_id = d.id;
```

**Sonuç:**
```
isim    | maas | departman_adi | lokasyon
--------|------|---------------|----------
Ahmet   | 5000 | IT            | İstanbul
Ayşe    | 6000 | Satış         | Ankara
Mehmet  | 5500 | IT            | İstanbul
Zeynep  | 7000 | Pazarlama     | İzmir
Can     | 4500 | NULL          | NULL
NULL    | NULL | İK            | Bursa
```

**Not**: MySQL'de FULL OUTER JOIN yoktur. UNION ile simüle edilir:

```sql
SELECT * FROM calisanlar c
LEFT JOIN departmanlar d ON c.departman_id = d.id
UNION
SELECT * FROM calisanlar c
RIGHT JOIN departmanlar d ON c.departman_id = d.id;
```

---

## 6. CROSS JOIN

CROSS JOIN, iki tablonun kartezyen çarpımını oluşturur. Her satırı diğer tablonun her satırıyla eşleştirir.

### Sözdizimi

```sql
SELECT sütunlar
FROM tablo1
CROSS JOIN tablo2;
```

### Örnek

```sql
SELECT 
    c.isim,
    d.departman_adi
FROM calisanlar c
CROSS JOIN departmanlar d;
```

Eğer calisanlar'da 5, departmanlar'da 4 kayıt varsa, sonuçta 20 (5x4) kayıt olur.

### Kullanım Alanı

```sql
-- Her ürün ve her renk kombinasyonu
SELECT 
    u.urun_adi,
    r.renk_adi
FROM urunler u
CROSS JOIN renkler r;
```

---

## 7. SELF JOIN

SELF JOIN, bir tablonun kendisiyle birleştirilmesidir. Genellikle hiyerarşik verilerde kullanılır.

### Örnek: Yönetici-Çalışan İlişkisi

**calisanlar** tablosu:
```
id | isim    | yonetici_id
---|---------|-------------
1  | Ahmet   | NULL
2  | Ayşe    | 1
3  | Mehmet  | 1
4  | Zeynep  | 2
5  | Can     | 2
```

```sql
SELECT 
    c.isim AS calisan,
    y.isim AS yonetici
FROM calisanlar c
LEFT JOIN calisanlar y ON c.yonetici_id = y.id;
```

**Sonuç:**
```
calisan | yonetici
--------|----------
Ahmet   | NULL
Ayşe    | Ahmet
Mehmet  | Ahmet
Zeynep  | Ayşe
Can     | Ayşe
```

### Başka Bir Örnek

```sql
-- Aynı departmandaki çalışan çiftleri
SELECT 
    c1.isim AS calisan1,
    c2.isim AS calisan2,
    c1.departman_id
FROM calisanlar c1
INNER JOIN calisanlar c2 
    ON c1.departman_id = c2.departman_id 
    AND c1.id < c2.id;  -- Tekrarları önlemek için
```

---

## JOIN Türleri - Görsel Özet

```
INNER JOIN:      LEFT JOIN:       RIGHT JOIN:      FULL OUTER JOIN:
   A ∩ B            A ∪ (A ∩ B)      (A ∩ B) ∪ B       A ∪ B
   
   ╔═══╗            ╔═══╗            ╔═══╗            ╔═══╗
   ║ A ║            ║ A ║            ║ A ║            ║ A ║
   ║  ╔╝            ║ ╔╝══╗          ║  ╔╝══╗         ║ ╔╝══╗
   ╚══║B║           ╚══║B  ║         ║  ║B  ║         ║ ║B  ║
      ╚═╝              ╚═══╝         ╚══╝═══╝         ╚═╝═══╝
```

---

## Kapsamlı Örnekler

### Örnek 1: Çoklu JOIN ve Filtreleme

```sql
SELECT 
    c.isim,
    d.departman_adi,
    s.sehir,
    p.proje_adi,
    p.butce
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id
INNER JOIN sehirler s ON d.sehir_id = s.id
LEFT JOIN projeler p ON c.id = p.sorumlu_id
WHERE p.butce > 100000
ORDER BY p.butce DESC;
```

### Örnek 2: Grup İşlemleri ile JOIN

```sql
SELECT 
    d.departman_adi,
    COUNT(c.id) AS calisan_sayisi,
    AVG(c.maas) AS ortalama_maas,
    SUM(p.butce) AS toplam_proje_butcesi
FROM departmanlar d
LEFT JOIN calisanlar c ON d.id = c.departman_id
LEFT JOIN projeler p ON c.id = p.sorumlu_id
GROUP BY d.id, d.departman_adi
HAVING COUNT(c.id) > 5;
```

### Örnek 3: Alt Sorgu ile JOIN

```sql
SELECT 
    c.isim,
    c.maas,
    d.departman_adi,
    ort.ortalama_maas
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id
INNER JOIN (
    SELECT departman_id, AVG(maas) AS ortalama_maas
    FROM calisanlar
    GROUP BY departman_id
) ort ON c.departman_id = ort.departman_id
WHERE c.maas > ort.ortalama_maas;
```

---

## Alıştırmalar

1. Tüm çalışanları departman bilgileriyle birlikte listeleyin (departmanı olmayanlar da dahil)
2. Hiç çalışanı olmayan departmanları bulun
3. Her departmanın toplam çalışan sayısını ve ortalama maaşını gösterin
4. Çalışanları yöneticileriyle birlikte listeleyin
5. Aynı şehirde çalışan çalışan çiftlerini bulun

---

## Özet

Bu bölümde farklı JOIN türlerini öğrendik. INNER JOIN eşleşenleri, LEFT/RIGHT JOIN tüm kayıtları bir taraftan, FULL OUTER JOIN her iki taraftan da getirir. CROSS JOIN kartezyen çarpım yapar, SELF JOIN ise tablonun kendisiyle birleştirilmesidir. JOIN işlemleri, ilişkisel veritabanlarının gücünü ortaya koyar.

**Sonraki Bölüm**: Veri Ekleme, Güncelleme ve Silme (INSERT, UPDATE, DELETE)