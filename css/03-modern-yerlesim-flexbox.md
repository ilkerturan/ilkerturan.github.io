# Bölüm 03: Esnek Kutu Yerleşimi (Flexbox)

Eskiden yan yana kutular dizmek (`float` vb.) işkenceydi. **Flexbox** (Esnek Kutu Modeli) sayesinde elemanları yan yana dizmek, ortalamak ve hizalamak çocuk oyuncağıdır.

## 1. Flexbox'ı Başlatmak

Flexbox kullanmak için, dizmek istediğiniz elemanların **Dışındaki Kutuya (Container)** `display: flex` vermelisiniz.

```html
<div class="kapsayici">
    <div class="kutu">1</div>
    <div class="kutu">2</div>
    <div class="kutu">3</div>
</div>
```

```css
.kapsayici {
    display: flex; /* İçindeki çocukları yan yana dizer */
}
```

## 2. Ana Eksen (Yatay) Hizalama: Justify-Content

```css
.kapsayici {
    display: flex;
    justify-content: flex-start;    /* Sola yasla (Varsayılan) */
    justify-content: flex-end;      /* Sağa yasla */
    justify-content: center;        /* Tam ORTAYA al */
    justify-content: space-between; /* Aralarını aç, ilkini başa, sonuncuyu sona daya */
    justify-content: space-around;  /* Her kutunun etrafında eşit boşluk bırak */
}
```

## 3. Çapraz Eksen (Dikey) Hizalama: Align-Items

```css
.kapsayici {
    display: flex;
    height: 300px; /* Bir yükseklik olmalı ki dikey hareket görelim */
    
    align-items: flex-start; /* Yukarı yasla */
    align-items: flex-end;   /* Aşağı yasla */
    align-items: center;     /* Dikeyde ORTAYA al */
}
```

> **Sihirli Taktik:** Bir nesneyi hem yatay hem dikey tam ortalamak istiyorsanız:
> `display: flex; justify-content: center; align-items: center;`
