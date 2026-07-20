# Bölüm 01: JavaScript Nedir ve Temel Söz Dizimi (Syntax)

İskeleti kurduk (HTML), cildini ve kıyafetini giydirdik (CSS). Ancak sistem hala cansız bir heykel. Heykele kasları ve sinir sistemini (hareket kabiliyetini) verecek olan dil **JavaScript (JS)**'tir.

---

## 1. Neden JavaScript?
Tarayıcıların (Chrome, Safari, Edge) anladığı **TEK** programlama dili JavaScript'tir. C#, Python veya Java kodlarını tarayıcıya gönderemezsiniz. Dünyadaki tüm Frontend kütüphaneleri (React, Angular, Vue) arka planda JavaScript'tir.

## 2. Modern ES6 Değişkenleri (var vs let/const)
2015 yılı (ES6 güncellemesi), JavaScript'in evrim geçirip modern ve profesyonel bir dile dönüştüğü milattır. Eski, hatalara çok açık olan `var` değişken tanımlama yöntemi çöpe atılmıştır.

*   **`let`:** Değeri sonradan değiştirilebilen değişkenler için kullanılır.
*   **`const` (Constant):** Değeri atandıktan sonra bir daha asla değiştirilemeyen (Sabit) değişkenler için kullanılır (Performanslı ve güvenlidir).

```javascript
let yas = 25;
yas = 26; // let ile tanımlandığı için hata vermez, değişir.

const tcKimlik = 123456789;
tcKimlik = 999999999; // HATA! const değiştirilemez.
```
*İyi Mühendislik Kuralı:* Kod yazarken her şeyi önce `const` ile tanımlayın. Baktınız ki ileride değerini değiştirmeniz gerekiyor, o zaman `let`'e çevirirsiniz. (Defensive Programming).
