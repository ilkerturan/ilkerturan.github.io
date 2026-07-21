# Bölüm 06: Mobil Uyumluluk (Responsive Tasarım) ve Medya Sorguları

Bugün web trafiğinin %60'ından fazlası cep telefonlarından gelmektedir. Sadece masaüstü bilgisayarlara göre yapılmış geniş, kütük gibi bir site, telefonda açıldığında karınca duasına dönüşür ve kullanıcı o siteyi saniyeler içinde terk eder.

**Responsive (Duyarlı) Tasarım**, ekranın genişliğine göre esneyen, büzüşen veya tamamen şekil değiştiren, yani cihazın ekran boyutuna "duyarlılık" gösteren tasarım mantığıdır.

## 1. Altın Kural: Viewport Meta Etiketi

Mobil uyumluluğun çalışabilmesi için, telefon tarayıcısına "Beni masaüstü sitesi gibi uzaklaştırarak (zoom out) açma, benim kendi genişliğimi telefonun donanımsal ekran genişliği kabul et" demeniz KESİNLİKLE ZORUNLUDUR. HTML dosyasının `<head>` etiketleri arasında şu kod olmalıdır:

```html
<!-- Cihaz genişliği (device-width) neyse, tasarımın %100 genişliği o olsun. Ve başlangıç zoom seviyesi 1.0 olsun. -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 2. Medya Sorguları (`@media` Queries)

CSS'te, ekranın boyutlarına (veya yatay/dikey tutulmasına) göre çalışan "Eğer (If)" blokları yazmanızı sağlayan sisteme Medya Sorguları denir. Belirli şartlar sağlandığında içindeki CSS kodları devreye girer ve eski kodları ezer.

```css
/* 1. MASAÜSTÜ TASARIMI (Varsayılan Yazılanlar) */
.yan-yana-kartlar {
    display: flex;
    flex-direction: row; /* Yan yana diz */
    gap: 20px;
}
.baslik {
    font-size: 32px;
}

/* 2. TABLET EKRANLARI (Genişliği en fazla 1024px olan cihazlar) */
/* Eğer ekran genişliği 1024px'in altındaysa bu süslü parantez içine gir */
@media (max-width: 1024px) {
    .baslik {
        font-size: 28px; /* Tablette yazıyı biraz küçült, sığsın */
    }
}

/* 3. CEP TELEFONLARI (Genişliği en fazla 768px olan cihazlar) */
@media (max-width: 768px) {
    .yan-yana-kartlar {
        /* Telefonda ekran dar olduğu için yan yana sığmazlar. 
           Flex yönünü sütun (column) yap, alt alta dizilsinler! */
        flex-direction: column; 
    }
    
    .baslik {
        font-size: 24px; /* Telefonda yazıyı iyice küçült */
    }
}
```

> **Önemli Kural:** Medya sorgularında her zaman **Cascade (Aşağı Doğru Akış)** mantığını unutmayın. `@media` blokları daima CSS dosyanızın **EN ALTINDA** yer almalıdır ki, üstteki genel kodları başarıyla ezebilsinler (geçersiz kılabilsinler).

## 3. Akışkan Resimler ve Göreceli Birimler (%, vw, rem)

Telefonda taşan, sayfada yatay kaydırma çubuğu (Horizontal Scroll) çıkaran en büyük düşmanlar genişliği `px` ile sabitlenmiş resimlerdir. Pikseller katıdır, ekran daralsa bile küçülmezler.

### A. Asla Taşmayan (Responsive) Resim Kodu
Aşağıdaki kodu projenizin en başına (Reset CSS kısmına) eklerseniz, hiçbir resim babasının kutusundan dışarı taşamaz.
```css
img {
    /* Maksimum kendi genişliğin kadar ol ama içinde bulunduğun alan (parent div) daralırsa sen de %100 oranında daral! */
    max-width: 100%;
    /* Genişlik küçülürse yüksekliği de orantılı olarak otomatik küçült ki resim ezilmesin (sünmesin). */
    height: auto; 
    /* Bazen resimlerin altında kalan ufak piksel boşluğunu yok eder */
    display: block; 
}
```

### B. Göreceli Birimler (Units)
- `px` (Piksel): Mutlaktır. Ekrana göre asla esnemez.
- `%` (Yüzde): Görecelidir. İçinde bulunduğu üst kapsayıcının genişliğinin yüzdesi kadar yer kaplar. (Örn: `width: 50%` ebeveynin yarısıdır).
- `vw` (Viewport Width): Yüzdeye benzer ama ebeveyne bakmaz, doğrudan tarayıcı penceresinin (ekranın) genişliğini %100 olarak alır. `width: 100vw;` = Ekranı tam kapla.
- `rem` (Root EM): Kök font büyüklüğünün (Genelde tarayıcılarda varsayılan 16px'dir) katlarıdır. `font-size: 2rem;` = 32px yapar. Kullanıcı telefondan veya tarayıcı ayarlarından erişilebilirlik için "Yazıları Büyüt" seçeneğini kullanırsa, `rem` ile yazılan her şey ona göre otomatik uyum sağlar.
