# Bölüm 05: CSS Animasyonları ve Geçişler (Transitions)

Statik, kütük gibi duran web sayfaları kullanıcıları sıkar. Bir butona gelindiğinde hafifçe renk değiştirmesi veya sayfa açıldığında bir resmin soldan kayarak gelmesi modernliğin (ve mikro etkileşimlerin) temelidir. CSS, JavaScript'e hiç bulaşmadan inanılmaz animasyonlar yapmanızı sağlar.

## 1. Geçişler (Transitions) ve Durumlar (States)

CSS'te elemanların "Durumları" vardır. Buna sözde sınıf (Pseudo-class) denir.
- `:hover` -> Fareyle üzerine gelindiğinde (Mouse over)
- `:active` -> Tıklama eylemi tam yapılırken (Mouse click)
- `:focus` -> (Genelde inputlarda) Tıklanıp içine girildiğinde, klavye ile odaklanıldığında.

Bir durum değiştiğinde (Örn: Rengi Mavi'den Kırmızı'ya geçerken), bu değişimin aniden değil de süzülerek olmasını istiyorsak `transition` özelliğini kullanırız.

```css
.basit-buton {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border-radius: 5px; /* Köşeleri 5px yuvarlat */
    
    /* TRANSITION YAPISI: Hangi özellik değişecek? Ne kadar sürede? Hangi ivmeyle? */
    /* all: Arka plan, yazı rengi, boyut gibi değişen her şeye animasyon uygula.
       0.3s: Geçiş 0.3 saniyede (300ms) tamamlansın. İdeal hız 0.2s - 0.4s arasıdır.
       ease-in-out: Geçiş ivmesi. Yavaş başla, ortada hızlan, yavaş bitir demektir (Göz için en doğal olanıdır). */
    transition: all 0.3s ease-in-out;
}

/* Fare üzerine geldiğinde: */
.basit-buton:hover {
    background-color: #2980b9; /* Renk hafifçe koyulaşır */
    
    /* transform: Öğeyi sağa sola yatırmak, büyütmek veya döndürmek için kullanılır. Performans (FPS) açısından margin/padding değiştirmekten ÇOK DAHA iyidir, çünkü doğrudan Ekran Kartı (GPU) tarafından hesaplanır.
       scale(1.05): Öğeyi orijinal boyutunun %105'i kadar, yani %5 büyüt. */
    transform: scale(1.05); 
}
```

## 2. 2D ve 3D Dönüşümler (Transform)

Animasyonlarda (veya sabit tasarımlarda) bir öğenin geometrisiyle oynamak için `transform` kullanılır:
- `translate(X, Y)`: Öğeyi X (yatay) veya Y (dikey) ekseninde kaydırır. Örn: `transform: translateY(-10px);` öğeyi 10 piksel YUKARI zıplatır (Eksi değerler yukarı ve soladır).
- `rotate(derece)`: Öğeyi döndürür. Örn: `transform: rotate(45deg);` (45 derece).
- `scale(X, Y)`: Öğeyi büyültür/küçültür.

## 3. Anahtar Kare Animasyonları (Keyframes)

Sadece iki durum (normal ve hover) arasındaki geçiş size yetmiyorsa, bir film şeridi gibi senaryo yazmak istiyorsanız `@keyframes` kuralını kullanırsınız. JavaScript yazmadan kompleks ve sonsuz döngülü animasyonlar yapmanın yoludur.

Önce senaryoyu (Anahtar kareleri) yazarız:
```css
/* "sallanma" adında bir senaryo yarattık. %0 animasyonun başı, %100 sonudur. */
@keyframes sallanma {
    0%   { transform: rotate(0deg); }
    25%  { transform: rotate(10deg); }
    50%  { transform: rotate(0deg); }
    75%  { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
}
```

Sonra bu senaryoyu bir elemana atarız (Oynat tuşuna basarız):
```css
.zil-ikonu {
    /* animation: SenaryoAdı Süre İvme Gecikme TekrarSayısı Yön */
    /* sallanma senaryosunu al, 0.5 saniyede oynat, düz bir ivmeyle (linear), ve bunu sonsuza kadar tekrar et (infinite). */
    animation: sallanma 0.5s linear infinite;
}
```
