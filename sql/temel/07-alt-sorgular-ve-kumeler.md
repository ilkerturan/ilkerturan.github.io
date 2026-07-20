# SQL Temelleri - Bölüm 7: Alt Sorgular (Subqueries) ve Küme İşlemleri

---

## İçindekiler
1. [Alt Sorgular (Subqueries) Nedir?](#1-alt-sorgular-subqueries-nedir)
2. [WHERE Bloğunda Alt Sorgular](#2-where-bloğunda-alt-sorgular)
3. [FROM Bloğunda Alt Sorgular (Derived Tables)](#3-from-bloğunda-alt-sorgular)
4. [EXISTS ve NOT EXISTS Operatörleri](#4-exists-ve-not-exists-operatörleri)
5. [Küme İşlemleri (Set Operations)](#5-küme-işlemleri-set-operations)
6. [Özet](#özet)

---

## 1. Alt Sorgular (Subqueries) Nedir?

Alt sorgu (subquery veya nested query), başka bir SQL sorgusunun içine yerleştirilmiş olan bir sorgudur. Genellikle ana sorgunun ihtiyaç duyduğu ancak veritabanında doğrudan bulunmayan verileri filtrelemek veya hesaplamak için kullanılır.

Alt sorgular her zaman parantez `()` içinde yazılır ve genellikle önce içteki (alt) sorgu çalışır, sonucu dıştaki (ana) sorguya iletilir.

---

## 2. WHERE Bloğunda Alt Sorgular

En yaygın kullanım alanıdır. Bir sütunun değerini, başka bir sorgudan dönen sonuçla karşılaştırmak için kullanılır.

### IN / NOT IN ile Kullanım

**Örnek:** Sadece "Satış" veya "Pazarlama" departmanında çalışanların listesini bulalım (departman adlarının `departmanlar` tablosunda tutulduğunu varsayalım).

```sql
SELECT isim, soyad, maas
FROM calisanlar
WHERE departman_id IN (
    SELECT id 
    FROM departmanlar 
    WHERE departman_adi IN ('Satış', 'Pazarlama')
);
```

### Karşılaştırma Operatörleri (>, <, =) ile Kullanım

Eğer alt sorgu **kesinlikle tek bir değer (scalar value)** döndürüyorsa, klasik matematiksel operatörler kullanılabilir.

**Örnek:** Şirketin maaş ortalamasından daha yüksek maaş alan çalışanları bulalım.

```sql
SELECT isim, soyad, maas
FROM calisanlar
WHERE maas > (
    SELECT AVG(maas) 
    FROM calisanlar
);
```
*(Önce iç sorgu çalışır ve ortalama maaşı bulur, ardından ana sorgu bu değerden yüksek alanları filtreler).*

---

## 3. FROM Bloğunda Alt Sorgular

Sorgu sonucunda dönen tabloyu, sanki gerçek bir tabloymuş gibi `FROM` bloğunda kullanabiliriz. Buna literatürde **Derived Table (Türetilmiş Tablo)** denir. Genellikle bir Alias (Takma ad) vermek zorunludur.

**Örnek:** Departmanların ortalama maaşlarını bulup, sadece ortalaması 10.000'den büyük olan departmanları listeleyelim.

```sql
SELECT departman_id, ortalama_maas
FROM (
    SELECT departman_id, AVG(maas) AS ortalama_maas
    FROM calisanlar
    GROUP BY departman_id
) AS departman_istatistikleri
WHERE ortalama_maas > 10000;
```
*(Not: Bu işlemi `HAVING` ile de yapabilirdik, ancak alt sorgu yaklaşımı daha karmaşık veri dönüşümlerinde hayat kurtarır).*

---

## 4. EXISTS ve NOT EXISTS Operatörleri

`EXISTS` operatörü, alt sorgunun herhangi bir veri (en az 1 satır) döndürüp döndürmediğini kontrol eder. Eğer alt sorgu veri döndürürse `TRUE`, döndürmezse `FALSE` kabul edilir.

Büyük veritabanlarında `IN` kullanmaktan çok daha performanslıdır çünkü eşleşen ilk kaydı bulduğu an aramayı durdurur.

**Örnek:** Hiç sipariş vermemiş olan müşterileri bulalım.

```sql
SELECT musteri_id, musteri_adi
FROM musteriler AS m
WHERE NOT EXISTS (
    SELECT 1 
    FROM siparisler AS s 
    WHERE s.musteri_id = m.musteri_id
);
```
*(İpucu: `SELECT 1` kullanmak bir standarttır. Verinin kendisi önemsizdir, sadece kaydın var olup olmamasına bakılır).*

---

## 5. Küme İşlemleri (Set Operations)

Küme işlemleri, birden fazla bağımsız sorgunun sonucunu tek bir sonuç tablosu altında alt alta birleştirmek veya kıyaslamak için kullanılır.

**Önemli Kural:** Küme işlemi yapılacak sorgularda **sütun sayıları** ve **veri tipleri** mutlaka birbiriyle eşleşmelidir.

### UNION ve UNION ALL (Birleştirme)

İki sorgunun sonucunu alt alta ekler.
- `UNION`: Tekrar eden (mükerrer) kayıtları siler. Benzersiz (unique) bir sonuç verir.
- `UNION ALL`: Tekrar eden kayıtları silmez, olduğu gibi yapıştırır (daha hızlıdır).

**Örnek:** Hem eski müşterilerin hem de yeni müşterilerin e-posta adreslerini tek bir listede toplayalım.

```sql
SELECT eposta FROM eski_musteriler
UNION
SELECT eposta FROM yeni_musteriler;
```

### INTERSECT (Kesişim)

Her iki sorgunun da ortak olarak döndürdüğü (kesişen) kayıtları getirir.

**Örnek:** Hem 2023'te hem de 2024'te sipariş veren aktif müşterileri bulalım.

```sql
SELECT musteri_id FROM siparisler_2023
INTERSECT
SELECT musteri_id FROM siparisler_2024;
```

### EXCEPT / MINUS (Fark)

İlk sorguda olup, ikinci sorguda olmayan kayıtları getirir. (Oracle veritabanlarında `MINUS` olarak geçer).

**Örnek:** 2023'te sipariş vermiş ancak 2024'te hiç sipariş vermemiş müşterileri bulalım.

```sql
SELECT musteri_id FROM siparisler_2023
EXCEPT
SELECT musteri_id FROM siparisler_2024;
```

---

## Özet

- **Alt Sorgular (Subqueries):** İhtiyacımız olan filtre parametresini anlık olarak başka bir tablodan hesaplamak/çekmek istediğimizde kullanılır.
- **EXISTS:** Genellikle varlık/yokluk kontrollerinde `IN` operatörüne göre çok daha hızlı ve güvenilir bir alternatiftir.
- **UNION:** Birden çok tablonun veya sorgunun sonuç setini dikey (alt alta) birleştirmemizi sağlar. Eşleşen yatay birleştirme (JOIN) işleminden tamamen farklıdır.
