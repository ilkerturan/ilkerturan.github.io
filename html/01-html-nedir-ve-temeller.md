# Bölüm 01: HTML Nedir ve Temelleri

Yazılım dünyasındaki felsefe ve prensiplerden sonra, artık kullanıcının doğrudan temas ettiği **Önyüz (Frontend)** dünyasına giriş yapıyoruz.
Bu dünyanın ilk ve en temel yapı taşı **HTML (HyperText Markup Language)**'dir.

---

## 1. HTML Bir Programlama Dili Değildir!
Bunu söylemek çok önemlidir: HTML ile `if (kullaniciYas > 18)` gibi mantıksal kararlar veremezsiniz. HTML sadece bir **İşaretleme Dili**dir.
Amacı, tarayıcıya (Chrome, Safari) şu talimatı vermektir: *"Bak Chrome, burası bir başlık, şurası bir paragraf, burası da bir görsel."*

## 2. Etiket (Tag) Mantığı
HTML tamamen `<etiket>` ile başlar ve `</etiket>` ile biter. Etiketlerin arasına içerik yazılır.

```html
<h1>Bu en büyük başlıktır</h1>
<p>Bu normal bir yazıdır (paragraf).</p>
<button>Tıkla</button>
```

## 3. Sayfanın Anatomisi (Head ve Body)
Tıpkı bir insan gibi, HTML sayfasının da bir kafası (`<head>`) ve bir gövdesi (`<body>`) vardır.

*   **`<head>`:** Kullanıcının ekranda görmediği, sitenin arka plan bilgilerinin (Başlık, Google'a verilecek anahtar kelimeler, eklenecek CSS dosyaları) yer aldığı beyin kısmıdır.
*   **`<body>`:** Kullanıcının ekranda gördüğü her şeyin (Butonlar, resimler, yazılar) yazıldığı gövde kısmıdır.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Sitemin Sekme Başlığı</title>
    </head>
    <body>
        <h1>Merhaba Dünya!</h1>
    </body>
</html>
```
