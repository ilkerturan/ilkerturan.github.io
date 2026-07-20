# Bölüm 02: Semantik HTML ve SEO

Modern web geliştirmede "Çalışıyorsa dokunma" mantığı HTML için geçerli değildir. Sayfanızın görsel olarak güzel görünmesi, kodunuzun kaliteli olduğu anlamına gelmez.

---

## 1. Div Çöplüğü (Div Soup) Nedir?
Eski zamanlarda geliştiriciler sayfanın her bir parçasını bölmek için sürekli `<div>` (Bölüm - Division) etiketini kullanırlardı.
Menü için `<div>`, alt bilgi için `<div>`, içerik için `<div>`... 

Bu durum **Google Arama Motoru (SEO)** ve Görme Engelli kullanıcıların ekran okuyucu yazılımları için bir kabustur. Çünkü Chrome veya Google o div'in içinde ne olduğunu (Önemli bir makale mi, yoksa sadece gereksiz bir reklam banner'ı mı) anlayamaz.

## 2. Semantik (Anlamsal) Etiketler
HTML5 ile birlikte "Ne işe yaradığını ismiyle anlatan" Semantik etiketler geldi. Artık kodlarımızı makinelere anlatabiliyoruz.

*   **`<header>`:** Sayfanın veya bölümün en üst kısmı (Logo ve ana menünün olduğu yer).
*   **`<nav>`:** Navigasyon (Menü) linklerinin bulunduğu alan.
*   **`<main>`:** Sayfanın asıl odak noktası, ana içeriği.
*   **`<article>`:** Kendi başına anlam ifade eden, bağımsız haber veya blog yazısı bölümü.
*   **`<aside>`:** Sağ veya sol taraftaki yan menü / reklam alanı.
*   **`<footer>`:** Sayfanın en altındaki (İletişim, Telif Hakkı) bilgiler.

### Kötü Kod (Div Çöplüğü):
```html
<div class="ust-kisim">
    <div class="menu">Anasayfa - İletişim</div>
</div>
<div class="icerik">
    <div class="yazi">Burada makale var.</div>
</div>
```

### İyi Kod (Semantik):
```html
<header>
    <nav>Anasayfa - İletişim</nav>
</header>
<main>
    <article>Burada makale var.</article>
</main>
```
