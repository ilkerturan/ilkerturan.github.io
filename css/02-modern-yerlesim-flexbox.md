# Bölüm 02: Modern Yerleşim (Layout) - Flexbox

Eskiden yan yana 3 tane menü butonu koymak veya bir yazıyı div'in tam ortasına (hem dikey hem yatay) hizalamak tam bir işkenceydi (`float: left` ve `clearfix` hack'leri kullanılırdı).
Neyse ki CSS'e **Flexbox** geldi ve her şey değişti.

---

## 1. Flexbox Nedir?
Esnek Kutu (Flexible Box) mantığıdır. İçine koyduğunuz nesneleri tek bir eksende (ya yan yana yatayda, ya da alt alta dikeyde) mükemmel bir şekilde hizalamanızı sağlar.

## 2. Temel Kavramlar (Anne ve Çocuklar)
Flexbox kullanmak için, yan yana dizeceğiniz elemanların (Çocuklar) etrafına onları saran bir taşıyıcı (Anne/Kapsayıcı) koymanız gerekir. Komutlar "Anneye" verilir, çocuklar hizaya girer!

```css
.anne-tasiyici {
    display: flex; /* Sihirli değnek! İçindekiler anında yan yana (row) dizilir. */
}
```

## 3. İçerikleri Hizalamak
Anneye `display: flex` dedikten sonra çocukların aralarındaki boşlukları yönetebilirsiniz:

*   `justify-content: center;` (Yatay eksende her şeyi tam ortaya toplar).
*   `justify-content: space-between;` (Biri en sola, biri en sağa yapışır, ortadaki boş kalır - Klasik menü Navbar tasarımı).
*   `align-items: center;` (Dikey eksende her şeyi tam ortaya hizalar).

### Mükemmel Ortalama Sırrı
Bir div'in içindeki yazıyı sayfanın tam (kusursuz) ortasına koymak için şu üç satır yeterlidir:
```css
.tam-orta {
    display: flex;
    justify-content: center;
    align-items: center;
}
```
