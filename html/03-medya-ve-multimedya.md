# Bölüm 03: Medya (Video, Ses ve Haritalar)

Web siteleri sadece metinlerden ibaret değildir. Kendi sunucumuzdaki veya başka platformlardaki (YouTube, Google Maps) medyaları sitemize gömebiliriz.

## 1. Video Ekleme

HTML5 ile birlikte video oynatmak çok kolaylaştı.

```html
<video width="640" controls>
    <source src="tanitim.mp4" type="video/mp4">
    Tarayıcınız bu videoyu desteklemiyor.
</video>
```
- `controls`: Durdur/Başlat, Ses tuşlarının (Player) görünmesini sağlar.
- `autoplay muted`: Video sayfaya girer girmez **sessiz** olarak otomatik başlar (Sessiz olmazsa tarayıcı otomatik oynatmaya izin vermez).

## 2. Ses (Audio) Ekleme

Tıpkı video gibi çalışır:
```html
<audio controls>
    <source src="muzik.mp3" type="audio/mpeg">
</audio>
```

## 3. Başka Siteleri Gömmek (Iframe)

YouTube videolarını veya Google Haritalar'ı sitenizde göstermenin yolu `<iframe>` etiketidir. Başka bir web sayfasını sizin sayfanızın içinde bir kutuda açar.

**Örnek: YouTube Videosu Ekleme**
```html
<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    frameborder="0" 
    allowfullscreen>
</iframe>
```

> **Uyarı:** Sitenize gereksiz yere çok fazla iframe veya video eklemek sayfanın açılış hızını ciddi oranda yavaşlatır.
