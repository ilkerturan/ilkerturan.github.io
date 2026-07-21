# Bölüm 01: CSS Temelleri ve Seçiciler

HTML sayfamızın iskeletini kurduktan sonra, onu renklendirmek, fontları büyütmek ve tasarlamak için **CSS** (Cascading Style Sheets) kullanırız.

## 1. CSS Nasıl Eklenir?

CSS yazmanın en iyi yolu, ayrı bir `.css` dosyası oluşturup onu HTML'in `<head>` kısmına bağlamaktır:

```html
<head>
    <!-- style.css dosyasını sayfama dahil et -->
    <link rel="stylesheet" href="style.css">
</head>
```

## 2. CSS Seçiciler (Selectors)

CSS'te temel kural şudur: **Kimi seçeceksin? Ne yapacaksın?**

```css
/* 1. Etiket Seçici: Sayfadaki TÜM <p> etiketlerini kırmızı yap */
p {
    color: red;
}

/* 2. Class (Sınıf) Seçici: HTML'de class="kutu" yazanları seçer (Nokta ile başlar) */
.kutu {
    background-color: blue;
}

/* 3. ID Seçici: HTML'de id="baslik" yazanı seçer (Sayfada TEK olmalıdır, Kare ile başlar) */
#baslik {
    font-size: 24px;
}
```

## 3. Renkler ve Yazı Tipleri

```css
body {
    /* Arka plan rengi */
    background-color: #f4f4f4; /* HEX kodu (Siyah-Beyaz arası gri) */
    
    /* Yazı Rengi */
    color: rgb(50, 50, 50); /* Kırmızı, Yeşil, Mavi karışımı */
    
    /* Yazı Tipi Ailesi */
    font-family: "Arial", sans-serif;
    
    /* Yazı Boyutu */
    font-size: 16px;
    
    /* Yazı Kalınlığı */
    font-weight: bold;
}
```
