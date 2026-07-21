# Bölüm 05: DOM Manipülasyonu (HTML'e Müdahale Etmek)

JavaScript'in asıl yaratılış amacı HTML'deki elementleri bulmak, onları değiştirmek ve animasyon katmaktır. HTML sayfasının tamamına JavaScript dünyasında **DOM (Document Object Model)** denir ve `document` objesiyle yönetilir.

## 1. HTML Elementini Yakalamak (Seçmek)

```html
<h1 id="baslik">Eski Başlık</h1>
<p class="yazi">Bir paragraf.</p>
```

```javascript
// 1. ID'ye göre seçmek (En hızlısı)
const h1Elementi = document.getElementById("baslik");

// 2. CSS Seçici gibi (.class veya #id formatıyla) seçmek (En moderni)
const pElementi = document.querySelector(".yazi");
```

## 2. İçeriği ve Stili Değiştirmek

Yakalanan nesnelerin içindeki yazıları veya CSS kodlarını değiştirebiliriz.

```javascript
const h1Elementi = document.getElementById("baslik");

// Yazısını Değiştir
h1Elementi.innerText = "YENİ BAŞLIK GELDİ!";

// HTML kodunu Değiştir (İçine kalın etiket ekledik)
h1Elementi.innerHTML = "<strong>YENİ BAŞLIK GELDİ!</strong>";

// Rengini Değiştir (CSS'e müdahale)
h1Elementi.style.color = "red";
```

## 3. Olay Dinleyiciler (Event Listeners) - Tıklanma

Kullanıcının butonlara tıklaması, form göndermesi, klavyeye basması gibi durumları (Event) yakalamalıyız.

```html
<button id="benimButonum">Bana Tıkla</button>
<p id="sonucAlani"></p>
```

```javascript
const buton = document.getElementById("benimButonum");
const sonuc = document.getElementById("sonucAlani");

// Butona "click" (tıklanma) olayı için dinleyici ekle
buton.addEventListener("click", () => {
    // Butona tıklandığında bu bloğun içi çalışır!
    sonuc.innerText = "Butona Tıklandı! Helal olsun!";
    sonuc.style.color = "green";
});
```
