# Bölüm 03: Formlar ve Kullanıcı Etkileşimi

Kullanıcı sadece okuyan bir varlık değildir. Sisteme kayıt olması, ürün araması veya giriş yapması gerekir. Tüm bu "Kullanıcıdan veri alma" işlemleri Formlar aracılığıyla yapılır.

---

## 1. Form Etiketi (`<form>`)
Kullanıcıdan alınacak veriler `<form>` etiketi içine yazılır. Bu etiket, içindeki tüm verileri paketleyip Backend'e (Sizin C# uygulamanıza) gönderir.

## 2. Girdiler (`<input>`)
HTML5 öncesinde sadece "metin" kutuları vardı. Şimdi ise tarayıcılar (Özellikle mobil cihazlar) input türüne göre klavyeyi bile değiştiriyor.

*   `<input type="text">`: Normal metin.
*   `<input type="email">`: Kullanıcı "@" işareti girmezse tarayıcı otomatik olarak kızar ve formun gönderilmesini engeller (Bedava doğrulama). Telefondaysanız klavyeye direkt "@" tuşu gelir.
*   `<input type="password">`: Yazılan karakterleri ****** şeklinde gizler.
*   `<input type="date">`: Tıklandığında muazzam bir takvim çıkarır.
*   `<input type="number">`: Sadece rakam girilmesine izin verir (Mobilde numaratör klavyesi açılır).

## 3. Form Örneği
```html
<form action="/kullanici/kayit" method="POST">
    <label>E-posta Adresiniz:</label>
    <input type="email" required placeholder="ornek@mail.com">

    <label>Şifreniz:</label>
    <input type="password" required>

    <button type="submit">Kayıt Ol</button>
</form>
```
