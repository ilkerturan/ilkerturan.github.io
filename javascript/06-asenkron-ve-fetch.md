# Bölüm 06: Asenkron Programlama ve Fetch API (Gerçek Dünya)

Arayüz (Frontend) kodlamanın son seviyesi, veritabanından (Backend API'den) verileri getirmektir. Bu işlem zaman alan (Örn: 2 saniye süren) bir işlemdir. İnternetten veri çekilirken sitenin donup kitlenmemesi için **Asenkron (Eşzamanlı Olmayan)** yapılar kullanırız.

## 1. Async / Await Mantığı

Bir fonksiyonun önüne `async` koyarsak bu "zaman alacak" demektir. İşlemlerin önüne `await` koyarsak JS'e "Bu işlem bitene kadar alt satıra geçme, ama siteyi de dondurma, arkada bekle" deriz.

## 2. Fetch API ile Veri Çekme

Tarayıcının içine gömülü olan `fetch()` fonksiyonu bir adrese (URL) gidip verileri çekip bize getirir.

**Örnek Senaryo:** Kullanıcıları (JSON formatında) ücretsiz sunan sahte bir API test servisinden veri çekip sayfamıza yazalım.

```html
<h2>Kullanıcılar Listesi</h2>
<ul id="kullaniciListesi">
    <!-- JS burayı dolduracak -->
</ul>
```

```javascript
// Asenkron bir fonksiyon oluşturuyoruz
const kullanicilariGetir = async () => {
    
    // 1. AŞAMA: İsteği at ve Cevabı (Response) bekle
    // Await kullanmazsak, veri daha gelmeden JS alt satıra geçer ve hata olur!
    const yanit = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // 2. AŞAMA: Gelen yanıtı parçalayarak saf JSON formatına dönüştür
    const kullanicilar = await yanit.json();
    
    // 3. AŞAMA: Elimizde artık bir Kullanıcılar Dizisi (Array) var!
    // DOM manipülasyonu ile listeyi HTML'e basalım:
    
    const ulElementi = document.getElementById("kullaniciListesi");
    
    // foreach veya map ile diziyi dönüyoruz
    kullanicilar.forEach(kullanici => {
        // Her turda yeni bir <li> etiketi yarat
        const li = document.createElement("li");
        
        // İçine API'den gelen kullanıcının ismini koy
        li.innerText = kullanici.name; 
        
        // Ul listesine bu yeni Li elemanını bağla
        ulElementi.appendChild(li);
    });
};

// Sayfa açıldığında fonksiyonu çalıştır (Ateşle)
kullanicilariGetir();
```

Bu örnek, modern frontend (React, Vue, Vanilla JS) geliştirmenin en temel direğidir!
