# SQL Temelleri - Bölüm 8: Modern SQL (Views, CTE ve Window Functions)

---

## İçindekiler
1. [Sanal Tablolar (Views)](#1-sanal-tablolar-views)
2. [CTE (Common Table Expressions) ve WITH Kullanımı](#2-cte-common-table-expressions-ve-with-kullanımı)
3. [Window Functions (Analitik Fonksiyonlar)](#3-window-functions-analitik-fonksiyonlar)
4. [En Sık Kullanılan Window Fonksiyonları](#4-en-sık-kullanılan-window-fonksiyonları)
5. [Özet](#özet)

---

## 1. Sanal Tablolar (Views)

View (Sanal Tablo), fiziksel olarak veri saklamayan, ancak karmaşık bir SQL sorgusunun sonucunu veritabanında "sanki bir tabloymuş gibi" kaydeden yapılardır.

### Neden View Kullanırız?
- **Güvenlik:** Kullanıcılara tüm tabloyu (örneğin maaş sütununu) vermek yerine, sadece görmeleri gereken sütunları içeren bir View verilebilir.
- **Basitlik:** Çok fazla `JOIN` ve `WHERE` içeren karmaşık sorguları, tek bir kelime ile sorgulanabilir hale getirir.

### View Oluşturma ve Çağırma

```sql
-- View Oluşturma
CREATE VIEW satis_raporu AS
SELECT m.isim, SUM(s.tutar) as toplam_tutar
FROM musteriler m
JOIN siparisler s ON m.id = s.musteri_id
GROUP BY m.isim;

-- View Kullanma (Sanki normal tabloymuş gibi)
SELECT * FROM satis_raporu WHERE toplam_tutar > 5000;
```

### View Silme
```sql
DROP VIEW satis_raporu;
```

---

## 2. CTE (Common Table Expressions) ve WITH Kullanımı

CTE, tıpkı View'ler gibi sanal tablolardır, ancak **yalnızca sorgunun çalıştığı an yaşarlar** ve sorgu bitince kaybolurlar. Karmaşık alt sorgular (Subquery) yazmak yerine `WITH` ifadesi ile CTE kullanmak, kodun okunabilirliğini muazzam ölçüde artırır.

### Subquery (Eski Yöntem) vs CTE (Modern Yöntem)

```sql
-- CTE Kullanımı (Çok daha okunabilir)
WITH aktif_musteriler AS (
    SELECT id, isim 
    FROM musteriler 
    WHERE durum = 'Aktif'
),
yuksek_siparisler AS (
    SELECT musteri_id, tutar 
    FROM siparisler 
    WHERE tutar > 1000
)
SELECT a.isim, y.tutar
FROM aktif_musteriler a
JOIN yuksek_siparisler y ON a.id = y.musteri_id;
```
*(Bu yapı sayesinde, karmaşık sorguları önce küçük parçalara (aktif_musteriler, yuksek_siparisler) ayırıp, en sonda temiz bir şekilde birleştirebiliriz).*

---

## 3. Window Functions (Analitik Fonksiyonlar)

Klasik bir `GROUP BY` işlemi uygulandığında satırlar gruplanarak tek bir satıra indirgenir (sayısal veriler kaybolur). Ancak **Window Functions**, verileri gruplarken orijinal satırları kaybetmeden yanlarına analitik hesaplamalar eklemenizi sağlar.

Window fonksiyonları her zaman `OVER()` anahtar kelimesi ile kullanılır.

### GROUP BY ile Window Function Farkı

**Örnek:** Her departmanın ortalama maaşını, çalışanların kendi maaşlarının hemen yanına yazdıralım.

```sql
SELECT 
    isim, 
    departman_adi, 
    maas,
    -- Her satır için o departmanın ortalamasını hesaplar, ancak satırı birleştirmez!
    AVG(maas) OVER(PARTITION BY departman_adi) as departman_ortalamasi
FROM calisanlar;
```
*(Buradaki `PARTITION BY` ifadesi, Window Function içindeki `GROUP BY` gibidir).*

---

## 4. En Sık Kullanılan Window Fonksiyonları

### ROW_NUMBER() - Sıra Numarası Verme
Her satıra bir numara verir. `ORDER BY` ile kullanılması zorunludur.

```sql
-- Maaşı en yüksekten en düşüğe doğru sıralayarak numara verme
SELECT 
    isim, 
    maas,
    ROW_NUMBER() OVER(ORDER BY maas DESC) as siralama
FROM calisanlar;
```

### RANK() ve DENSE_RANK() - Derecelendirme
- `RANK()`: Eşit değerlere aynı sırayı verir (Örn: 1, 2, 2, 4) (3. sırayı atlar).
- `DENSE_RANK()`: Eşit değerlere aynı sırayı verir ama sıra atlamaz (Örn: 1, 2, 2, 3).

```sql
SELECT 
    isim, 
    maas,
    RANK() OVER(ORDER BY maas DESC) as normal_rank,
    DENSE_RANK() OVER(ORDER BY maas DESC) as yogun_rank
FROM calisanlar;
```

### LEAD() ve LAG() - Önceki/Sonraki Satıra Erişme
Özellikle tarih bazlı veri analizinde bir önceki günü veya bir sonraki günü mevcut satıra getirmek için kullanılır.

- `LAG()`: Bir önceki satırı getirir.
- `LEAD()`: Bir sonraki satırı getirir.

```sql
SELECT 
    satis_tarihi,
    gunluk_ciro,
    -- Bir önceki günün cirosunu aynı satıra yan sütun olarak çeker
    LAG(gunluk_ciro) OVER(ORDER BY satis_tarihi) as dünkü_ciro
FROM gunluk_satislar;
```

---

## Özet

- **VIEW (Sanal Tablo):** Karmaşık sorguları tek tablo gibi veritabanına kaydeder, güvenliği ve tekrar kullanılabilirliği artırır.
- **CTE (WITH):** Okuması zor, içi içe geçmiş alt sorguları yukarıdan aşağıya doğru okunabilir ve modüler bloklara (geçici tablolara) ayırır.
- **Window Functions (OVER, PARTITION BY):** `GROUP BY`'ın satır yutma (satırları tek satıra indirme) dezavantajını çözer. Satır detaylarını kaybetmeden gruplama, sıralama, hareketli ortalamalar veya önceki/sonraki kayıt analizleri (LAG/LEAD) yapmayı sağlar. Modern SQL'in en güçlü aracıdır.
