# Bölüm 04: Semantik HTML ve Gelişmiş SEO

Eski web geliştiricileri (HTML4 dönemi) sayfayı bölümlere ayırmak için sürekli `<div>` etiketini kullanırdı. Başlık için `<div class="baslik">`, alt menü için `<div class="alt-menu">`. Bu yöntem görsel olarak kusursuz çalışsa da "Anlamsız (Non-Semantic)" bir yapıdır.

**Neden Anlamlı (Semantic) Etiket Kullanmalıyız?**
1. **SEO (Google Dostu):** Google robotları sayfayı okuduğunda "Burası bir makale, burası sadece bir menü" ayrımını yapabilmeli ki sitenizi doğru kelimelerde üst sıralara çıkarsın.
2. **Erişilebilirlik (A11y):** Görme engelli kullanıcıların kullandığı ekran okuyucu (Screen Reader) cihazlar, `<div>`leri boş kutu olarak okur. Semantik etiketleri ise "Ana menüye geçiliyor", "Makale başladı" diye seslendirerek hayat kurtarır.

## 1. Semantik Sayfa Anatomisi

Modern bir HTML5 sayfası aşağıdaki iskeletle kurulmalıdır:

```html
<body>
    <!-- HEADER: Sitenin üst bilgi bölümüdür. Genelde Logo, Arama Çubuğu ve Ana Menüyü barındırır. -->
    <header>
        <img src="logo.png" alt="Sitemizin Logosu">
        
        <!-- NAV: (Navigation). Sadece ama sadece sitenin iç sayfalarına (veya sayfa içi bağlantılara) giden ana yönlendirme linklerini barındırmalıdır. -->
        <nav>
            <ul>
                <li><a href="/">Ana Sayfa</a></li>
                <li><a href="/hakkinda">Hakkımızda</a></li>
                <li><a href="/iletisim">İletişim</a></li>
            </ul>
        </nav>
    </header>

    <!-- MAIN: Sitenin kalbidir. Her sayfada SADECE 1 TANE <main> bulunmalıdır. Sayfanın yegane, en önemli içeriği buradadır. -->
    <main>
        
        <!-- SECTION: İçeriği mantıksal bölümlere ayırır. Örneğin bir e-ticaret sitesinde "Çok Satanlar" bir section, "İndirimliler" başka bir section'dır. Her section genelde kendi <h2> başlığına sahiptir. -->
        <section aria-labelledby="cok-satanlar-baslik">
            <h2 id="cok-satanlar-baslik">Çok Satan Kitaplar</h2>
            <!-- İçerikler... -->
        </section>

        <!-- ARTICLE: Bağımsız, kendi başına anlam ifade eden, sayfadan koparılıp başka bir sitede yayınlansa bile anlaşılacak içeriklerdir. (Haber haberi, Blog yazısı, Ürün incelemesi vb.) -->
        <article>
            <header>
                <h2>Yapay Zekanın Geleceği</h2>
                <p>Yazar: İlker | Tarih: 12 Mart 2026</p>
            </header>
            <p>Makale metni burada yer alır...</p>
        </article>

        <!-- ASIDE: Ana içerikle doğrudan bağlantılı olmayan "Yan İçerikler"dir. Genellikle sağ/sol sütunda yer alan Reklamlar, İlgili Haberler veya Yazar biyografisi gibi alanlardır. -->
        <aside>
            <h3>Sponsorlu Bağlantılar</h3>
            <a href="#">Bunu da beğenebilirsiniz...</a>
        </aside>

    </main>

    <!-- FOOTER: Sayfanın en altındaki bilgi alanıdır. Telif hakkı, alt linkler, adres bilgileri burada yer alır. -->
    <footer>
        <p>Copyright &copy; 2026 İlker Turan. Tüm hakları saklıdır.</p>
    </footer>
</body>
```
*(Not: `aria-labelledby` gibi özellikler (ARIA), erişilebilirlik cihazlarına ekranın o kısmının ismini dikte etmek için kullanılır).*

## 2. Baş Kısmı (`<head>`) ve SEO Meta Etiketleri

Gövdedeki (`<body>`) semantik etiketler kadar, beynindeki (`<head>`) görünmez meta veriler de sitenizin başarısını belirler.

```html
<head>
    <meta charset="UTF-8">
    
    <!-- Viewport: Mobil uyumluluğun kalbidir. 
    width=device-width: Sayfanın genişliği, açılan cihazın ekran genişliği kadar olsun.
    initial-scale=1.0: Sayfa yüklendiğinde yakınlaştırma seviyesi %100 olsun (Kullanıcı telefonda yazıları okumak için eliyle büyütmek zorunda kalmasın). -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Title: 50-60 karakter arasında olmalıdır. Arama motoru sonuç sayfasındaki (SERP) asıl tıklanabilir büyük mavi yazıdır. Sayfanın en vurucu anahtar kelimelerini içermelidir. -->
    <title>İkinci El Arabalar ve Fiyatları | Araç Dünyası</title>
    
    <!-- Description: Arama motorlarında başlığın altında çıkan, kullanıcıyı tıklamaya ikna eden 150-160 karakterlik özet cümledir. Google bu açıklamayı çok önemser. -->
    <meta name="description" content="Binlerce incelenmiş ve ekspertiz garantili ikinci el araç ilanını karşılaştırın. Bütçenize en uygun arabayı hemen bulun.">
    
    <!-- Robots: Google botlarına bu sayfayı okuyup okumaması veya linkleri takip edip etmemesi talimatını verir. ("noindex" derseniz sayfa Google'da çıkmaz, admin panelleri için kullanılır). -->
    <meta name="robots" content="index, follow">

    <!-- Open Graph (OG) Etiketleri: Sitenizin linkini WhatsApp, Twitter veya Facebook'ta paylaştığınızda çıkan kutucuktaki (Kart) başlık ve resmi belirler. -->
    <meta property="og:title" content="İkinci El Arabalar">
    <meta property="og:description" content="Ekspertiz garantili araç ilanları.">
    <meta property="og:image" content="https://araclar.com/sosyal-medya-kapak-resmi.jpg">
</head>
```
