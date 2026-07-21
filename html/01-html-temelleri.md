# Bölüm 01: HTML Temelleri ve İskelet Yapısı

Web dünyasının temeli **HTML** (HyperText Markup Language - Hiper Metin İşaretleme Dili) ile atılır. HTML, sanılanın aksine bir "programlama" dili değildir; mantıksal kararlar veremez veya matematiksel işlemler yapamaz. Görevi, tarayıcıya (Chrome, Safari vb.) sayfadaki içeriklerin **ne olduğunu** söylemektir. "Bu bir başlıktır", "Bu bir resimdir" veya "Bu bir bağlantıdır" gibi tanımlamaları HTML ile yaparız.

## 1. Temel Sayfa İskeleti ve Etiket (Tag) Mantığı

HTML, **etiketler (tags)** kullanılarak yazılır. Bir etiket genellikle küçüktür `<` işareti ile başlar ve büyüktür `>` işareti ile biter. Çoğu etiketin bir açılışı (Örn: `<p>`) ve bir de kapanışı (Örn: `</p>`) vardır. Kapanış etiketlerinde her zaman bir eğik çizgi `/` bulunur.

Bir HTML dosyasının anatomisi şu şekildedir:

```html
<!-- Belge Türü Beyanı: Tarayıcıya bu belgenin HTML5 (en güncel sürüm) standartlarında yazıldığını söyler. Yazılmazsa tarayıcılar eski sürümlere göre yorum yapmaya çalışıp tasarımı bozabilir. -->
<!DOCTYPE html>

<!-- Kök Etiket: Tüm HTML kodlarını sarmalayan ana kapsayıcıdır.
"lang" özelliği (attribute): Sayfanın dilini belirtir. Ekran okuyucuların kelimeleri doğru aksanla okumasını ve Google Çeviri'nin sayfayı doğru algılamasını sağlar. "tr" Türkçe, "en" İngilizce demektir. -->
<html lang="tr">

<head>
    <!-- BAŞ KISIM: Ziyaretçinin sayfa üzerinde DOĞRUDAN göremediği, ancak tarayıcı ve arama motorları (Google) için hayati olan teknik ayarların bulunduğu kısımdır. -->
    
    <!-- Karakter Seti: UTF-8, dünyadaki hemen hemen tüm alfabeleri (Türkçe ç, ş, ğ, ö, ü dahil) ve hatta emojileri destekleyen evrensel karakter kodlamasıdır. Eğer bu eksik olursa Türkçe karakterler bozuk ("Åž" vb.) görünür. -->
    <meta charset="UTF-8">
    
    <!-- Sekme Başlığı: Tarayıcınızın üst sekmesinde görünen yazıdır. SEO (Arama Motoru Optimizasyonu) açısından sayfanın en önemli etiketidir. -->
    <title>Kapsamlı Web Eğitimim</title>
</head>

<body>
    <!-- GÖVDE: Kullanıcının sayfada gördüğü her şey (yazılar, resimler, butonlar) buraya yazılmak zorundadır. Head içine yazılan bir paragraf tarayıcıları şaşırtır. -->
    <h1>Ana Başlığımız</h1>
</body>

</html>
```

## 2. Metin Etiketleri ve Özellikleri (Attributes)

Etiketler bazen kendi başlarına yeterli bilgiyi taşıyamazlar. Ekstra bilgi vermek için **Özellikler (Attributes)** kullanılır. Özellikler daima açılış etiketinin içine yazılır.

### Başlıklar (Headings)
Altı seviye başlık vardır (`<h1>`'den `<h6>`'ya kadar). Başlıklar sadece yazıyı büyük göstermek için değil, sayfanın hiyerarşisini belirtmek için kullanılır. Google, sayfanın ne hakkında olduğunu `<h1>` etiketine bakarak anlar.
- **Kural:** Bir sayfada (SEO sağlığı için) **sadece bir adet `<h1>`** olmalıdır. Alt başlıklar önem sırasına göre `<h2>`, `<h3>` şeklinde inmelidir.

### Paragraflar ve Satır İçi (Inline) Etiketler
```html
<p>Bu bir paragraf etiketidir. Yeni bir paragrafa geçtiğinizde tarayıcı otomatik olarak alt satıra geçer ve biraz boşluk bırakır.</p>

<p>
    Bu cümlenin <strong title="Fareyle üzerine gelince görünen ipucu">çok önemli</strong> bir kısmı var. 
    Eğer sadece eğik (italik) yazmak isterseniz <em>bu etiketi</em> kullanırsınız.
</p>
```
- `title` Özelliği: Tüm HTML etiketlerine eklenebilir. Kullanıcı fareyi (mouse) o kelimenin veya resmin üzerinde beklettiğinde küçük bir bilgi kutucuğu çıkmasını sağlar.

## 3. Bağlantılar (Links) - `<a>` Etiketi

İnterneti "Ağ" yapan şey sayfalar arası bağlantılardır. Bu, `<a>` (Anchor - Çıpa) etiketi ile yapılır. Tek başına `<a>` hiçbir işe yaramaz, nereye gideceğini söyleyen `href` özelliğine ihtiyacı vardır.

```html
<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google'a Git</a>
```
- `href` (Hypertext Reference): Tıklanınca gidilecek hedef adresi (URL) veya dosya yolunu belirtir.
- `target`: Bağlantının nerede açılacağını belirler. 
  - `_blank`: En çok kullanılan değerdir. Linkin **yeni bir sekmede** açılmasını sağlar (Kullanıcının sizin sitenizi terk etmesini istemiyorsanız kullanılır).
  - `_self`: Varsayılan değerdir. Aynı sekmede açar.
- `rel="noopener noreferrer"`: Güvenlik amaçlıdır. Özellikle `target="_blank"` kullanıldığında, yeni açılan sitenin sizin sayfanıza JavaScript ile müdahale etmesini engeller. Her dış bağlantıda kullanılması şiddetle tavsiye edilir.

## 4. Resimler - `<img>` Etiketi

Resimler kapatma etiketi (`</img>` diye bir şey yoktur) olmayan, tekil etiketlerdir. Kendi başlarına var olurlar.

```html
<img src="https://ornek.com/doga.jpg" alt="Ormanda yürüyen bir geyik" width="600" height="400" loading="lazy">
```
- `src` (Source): Resmin bulunduğu adresi veya dosya yolunu belirtir. Bu olmazsa resim yüklenmez.
- `alt` (Alternative Text): **Asla atlanmamalıdır.** 
  1. İnternet yavaşsa veya resim silinmişse ekranda kırık resim simgesi yerine bu metin yazar.
  2. Görme engelliler için ekran okuyucu programlar bu metni sesli okur.
  3. Google Görseller aramasında resminizin çıkmasını sağlayan anahtar kelimelerdir.
- `width` ve `height`: Resmin genişlik ve yüksekliğini piksel (px) cinsinden rezerve eder. Resim yüklenene kadar sayfadaki metinlerin aşağı yukarı zıplamasını (Layout Shift) önler.
- `loading="lazy"`: Performans harikasıdır. Resim ekranın çok aşağılarındaysa, kullanıcı sayfayı aşağı kaydırana kadar resmi indirmez. Bu sayede sayfanız çok hızlı açılır.

## 5. Listeler

Bilgileri madde madde göstermek sayfayı okunabilir kılar. 

```html
<!-- Sırasız (Unordered) Liste: Maddelerin başında yuvarlak noktalar çıkar -->
<ul>
    <li>Birinci Madde (List Item)</li>
    <li>İkinci Madde</li>
</ul>

<!-- Sıralı (Ordered) Liste: Maddelerin başında 1, 2, 3 gibi sayılar veya harfler çıkar -->
<ol type="A">
    <li>Adım (Type="A" verdiğimiz için başında 1 yerine A harfi çıkar)</li>
    <li>Adım (B)</li>
</ol>
```
- `type` Özelliği (`<ol>` için): Sıralamanın şeklini değiştirir. `1` (Sayılar), `A` (Büyük Harfler), `a` (Küçük Harfler), `I` (Roma Rakamları).
