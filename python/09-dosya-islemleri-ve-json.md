# Bölüm 09: Dosya Okuma/Yazma (I/O), JSON ve Serileştirme (Pickle)

Yazılımda bir değişkene kaydettiğiniz veriler (Örn: `oyuncu_puani = 500`) bilgisayarın Geçici Belleğinde (RAM) durur. Fişi çektiğiniz an her şey uçar. Veriyi kalıcı (Persistent) hale getirmek için onu Harddiske (Dosya veya Veritabanı) "Fiziksel" olarak yazmanız gerekir.

## 1. Modlar ve Profesyonel Dosya Bağlantısı (Context Manager)
Python'da bir dosyayı açmak için `open()` kullanılır. Dosyaya hangi amaçla eriştiğinizi "Modlar" ile belirtirsiniz:
- `"r"` (Read): Sadece Okuma. (Dosya yoksa hata verir).
- `"w"` (Write): Yazma. **DİKKAT:** Dosya varsa İÇİNİ SİLER, yoksa sıfırdan yaratır.
- `"a"` (Append): Ekleme. Dosyanın içini silmez, en alt satıra veri eklemeye devam eder.
- `"b"` (Binary): Metin dosyası (.txt) değil de resim, PDF, ses dosyası gibi Byte (1-0) verisi okunacaksa `rb` veya `wb` kullanılır.

**Tehlikeli Yöntem:**
`dosya = open("veri.txt", "w")` dedikten sonra kapatmayı (`dosya.close()`) unutursanız veya araya bir Exception girer de kod çökürse, o dosya RAM'de kilitli (Zombie) kalır!

**Profesyonel (Context Manager) Yöntemi: `with open`**
```python
# 'with' bloğu kullanıldığında, altındaki girintili (tab) işlemler bittiği an, 
# program hata verip çökse bile Python arkada otomatik olarak dosyayı CLOSE() eder!
with open("notlar.txt", "a", encoding="utf-8") as dosya:
    dosya.write("Merhaba, bu kalıcı bir veridir.
")
```

## 2. JSON İşlemleri (İnternetin Dili)
Farklı iki dilin (Örn: Sizin yazdığınız Python Backend kodu ile Cep Telefonundaki Java/Swift arayüzünün) birbiriyle konuşurken anlaştıkları Ortak Dildir. Görüntüsü Python Sözlüklerine (Dictionary) benzer.

**Sözlüğü -> JSON Dosyasına Yazmak (DUMP):**
```python
import json

kullanici = {"isim": "Zeynep", "yas": 28, "yetenekler": ["Python", "SQL"]}

# 'w' ile açıp JSON modülüyle içine Dump (Boşaltma) yapıyoruz.
with open("data.json", "w", encoding="utf-8") as f:
    # ensure_ascii=False : Türkçe karakterleri (ş,ğ) bozmadan yazdırır!
    # indent=4 : Dosyaya dümdüz yazmak yerine, süslü parantezleri alt alta 4 boşluk bırakarak ŞIK yazar.
    json.dump(kullanici, f, ensure_ascii=False, indent=4) 
```

**JSON Dosyasını -> Python Sözlüğüne Çevirip Okumak (LOAD):**
```python
with open("data.json", "r", encoding="utf-8") as f:
    gelen_veri = json.load(f)
    print(gelen_veri["isim"]) # Zeynep
```
*Not: Eğer JSON bir dosya değil de, internetten gelen düz bir METİN (String) ise, `dump/load` yerine sonlarında 'S' harfi olan `dumps()` ve `loads()` (Load String) fonksiyonları kullanılır.*

## 3. Pickle Modülü (Objeleri Serileştirmek / Dondurmak)
JSON sadece Metin, Sayı ve Liste/Sözlük tutabilir. Ama diyelim ki sizin yazdığınız bir Sınıftan ürettiğiniz bir ARABA OBJESİ var. Veya çok karmaşık bir Makine Öğrenmesi Modeli eğittiniz. Bunu JSON'a kaydedemezsiniz.
İşte Python'a özgü **Pickle** modülü, Python belleğindeki O ANKİ canlı bir objeyi (Fonksiyon, Sınıf vs.) olduğu gibi dondurup Binary (0-1) bir dosyaya yazar (Serileştirme - Serialization). Bilgisayarı kapatıp açtığınızda dosyayı okuyup, objeyi hayata geri döndürebilirsiniz!
```python
import pickle
liste_ve_fonksiyonlar = ["Sır", 100] # Çok kompleks objeler olduğunu farz edin

# WB (Write Binary) moduyla yazıyoruz çünkü Pickle düz metin değil, makine kodu üretir.
with open("dondurulmus.pkl", "wb") as f:
    pickle.dump(liste_ve_fonksiyonlar, f)
```
