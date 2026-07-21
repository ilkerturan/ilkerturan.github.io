# Bölüm 05: Animasyonlar ve Geçişler

Web sitenize biraz hayat katmak için, kullanıcının fareyle yaptığı hareketlere veya zamanlayıcılara duyarlı animasyonlar ekleyebilirsiniz.

## 1. Hover (Üzerine Gelme) ve Transition (Yumuşak Geçiş)

Bir butonun üzerine fare ile gelince (hover) rengi aniden değişmesin, yavaşça (yumuşak bir geçişle) değişsin isteriz.

```css
.buton {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    
    /* Herhangi bir değişiklik olursa (all), bu değişikliği 0.3 saniyede yap */
    transition: all 0.3s ease-in-out;
}

/* Kullanıcı fareyi (mouse) .buton class'lı nesnenin üzerine getirdiğinde: */
.buton:hover {
    background-color: red;
    /* Butonu %10 büyüt */
    transform: scale(1.1); 
}
```

## 2. Keyframes (Özel Animasyon Senaryoları)

Kendi animasyon filminizi yazar gibi, %0'dan %100'e kadar hangi saniyede ne olacağını belirtebilirsiniz.

```css
/* Önce "ziplama" adında bir animasyon senaryosu yazalım */
@keyframes ziplama {
    0%   { transform: translateY(0); }       /* Başlangıçta yerinde dur */
    50%  { transform: translateY(-20px); }   /* Yarısında 20px yukarı zıpla */
    100% { transform: translateY(0); }       /* Sonunda tekrar yerine in */
}

.kutu {
    width: 50px; height: 50px; background: red;
    
    /* Zıplama animasyonunu çalıştır, 1 saniye sürsün, sonsuza kadar (infinite) tekrar etsin */
    animation: ziplama 1s infinite;
}
```
