# Bölüm 03: Medya Yönetimi (Video, Ses ve Dış İçerik)

Web sitenize zengin içerik katmak, sadece metin ve küçük resimlerle sınırlı kalmamaktır. Modern tarayıcılar (HTML5) harici bir eklentiye (Flash Player vb.) ihtiyaç duymadan ses ve video oynatabilme kapasitesine sahiptir.

## 1. Kendi Sunucumuzdaki Videoyu Oynatmak (`<video>`)

Eğer video dosyası (örneğin `.mp4`) kendi sunucunuzda duruyorsa bu etiketi kullanırız.

```html
<video width="800" height="450" controls poster="video-kapak.jpg" preload="metadata">
    <!-- source etiketi, tarayıcı ilk kaynağı oynatamazsa (format uyumsuzluğu) ikinciye geçebilsin diye çoklu verilebilir -->
    <source src="tanitim.mp4" type="video/mp4">
    <source src="tanitim.webm" type="video/webm">
    
    <!-- Tarayıcı çok eskiyse video yerine bu metin görünür. -->
    <p>Tarayıcınız HTML5 video etiketini desteklemiyor.</p>
</video>
```

### Video Etiketi Özellikleri (Attributes)
- `controls`: Bu kelimeyi eklerseniz tarayıcının yerleşik oynatıcısı belirir (Oynat, duraklat, ses seviyesi, tam ekran düğmeleri). Eklenmezse video sadece bir resim gibi durur, oynatılamaz.
- `poster`: Video henüz oynatılmadan (veya yüklenmeden) önce gösterilecek olan küçük resim (thumbnail / kapak fotoğrafı) yoludur.
- `autoplay`: Sayfa açılır açılmaz videonun otomatik başlamasını ister. **Ancak modern tarayıcılar, kullanıcıyı rahatsız etmemek için sadece `muted` (sessiz) olan videoların otomatik başlamasına izin verir.** `autoplay muted` birlikte kullanılmalıdır.
- `loop`: Video bitince başa sarıp sonsuza kadar tekrar etmesini sağlar (Genellikle arka plan videolarında kullanılır).
- `preload`: Videonun sayfa yüklenirken arka planda indirilip indirilmeyeceğini belirler.
  - `auto`: Bant genişliği harcamasına bakmadan videoyu indirmeye başlar (Sayfa hızlı açılmaz, video tıklandığında hemen açılır).
  - `metadata`: (Önerilen) Videonun sadece süresini ve ilk karesini indirir. Kullanıcı "Play" tuşuna basana kadar videoyu indirmez, sayfa hızını korur.

## 2. Ses Oynatmak (`<audio>`)

Video ile tamamen aynı mantıkta çalışır, sadece görsel boyutları yoktur.

```html
<audio controls loop>
    <source src="podcast.mp3" type="audio/mpeg">
    <source src="podcast.ogg" type="audio/ogg">
    Ses desteklenmiyor.
</audio>
```

## 3. Dış İçerikleri Gömmek (Iframe)

İnternetteki başka bir web sayfasını, bir YouTube videosunu veya Google Haritasını kendi sitemizin içinde bir "pencere" açarak gösterme yöntemidir. `<iframe>` (Inline Frame) bunun için kullanılır.

```html
<!-- YouTube'dan bir video gömme örneği -->
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
```

### Iframe Etiketi Özellikleri
- `src`: Gösterilecek olan sayfanın veya medyanın tam (Absolute) adresidir.
- `frameborder="0"`: Iframe'in etrafındaki çirkin eski tip çerçeveyi kaldırır. (Günümüzde CSS ile `border: none;` yapmak daha yaygındır).
- `allowfullscreen`: Kullanıcının iframin sağ altındaki "Tam Ekran" butonuna basmasına tarayıcının izin vermesini sağlar.
- `allow="..."`: İframe içinde çalışan sitenin bilgisayarınızdaki hangi donanımlara (kamera, jiroskop vb.) erişebileceğini sınırlayan veya izin veren güvenlik duvarıdır.

> **Güvenlik Uyarısı:** Tanımadığınız veya güvenmediğiniz siteleri `iframe` ile gömmeyin. Kötü niyetli siteler, iframe üzerinden kullanıcının tarayıcısında açıklar bulmaya (Örn: Clickjacking) çalışabilir.
