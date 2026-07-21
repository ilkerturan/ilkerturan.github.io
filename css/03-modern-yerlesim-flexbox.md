# Bölüm 03: Esnek Kutu Yerleşimi (Flexbox Modeli)

Eski dönemlerde (2015 öncesi) kutuları yan yana dizmek için `float`, `display: table` veya `inline-block` gibi "aslında o iş için üretilmemiş" özellikler (hacks) kullanılırdı. Sayfalar birbirine girer, öğeler bir türlü ortaya hizalanamazdı. **Flexbox (Flexible Box Layout)** bu kaosu bitirmek ve tek eksenli (sadece satır VEYA sadece sütun) hizalamaları çocuk oyuncağına çevirmek için icat edildi.

## 1. Flex Container (Kapsayıcı) ve Flex Item (Çocuklar)

Flexbox'ın altın kuralı şudur: **Asla hizalanacak çocuğa doğrudan "sen şuraya git" demezsiniz. Emri "Baba" (Container) kutuya verirsiniz, çocuklar o kurala uyar.**

```html
<div class="baba-kutu"> <!-- Flex Container -->
    <div class="cocuk">1</div> <!-- Flex Item -->
    <div class="cocuk">2</div> <!-- Flex Item -->
</div>
```

Önce dış kutuyu "esnek" hale getirmeliyiz:
```css
.baba-kutu {
    /* Artık içindeki her eleman bir flex item'dır. Alt alta dizilen blok elementler anında YAN YANA dizilir. */
    display: flex;
    
    /* Flex Yönü: Satır mı (row), sütun mu (column)?
       - row (varsayılan): Çocukları soldan sağa yan yana dizer.
       - column: Çocukları yukarıdan aşağı dizmeye devam eder ama flex güçlerini kullanmanızı sağlar. */
    flex-direction: row;
    
    /* Sarmalama (Wrap): Çocukların toplam genişliği ekranı aşarsa ne olsun?
       - nowrap (varsayılan): Çocukları sıkıştırıp ezer, ama alt satıra atmaz.
       - wrap: Sığmayan çocukları efendi gibi bir alt satıra atar (Responsive tasarım için kritiktir). */
    flex-wrap: wrap;
}
```

## 2. Ana Eksende Hizalama: `justify-content`

Eğer `flex-direction: row` ise ana eksen X (yatay) eksenidir. Çocukların yatayda nerede duracağını belirler.

```css
.baba-kutu {
    display: flex;
    
    /* flex-start: (Varsayılan) Sola yaslar.
       flex-end: Sağa yaslar.
       center: Tam ortaya kümeler.
       space-between: İlk çocuğu en sola, son çocuğu en sağa yapıştırır, aradaki boşlukları eşit böler. (Örn: Sol köşede Logo, Sağ köşede Menü için mükemmeldir).
       space-around: Her çocuğun sağına ve soluna eşit boşluk koyar. */
    justify-content: space-between; 
}
```

## 3. Çapraz Eksende Hizalama: `align-items`

Eğer `flex-direction: row` ise çapraz eksen Y (dikey) eksenidir. Çocukların kutu içindeki dikey pozisyonunu belirler. Tabii dikeyde bir hizalama yapabilmesi için Baba kutunun bir dikey yüksekliği (Örn: `height: 300px`) olması gerekir.

```css
.baba-kutu {
    display: flex;
    height: 300px;
    
    /* stretch: (Varsayılan) Çocukların yüksekliği belirtilmemişse, onları baba kutu kadar sündürür/uzatır.
       flex-start: Çocukları yukarıya (tavana) yapıştırır.
       flex-end: Çocukları aşağıya (zemine) yapıştırır.
       center: Çocukları dikeyde TAM ORTAYA alır. (Geliştiricilerin yıllardır aradığı kutsal kase!) */
    align-items: center; 
}
```

### Kutsal Ortalamanın Sırrı
Bir div'in içindeki yazıyı, ikonu veya kutuyu **HEM YATAY HEM DİKEYDE kusursuz bir şekilde ortalamak** istiyorsanız, ihtiyacınız olan üç satır sihirli kod budur:
```css
.merkez-kutu {
    display: flex;
    justify-content: center; /* Yatay orta */
    align-items: center;     /* Dikey orta */
}
```

## 4. Çocuklara Özel Müdahale (Gap ve Flex)

```css
.baba-kutu {
    display: flex;
    /* gap: Çocukların arasına (sadece aralarına, dışlarına değil) tam 20px boşluk koyar. (Margin kullanmaktan kat kat iyidir). */
    gap: 20px; 
}

.cocuk {
    /* flex-grow: Kutunun artan boşlukları ne kadar iştahla yutacağını (büyüyeceğini) belirler. 
       flex: 1 verirsek, kutu bulunabileceği maksimum genişliğe kadar kendini esnetir. */
    flex: 1; 
}
```
