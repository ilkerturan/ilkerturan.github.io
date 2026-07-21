# Bölüm 05: Fonksiyonlar, *args, Lambda ve LEGB Kapsam Kuralları

Aynı kodu programın içinde 5 kere kopyala-yapıştır yapıyorsanız, **DRY (Don't Repeat Yourself)** prensibini vahşice ihlal ediyorsunuz demektir. O işlemi tek bir pakete (Kutuya) hapsedip, isim vermeye **Fonksiyon** denir.
Python'da fonksiyonlar **First-Class Citizen (Birinci Sınıf Vatandaş)** dır. Yani bir fonksiyonu değişkene atayabilir, listeye ekleyebilir veya başka bir fonksiyona parametre olarak gönderebilirsiniz!

## 1. Fonksiyon Tanımlama ve Pass by Object Reference
Python'da bir fonksiyon `def` (Define) ile başlar.
C++ gibi dillerde parametreler "Pass by Value (Değer ile)" veya "Pass by Reference (Referans ile)" gönderilir. Python'da ise durum **"Pass by Object Reference"** olarak adlandırılır.

Eğer fonksiyona **Immutable (Değiştirilemez - int, string)** bir veri gönderirseniz, fonksiyon içeride onu değiştirse bile DIŞARIDAKİ orijinal değişken etkilenmez. 
Eğer fonksiyona **Mutable (Değiştirilebilir - list, dict)** bir veri gönderirseniz ve fonksiyon içeride listeye `.append()` yaparsa, DIŞARIDAKİ ORİJİNAL LİSTE DE değişir! (Çünkü aynı RAM adresini paylaşırlar).

```python
def bilgileri_guncelle(isim, liste):
    isim = "Mehmet"          # String Immutable. Dışarıdaki İsim etkilenmez!
    liste.append("YeniVeri") # Liste Mutable! Dışarıdaki liste KALICI OLARAK BOZULUR!

benim_adim = "İlker"
benim_listem = ["EskiVeri"]

bilgileri_guncelle(benim_adim, benim_listem)

print(benim_adim)   # Çıktı: "İlker" (Korumada kaldı)
print(benim_listem) # Çıktı: ["EskiVeri", "YeniVeri"] (Eyvah! Değişti)
```

## 2. Esnek Parametreler: *args ve **kwargs Mimarisi
Bazen bir fonksiyona kaç tane parametre gönderileceğini baştan BİLEMEYİZ. (Örn: `print()` fonksiyonuna 10 tane şey de verebiliriz). Python bu esnekliği Tuple ve Dictionary altyapısı kullanarak çözer.

- **`*args` (Positional Arguments):** Sonsuz sayıda isimsiz parametre almanızı sağlar. Python fonksiyona gelen tüm fazlalık parametreleri toplar ve bir `Tuple` (Demet) haline getirip `args` değişkenine koyar.
```python
def topla(*args):
    # args içeride bir Tuple'dır: (5, 10, 15, 20)
    toplam = 0
    for sayi in args:
        toplam += sayi
    return toplam

print(topla(5, 10, 15, 20)) # Hepsini alır ve toplar!
```
- **`**kwargs` (Keyword Arguments):** Sonsuz sayıda İSİMLİ parametre almanızı sağlar. Python bunları toplar ve içeride bir Sözlüğe (Dictionary) çevirir. 
```python
def ogrenci_kaydet(**kwargs):
    # kwargs içeride bir Sözlüktür: {"ad": "Ali", "yas": 25, "sehir": "Ankara"}
    for anahtar, deger in kwargs.items():
        print(f"{anahtar.upper()}: {deger}")

ogrenci_kaydet(ad="Ali", yas=25, sehir="Ankara")
```

## 3. Lambda (Anonim) Fonksiyonlar
Sadece bir kez kullanılacak, çok basit ve tek satırlık bir iş için koskoca `def` bloğu açıp isim vermek kalabalıktır. İsimsiz (Kullan-At) fonksiyonlara Lambda denir. Genellikle `map()`, `filter()`, `sort()` gibi diğer fonksiyonların İÇİNDE kullanılırlar.
```python
# Bir listeyi ismin UZUNLUĞUNA göre sıralamak:
isimler = ["Ali", "Abdulmuttalip", "Zeynep"]
isimler.sort(key=lambda x: len(x)) 
# Normalde Alfabetik sıralardı. Biz dedik ki: Kuralımız x'in len(x) uzunluğudur!
```

## 4. Scope (Kapsam) ve Meşhur LEGB Kuralı
Bir değişkeni çağırdığınızda, Python o değişkeni bulmak için dışarıya doğru büyüyen 4 farklı çemberde arama yapar. Buna **LEGB Kuralı** denir:
1. **L (Local - Yerel):** Önce bulunduğun Fonksiyonun GÖBEĞİNE bak. Orada yaratılmış mı?
2. **E (Enclosing - Kapsayan):** Eğer bir fonksiyonun içinde başka bir İç İçe Fonksiyon (Nested) varsa, bir dıştaki fonksiyona bak.
3. **G (Global - Küresel):** Sayfanın en üstünde, hiçbir boşluğun (girintinin) içinde olmadan tanımlanmış ana değişkenlere bak.
4. **B (Built-in - Dahili):** Python'un kendi yarattığı çekirdek kelimelere bak (Örn: `len`, `print`).

```python
mesaj = "Ben Globalim" # (G)

def test():
    gizli_mesaj = "Ben Localim" # (L) Dışarıdan erişilemez!
    
    # Kural: İçeriden Dışarıyı OKUYABİLİRSİN. 
    print(mesaj) # Gidip Local'e bakar yok, Enclosing'e bakar yok, Global'de bulur ve "Ben Globalim" yazar.

    # Kural: İçeriden Dışarıyı DEĞİŞTİREMEZSİN (Varsayılan olarak)
    # mesaj = "Yeni Global" yazarsanız, Global'i ezmez! Local'de aynı isimle yeni bir kopya yaratır.
    
    # EĞER İLLA GLOBALİ EZECEĞİM DİYORSANIZ YETKİ ALMALISINIZ:
    global mesaj
    mesaj = "Artık Globali kalıcı olarak değiştirdim!"
```
