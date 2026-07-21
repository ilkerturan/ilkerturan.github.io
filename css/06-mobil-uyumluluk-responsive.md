# Bölüm 06: Mobil Uyumluluk (Responsive Tasarım)

Yaptığınız web sitesi bilgisayarda harika görünüp cep telefonunda minicik, okunaksız bir hale geliyorsa başarısız bir tasarımdır. Siteleri ekran boyutuna göre şekillendirme işlemine **Responsive (Duyarlı) Tasarım** denir.

## 1. Viewport Meta Etiketi

Bunun çalışabilmesi için HTML'inizin `<head>` kısmında şu satırın KESİNLİKLE bulunması şarttır:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 2. Medya Sorguları (Media Queries)

CSS'te belirli bir ekran genişliğinin altına (veya üstüne) inildiğinde, CSS kodlarının değişmesini sağlayan yapıya `@media` sorgusu denir.

```css
/* VarsaYılan (Masaüstü) Tasarım: Kutular yan yana (Grid 3 sütun) */
.icerik-alani {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; 
}

/* EKRAN GENİŞLİĞİ 768px'den KÜÇÜK OLDUĞUNDA (Tablet ve Telefonlar) AŞAĞIDAKİLERİ EZ: */
@media (max-width: 768px) {
    .icerik-alani {
        /* Yan yana dizmeyi iptal et, tek sütun alt alta (1fr) yap */
        grid-template-columns: 1fr;
    }
    
    body {
        /* Telefonda yazılar çok küçük kalmasın diye büyüt */
        font-size: 18px;
    }
}
```

## 3. Responsive Resimler Taktikleri

Kocaman bir masaüstü resmini telefonda gösterirseniz ekranın dışına taşar. Tüm resimlerin kendi kabına (içinde bulunduğu kutuya) göre küçülüp büyümesi için altın kural şudur:

```css
img {
    max-width: 100%; /* Kendi kutundan dışarı taşma */
    height: auto;    /* En/Boy oranını bozma (sündürme) */
}
```
