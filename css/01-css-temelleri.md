# Bölüm 01: CSS Temelleri ve Seçicilerin Derinlikleri

HTML iskeletimizi kurduktan sonra ona renk, biçim ve tipografi katmak için **CSS** (Cascading Style Sheets - Basamaklı Stil Şablonları) kullanırız. "Cascading" (Basamaklı) terimi, CSS'in en temel felsefesini yansıtır: Yukarıdan aşağıya doğru akan kurallar silsilesi. Eğer aynı elemente iki farklı kural yazarsanız, en alttaki (en son yazılan) veya en spesifik (en nokta atışı) olan kazanır.

## 1. CSS Nasıl ve Nereye Eklenir?

CSS eklemenin 3 farklı yolu vardır, ancak her birinin kullanım amacı farklıdır.

### A. Harici (External) CSS (En İyi Yöntem)
Tüm CSS kodları ayrı bir dosyada (`style.css`) tutulur ve HTML'in `<head>` etiketine bağlanır. Sayfanın boyutu küçülür, kodlar temiz kalır ve tarayıcı bu CSS dosyasını bir kere indirip önbelleğine (Cache) aldığı için sayfalarınız şimşek hızında açılır.
```html
<!-- rel="stylesheet": Bu bağlantının bir stil şablonu olduğunu belirtir. -->
<!-- href: CSS dosyasının nerede olduğunu (yolunu) gösterir. -->
<link rel="stylesheet" href="css/style.css">
```

### B. Dahili (Internal) CSS
Kodlar doğrudan HTML sayfasının `<head>` etiketi içindeki `<style>` etiketine yazılır. Sadece o sayfaya özgü, başka sayfalarda kullanılmayacak tasarımlar için tercih edilebilir (Önerilmez).
```html
<style>
    body { background-color: white; }
</style>
```

### C. Satır İçi (Inline) CSS (Kaçınılması Gereken Yöntem)
Kodu doğrudan HTML etiketinin içine `style` özelliği olarak yazmaktır. Bakımı felakettir, kodu çorbaya çevirir. Sadece JavaScript ile dinamik anlık stil değişimlerinde kullanılmalıdır.
```html
<p style="color: red; font-size: 20px;">Kırmızı Paragraf</p>
```

## 2. Seçiciler (Selectors) ve Öncelik Kuralları

CSS, HTML elementlerini bulmak için seçicileri kullanır. Kime makyaj yapılacağını belirlediğimiz kısımdır.

```css
/* 1. Element (Etiket) Seçici: Spesifikliği en zayıf olandır. Tüm <p> etiketlerini bulur. */
p {
    color: gray;
}

/* 2. Class (Sınıf) Seçici: HTML'de class="uyari" yazan her şeyi bulur. Nokta (.) ile başlar. 
   Birden fazla farklı element aynı sınıfı kullanabilir (Örn: hem buton hem paragraf "uyari" class'ına sahip olabilir). */
.uyari {
    color: orange;
}

/* 3. ID (Kimlik) Seçici: HTML'de id="baslik" yazanı bulur. Kare (#) ile başlar.
   KURAL: Bir sayfada aynı ID'ye sahip birden fazla element OLAMAZ. ID benzersizdir (T.C. Kimlik No gibi). Sınıflardan çok daha güçlüdür. */
#baslik {
    color: red;
}

/* 4. Evrensel (Universal) Seçici: Sayfadaki İSTİSNASIZ her şeyi seçer. Yıldız (*) ile başlar. */
* {
    margin: 0;
    padding: 0;
}
```

**Baskınlık (Specificity) Savaşı:** Eğer bir paragrafa hem element seçiciyle "mavi" ol dediniz, hem de class seçiciyle "kırmızı" ol dediniz; sınıf (class) seçici daha baskın olduğu için paragraf kırmızı olur. Sıralama zayıftan güçlüye şöyledir: Element < Class < ID < Inline Style < `!important`.

## 3. Temel Görünüm ve Tipografi Özellikleri

CSS ile en çok değiştirdiğimiz alanlar metinler ve renklerdir.

```css
.makale-metni {
    /* Yazı Tipi (Font): Sistemde Roboto yoksa Helvetica, o da yoksa düz bir sans-serif (tırnaksız) font kullan. */
    font-family: "Roboto", "Helvetica", sans-serif;
    
    /* Font Kalınlığı: 400 normal, 700 kalın (bold), 900 ekstra kalındır. */
    font-weight: 400; 
    
    /* Satır Yüksekliği: Satırlar arasına nefes aldırır. Genellikle 1.5 veya 1.6 okunabilirliği artırır. */
    line-height: 1.6;
    
    /* Yazı Hizalama: left (sola), right (sağa), center (ortaya), justify (iki yana yasla - dergi gibi). */
    text-align: justify;
    
    /* Metin Dekorasyonu: Genellikle linklerin altındaki o çirkin çizgiyi kaldırmak için "none" yapılır. Veya "underline" ile altı çizilir. */
    text-decoration: none;
    
    /* Metin Dönüşümü: Tüm harfleri büyütür (uppercase), küçültür (lowercase) veya kelimelerin ilk harfini büyütür (capitalize). */
    text-transform: uppercase;
}
```
