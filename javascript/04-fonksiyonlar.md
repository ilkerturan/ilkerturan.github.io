# Bölüm 04: Fonksiyonların Büyüsü ve Modern Array Metotları

Programlama kurallarının altın ilkesi DRY'dır (Don't Repeat Yourself - Kendini Tekrar Etme). Eğer aynı matematiksel hesabı, aynı satırları kodun içinde 3 farklı yerde yazıyorsanız, bu kötü bir mimaridir. O satırları bir "kutu" içine paketler ve ona bir isim verirsek, istediğimiz yerde tek bir kelimeyle (ismiyle) çağırıp çalıştırabiliriz. İşte bu pakete **Fonksiyon (Function)** denir.

## 1. Fonksiyon Parametreleri (Argüman) ve Return Felsefesi

Fonksiyonlar tıpkı bir et kıyma makinesi gibi çalışır.
- **Parametre:** Makineye üstten atılan ettir (Dışarıdan gelen veridir).
- **Gövde:** Makinenin içindeki bıçaklardır (Sizin yazdığınız işlem kodlarıdır).
- **Return (Dönüş):** Makineden alttan çıkan kıymadır (İşlemin sonucudur).

```javascript
// 1. Fonksiyonu Tanımlama
// urunFiyati ve vergiOrani dışarıdan verilecek, bilmediğimiz (X, Y gibi) parametrelerdir.
function kdvHesapla(urunFiyati, vergiOrani) {
    const kdvTutari = (urunFiyati * vergiOrani) / 100;
    const genelToplam = urunFiyati + kdvTutari;
    
    // İşlem bittikten sonra sonucu beni çağıran yere "geri döndür"
    return genelToplam;
}

// 2. Fonksiyonu Çağırma (Çalıştırma / Invoke)
// Şimdi parametreler yerine GERÇEK değerler (Argümanlar) gönderiyoruz. (Fiyat: 1000, Vergi: 20)
const odenecekTutar = kdvHesapla(1000, 20);

// kdvHesapla işlemi gidip 1200'ü hesaplayıp return ile geri fırlattı ve bunu odenecekTutar sabitine attık.
console.log(odenecekTutar); // 1200
```

> **Önemli Kural:** `return` kelimesi fonksiyonu öldürür (sonlandırır). Return satırından sonra yazacağınız hiçbir kod (console.log vs) ASLA ÇALIŞMAZ.

## 2. ES6 Ok Fonksiyonları (Arrow Functions) `=>`

2015 yılındaki JS devrimiyle birlikte `function` kelimesi yavaş yavaş terk edildi ve (özellikle React gibi kütüphanelerde) Arrow Function'lar standart haline geldi. Mantık ve felsefe tamamen aynıdır, sadece yazım şekli (Syntax) daha kısa ve hoştur.

```javascript
// Geleneksel Yazım
function merhabaDe(isim) {
    return "Merhaba " + isim;
}

// Ok Fonksiyonu (Arrow Function) Yazımı
const merhabaDeOk = (isim) => {
    return "Merhaba " + isim;
};

// SİHİRLİ KISA YAZIM: Eğer fonksiyonunuz SADECE tek satırlık bir işlem yapıp onu "return" ediyorsa, süslü parantezleri ve return kelimesini tamamen çöpe atabilirsiniz! (Örtük Return - Implicit Return)
const merhabaDeKisa = (isim) => "Merhaba " + isim;
```

## 3. Güçlü Array (Dizi) Metotları: Map, Filter, Find

Klasik `for` döngüsünü elle kurmak (sayaç, limit, artış) hataya açıktır. Bunun yerine dizilerin içinde bulunan, profesyonellerin her gün kullandığı döngü fonksiyonları vardır. Bu fonksiyonlar **içine parametre olarak başka bir fonksiyon alırlar!** (Buna Callback Function denir).

```javascript
const sepet = [
    { urun: "Laptop", fiyat: 30000 },
    { urun: "Mouse", fiyat: 500 },
    { urun: "Klavye", fiyat: 2000 }
];

/* ========================================================
   1. MAP (Haritalama / Dönüştürme): 
   Dizideki her elemanı tek tek gezer. Elemana bir işlem yapar ve AYNI UZUNLUKTA YENİ BİR DİZİ döner. (Sayıları ikiye katlamak, isimleri büyük harfe çevirmek vs. için kullanılır).
======================================================== */
// Sepetteki sadece URUN İSİMLERİNİ alıp yeni bir liste yapalım
const sadeceIsimler = sepet.map(item => item.urun);
console.log(sadeceIsimler); // ["Laptop", "Mouse", "Klavye"]


/* ========================================================
   2. FILTER (Süzgeçleme): 
   Dizideki her elemanı gezer. Yalnızca yazdığınız mantıksal şarta (TRUE verenlere) uyanları alır, uymayanları çöpe atar ve GERİYE YENİ BİR DİZİ döner. 
======================================================== */
// Fiyatı 1000 TL'den pahalı olan (Zengin) ürünleri filtrele
const pahaliUrunler = sepet.filter(item => item.fiyat > 1000);
// PahaliUrunler dizisinde sadece Laptop ve Klavye objeleri kaldı.


/* ========================================================
   3. FIND (Arama - Nokta Atışı): 
   Filter gibi çalışır ama tek bir farkı vardır: Şarta uyan İLK öğeyi bulduğu saniye aramayı durdurur (döngü biter) ve diziyi değil DOĞRUDAN O OBJEYİ döner. (Örn: TC Kimlik numarasıyla veya ID ile veritabanında arama yapmak).
======================================================== */
const arananMouse = sepet.find(item => item.urun === "Mouse");
console.log(arananMouse.fiyat); // 500
```
