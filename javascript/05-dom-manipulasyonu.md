# Bölüm 05: DOM (Document Object Model) ve Etkileşimler

Şimdi JavaScript dünyasından çıkıp, yazdığımız HTML (sayfa arayüzü) dünyasına nasıl müdahale edeceğimizi göreceğiz. JavaScript'te tarayıcının sekmesinde (ekranda) gördüğünüz tüm HTML etiketlerinin bir ağaç yapısındaki karşılığına **DOM (Belge Nesne Modeli)** denir. JS'in elindeki `document` sihirli kelimesi, bu HTML ağacına dokunup dallarını bükmemizi sağlar.

## 1. DOM Seçiciler (HTML Elementini Yakalamak)

HTML'deki bir başlığın yazısını değiştirmek veya butona tıklanınca ne olacağını yazmak için **önce o elementi JavaScript ile seçmeliyiz (hafızaya almalıyız).**

```html
<h1 id="anaBaslik">Eski Başlık</h1>
<p class="hata-mesaji">Şifre eksik!</p>
```

```javascript
/* YÖNTEM 1: getElementById (Eski ama Çok Hızlı) 
   Sadece ID'si (Kimliği) "anaBaslik" olan TEK BİR elementi bulur ve getirir.
   İçine (#) işareti koyulmaz, sadece id yazılır. */
const baslik = document.getElementById("anaBaslik");


/* YÖNTEM 2: querySelector (Modern, Esnek, İsviçre Çakısı) 
   CSS'teki seçici mantığını (Class için nokta (.), ID için kare (#)) kullanarak sayfayı yukarıdan aşağı tarar ve kurala uyan İLK elementi bulup döner. */
const hataYazisi = document.querySelector(".hata-mesaji");

/* YÖNTEM 3: querySelectorAll
   Sayfadaki belirli kurala uyan TÜM elementleri bulur ve bir Dizi (NodeList) olarak geri döner. Üzerinde döngü (forEach) çalıştırmanız gerekir. */
const tumParagraflar = document.querySelectorAll("p");
```

## 2. İçerik ve Stil Manipülasyonu (Müdahale Etmek)

Elementi hafızamıza `baslik` adıyla aldık. Şimdi üzerinde ameliyat yapabiliriz.

```javascript
// 1. İÇERİK DEĞİŞTİRME (innerText vs innerHTML)
// innerText: Etiketin içindeki sadece SADE METNİ değiştirir. Güvenlidir.
baslik.innerText = "Sisteme Hoş Geldiniz!";

// innerHTML: Etiketin içine YENİ HTML ETİKETLERİ gömmemizi sağlar. 
// Dikkat: Kullanıcıdan (inputtan) gelen veriyi asla innerHTML ile ekrana basmayın, kötü niyetli hacker kodları da (XSS Saldırısı) HTML gibi çalışabilir!
baslik.innerHTML = "Sisteme <span style='color:green;'>Hoş Geldiniz!</span>";

// 2. CSS DEĞİŞTİRME (.style objesi)
// Tüm CSS özelliklerine camelCase (kelime bitişik ve ikinci kelime büyük) ile erişilir. (background-color yerine backgroundColor gibi).
baslik.style.backgroundColor = "#f4f4f4";
baslik.style.fontSize = "36px";
baslik.style.display = "none"; // Elementi ekrandan tamamen kaybeder (Gizler).

// 3. SINIF (CLASS) LİSTESİNE MÜDAHALE (.classList)
// CSS'e doğrudan dokunmak yerine, CSS dosyamızda hazırladığımız ".aktif" veya ".gizli" gibi sınıfları elemente takıp çıkarmak çok daha profesyoneldir.
hataYazisi.classList.add("gorunur-yap"); // Class ekler
hataYazisi.classList.remove("gizli-yap"); // Class siler
hataYazisi.classList.toggle("aktif"); // Bir anahtar gibidir: ".aktif" class'ı elementte yoksa ekler, varsa siler. (Menü aç/kapa tuşlarında efsanedir).
```

## 3. Etkileşimler (Event Listeners - Olay Dinleyicileri)

Kullanıcının fareyle tıklaması (click), klavyede enter'a basması (keydown), form göndermesi (submit) veya sayfayı kaydırması (scroll) birer "Olay"dır (Event). Tarayıcıda bir olay gerçekleştiğinde çalışacak fonksiyonu (Callback) kurmak için `addEventListener` kullanırız.

```html
<button id="gonderBtn">Siparişi Tamamla</button>
<p id="sonucAlani"></p>
```

```javascript
const buton = document.getElementById("gonderBtn");
const sonuc = document.getElementById("sonucAlani");

/* addEventListener'ın birinci parametresi dinlenecek olayın adı ("click"), 
   ikinci parametresi ise bu olay gerçekleştiğinde Fırlatılacak/Çalıştırılacak OK FONKSİYONUDUR. */
buton.addEventListener("click", () => {
    // Butona basıldığında şunları yap:
    sonuc.innerText = "Siparişiniz başarıyla alındı!";
    sonuc.style.color = "green";
    
    // Butonu bir daha basılmasın diye kilitle/kapat
    buton.disabled = true;
});

// Klavyeden bir tuşa basıldığında:
document.addEventListener("keydown", (event) => {
    // event (olay) objesi, hangi tuşa basıldığı bilgisini taşır.
    if (event.key === "Enter") {
        console.log("Kullanıcı ENTER tuşuna bastı!");
    }
});
```
