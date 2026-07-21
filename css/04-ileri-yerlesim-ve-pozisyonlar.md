# Bölüm 04: CSS Grid ve Karmaşık Pozisyonlar

Flexbox harikadır ancak tek bir ekseni (satırı VEYA sütunu) düşünür. Tasarımınız iki boyutluysa (Satranç tahtası, Instagram resim galerisi, Haber sitesi manşetleri gibi hem yatayda hem dikeyde karmaşık düzenler), o zaman devreye **CSS Grid (Izgara) Modeli** girer.

## 1. CSS Grid (Izgara) Nasıl Çalışır?

Tıpkı Flexbox gibi, emri dışarıdaki ebeveyn kutuya verirsiniz, o içini tablo gibi satır ve sütunlara böler.

```html
<div class="galeri-kapsayici">
    <div class="resim">1</div>
    <div class="resim">2</div>
    <div class="resim">3</div>
    <div class="resim">4</div>
</div>
```

```css
.galeri-kapsayici {
    /* Kutuyu grid (ızgara) sistemine geçirir */
    display: grid;
    
    /* SÜTUN TANIMLARI (Columns):
       Buraya yazdığınız her değer bir sütun oluşturur.
       "1fr 1fr 1fr" demek: 3 eşit sütun oluştur. 
       "fr" (fraction), CSS Grid'e özel "kalan alanın bir payı" anlamına gelir.
       Örneğin: "2fr 1fr 1fr" yazsaydınız, ilk sütun diğerlerinden 2 kat daha geniş olurdu. */
    grid-template-columns: 1fr 1fr 1fr;
    
    /* SATIR TANIMLARI (Rows):
       Gerekli değildir, yazmazsanız Grid otomatik (auto) satır açar.
       Ama örneğin "ilk satır 200px, ikinci satır 400px olsun" derseniz: */
    grid-template-rows: 200px 400px;
    
    /* GAP: Tıpkı Flexbox'taki gibi, sütun ve satırlar arasına boşluk bırakır. */
    gap: 15px;
}
```

### Güçlü Grid Özelliği: `repeat()` ve `minmax()`
Eğer 10 sütun yazacaksanız `1fr 1fr 1fr...` yazmak yorucudur.
```css
.galeri-kapsayici {
    /* Ekrana sığdığı kadar sütun (auto-fit) oluştur. 
       Her sütun EN AZ 250px olsun, yer kalırsa 1fr (eşit) kadar büyüsün! 
       (Bu tek satır kod, media query olmadan kusursuz mobil uyumluluk sağlar!) */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

## 2. Pozisyonlar (Positioning) Sistemi

Bazen nesneleri Grid veya Flex kurallarının dışına çıkartıp, ekranın belli bir noktasına (Örn: Sağ alttaki Yukarı Çık butonu, veya sürekli yukarıda duran Navbar) çivilemek isteriz. İşte bu `position` özelliği ile yapılır.

### A. Relative (Göreceli) ve Absolute (Mutlak) Evliliği
En çok kullanılan kalıptır. `position: absolute;` alan bir eleman normal akıştan kopar, havaya kalkar ve `top`, `bottom`, `left`, `right` komutlarıyla hareket ettirilebilir. Fakat bir sorunu vardır: Nereye göre hareket edecek? Eğer hiçbir şey yapmazsanız ekranın sol üst köşesini (Body) sıfır noktası kabul eder.

İçindeki Absolute elemanı KENDİ SINIRLARI İÇİNDE tutmak istiyorsanız, dışındaki kapsayıcıya KESİNLİKLE `position: relative;` vermelisiniz. "Benim sınırlarım senin koordinat sistemindir" demektir.

```html
<div class="cerceve">
    <div class="etiket">Yeni!</div>
</div>
```

```css
.cerceve {
    /* Sen bu etiket için bir hapishanesin, senin sınırlarından dışarı çıkamaz */
    position: relative; 
    width: 300px; height: 300px; border: 1px solid black;
}

.etiket {
    /* Havaya kalk ve kilitlen */
    position: absolute;
    /* Cercevenin tavanından 10px in, sağından 10px uzaklaş */
    top: 10px;
    right: 10px;
    background-color: red; color: white;
}
```

### B. Fixed (Sabitlenmiş)
`absolute` gibidir ancak her zaman Ekranı (Viewport) referans alır. Kullanıcı sayfayı fareyle aşağı kaydırsa (Scroll yapsa) bile `fixed` eleman asla hareket etmez, o koordinatta çivilenmiş kalır.
- **Kullanım Yeri:** Sürekli görünen canlı destek ikonları, ekranı kaplayan (Modal/Popup) karanlık arka planlar.
```css
.canli-destek {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

### C. Sticky (Yapışkan)
`relative` ve `fixed` özelliklerinin melezidir. Eleman normalde sayfayla birlikte kayar, ancak verdiğiniz bir koordinata (Örn: Ekranın en üstüne, `top: 0`) değdiği anda `fixed` gibi davranıp oraya yapışır.
- **Kullanım Yeri:** Uzun tablolardaki başlık satırları veya sayfayı aşağı kaydırınca ekrana yapışan Üst Menüler (Navbar).
```css
.ust-menu {
    position: sticky;
    top: 0; /* Ekranın 0. pikseline değdiğinde yapış */
    z-index: 100; /* Yapıştıktan sonra alttan geçen yazıların ÜSTÜNDE kalsın diye derinlik veriyoruz. Z-index sayı büyüdükçe kullanıcıya daha yakındır (öndedir). */
}
```
