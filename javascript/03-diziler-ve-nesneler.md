# Bölüm 03: Veri Koleksiyonları (Diziler ve Nesneler)

Tek bir değişken içinde "İlker" yazmak kolaydır. Peki ya bir e-ticaret sitesindeki 5.000 ürünün ismini nerede saklayacağız? 5000 farklı değişken (`urun1`, `urun2`...) oluşturmak saçmalıktır. İşte burada koleksiyon tipleri (Arrays ve Objects) devreye girer.

## 1. Diziler (Arrays) - Vagon Modeli

Dizileri, tren vagonları gibi arka arkaya dizilmiş kutucuklar olarak düşünebiliriz. Köşeli parantez `[]` ile oluşturulurlar.

İçindeki verilere "İndeks (Sıra)" numarası ile erişilir. **Yazılım dünyasında sayma işlemi 1'den değil, 0'dan başlar!**

```javascript
const renkler = ["Kırmızı", "Mavi", "Yeşil", "Sarı"];

// İkinci elemanı çekmek için İndeks 1'i sormalıyız
console.log(renkler[1]); // Çıktı: Mavi

// Dizideki eleman sayısını bulmak (Uzunluk)
console.log(renkler.length); // Çıktı: 4
```

### En Sık Kullanılan Array Metotları (Fonksiyonları)
Modern JS, diziler üzerinde oynamak için mükemmel hazır araçlar sunar:
```javascript
const arabalar = ["BMW", "Audi"];

// Sona Eleman Ekleme (Push)
arabalar.push("Mercedes"); 
// Sonuç: ["BMW", "Audi", "Mercedes"]

// Sondan Eleman Çıkarma (Pop)
const silinen = arabalar.pop(); // Mercedes'i diziden attı ve değişkene verdi.
// Sonuç: ["BMW", "Audi"]

// Eleman Arama (Includes) - Var mı Yok mu?
const audiVarMi = arabalar.includes("Audi"); // true
```

## 2. Nesneler (Objects) - Sözlük Modeli

Dizilerde verilerin bir anlamı yoktur, sadece sıraları vardır. Ama bir arabanın sadece adını değil, rengini, motor gücünü ve model yılını saklamak isterseniz, Özellik/Değer (Key/Value) ilişkisine sahip Nesnelere ihtiyacınız vardır.

Süslü parantez `{}` ile oluşturulurlar ve içlerinde "Anahtar: Değer" ikilileri (Properties) taşırlar.

```javascript
const araba = {
    marka: "Ford",
    model: "Mustang",
    yil: 1969,
    ikinciElMi: true,
    renkler: ["Kırmızı", "Siyah"] // Objenin içinde dizi bile saklanabilir!
};

// Objenin içindeki bir bilgiye ulaşmanın iki yolu vardır:
// 1. Nokta Notasyonu (En çok kullanılanı)
console.log(araba.marka); // Çıktı: Ford

// 2. Köşeli Parantez Notasyonu (Anahtar kelimenin dinamik/değişken olduğu durumlarda mecburidir)
const sorgulananKelime = "yil";
console.log(araba[sorgulananKelime]); // Çıktı: 1969

// Değer Güncelleme
araba.ikinciElMi = false; 
```
*Not: araba'yı `const` ile tanımlamamıza rağmen içindeki özelliklerini değiştirebildik! Çünkü objelerde referans (hafıza adresi) sabittir, içindeki odaların eşyaları değişebilir.*

## 3. Gerçek Dünyada JSON (JavaScript Object Notation) Yapısı

Frontend ve Backend (Örn: Node.js ile C# Web API) birbiriyle konuşurken dizileri ve objeleri iç içe harmanlayarak gönderirler. Veritabanından gelen data genellikle **"Objelerden oluşan bir Dizi"**dir.

```javascript
// Geleneksel bir E-Ticaret Sepeti (Cart) Datası
const sepet = [
    { urunId: 1, isim: "Laptop", fiyat: 25000, adet: 1 },
    { urunId: 2, isim: "Klavye", fiyat: 1500, adet: 2 },
    { urunId: 3, isim: "Mouse", fiyat: 500, adet: 1 }
];

// İkinci sıradaki (indeks 1) ürünün, fiyatına ulaşıp 2 ile (adet ile) çarpalım:
const klavyeToplamFiyat = sepet[1].fiyat * sepet[1].adet;
console.log("Klavye tutarı: " + klavyeToplamFiyat); // 3000
```
