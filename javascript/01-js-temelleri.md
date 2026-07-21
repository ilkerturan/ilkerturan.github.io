# Bölüm 01: JavaScript Temelleri

HTML iskelet, CSS makyaj ise; JavaScript (JS) web sayfanızın **beynidir**. Etkileşimler, hesaplamalar, veritabanından bilgi çekip gösterme işlemleri JS ile yapılır.

## 1. JS Nasıl Eklenir?
Genellikle sayfanın sonuna (body'nin kapanış etiketinden hemen önce) `<script>` etiketi ile dahil edilir ki önce HTML yüklensin.

```html
<body>
    <h1>Siteme Hoş Geldin</h1>
    <!-- JS dosyasını bağlama -->
    <script src="app.js"></script>
</body>
```

## 2. Konsol Kullanımı ve Çıktılar

Yazdığınız JS kodlarının hatalarını görmek ve test yapmak için tarayıcınızda (Örn: Chrome) F12 (veya Sağ Tık -> İncele) yapıp **Console (Konsol)** sekmesine geçmelisiniz.

```javascript
// Geliştirici konsoluna mesaj yazdırır
console.log("Merhaba Dünya, ben çalışıyorum!");

// Ekranda kullanıcıya fırlayan uyarı kutusu
alert("Şifre yanlış!");
```

## 3. Değişkenler (Variables)

Verileri saklamak için değişkenleri kullanırız. Güncel JavaScript'te 2 tür değişken tanımlama yöntemi vardır:
- `const`: Sabittir, atadığınız değeri daha sonra asla değiştiremezsiniz (Güvenlidir).
- `let`: Değişkendir, daha sonra içindeki veriyi değiştirebilirsiniz.

```javascript
const tcKimlik = "12345678900"; 
// tcKimlik = "000"; -> HATA VERİR! const değiştirilemez.

let yas = 25;
yas = 26; // Geçerli! let değiştirilebilir.
```

## 4. Veri Tipleri (Data Types)

```javascript
const isim = "İlker";   // String (Metin)
const fiyat = 99.50;    // Number (Sayı)
const evliMi = false;   // Boolean (Doğru/Yanlış)
```
