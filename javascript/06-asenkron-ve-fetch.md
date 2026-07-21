# Bölüm 06: Asenkron Felsefe ve Fetch API İle Gerçek Dünya

JavaScript'in doğası gereği "Single Thread" (Tek İplikli) çalışır. Yani aynı anda sadece bir iş yapabilir, biri bitmeden alt satırdaki işleme geçemez. Ancak veritabanına bağlanmak veya başka bir sunucudan (API'den) hava durumu verisini çekmek internetin hızına bağlı olarak 3-4 saniye sürebilir. Eğer JavaScript bu süreyi "Düz (Senkron)" bir şekilde beklerse, siteniz kilitlenir, animasyonlar donar, scroll yapılmaz ve kullanıcı site çöktü zannedip kapatır.

İşte bu donmaları önlemek için **Asenkron (Eşzamanlı Olmayan)** programlama icat edilmiştir. 

## 1. Promises (Sözler) ve Bekleme Mantığı

Eskiden Callback Cehennemi denen karmaşık yapılar varken, günümüzde bir veri çekme işlemi bir `Promise (Söz)` objesi döner. İşlem "Ya başarılı olur ve veriyi döner (Resolved) Ya da çöker ve hatayı döner (Rejected)". Ancak bu sürecin arka planda (işletim sistemine itilerek) beklemesini sağlamak için ES8 ile gelen harika bir dilbilgisi vardır: **Async / Await**.

```javascript
// Fonksiyonun önüne 'async' koyarak JS motoruna "Bunun içinde uzun sürecek işlemler var, haberin olsun" diyoruz.
const verileriGetir = async () => {
    
    // İşlem uzun süreceği için, başına 'await' koyuyoruz.
    // Anlamı: "Tarayıcıyı (sekme arayüzünü) dondurma, sen git arkada diğer işlerini yap, bu 'sunucuSorgusu' bitip veri gelene kadar da alttaki (satır 11) koda GEÇME, burada bekle"
    const sonuc = await uzunSurenSorguyuCalistir();
    
    console.log("İşlem bitti, veri geldi: " + sonuc);
};
```

## 2. Fetch API ile Sunucularla Konuşmak (HTTP Requests)

Fetch (Getir), modern tarayıcıların içine gömülü gelen ve Backend API'lerine (C#, Node.js, Python sunucularına) HTTP İstekleri (GET, POST vb.) atmamızı sağlayan muazzam bir araçtır. Dışarıdan axios gibi kütüphanelere ihtiyacımız yoktur.

### Gerçek Bir GET (Veri Çekme) Senaryosu
Aşağıdaki örnek, dışarıdaki bir ücretsiz deneme API'sinden Kullanıcı bilgilerini çekecek ve onları HTML'deki bir listeye asenkron şekilde basacaktır.

```html
<h2>Kayıtlı Kullanıcılar</h2>
<ul id="listeArayuzu">
    <!-- Veriler buraya JS ile dolacak -->
</ul>
<p id="hataArayuzu" style="color:red;"></p>
```

```javascript
const kullanicilariListele = async () => {
    try {
        // try-catch bloğu: İnternet kesilirse veya sunucu 404 hatası verirse kod patlamasın diye hata ayıklama (Error Handling) kılıfıdır. İşlemleri try içinde deneriz.
        
        // 1. AŞAMA: İsteği gönder (Varsayılanı GET'tir) ve cevabın (Response) gelmesini arkada bekle.
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // Sunucu 200 (OK) harici bir kod döndürdüyse (Örn: 404 Sayfa Yok veya 500 Sunucu Hatası) zorla hata fırlat.
        if (!response.ok) {
            throw new Error("Sunucuya ulaşılamadı. Hata Kodu: " + response.status);
        }
        
        // 2. AŞAMA: İnternet üzerinden gelen ham Response paketini çöz ve bizim okuyabileceğimiz saf Array/Object (JSON) formatına dönüştür (Bu da asenkron bir işlemdir).
        const veriTablosu = await response.json();
        
        // 3. AŞAMA: DOM MANİPÜLASYONU
        // Elimizde artık [ {name:"Ahmet"}, {name:"Ayşe"} ] formatında süper bir Dizi var.
        const ulElementi = document.getElementById("listeArayuzu");
        
        // Diziyi forEach ile dön ve her bir kullanıcı için ekranda (DOM) yeni eleman yarat.
        veriTablosu.forEach((kullanici) => {
            const yeniLi = document.createElement("li"); // <li></li> yarattı
            yeniLi.innerText = kullanici.name; // İçine veritabanından gelen ismi bastı <li>Ahmet</li>
            ulElementi.appendChild(yeniLi); // Sayfadaki <ul> listesinin en altına bu yeni li'yi monte etti (ekrana yansıdı)
        });
        
    } catch (error) {
        // try içindeki herhangi bir satırda hata çıkarsa (internet yoksa) catch bloğuna düşeriz.
        // Kullanıcıya şık bir şekilde hatayı gösteriyoruz.
        document.getElementById("hataArayuzu").innerText = "Üzgünüz, bir hata oluştu: " + error.message;
    }
};

// Sayfa açıldığı an veri çekme senaryosunu (Motoru) çalıştır.
kullanicilariListele();
```
