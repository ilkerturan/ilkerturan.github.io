# Bölüm 02: Test Piramidi (Google ve Microsoft Nasıl Test Ediyor?)

Yazılımdaki testler tek bir türden ibaret değildir. Google, Facebook veya Microsoft gibi devler sistemlerini bir "Piramit" şeklinde inşa edilmiş 3 katmanlı testlerle korurlar. 

---

## 1. Piramidin Tabanı: Birim Testleri (Unit Tests)
En alttaki ve en geniş katmandır.
- **Hız:** Milisaniyeler içinde çalışırlar.
- **Maliyet:** Çok ucuzdur, binlerce yazılır.
- **Amacı:** Sistemin en küçük, bölünemez parçalarını (örneğin sadece "KDV Hesapla" fonksiyonunu) dış dünyadan izole ederek test etmektir. Veritabanına veya internete BAĞLANMAZ.

## 2. Piramidin Ortası: Entegrasyon Testleri (Integration Tests)
Birimler (Sınıflar) tek başlarına harika çalışabilir ama bir araya geldiklerinde kavga edebilirler.
- **Amacı:** İki farklı sistemin evliliğini test etmektir. Örneğin; yazdığınız C# kodunun, arka plandaki SQL Veritabanı ile düzgün konuşup konuşmadığı test edilir. Veritabanına gerçekten kayıt atılır ve silinir.
- **Özelliği:** Birim testlere göre daha yavaş çalışırlar, bu yüzden sayıları biraz daha azdır.

## 3. Piramidin Zirvesi: Uçtan Uca Testler (E2E - End to End)
Sistemin tamamının, sanki karşısında gerçek bir insan varmış gibi baştan sona test edilmesidir.
- **Amacı:** Selenium veya Cypress gibi araçlar, otomatik olarak Google Chrome'u açar. Görünmez bir hayalet fare ile "Kayıt Ol" butonuna tıklar, klavyeden veri girer, veritabanına gider, SMS gelip gelmediğini kontrol eder.
- **Özelliği:** En yavaş (dakikalarca süren) ve yazması en pahalı testlerdir. Bu yüzden piramidin en dar zirvesini oluştururlar (Sadece en kritik süreçlere E2E yazılır).
