# Bölüm 01: HTML Temelleri ve İskelet Yapısı

Web dünyasının temeli **HTML** (HyperText Markup Language - Hiper Metin İşaretleme Dili) ile atılır. HTML bir programlama dili değildir; bir web sayfasının **iskeletini** ve **içeriğini** (metin, resim, video vb.) belirten bir yapıdır.

## 1. Temel Sayfa Yapısı

Bir HTML dosyası daima aşağıdaki iskeletle başlar:

```html
<!DOCTYPE html>
<html lang="tr">
<head>
    <!-- Burası beynidir, kullanıcı görmez -->
    <meta charset="UTF-8">
    <title>Benim Web Sitem</title>
</head>
<body>
    <!-- Burası bedendir, ekranda ne görünüyorsa buradadır -->
    <h1>Hoş Geldiniz!</h1>
</body>
</html>
```

## 2. Metin Etiketleri (Tags)

HTML etiketler ile çalışır. Etiketler küçüktür `<` ve büyüktür `>` işaretleri arasına yazılır. Genellikle bir etiket açılır `<p>` ve kapanır `</p>`.

### Başlıklar (Headings)
```html
<h1>En Büyük Başlık (Sitede 1 tane olmalı)</h1>
<h2>Alt Başlık</h2>
<h3>Altının Altı Başlık</h3>
```

### Paragraflar ve Vurgular
```html
<p>Bu normal bir paragraftır.</p>
<p>Bu metnin <strong>bu kısmı kalın</strong>, <em>bu kısmı ise eğiktir</em>.</p>
```

## 3. Linkler (Bağlantılar)

Başka bir sayfaya veya siteye gitmek için `<a>` (Anchor) etiketi kullanılır:
```html
<!-- target="_blank" yeni sekmede açılmasını sağlar -->
<a href="https://google.com" target="_blank">Google'a Git</a>
```

## 4. Resimler

Resimler kapatma etiketi olmayan (tek parça) nadir etiketlerdendir:
```html
<!-- src: resmin adresi, alt: resim yüklenemezse yazacak açıklama (SEO için çok önemli) -->
<img src="vesikalik.jpg" alt="Benim Fotoğrafım">
```

## 5. Listeler

Sırasız (Noktalı) Liste:
```html
<ul>
    <li>Elma</li>
    <li>Armut</li>
</ul>
```

Sıralı (Numaralı) Liste:
```html
<ol>
    <li>Birinci adım</li>
    <li>İkinci adım</li>
</ol>
```
