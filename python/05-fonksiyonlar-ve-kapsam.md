# Bölüm 05: Fonksiyonlar, *args ve Scope (Kapsam)

Aynı kodu programın içinde 5 kere kopyala-yapıştır yapıyorsanız, kötü kod (DRY İhlali) yazıyorsunuz demektir. O işlemi tek bir pakete (Kutuya) hapsedip, ismine **Fonksiyon** denir.

## 1. Fonksiyon Tanımlama (def)
Python'da bir fonksiyon `def` (Define / Tanımla) anahtar kelimesiyle başlar.
```python
def selamlama(isim="Misafir"): # 'isim' gönderilmezse varsayılan 'Misafir' olur
    mesaj = f"Merhaba {isim}, hoş geldin!"
    return mesaj # Sonucu dış dünyaya (çağrıldığı yere) fırlatır

# Kullanımı:
gelen_cevap = selamlama("İlker")
print(gelen_cevap)
```

## 2. Esnek Parametreler: *args ve **kwargs
Bazen bir fonksiyona kaç tane parametre (sayı) gönderileceğini baştan BİLEMEYİZ. (Örn: Toplama fonksiyonu, adam 2 sayı da yollayabilir, 100 sayı da yollayabilir).
- **`*args` (Yıldızlı argümanlar):** Sonsuz sayıda isimsiz parametre almanızı sağlar. Fonksiyonun içinde bunları bir Tuple (Demet) haline getirir.
```python
def topla(*args):
    toplam = 0
    for sayi in args:
        toplam += sayi
    return toplam

print(topla(5, 10, 15, 20)) # Hepsini alır ve toplar!
```
- **`**kwargs` (Çift yıldız - Keyword Args):** Sonsuz sayıda İSİMLİ parametre almanızı sağlar. İçeride bunları bir Sözlüğe (Dictionary) çevirir. `kullanici_kaydet(ad="Ali", yas=25, sehir="Ankara")` gibi yollayabilirsiniz.

## 3. Lambda (Anonim) Fonksiyonlar
Sadece bir kez kullanılacak, çok basit ve tek satırlık bir iş için koskoca `def` bloğu açmak kalabalıktır. İsimsiz (Kullan-At) fonksiyonlara Lambda denir.
```python
# KARE ALAN UZUN FONKSIYON:
# def kare_al(x): return x * x

# KISA LAMBDA HALI:
kare_al = lambda x: x * x

print(kare_al(5)) # 25
```

## 4. Değişken Kapsamı (Scope - LEGB Kuralı)
Bir değişkenin "Ömrü" ve "Nereden erişilebileceği" konusudur.
- **Local (Yerel):** Bir fonksiyonun GÖBEĞİNDE tanımlanan değişken, sadece o fonksiyona aittir. Dışarıdan (`print()`) ile ona ulaşamazsınız. Fonksiyon bitince değişken ölür ve bellekten silinir.
- **Global (Küresel):** Sayfanın en üstünde, hiçbir boşluğun (girintinin) içinde olmadan tanımlanan değişkendir. Herkes görebilir.
```python
mesaj = "Ben Globalim"

def test():
    gizli_mesaj = "Ben Localim" # Dışarıdan erişilemez!
    print(mesaj) # Fonksiyon, kendinden dışarıdaki (üstteki) Global'i GÖREBİLİR ve OKUYABİLİR.
```
> **ÖNEMLİ:** Fonksiyon içinden Global bir değişkeni SADECE OKUYABİLİRSİNİZ. Onu DEĞİŞTİRMEYE (Örn: `mesaj = "Yeni"` demeye) kalkarsanız, Python gidip global'i ezmez! Aynı isimle İÇERİDE (Local) yepyeni bir kopya değişken yaratır. Eğer illa dışarıdakini ezeceğim diyorsanız kodun içine `global mesaj` yazarak yetki almanız gerekir.
