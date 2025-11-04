# SQL Temelleri - Bölüm 5: Veri Ekleme, Güncelleme ve Silme

## İçindekiler
1. INSERT - Veri Ekleme
2. UPDATE - Veri Güncelleme
3. DELETE - Veri Silme
4. Transaction Yönetimi
5. Güvenli Veri İşlemleri

---

## 1. INSERT - Veri Ekleme

INSERT komutu, tabloya yeni kayıt eklemek için kullanılır.

### Temel Sözdizimi

```sql
INSERT INTO tablo_adi (sütun1, sütun2, sütun3)
VALUES (değer1, değer2, değer3);
```

### Tek Kayıt Ekleme

```sql
INSERT INTO calisanlar (isim, soyad, departman_id, maas, ise_giris_tarihi)
VALUES ('Ahmet', 'Yılmaz', 1, 5000, '2024-01-15');
```

### Tüm Sütunlara Veri Ekleme

Tüm sütunlara veri eklerken sütun isimlerini yazmasanız da olur:

```sql
INSERT INTO calisanlar
VALUES (NULL, 'Ayşe', 'Kaya', 2, 6000, '2024-02-01');
```

**Uyarı**: Bu yöntem risklidir. Tablo yapısı değişirse hata verir. Sütun isimlerini belirtmek daha güvenlidir.

### Birden Fazla Kayıt Ekleme

```sql
INSERT INTO calisanlar (isim, soyad, departman_id, maas, ise_giris_tarihi)
VALUES 
    ('Mehmet', 'Demir', 1, 5500, '2024-03-10'),
    ('Zeynep', 'Ak', 3, 7000, '2024-03-15'),
    ('Can', 'Öz', 2, 4800, '2024-04-01');
```

### Belirli Sütunlara Veri Ekleme

```sql
INSERT INTO calisanlar (isim, soyad, departman_id)
VALUES ('Ali', 'Veli', 1);
```

Belirtilmeyen sütunlar NULL veya varsayılan değerlerini alır.

### Başka Tablodan Veri Ekleme

```sql
-- Geçici çalışanları kalıcı tabloya aktar
INSERT INTO calisanlar (isim, soyad, departman_id, maas)
SELECT isim, soyad, departman_id, maas
FROM gecici_calisanlar
WHERE durum = 'onaylı';
```

### AUTO_INCREMENT ile Çalışma

```sql
-- id sütunu AUTO_INCREMENT ise, NULL veya yazmayın
INSERT INTO calisanlar (isim, soyad, maas)
VALUES ('Fatma', 'Şahin', 6500);

-- Son eklenen kaydın ID'sini alma
SELECT LAST_INSERT_ID();  -- MySQL
```

---

## 2. UPDATE - Veri Güncelleme

UPDATE komutu, mevcut kayıtları güncellemek için kullanılır.

### Temel Sözdizimi

```sql
UPDATE tablo_adi
SET sütun1 = değer1, sütun2 = değer2
WHERE koşul;
```

### Tek Kayıt Güncelleme

```sql
UPDATE calisanlar
SET maas = 6000
WHERE id = 5;
```

### Birden Fazla Sütun Güncelleme

```sql
UPDATE calisanlar
SET 
    maas = 7500,
    departman_id = 2,
    guncelleme_tarihi = NOW()
WHERE id = 10;
```

### Koşullu Güncelleme

```sql
-- IT departmanındaki tüm çalışanlara %10 zam
UPDATE calisanlar
SET maas = maas * 1.10
WHERE departman_id = 1;
```

### Hesaplama ile Güncelleme

```sql
-- Maaşı 5000'den az olanlara 500 TL zam
UPDATE calisanlar
SET maas = maas + 500
WHERE maas < 5000;
```

### Birden Fazla Koşul

```sql
UPDATE calisanlar
SET maas = maas * 1.15
WHERE departman_id IN (1, 2, 3)
  AND ise_giris_tarihi < '2023-01-01'
  AND maas < 10000;
```

### CASE ile Koşullu Güncelleme

```sql
UPDATE calisanlar
SET maas = CASE
    WHEN departman_id = 1 THEN maas * 1.10
    WHEN departman_id = 2 THEN maas * 1.15
    WHEN departman_id = 3 THEN maas * 1.20
    ELSE maas
END
WHERE ise_giris_tarihi < '2023-01-01';
```

### JOIN ile Güncelleme

```sql
UPDATE calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id
SET c.maas = c.maas * 1.10
WHERE d.departman_adi = 'IT';
```

### ⚠️ KRİTİK UYARI: WHERE Kullanımı

```sql
-- ❌ TEHLİKELİ: WHERE yoksa TÜM kayıtlar güncellenir!
UPDATE calisanlar
SET maas = 5000;  -- Tüm maaşlar 5000 olur!

-- ✅ GÜVENLİ: Her zaman WHERE kullanın
UPDATE calisanlar
SET maas = 5000
WHERE id = 15;
```

---

## 3. DELETE - Veri Silme

DELETE komutu, kayıtları silmek için kullanılır.

### Temel Sözdizimi

```sql
DELETE FROM tablo_adi
WHERE koşul;
```

### Tek Kayıt Silme

```sql
DELETE FROM calisanlar
WHERE id = 25;
```

### Koşula Göre Silme

```sql
-- Maaşı 3000'den az olan çalışanları sil
DELETE FROM calisanlar
WHERE maas < 3000;
```

### Birden Fazla Koşul

```sql
DELETE FROM calisanlar
WHERE departman_id = 5
  AND ise_giris_tarihi < '2020-01-01'
  AND maas < 4000;
```

### JOIN ile Silme

```sql
-- MySQL Sözdizimi
DELETE c
FROM calisanlar c
INNER JOIN departmanlar d ON c.departman_id = d.id
WHERE d.departman_adi = 'Geçici Proje';
```

### Alt Sorgu ile Silme

```sql
DELETE FROM calisanlar
WHERE departman_id IN (
    SELECT id FROM departmanlar WHERE kapali = 1
);
```

### ⚠️ KRİTİK UYARI: WHERE Kullanımı

```sql
-- ❌ TEHLİKELİ: WHERE yoksa TÜM kayıtlar silinir!
DELETE FROM calisanlar;  -- Tüm çalışanlar silinir!

-- ✅ GÜVENLİ: Her zaman WHERE kullanın
DELETE FROM calisanlar
WHERE id = 50;
```

### DELETE vs TRUNCATE

```sql
-- DELETE: Koşullu silme, geri alınabilir (transaction içinde)
DELETE FROM calisanlar WHERE departman_id = 3;

-- TRUNCATE: Tüm tabloyu temizler, çok hızlı, geri alınamaz
TRUNCATE TABLE calisanlar;
```

**TRUNCATE özellikleri:**
- Çok daha hızlıdır
- AUTO_INCREMENT sayacını sıfırlar
- WHERE koşulu kullanılamaz
- Transaction içinde geri alınamaz (bazı veritabanlarında)
- Trigger'ları tetiklemez

---

## 4. Transaction Yönetimi

Transaction, bir grup SQL komutunun tek bir birim olarak yürütülmesidir. Ya hepsi başarılı olur, ya hiçbiri olmaz.

### Transaction Nedir?

Transaction, ACID özelliklerine sahip olmalıdır:
- **A**tomicity (Bölünmezlik): Ya hepsi olur, ya hiçbiri
- **C**onsistency (Tutarlılık): Veri tutarlı kalır
- **I**solation (Yalıtım): Eş zamanlı işlemler birbirini etkilemez
- **D**urability (Kalıcılık): Onaylanan değişiklikler kalıcıdır

### Temel Transaction Komutları

```sql
-- Transaction başlat
START TRANSACTION;
-- veya
BEGIN;

-- İşlemleri yap
INSERT INTO ...
UPDATE ...
DELETE FROM ...

-- Başarılıysa onayla
COMMIT;

-- Hata varsa geri al
ROLLBACK;
```

### Örnek: Para Transferi

```sql
START TRANSACTION;

-- Ahmet'in hesabından 1000 TL çıkar
UPDATE hesaplar
SET bakiye = bakiye - 1000
WHERE musteri_id = 1;

-- Ayşe'nin hesabına 1000 TL ekle
UPDATE hesaplar
SET bakiye = bakiye + 1000
WHERE musteri_id = 2;

-- Her şey başarılıysa onayla
COMMIT;
```

Eğer ikinci UPDATE hata verirse, tüm işlem geri alınır:

```sql
START TRANSACTION;

UPDATE hesaplar SET bakiye = bakiye - 1000 WHERE musteri_id = 1;

-- Hata oluştu!
UPDATE hesaplar SET bakiye = bakiye + 1000 WHERE musteri_id_yanlış = 2;

-- Tüm işlemi geri al
ROLLBACK;
```

### SAVEPOINT Kullanımı

```sql
START TRANSACTION;

INSERT INTO siparisler (musteri_id, tutar) VALUES (1, 500);
SAVEPOINT siparis_sonrasi;

INSERT INTO siparis_detaylari (siparis_id, urun_id) VALUES (1, 10);
SAVEPOINT detay_sonrasi;

INSERT INTO odeme (siparis_id, tutar) VALUES (1, 500);

-- Sadece son INSERT'i geri al
ROLLBACK TO detay_sonrasi;

-- Veya tüm transaction'ı geri al
-- ROLLBACK;

COMMIT;
```

---

## 5. Güvenli Veri İşlemleri

### 1. WHERE Koşulu Kontrolü

```sql
-- Güncellemeden önce etkilenecek kayıtları kontrol et
SELECT * FROM calisanlar WHERE departman_id = 5;

-- Eğer doğruysa güncelle
UPDATE calisanlar
SET maas = maas * 1.10
WHERE departman_id = 5;
```

### 2. LIMIT ile Koruma (MySQL)

```sql
-- Maksimum 1 kayıt sil
DELETE FROM calisanlar
WHERE email = 'ahmet@example.com'
LIMIT 1;
```

### 3. Yedekleme ile Güncelleme

```sql
-- Önce yedek tablo oluştur
CREATE TABLE calisanlar_yedek AS
SELECT * FROM calisanlar;

-- Sonra güncelle
UPDATE calisanlar SET maas = maas * 1.10 WHERE departman_id = 1;

-- Problem varsa geri yükle
-- DELETE FROM calisanlar;
-- INSERT INTO calisanlar SELECT * FROM calisanlar_yedek;
```

### 4. Transaction ile Güvenli İşlem

```sql
START TRANSACTION;

UPDATE calisanlar SET maas = maas * 1.10;

-- Kontrol et
SELECT COUNT(*), AVG(maas) FROM calisanlar;

-- Sorun varsa ROLLBACK, sorun yoksa COMMIT
COMMIT;
```

### 5. Soft Delete (Yumuşak Silme)

Kayıtları gerçekten silmek yerine, silinmiş olarak işaretle:

```sql
-- Silinmiş sütunu ekle
ALTER TABLE calisanlar ADD COLUMN silinmis BOOLEAN DEFAULT FALSE;

-- Silme yerine işaretle
UPDATE calisanlar
SET silinmis = TRUE, silme_tarihi = NOW()
WHERE id = 10;

-- Sorgulamada silinmemişleri getir
SELECT * FROM calisanlar WHERE silinmis = FALSE;
```

---

## Pratik Örnekler

### Örnek 1: Toplu Veri Aktarımı

```sql
START TRANSACTION;

-- Eski kayıtları arşiv tablosuna taşı
INSERT INTO calisanlar_arsiv
SELECT * FROM calisanlar
WHERE ise_giris_tarihi < '2020-01-01';

-- Eski kayıtları aktif tablodan sil
DELETE FROM calisanlar
WHERE ise_giris_tarihi < '2020-01-01';

COMMIT;
```

### Örnek 2: Koşullu Güncelleme

```sql
UPDATE urunler
SET 
    fiyat = CASE
        WHEN stok > 100 THEN fiyat * 0.90  -- %10 indirim
        WHEN stok > 50 THEN fiyat * 0.95   -- %5 indirim
        ELSE fiyat
    END,
    guncelleme_tarihi = NOW()
WHERE kategori = 'Elektronik';
```

---

## Alıştırmalar

1. Yeni bir departman ekleyin ve bu departmana 3 çalışan atayın
2. IT departmanındaki tüm çalışanlara %15 zam yapın
3. 2020'den önce işe başlayan ve maaşı 6000'den az olan çalışanları bulup maaşlarını güncelleyin
4. Hiç siparişi olmayan müşterileri silin
5. Transaction kullanarak bir ürün satışı gerçekleştirin (stok düşür, sipariş ekle, ödeme kaydet)

---

## Özet

Bu bölümde INSERT ile veri eklemeyi, UPDATE ile güncellemeyi, DELETE ile silmeyi öğrendik. Transaction yönetimi ile veri tutarlılığını sağlamayı ve güvenli veri işlemleri için best practice'leri gördük. WHERE koşulu kullanımı ve transaction yönetimi veri güvenliği için kritiktir.

**Sonraki Bölüm**: Tablo Oluşturma ve Veri Tipleri (CREATE TABLE, ALTER TABLE, DROP TABLE)
