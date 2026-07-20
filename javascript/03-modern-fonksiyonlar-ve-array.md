# Bölüm 03: Modern Fonksiyonlar ve Array (Dizi) Metotları

ES6 (2015) güncellemesi ile sadece değişkenler değil, fonksiyonlar ve döngüler de muazzam bir evrim geçirdi. Uzun uzun yazılan `for` döngüleri ve `function` kelimeleri yerini çok daha şık ve temiz yapılara bıraktı.

---

## 1. Ok Fonksiyonları (Arrow Functions)
Geleneksel `function` kelimesi yerine, matematiğe daha yakın bir "Ok" (`=>`) sembolü ile fonksiyon tanımlama sanatıdır. Hem kodu kısaltır hem de `this` bağlamı (context) sorunlarını çözer.

**Geleneksel:**
```javascript
function topla(a, b) {
    return a + b;
}
```

**Modern (Arrow Function):**
```javascript
const topla = (a, b) => a + b;
```
*(Tek satırda return işlemi halledildi).*

## 2. Array (Dizi) Metotları (map, filter, reduce)
C# LINQ ile anlattığımız modern döngü mantığı JavaScript'te tam olarak karşılık bulur. 100 tane ürünün olduğu bir dizide (Array), uzun uzun `for (let i=0; i<100; i++)` yazmak yerine fonksiyonel programlama metotları kullanılır.

*   **`map()`:** Dizideki her elemanı tek tek dolaşır, üzerinde bir değişiklik yapar ve yeni bir dizi döner. (Örn: Tüm fiyatlara KDV ekle).
*   **`filter()`:** Adı üstünde filtreleme yapar. Belirli bir şarta uyanları çeker. (Örn: Sadece fiyatı 50TL'den ucuz olanları getir).

```javascript
const fiyatlar = [10, 50, 100, 200];

// Eski usül for döngüsü YERİNE:
const ucuzOlanlar = fiyatlar.filter(fiyat => fiyat < 100); 
// Sonuç: [10, 50]
```
