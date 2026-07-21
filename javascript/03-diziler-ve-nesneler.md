# Bölüm 03: Diziler (Arrays) ve Nesneler (Objects)

Birden çok veriyi tek bir değişkende tutmak için Koleksiyonları kullanırız. 

## 1. Diziler (Arrays)

Aynı türdeki verilerin (Örn: meyveler listesi) sıralı bir şekilde tutulmasıdır. Diziler köşeli parantez `[]` ile tanımlanır ve **sıfırıncı indeks (0)** ile başlarlar.

```javascript
const meyveler = ["Elma", "Armut", "Muz", "Çilek"];

console.log(meyveler[0]); // Çıktı: Elma
console.log(meyveler.length); // Dizideki eleman sayısı: 4

// Diziye yeni eleman eklemek (Sona ekler)
meyveler.push("Karpuz");
```

## 2. Nesneler (Objects - Sözlük Yapıları)

Eğer verileriniz sadece sıralı bir liste değilse (Örn: bir Araba nesnesi; markası, modeli, yılı varsa) Objeler kullanılır. Objeler süslü parantez `{}` ile tanımlanır.

```javascript
const kullanici = {
    isim: "Ahmet",
    soyisim: "Kaya",
    yas: 30,
    evliMi: true
};

// Objenin içindeki bir veriye nokta (.) ile ulaşırız.
console.log(kullanici.isim); // Çıktı: Ahmet
```

## 3. Dizilerin İçinde Objeler (En Sık Kullanılan Gerçek Dünya Yapısı)

Web'de (Backend'den) gelen veriler genelde "İçinde objeler barındıran büyük bir liste (dizi)" şeklindedir. Buna **JSON** formatı denir.

```javascript
const ogrenciler = [
    { ad: "Ali", not: 85 },
    { ad: "Ayşe", not: 95 },
    { ad: "Mehmet", not: 45 }
];

// Dizinin 1. indeksine (İkinci eleman Ayşe'ye) git, onun "not" değerini yazdır.
console.log(ogrenciler[1].not); // Çıktı: 95
```
