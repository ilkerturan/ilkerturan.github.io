# Bölüm 01: JavaScript Temelleri ve Bellek Yönetimi

HTML sayfanın kemikleri, CSS onun derisi ve kıyafetleri ise; **JavaScript (JS) o sayfanın kas sistemi ve beynidir.** Sitedeki tüm etkileşimler (butona basınca menünün açılması), arka planda sunucularla haberleşmeler, matematik hesaplamaları ve dinamik olarak ekranda yeni verilerin belirmesi JavaScript ile olur.

JavaScript, aslen tarayıcıların (Chrome, Firefox vb.) anlayabildiği tek dildir. İlerleyen yıllarda Node.js projesiyle birlikte sunucularda (Backend) bile çalışabilir hale gelmiştir. Biz burada tarayıcıdaki gücüne odaklanacağız.

## 1. Değişkenler ve Bellek Mimarisi (Variables)

Bilgisayar programları verileri işlemek için önce onları hafızaya (RAM) almalıdır. Verileri sakladığımız bu kutulara "Değişken" deriz. Eskiden JS'te her şey `var` ile tanımlanırdı ama çok fazla güvenlik ve kapsam (scope) açığı yaratıyordu. ES6 (2015) sürümüyle birlikte `var` kullanımdan kalktı ve yerine iki mükemmel mekanizma geldi: `let` ve `const`.

### A. Sabitler (Constant - `const`)
Bir kere içine değer atadıktan sonra (initialize edildiğinde) programın sonuna kadar bir daha ASLA içindeki o temel değerin değiştirilemeyeceği bellek alanlarıdır. 
- **Neden kullanırız?** Güvenlik için. Yanlışlıkla kritik bir değerin veya HTML'den yakaladığınız bir buton elementinin üzerini başka bir kodla yazmamak için (Hataları %80 azaltır).
- **Tavsiye:** Başlangıçta HER ŞEYİ `const` ile tanımlayın, eğer programın ilerisinde o değeri gerçekten güncellemeniz gerektiğini fark ederseniz dönüp `let` yapın.

```javascript
const piSayisi = 3.14;
// piSayisi = 3; -> YAZAMAZSINIZ! "TypeError: Assignment to constant variable" hatası fırlatır ve program çöker.

const adim = "İlker";
// adim = "Ahmet"; -> YAZAMAZSINIZ!
```

### B. Değiştirilebilir Alanlar (`let`)
Zaman içinde, döngülerle veya kullanıcının hareketleriyle içindeki verinin silinip yeni verinin yazılacağı (güncelleneceği) kutulardır (Örn: Bir oyundaki Puan sayacı).

```javascript
let puan = 0; // Başlangıçta 0 verdik
console.log(puan); // Konsola 0 yazar

puan = puan + 10; // Puanı 10 artırdık
puan += 10;       // Üstteki işlemin daha kısa ve profesyonel yazımıdır.

console.log(puan); // Konsola 20 yazar
```

## 2. Temel Veri Tipleri (Data Types)

JavaScript dinamik tipli (Dynamic Typed) bir dildir. C# veya Java'daki gibi değişkenin önüne "int", "string" yazmazsınız; JS veri tipini içindeki değere bakarak anında anlar.

```javascript
// 1. String (Metin): Mutlaka tırnak (' ' veya " " veya ` `) içinde yazılmalıdır. Tırnak olmazsa JS bunu kod komutu sanır ve patlar.
const ulke = "Türkiye"; 

// 2. Number (Sayı): Tırnaksız yazılır. Tam sayı veya ondalıklı olabilir.
const yas = 28;
const sicaklik = 36.5; 

// 3. Boolean (Mantıksal): Bilgisayar biliminin temeli, Sadece True (Doğru/1) veya False (Yanlış/0) alır. Karar mekanizmalarında kullanılır.
const ehliyetiVarMi = true; 

// 4. Undefined (Tanımsız): Kutu yaratılmış ama içine daha hiç değer konmamış demektir.
let sehir;
console.log(sehir); // Çıktı: undefined

// 5. Null (Boşluk): Kutunun içine BİLİNÇLİ olarak bir hiçlik koyulmuştur.
const arabasi = null;
```

## 3. Konsol ve Çıktı Mekanizmaları

Kodu yazarken arkada neler olup bittiğini görmek, hata ayıklamak (Debug) için F12 geliştirici Konsolunu kullanırız.
```javascript
console.log("Normal bir bilgilendirme mesajıdır.");
console.error("Kırmızı renkli görünür, hata durumlarında loglamak içindir.");
console.warn("Sarı renklidir, uyarılar için kullanılır.");

// Kullanıcının ekranının tam ortasına fırlayan acil durum uyarı pop-up'ı (Dikkat dağıtıcıdır, çok gerekmedikçe kullanılmaz)
alert("Kayıt başarıyla tamamlandı!");
```
