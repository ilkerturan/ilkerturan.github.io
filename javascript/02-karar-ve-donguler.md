# Bölüm 02: Mantıksal Kararlar ve Döngülerin Matematiği

Yazdığımız kodlar her zaman dümdüz aşağı doğru akmaz. "Eğer kullanıcı giriş yaptıysa profilini göster, yapmadıysa giriş sayfasına at" veya "Veritabanındaki 500 ürünü tek tek ekrana bas" gibi karmaşık işler için programlamanın temel yapı taşlarını kullanırız.

## 1. If - Else (Eğer - Değilse) Yapısı

Programın yol ayrımıdır. Parantez `()` içindeki matematiksel veya mantıksal şart sağlanırsa (yani sonuç `true` çıkarsa) süslü parantez `{}` içindeki komutlar çalışır.

```javascript
const havaSicakligi = 15;

if (havaSicakligi >= 30) {
    // 30'a EŞİT veya BÜYÜK ise
    console.log("Klima açılıyor...");
} 
else if (havaSicakligi > 20) {
    // Üstteki şart tutmazsa, ama 20'den BÜYÜK ise
    console.log("Hava güzel, camları açabilirsiniz.");
} 
else {
    // Yukarıdaki HİÇBİR şart tutmadıysa EN SON kaçış noktasıdır
    console.log("Kombi çalıştırılıyor...");
}
```

### Tehlikeli Kural: Eşitlik Kontrolü (`==` vs `===`)
JS'te çok büyük bir tuzak vardır. Eşit mi diye kontrol ederken iki eşittir kullanırsanız JS tipi umursamaz (Sayı ile Metin aynı sanır). Her zaman TİP ve DEĞER kontrolü yapan (Katı Eşitlik) üç eşittir kullanmalısınız.
```javascript
const rakam = 5;       // Number
const metin = "5";     // String

console.log(rakam == metin);  // Çıktı: TRUE (Amatör hatası, tiplere bakmadı, 5=5 dedi geçti)
console.log(rakam === metin); // Çıktı: FALSE (Doğrusu budur, biri Sayı biri Metin eşit olamazlar)
```

## 2. AND (Ve), OR (Veya) Operatörleri

Birden fazla şartın aynı anda kontrol edilmesi için kullanılır.
- `&&` (AND - VE): İki tarafın da kesinlikle TRUE (Doğru) olmasını ister. Biri bile yalan söylerse sistem durur.
- `||` (OR - VEYA): Taraflardan sadece birinin TRUE olması bile kapıları açmaya yeter.

```javascript
const yas = 20;
const mezuniyet = "Üniversite";

// Hem yaşı 18'den büyük olacak VE Hem de mezuniyeti Üniversite olacak!
if (yas > 18 && mezuniyet === "Üniversite") {
    console.log("İşe alındınız.");
}

const vizeSecenegi = "Amerikan Vatandaşı";
// Ya yaşı 50'den büyük olacak VEYA Vizesi Amerikan vatandaşı olacak! İkisinden biri yeterli.
if (yas > 50 || vizeSecenegi === "Amerikan Vatandaşı") {
    console.log("Ülkeye giriş yapabilirsiniz.");
}
```

## 3. Döngüler (Loops) ile Tekrar Eden İşlemler

Aynı kodu 100 kere alt alta yazmak (Örn: 1'den 100'e kadar saydır) hammallıktır. Döngüler bunu milisaniyeler içinde yapar.

### A. For Döngüsü (Klasik Sayaç)
Belli bir başlangıç noktasından, belli bir son noktasına kadar bir sayaç eşliğinde dönen döngülerdir.

```javascript
// 1. Sayaç (i=0): 0'dan başla
// 2. Şart (i<5): i değeri 5'ten küçük olduğu MÜDDETÇE dönmeye (döngüye) devam et
// 3. Artış (i++): Her tur (dönüş) bittiğinde i'nin değerini 1 artır.
for (let i = 0; i < 5; i++) {
    console.log("Sistem " + i + " numaralı turu atıyor.");
}
// Çıktı: 0, 1, 2, 3, 4 yazar. i 5 olunca şart bozulur (5 < 5 olmadığı için) ve döngüden çıkılır.
```

### B. While Döngüsü (Belirsiz Şart)
Sayaçla değil de bir olay gerçekleşene kadar dönmesini istediğimiz işler için kullanılır. Kaç tur döneceği baştan belli değildir.

```javascript
let can = 3;

while (can > 0) {
    // can değişkeni sıfırdan büyük oldukça burası dönmeye devam eder (Sonsuzluğa kadar bile dönebilir)
    console.log("Oyuna devam, canınız: " + can);
    
    // Eğer içeride canı eksiltmezsek döngü hiç bitmez, bilgisayar sonsuz döngüye girer ve Chrome kilitlenir!
    can = can - 1; 
}
console.log("Oyun Bitti, canınız kalmadı.");
```
