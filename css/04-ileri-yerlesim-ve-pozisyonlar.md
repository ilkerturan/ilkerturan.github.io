# Bölüm 04: CSS Grid ve Pozisyonlar

Flexbox tek boyutlu (sadece satır veya sadece sütun) dizilimler içindir. Satranç tahtası veya Instagram profil sayfası gibi 2 boyutlu (hem satır hem sütun) yapılar için **CSS Grid** kullanılır.

## 1. CSS Grid Kullanımı

```html
<div class="izgara">
    <div>1</div><div>2</div><div>3</div>
    <div>4</div><div>5</div><div>6</div>
</div>
```

```css
.izgara {
    display: grid;
    /* 3 sütun olsun, hepsi eşit parçada (1 fraction) alanı kaplasın */
    grid-template-columns: 1fr 1fr 1fr;
    /* Kutular arasına 10px boşluk bırak */
    gap: 10px; 
}
```

## 2. Pozisyonlar (Positioning)

Bir elemanı normal akıştan koparıp sayfanın istediğimiz bir yerine (Örn: Sağ alt köşedeki WhatsApp butonu) yapıştırmak için pozisyonları kullanırız.

### Relative ve Absolute Birlikteliği
Bir kutuyu, başka bir kutunun içinde özgürce hareket ettirmek istiyorsak:
1. Dış kutuya `position: relative;` veririz (Sen burada dur, sınırlar sensin).
2. İç kutuya `position: absolute;` veririz (Ben dış kutunun sınırlarına göre serbestim).

```css
.dis-kutu {
    position: relative;
    width: 300px; height: 300px;
}
.ic-kutu {
    position: absolute;
    bottom: 0; /* Dış kutunun en altına in */
    right: 0;  /* Dış kutunun en sağına yapış */
}
```

### Fixed ve Sticky
- **Fixed:** Ekrana (Tarayıcı penceresine) yapışır. Fareyle aşağı kaydırsanız bile orada kalır (Örn: Chat Butonu).
- **Sticky:** Kaydırırken sayfayla beraber kayar ama belirlediğimiz bir noktaya (Örn: `top: 0;`) gelince ekrana kilitlenir kalır (Örn: Üst Menüler).
