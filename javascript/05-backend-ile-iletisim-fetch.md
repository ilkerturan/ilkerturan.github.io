# Bölüm 05: Backend ile İletişim (Fetch API) ve Gerçek Dünya

Buraya kadar her şeyi öğrendik. Fakat yazdığımız Frontend (Arayüz), Backend'deki (Örn: C# Web API veya Node.js) veritabanına nasıl ulaşacak? Kendi başına ulaşamaz. Araya bir köprü, bir garson lazımdır.

HTTP İstekleri (GET, POST, PUT, DELETE) yaparak Backend'den JSON (JavaScript Object Notation) formatında veri çekme işlemine API çağrısı denir.

---

## 1. Fetch API
Modern JavaScript, başka hiçbir harici kütüphaneye (Örn: eski Ajax veya Axios) gerek kalmadan, doğrudan tarayıcının içine gömülü olan `fetch()` fonksiyonu ile sunucularla konuşabilir.

## 2. Tam Kapsamlı Gerçek Dünya Örneği
Ekranda bir liste var. C# ile yazılmış `https://api.sitem.com/kullanicilar` adresine gidip kullanıcıları çekeceğiz (Asenkron) ve DOM Manipülasyonu ile ekrana basacağız.

```javascript
const kullanicilariEkranaBas = async () => {
    const listeElementi = document.getElementById("kullaniciListesi");
    
    // 1. AŞAMA: Backend'den veriyi iste (GET). Await ile bekle.
    const response = await fetch("https://api.sitem.com/kullanicilar");
    
    // 2. AŞAMA: Gelen cevabı saf JSON formatına dönüştür.
    const veriler = await response.json(); 
    
    // 3. AŞAMA: Verileri (Array) dön (map/forEach) ve HTML'e ekle
    veriler.forEach(kullanici => {
        // Yeni bir Liste Elemanı (li) oluştur
        const li = document.createElement("li"); 
        
        // İçine kullanıcının ismini yaz
        li.innerText = kullanici.isim; 
        
        // Bu elemanı HTML'deki ana listeye ekle
        listeElementi.appendChild(li);
    });
}
```

**Tebrikler!** Artık C# ile veritabanı kuran (Backend), CI/CD ile sunucuya atan (DevOps) ve JavaScript/Fetch ile o veriyi çekip harika CSS tasarımlarıyla ekrana basan (Frontend) tam donanımlı bir **Full-Stack Mühendis** oldunuz!
