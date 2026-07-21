# Bölüm 04: Fonksiyonlar

Bir işi yapan (veya hesaplayan) kod bloklarını bir "isim" altında paketlemeye Fonksiyon denir. İleride o işleme ihtiyaç duyduğumuzda o paketi isminden çağırırız.

## 1. Geleneksel (Klasik) Fonksiyon

```javascript
// Fonksiyon Tanımlama (Parametre olarak s1 ve s2 alır)
function topla(s1, s2) {
    const sonuc = s1 + s2;
    // Hesapladığın değeri beni çağıran yere Geri Döndür (Return)
    return sonuc;
}

// Fonksiyonu Çağırma
const islemSonucu = topla(10, 5);
console.log(islemSonucu); // Çıktı: 15
```

## 2. Modern Ok (Arrow) Fonksiyonları (ES6)

Günümüzde React, Vue gibi modern sistemlerde klasik `function` kelimesi pek kullanılmaz. Onun yerine çok daha kısa olan "Arrow Function" ok gösterimi kullanılır. 

Mantık ve işleyiş tamamen aynıdır, sadece yazım şekli farklıdır:

```javascript
// topla isminde bir sabit fonksiyon tanımla: s1 ve s2 alsın => bunları toplayıp dönsün
const topla = (s1, s2) => {
    return s1 + s2;
};

// EĞER fonksiyonunuz sadece tek satır kod çalıştırıp onu geri dönecekse (return), 
// süslü paranteze ve return kelimesine gerek kalmaz:
const carp = (s1, s2) => s1 * s2;

console.log(carp(4, 5)); // Çıktı: 20
```

## 3. Dizilerle Fonksiyon Kullanımı (Map ve Filter)

Modern JavaScript'te dizileri dönmek için `for` döngüsü yerine `map` ve `filter` fonksiyonları (metotları) kullanılır.

```javascript
const sayilar = [1, 2, 3, 4, 5];

// MAP: Listedeki her elemanı tek tek gez, hepsini 2 ile çarp, YENİ bir liste oluştur.
const ikiKatlar = sayilar.map(sayi => sayi * 2);
console.log(ikiKatlar); // [2, 4, 6, 8, 10]

// FILTER: Listedeki her elemanı gez, şarta uyanları (3'ten büyük olanları) filtrele.
const buyukOlanlar = sayilar.filter(sayi => sayi > 3);
console.log(buyukOlanlar); // [4, 5]
```
