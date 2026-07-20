# Bölüm 02: DOM Manipülasyonu ve Olaylar (Events)

JavaScript'in asıl gücü, tarayıcıda çalışan HTML elementlerine erişip onları çalışma anında (sayfa yenilenmeden) değiştirebilmesidir.
Tarayıcı, sayfadaki tüm HTML etiketlerini bellekte devasa bir Ağaç (Tree) nesnesine dönüştürür. Bu ağaca **DOM (Document Object Model)** denir.

---

## 1. HTML Elementini Yakalamak (Seçmek)
Sayfadaki bir butonu veya yazıyı JS ile değiştirebilmek için önce onu bulmanız (seçmeniz) gerekir.

```html
<h1 id="baslik">Eski Başlık</h1>
<button id="degistirButonu">Bana Tıkla</button>
```

```javascript
// JS Dosyası:
const baslikElementi = document.getElementById("baslik");
const buton = document.getElementById("degistirButonu");
```

## 2. Olay Dinleyicileri (Event Listeners)
Kullanıcı butona mı tıkladı? Farenin tekerleğini mi çevirdi? Klavyede Enter'a mı bastı? Tüm bunlara **Olay (Event)** denir.

```javascript
// Butona "click" (tıklama) olayı dinleyicisi takıyoruz.
buton.addEventListener("click", function() {
    
    // Tıklandığı anda H1'in içindeki yazıyı değiştir:
    baslikElementi.innerText = "Yeni Başlık Yüklendi!";
    
    // CSS'ine müdahale edip rengini kırmızı yap:
    baslikElementi.style.color = "red";
    
});
```
İşte bu kadar! Sayfa yenilenmeden başlık değişti ve kırmızı oldu. Modern web'in temeli tam olarak budur.
