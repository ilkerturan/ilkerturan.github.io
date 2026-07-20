# Teknik Sözlük 3: Backend ve Veritabanı Mimarisi

Kullanıcının görmediği, şifrelerin doğrulandığı, paranın çekildiği, kısacası sistemin "Beyninin (Backend)" ve "Hafızasının (Veritabanı)" jargonu.

---

*   **OOP (Object-Oriented Programming):** Gerçek dünyadaki nesneleri (Örn: Araba, Müşteri) koda modelleme sanatıdır. Her nesnenin özellikleri (Renk) ve yetenekleri (FrenYap) vardır.
*   **Class (Sınıf):** Bir arabanın "Fabrika Mimari Çizimidir (Kalıbı)". 
*   **Object (Nesne):** O çizimden üretilmiş "Gerçek Arabanın (Örn: Kırmızı BMW)" kendisidir.
*   **Interface (Arayüz - C#):** Sınıflar arasında imzalanan "Sözleşmedir". Bir sınıf bir interface'i miras alırsa, onun içindeki kurallara uymak ZORUNDADIR.
*   **Compile Time (Derleme Zamanı):** Kodunuzu daha çalıştırmadan, yazarken (Visual Studio'da kırmızı çizgi çıkması) sistemin hatayı yakalamasıdır. Çok güvenlidir.
*   **Runtime (Çalışma Zamanı):** Kodda hiçbir hata görünmemesine rağmen, uygulama müşterideyken (çalışırken) ortaya çıkan hatadır. En tehlikeli hatadır.
*   **CRUD (Create, Read, Update, Delete):** Yazılımın %90'ı olan; Ekle, Oku, Güncelle, Sil işlemlerinin evrensel baş harfidir.
*   **Query (Sorgu):** Veritabanına (SQL'e) "Bana yaşı 18'den büyük olanları getir" diye sorduğumuz komuttur.
*   **Primary Key (Birincil Anahtar):** Veritabanındaki her bir satırın, TC Kimlik Numarası gibi "Benzersiz (Tek)" olan kimliğidir (ID).
*   **Foreign Key (Yabancı Anahtar):** İki farklı tabloyu birbirine bağlayan kimliktir. (Örn: Siparişler tablosundaki "MusteriID" kolonu).
*   **ORM (Object Relational Mapping):** C# ile yazılmış kodlarımızı arka planda otomatik olarak SQL diline (Query'ye) çeviren çevirmendir. (Örn: Entity Framework). Sizi SQL yazma derdinden kurtarır.
