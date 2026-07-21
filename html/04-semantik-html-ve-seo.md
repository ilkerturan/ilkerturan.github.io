# Bölüm 04: Semantik HTML ve SEO (Arama Motoru Optimizasyonu)

Her şeyi `<div class="baslik">`, `<div class="icerik">` diyerek yazarsanız sayfa görsel olarak yine harika çalışır. **Fakat Google botları ve görme engelli (ekran okuyucu kullanan) cihazlar sayfanızı anlayamaz!**

Kör bir robota sitenizin neresinin Menü, neresinin Makale olduğunu anlatmak için **Semantik (Anlamsal)** etiketler kullanırız.

## 1. Semantik Etiketler Nelerdir?

Aşağıdaki yapı, modern bir web sitesinin iskeletidir:

```html
<body>
    <!-- 1. Üst Menü / Logonun olduğu kısım -->
    <header>
        <nav> <!-- Navigasyon linkleri -->
            <a href="/">Ana Sayfa</a>
            <a href="/hakkinda">Hakkında</a>
        </nav>
    </header>

    <!-- 2. Sayfanın Asıl İçeriği -->
    <main>
        <!-- Bağımsız bir yazı/haber/ürün -->
        <article>
            <h1>Yapay Zeka Dünyayı Değiştiriyor</h1>
            <p>Makale içeriği...</p>
        </article>

        <!-- Yan sütun (Reklamlar veya yazar bilgisi) -->
        <aside>
            <p>Yazar: İlker</p>
        </aside>
    </main>

    <!-- 3. Sayfanın En Alt Kısmı -->
    <footer>
        <p>Telif Hakkı © 2026</p>
    </footer>
</body>
```
*Gördüğünüz gibi, kodlara bakan birisi (veya Google) sayfanın neresinde ne olduğunu anında anlar.*

## 2. Meta Etiketleri ve SEO

Sayfanızın Google aramalarında nasıl çıkacağını `<head>` içindeki `<meta>` etiketleri belirler.

```html
<head>
    <!-- Karakter sorunu (Türkçe ı,ğ,ş) yaşamamak için -->
    <meta charset="UTF-8">
    
    <!-- Mobil uyumluluğun (Responsive) çalışması için ZORUNLUDUR -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Google Aramada çıkan Mavi Başlık -->
    <title>En İyi Kahve Makineleri 2026</title>
    
    <!-- Google Aramada başlığın altındaki siyah açıklama metni -->
    <meta name="description" content="Eviniz için alabileceğiniz fiyat/performans en iyi 10 kahve makinesini inceliyoruz.">
    
    <!-- Yazar -->
    <meta name="author" content="İlker">
</head>
```
