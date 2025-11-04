# SQL Temelleri - Bölüm 1: Giriş ve Temel Kavramlar

## İçindekiler
1. SQL Nedir?
2. Veritabanı Kavramları
3. SQL Dil Kategorileri
4. İlk SQL Sorguları

---

## 1. SQL Nedir?

**SQL (Structured Query Language)**, veritabanlarını yönetmek ve verilerle etkileşim kurmak için kullanılan standart bir programlama dilidir.

### SQL'in Temel Özellikleri

- **Deklaratif Dil**: Ne istediğinizi belirtirsiniz, nasıl yapılacağını değil
- **Standart**: ANSI/ISO standartlarına sahip
- **Güçlü**: Karmaşık veri işlemlerini basit komutlarla yapabilir
- **Yaygın**: Neredeyse tüm veritabanı sistemlerinde kullanılır

### Popüler SQL Veritabanları

- **MySQL** - Açık kaynak, web uygulamaları için popüler
- **PostgreSQL** - Açık kaynak, gelişmiş özellikler
- **SQL Server** - Microsoft tarafından geliştirilmiş
- **Oracle** - Kurumsal çözümler için
- **SQLite** - Hafif, gömülü sistemler için

---

## 2. Veritabanı Kavramları

### Veritabanı (Database)
İlişkili verilerin organize bir şekilde saklandığı yapıdır.

### Tablo (Table)
Verilerin satır ve sütunlardan oluşan yapıda saklandığı birimdir.

```
Örnek: Çalışanlar Tablosu
┌────┬──────────┬─────────┬─────────┐
│ ID │   İsim   │  Soyad  │  Maaş   │
├────┼──────────┼─────────┼─────────┤
│ 1  │  Ahmet   │  Yılmaz │  5000   │
│ 2  │  Ayşe    │  Kaya   │  6000   │
│ 3  │  Mehmet  │  Demir  │  5500   │
└────┴──────────┴─────────┴─────────┘
```

### Sütun (Column/Field)
Tablodaki her bir veri kategorisidir (İsim, Soyad, Maaş gibi).

### Satır (Row/Record)
Tablodaki her bir veri kaydıdır (Bir çalışanın tüm bilgileri gibi).

### Primary Key (Birincil Anahtar)
Her satırı benzersiz şekilde tanımlayan sütun veya sütun grubudur.

### Foreign Key (Yabancı Anahtar)
Bir tablodaki sütunun başka bir tablonun primary key'ine referans vermesidir.

---

## 3. SQL Dil Kategorileri

SQL komutları beş ana kategoriye ayrılır:

### DDL (Data Definition Language) - Veri Tanımlama Dili
Veritabanı yapısını oluşturma ve değiştirme komutları

- `CREATE` - Yeni veritabanı nesnesi oluşturur
- `ALTER` - Mevcut yapıyı değiştirir
- `DROP` - Veritabanı nesnesini siler
- `TRUNCATE` - Tablodaki tüm verileri siler

### DML (Data Manipulation Language) - Veri İşleme Dili
Verileri ekleme, güncelleme, silme komutları

- `INSERT` - Yeni veri ekler
- `UPDATE` - Mevcut veriyi günceller
- `DELETE` - Veri siler

### DQL (Data Query Language) - Veri Sorgulama Dili
Verileri sorgulama komutu

- `SELECT` - Veri sorgular ve getirir

### DCL (Data Control Language) - Veri Kontrol Dili
Yetkilendirme komutları

- `GRANT` - Yetki verir
- `REVOKE` - Yetki geri alır

### TCL (Transaction Control Language) - İşlem Kontrol Dili
Veritabanı işlemlerini yönetme

- `COMMIT` - Değişiklikleri kalıcı yapar
- `ROLLBACK` - Değişiklikleri geri alır
- `SAVEPOINT` - İşlem içinde geri dönüş noktası oluşturur

---

## 4. İlk SQL Sorguları

### Veritabanı Oluşturma

```sql
CREATE DATABASE sirket_db;
```

### Veritabanını Kullanma

```sql
USE sirket_db;
```

### Basit Tablo Oluşturma

```sql
CREATE TABLE calisanlar (
    id INT PRIMARY KEY,
    isim VARCHAR(50),
    soyad VARCHAR(50),
    maas DECIMAL(10, 2)
);
```

### Tüm Verileri Görüntüleme

```sql
SELECT * FROM calisanlar;
```

### Belirli Sütunları Görüntüleme

```sql
SELECT isim, soyad FROM calisanlar;
```

---

## Alıştırmalar

1. `okul_db` adında bir veritabanı oluşturun
2. Bu veritabanında `ogrenciler` adında bir tablo oluşturun (id, ad, soyad, sinif sütunları olsun)
3. Tablodaki tüm verileri listeleyin

---

## Özet

Bu bölümde SQL'in ne olduğunu, temel veritabanı kavramlarını ve SQL komut kategorilerini öğrendik. Bir sonraki bölümde SELECT sorguları ve veri filtreleme konularını detaylı inceleyeceğiz.

**Sonraki Bölüm**: SELECT Sorguları ve Veri Filtreleme
