# Bölüm 09: Dosya Okuma/Yazma (I/O) ve JSON ile Çalışmak

Yazılımda bir değişkene kaydettiğiniz veriler (Örn: `oyuncu_puani = 500`) bilgisayarın Geçici Belleğinde (RAM) durur. Fişi çektiğiniz an (Program kapandığında) her şey SİLİNİR (Uçar). 
Veriyi kalıcı (Persistent) hale getirmek için onu Harddiske (Veritabanı, Txt, JSON, Excel) "Fiziksel Bir Dosya Olarak" KAZIMANIZ gerekir.

## 1. Standart Dosya Açma Yöntemi ve Tehlikesi
```python
# "w" (Write/Yazma) modu. Dosya yoksa yaratır, varsa İÇİNİ SİLİP üstüne yazar!
# "a" (Append/Ekleme) modu. İçini silmez, en alt satırdan ekleme yapmaya devam eder.
# "r" (Read/Okuma) modu. 

dosya = open("notlarim.txt", "w", encoding="utf-8")
dosya.write("Merhaba Dünya!
")
# DİKKAT! DOSYAYI KAPATMAYI UNUTTUNUZ! 
# Program çökerse veya bitse bile o dosya RAM'de askıda (Kilitli) kalır. Başka programlar o dosyayı silemez.
```

## 2. Profesyonel Yol: "With Open" (Context Manager)
Python'daki `with` bloğu (Bağlam Yöneticisi), "Bu bloğun içindeki işler bittiğinde, program çökse bile arka planda dosya bağlantılarını OTOMATİK OLARAK KAPAT (Close)" talimatını barındırır. Asla `close()` yazmanıza gerek kalmaz. Sektör standardıdır.

```python
with open("notlarim.txt", "a", encoding="utf-8") as dosya:
    dosya.write("Ben ikinci satırım.
")
    # Kodlar (Girinti) bittiği an, dosya güvenle kapatıldı.
```

## 3. JSON İşlemleri (İnternetin Dili)
Farklı iki dilin (Örn: Sizin yazdığınız Python kodu ile Cep Telefonundaki Java kodunun) birbiriyle konuşurken (Veri aktarırken) anlaştıkları Ortak Dilin (İngilizcenin) adı **JSON** (JavaScript Object Notation)'dır. Görüntüsü Python'daki Sözlüklere (Dictionary) çok benzer.

Python, JSON ile konuşmak için harika bir dahili (Built-in) kütüphane ile gelir.

**Veriyi JSON Dosyasına Yazmak (DUMP):**
```python
import json

kullanici = {
    "isim": "Zeynep",
    "yas": 28,
    "yetenekler": ["Python", "SQL", "Git"]
}

# Python Sözlüğünü -> JSON metnine çevirip dosyaya yaz (Dump/Boşalt)
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(kullanici, f, ensure_ascii=False, indent=4) 
    # indent=4 : Dosyanın içindeki metni dümdüz yan yana basma, 4 boşluk bırakarak ŞIK (Okunaklı) bas!
```

**JSON Dosyasını Okumak (LOAD):**
```python
with open("data.json", "r", encoding="utf-8") as f:
    gelen_veri = json.load(f) # JSON'ı alıp Python Sözlüğüne dönüştürür.
    
print(gelen_veri["isim"]) # Çıktı: Zeynep
```
