# SQL Temelleri - Bölüm 6: Tablo Oluşturma, Değiştirme ve Veri Tipleri

## İçindekiler
1. Veri Tipleri
2. CREATE TABLE - Tablo Oluşturma
3. Kısıtlamalar (Constraints)
4. ALTER TABLE - Tablo Değiştirme
5. DROP TABLE - Tablo Silme
6. İndeksler

---

## 1. Veri Tipleri

SQL'de her sütun belirli bir veri tipine sahip olmalıdır.

### Sayısal Veri Tipleri

#### Tam Sayılar

| Tip | Boyut | Aralık | Kullanım |
|-----|-------|--------|----------|
| `TINYINT` | 1 byte | -128 to 127 | Çok küçük sayılar |
| `SMALLINT` | 2 byte | -32,768 to 32,767 | Küçük sayılar |
| `MEDIUMINT` | 3 byte | -8,388,608 to 8,388,607 | Orta sayılar |
| `INT` | 4 byte | -2 milyar to 2 milyar | Standart sayılar |
| `BIGINT` | 8 byte | Çok büyük sayılar | Büyük veriler |

```sql
CREATE TABLE sayilar (
    kucuk_sayi TINYINT,
    standart_sayi INT,
    buyuk_sayi BIGINT
);
```

**UNSIGNED**: Negatif değerlere izin vermez, pozitif aralığı ikiye katlar.

```sql
id INT UNSIGNED  -- 0 to 4,294,967,295
```

#### Ondalıklı Sayılar

| Tip | Açıklama | Örnek |
|-----|----------|-------|
| `DECIMAL(p,s)` | Sabit hassasiyet | `DECIMAL(10,2)` → 99999999.99 |
| `NUMERIC(p,s)` | DECIMAL ile aynı | `NUMERIC(8,2)` |
| `FLOAT` | Yaklaşık, 4 byte | Bilimsel hesaplar |
| `DOUBLE` | Yaklaşık, 8 byte | Yüksek hassasiyet |

```sql
CREATE TABLE finansal (
    fiyat DECIMAL(10,2),      -- 12345678.90
    oran FLOAT,                -- 0.125 (yaklaşık)
    hassas_deger DOUBLE        -- Çok hassas
);
```

**Önemli**: Para hesapları için DECIMAL kullanın, FLOAT/DOUBLE kullanmayın!

### Metin Veri Tipleri

| Tip | Maksimum Boyut | Kullanım |
|-----|----------------|----------|
| `CHAR(n)` | 255 karakter | Sabit uzunluk |
| `VARCHAR(n)` | 65,535 karakter | Değişken uzunluk |
| `TEXT` | 65,535 karakter | Uzun metinler |
| `MEDIUMTEXT` | 16 MB | Çok uzun metinler |
| `LONGTEXT` | 4 GB | Devasa metinler |

```sql
CREATE TABLE metinler (
    kod CHAR(5),              -- Tam 5 karakter: "TR001"
    isim VARCHAR(100),        -- Maksimum 100 karakter
    aciklama TEXT,            -- Uzun açıklama
    icerik LONGTEXT           -- Makale içeriği
);
```

**CHAR vs VARCHAR**:
- `CHAR(10)`: Her zaman 10 byte kullanır, "Ali" → "Ali       "
- `VARCHAR(10)`: Kullanıldığı kadar yer tutar, "Ali" → "Ali" (3 byte)

### Tarih ve Zaman Tipleri

| Tip | Format | Aralık | Örnek |
|-----|--------|--------|-------|
| `DATE` | YYYY-MM-DD | 1000-01-01 to 9999-12-31 | 2024-03-15 |
| `TIME` | HH:MM:SS | -838:59:59 to 838:59:59 | 14:30:00 |
| `DATETIME` | YYYY-MM-DD HH:MM:SS | 1000-01-01 to 9999-12-31 | 2024-03-15 14:30:00 |
| `TIMESTAMP` | YYYY-MM-DD HH:MM:SS | 1970-01-01 to 2038-01-19 | 2024-03-15 14:30:00 |
| `YEAR` | YYYY | 1901 to 2155 | 2024 |

```sql
CREATE TABLE zamanlar (
    dogum_tarihi DATE,
    giris_saati TIME,
    kayit_zamani DATETIME,
    guncelleme_zamani TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    yil YEAR
);
```

**DATETIME vs TIMESTAMP**:
- `DATETIME`: Zaman diliminden bağımsız
- `TIMESTAMP`: UTC'de saklanır, otomatik güncellenir

### Boolean Veri Tipi

```sql
CREATE TABLE ayarlar (
    aktif BOOLEAN,           -- MySQL'de TINYINT(1) olarak saklanır
    onaylandi BOOL           -- 0 = FALSE, 1 = TRUE
);

-- Kullanım
INSERT INTO ayarlar VALUES (TRUE, FALSE);
SELECT * FROM ayarlar WHERE aktif = 1;
```

### Binary Veri Tipleri

| Tip | Maksimum Boyut | Kullanım |
|-----|----------------|----------|
| `BINARY(n)` | 255 byte | Sabit binary |
| `VARBINARY(n)` | 65,535 byte | Değişken binary |
| `BLOB` | 65,535 byte | Binary dosyalar |
| `MEDIUMBLOB` | 16 MB | Orta dosyalar |
| `LONGBLOB` | 4 GB | Büyük dosyalar |

```sql
CREATE TABLE dosyalar (
    hash BINARY(32),         -- MD5 hash
    resim BLOB,              -- Küçük resim
    video LONGBLOB           -- Video dosyası
);
```

### JSON Veri Tipi (MySQL 5.7+)

```sql
CREATE TABLE ayarlar (
    id INT PRIMARY KEY,
    config JSON
);

INSERT INTO ayarlar VALUES (1, '{"tema": "dark", "dil": "tr"}');

SELECT JSON_EXTRACT(config, '$.tema') FROM ayarlar;
```

---

## 2. CREATE TABLE - Tablo Oluşturma

### Temel Sözdizimi

```sql
CREATE TABLE tablo_adi (
    sütun1 veri_tipi [kısıtlamalar],
    sütun2 veri_tipi [kısıtlamalar],
    ...
);
```

### Basit Örnek

```sql
CREATE TABLE calisanlar (
    id INT,
    isim VARCHAR(50),
    soyad VARCHAR(50),
    maas DECIMAL(10,2)
);
```

### Detaylı Örnek

```sql
CREATE TABLE urunler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    urun_kodu VARCHAR(20) UNIQUE NOT NULL,
    urun_adi VARCHAR(100) NOT NULL,
    aciklama TEXT,
    fiyat DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stok INT UNSIGNED DEFAULT 0,
    kategori_id INT,
    aktif BOOLEAN DEFAULT TRUE,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tablo Varsa Oluşturma

```sql
CREATE TABLE IF NOT EXISTS musteriler (
    id INT PRIMARY KEY,
    isim VARCHAR(100)
);
```

### Başka Tablodan Tablo Oluşturma

```sql
-- Veri ile birlikte
CREATE TABLE calisanlar_yedek AS
SELECT * FROM calisanlar;

-- Sadece yapı (veri olmadan)
CREATE TABLE calisanlar_yeni LIKE calisanlar;
```

---

## 3. Kısıtlamalar (Constraints)

Kısıtlamalar, tabloya eklenen verilerin geçerliliğini sağlar.

### PRIMARY KEY (Birincil Anahtar)

Her satırı benzersiz şekilde tanımlar.

```sql
CREATE TABLE ogrenciler (
    id INT PRIMARY KEY,
    -- veya
    ogrenci_no VARCHAR(10) PRIMARY KEY
);

-- Çok sütunlu primary key
CREATE TABLE sinav_notlari (
    ogrenci_id INT,
    ders_id INT,
    not DECIMAL(5,2),
    PRIMARY KEY (ogrenci_id, ders_id)
);
```

### FOREIGN KEY (Yabancı Anahtar)

Tablolar arası ilişki kurar.

```sql
CREATE TABLE siparisler (
    id INT PRIMARY KEY,
    musteri_id INT,
    tutar DECIMAL(10,2),
    FOREIGN KEY (musteri_id) REFERENCES musteriler(id)
);

-- Silme ve güncelleme davranışları
CREATE TABLE siparisler (
    id INT PRIMARY KEY,
    musteri_id INT,
    FOREIGN KEY (musteri_id) REFERENCES musteriler(id)
        ON DELETE CASCADE        -- Müşteri silinirse siparişler de silinir
        ON UPDATE CASCADE        -- Müşteri ID değişirse sipariş de değişir
);
```

**ON DELETE ve ON UPDATE Seçenekleri**:
- `CASCADE`: Ana kayıt değişirse/silinirse bağlı kayıt da değişir/silinir
- `SET NULL`: Ana kayıt silinirse bağlı kayıt NULL olur
- `RESTRICT`: Ana kayıt bağlı kayıt varsa silinemez
- `NO ACTION`: RESTRICT ile aynı

### UNIQUE (Benzersiz)

Sütundaki değerlerin benzersiz olmasını sağlar.

```sql
CREATE TABLE kullanicilar (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    kullanici_adi VARCHAR(50) UNIQUE
);

-- Çok sütunlu unique
CREATE TABLE kayitlar (
    urun_id INT,
    tarih DATE,
    UNIQUE (urun_id, tarih)
);
```

### NOT NULL

Sütunun boş geçilemeyeceğini belirtir.

```sql
CREATE TABLE uyeler (
    id INT PRIMARY KEY,
    isim VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefon VARCHAR(15)  -- NULL olabilir
);
```

### DEFAULT

Varsayılan değer belirtir.

```sql
CREATE TABLE siparisler (
    id INT PRIMARY KEY,
    durum VARCHAR(20) DEFAULT 'Beklemede',
    siparis_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    miktar INT DEFAULT 1
);
```

### CHECK

Değer aralığı kontrolü yapar.

```sql
CREATE TABLE urunler (
    id INT PRIMARY KEY,
    fiyat DECIMAL(10,2) CHECK (fiyat >= 0),
    stok INT CHECK (stok >= 0),
    indirim_orani DECIMAL(5,2) CHECK (indirim_orani BETWEEN 0 AND 100)
);

-- İsimli constraint
CREATE TABLE calisanlar (
    yas INT,
    CONSTRAINT yas_kontrol CHECK (yas >= 18 AND yas <= 65)
);
```

### AUTO_INCREMENT

Otomatik artan sayı üretir.

```sql
CREATE TABLE urunler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    urun_adi VARCHAR(100)
);

-- Başlangıç değeri belirleme
ALTER TABLE urunler AUTO_INCREMENT = 1000;
```

---

## 4. ALTER TABLE - Tablo Değiştirme

### Sütun Ekleme

```sql
ALTER TABLE calisanlar
ADD COLUMN email VARCHAR(100);

-- Birden fazla sütun
ALTER TABLE calisanlar
ADD COLUMN telefon VARCHAR(15),
ADD COLUMN adres TEXT;

-- Belirli pozisyona ekleme
ALTER TABLE calisanlar
ADD COLUMN yas INT AFTER soyad;

ALTER TABLE calisanlar
ADD COLUMN id INT FIRST;
```

### Sütun Silme

```sql
ALTER TABLE calisanlar
DROP COLUMN email;

-- Birden fazla sütun
ALTER TABLE calisanlar
DROP COLUMN telefon,
DROP COLUMN adres;
```

### Sütun Değiştirme

```sql
-- Veri tipini değiştirme
ALTER TABLE calisanlar
MODIFY COLUMN maas DECIMAL(12,2);

-- İsim ve veri tipini değiştirme
ALTER TABLE calisanlar
CHANGE COLUMN isim ad VARCHAR(100);

-- Constraint ekleme
ALTER TABLE calisanlar
MODIFY COLUMN email VARCHAR(100) NOT NULL UNIQUE;
```

### Primary Key Ekleme/Silme

```sql
-- Ekleme
ALTER TABLE calisanlar
ADD PRIMARY KEY (id);

-- Silme
ALTER TABLE calisanlar
DROP PRIMARY KEY;
```

### Foreign Key Ekleme/Silme

```sql
-- Ekleme
ALTER TABLE siparisler
ADD CONSTRAINT fk_musteri
FOREIGN KEY (musteri_id) REFERENCES musteriler(id);

-- Silme
ALTER TABLE siparisler
DROP FOREIGN KEY fk_musteri;
```

### Tablo İsmini Değiştirme

```sql
ALTER TABLE calisanlar
RENAME TO personel;

-- veya
RENAME TABLE calisanlar TO personel;
```

---

## 5. DROP TABLE - Tablo Silme

### Tablo Silme

```sql
DROP TABLE calisanlar;

-- Tablo varsa sil (hata vermez)
DROP TABLE IF EXISTS calisanlar;

-- Birden fazla tablo
DROP TABLE calisanlar, departmanlar, projeler;
```

### TRUNCATE - Tabloyu Temizleme

```sql
-- Tüm verileri sil, yapıyı koru
TRUNCATE TABLE calisanlar;
```

**DROP vs DELETE vs TRUNCATE**:
- `DROP`: Tabloyu tamamen siler
- `DELETE`: Satırları siler, yapı kalır, WHERE kullanılabilir, geri alınabilir
- `TRUNCATE`: Tüm satırları siler, çok hızlı, geri alınamaz

---

## 6. İndeksler

İndeksler, sorguları hızlandırır ancak ekleme/güncelleme işlemlerini yavaşlatır.

### İndeks Oluşturma

```sql
-- Basit indeks
CREATE INDEX idx_isim ON calisanlar(isim);

-- Çok sütunlu indeks
CREATE INDEX idx_isim_soyad ON calisanlar(isim, soyad);

-- Unique indeks
CREATE UNIQUE INDEX idx_email ON kullanicilar(email);
```

### İndeks Silme

```sql
DROP INDEX idx_isim ON calisanlar;
```

### İndeks Kontrolü

```sql
SHOW INDEX FROM calisanlar;
```

### İndeks Kullanım İpuçları

1. **WHERE sorgularında sık kullanılan sütunlara indeks ekleyin**
2. **JOIN işlemlerinde kullanılan sütunlara indeks ekleyin**
3. **Küçük tablolara indeks eklemeyin**
4. **Çok fazla indeks eklemeyin** (ekleme/güncelleme yavaşlar)
5. **PRIMARY KEY ve UNIQUE otomatik indeks oluşturur**

---

## Kapsamlı Örnek: E-Ticaret Veritabanı

```sql
-- Kategoriler
CREATE TABLE kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kategori_adi VARCHAR(50) NOT NULL UNIQUE,
    aciklama TEXT,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ürünler
CREATE TABLE urunler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    urun_kodu VARCHAR(20) UNIQUE NOT NULL,
    urun_adi VARCHAR(100) NOT NULL,
    aciklama TEXT,
    fiyat DECIMAL(10,2) NOT NULL CHECK (fiyat >= 0),
    stok INT UNSIGNED DEFAULT 0,
    kategori_id INT NOT NULL,
    aktif BOOLEAN DEFAULT TRUE,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    guncelleme_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (kategori_id) REFERENCES kategoriler(id) ON DELETE RESTRICT,
    INDEX idx_kategori (kategori_id),
    INDEX idx_urun_adi (urun_adi)
);

-- Müşteriler
CREATE TABLE musteriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(50) NOT NULL,
    soyad VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefon VARCHAR(15),
    adres TEXT,
    sehir VARCHAR(50),
    kayit_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Siparişler
CREATE TABLE siparisler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    musteri_id INT NOT NULL,
    siparis_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    durum ENUM('Beklemede', 'Hazirlaniyor', 'Kargoda', 'Teslim Edildi') DEFAULT 'Beklemede',
    toplam_tutar DECIMAL(10,2) NOT NULL CHECK (toplam_tutar >= 0),
    FOREIGN KEY (musteri_id) REFERENCES musteriler(id) ON DELETE RESTRICT,
    INDEX idx_musteri (musteri_id),
    INDEX idx_tarih (siparis_tarihi)
);

-- Sipariş Detayları
CREATE TABLE siparis_detaylari (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siparis_id INT NOT NULL,
    urun_id INT NOT NULL,
    miktar INT NOT NULL CHECK (miktar > 0),
    birim_fiyat DECIMAL(10,2) NOT NULL,
    ara_toplam DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (siparis_id) REFERENCES siparisler(id) ON DELETE CASCADE,
    FOREIGN KEY (urun_id) REFERENCES urunler(id) ON DELETE RESTRICT,
    INDEX idx_siparis (siparis_id)
);
```

---

## Özet

Bu bölümde veri tiplerini, tablo oluşturma ve değiştirme işlemlerini, kısıtlamaları ve indeksleri öğrendik. Doğru veri tipi ve kısıtlama seçimi, veritabanı performansı ve veri bütünlüğü için kritiktir.

**Tebrikler!** SQL temellerini tamamladınız. Artık veritabanı tasarlayabilir, sorgu yazabilir ve veri işlemleri gerçekleştirebilirsiniz.