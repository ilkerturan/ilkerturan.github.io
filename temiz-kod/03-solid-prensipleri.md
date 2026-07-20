# Bölüm 03: SOLID Prensipleri (OOP'nin 5 Kutsal Kuralı)

SOLID, 2000'li yılların başında ortaya çıkan, kötü tasarlanmış (çürüyen) nesne yönelimli sistemleri kurtarmak için belirlenmiş 5 temel prensibin baş harfleridir.

---

## 1. (S) Single Responsibility Principle (SRP - Tek Sorumluluk)
**Kural:** Bir sınıfın veya modülün değişmek için sadece *tek bir nedeni* olmalıdır.
**Analoji:** İsviçre çakısı harikadır ama bir ameliyata İsviçre çakısıyla girmezsiniz, neşter (tek işi kesmek olan alet) kullanırsınız.
Eğer `User` sınıfınız hem veritabanına bağlanıp hem e-posta atıyorsa, e-posta sistemi değiştiğinde de, veritabanı değiştiğinde de bu sınıf bozulur. İki ayrı sınıfa (`UserRepository` ve `EmailService`) bölünmelidir.

## 2. (O) Open/Closed Principle (OCP - Açık/Kapalı)
**Kural:** Yazılım varlıkları (sınıflar) *gelişime AÇIK*, *değişime KAPALI* olmalıdır.
**Analoji:** Mutfak robotuna yeni bir özellik (hamur yoğurma) eklemek için robotun motorunu (ana kodu) söküp değiştirmezsiniz. Yeni bir uç (plugin/interface) takarsınız. Kodlarınıza da yeni if-else'ler eklemek yerine, Polymorphism (Çok Biçimlilik) ile yeni yetenekler eklemelisiniz.

## 3. (L) Liskov Substitution Principle (LSP - Liskov'un Yerine Geçme)
**Kural:** Alt sınıflar, türedikleri üst sınıfların yerine hiçbir sistemi bozmadan kullanılabilmelidir.
**Analoji:** `Kuş` diye bir ana sınıfınız var ve `Uc()` diye bir metodu var. Eğer ondan `Penguen` sınıfını türetirseniz, sistem Penguen'i uçurmaya çalıştığında uygulama çöker. Demek ki `Kuş` olmak uçmak demek değildir (Tasarım hatası).

## 4. (I) Interface Segregation Principle (ISP - Arayüz Ayrımı)
**Kural:** İstemcilere (sınıflara), kullanmayacakları metotları zorla (Interface aracılığıyla) dayatmayın.
**Analoji:** Müşteri sadece çay içmek istiyorsa, onun önüne içinde 50 çeşit kahve, tatlı ve yemek olan devasa bir "Hepsi Bir Arada" menüsü koymayın. Çay menüsü ayrı, kahve menüsü ayrı olsun (Şişman Interface'leri küçük parçalara bölün).

## 5. (D) Dependency Inversion Principle (DIP - Bağımlılığı Tersine Çevirme)
**Kural:** Üst seviye sınıflar (İş kuralları), alt seviye sınıflara (Veritabanı, API) doğrudan bağımlı olmamalıdır. İkisi de "Soyutlamalara (Interface)" bağımlı olmalıdır.
**Analoji:** Evinizdeki bir lambayı (Üst Seviye) doğrudan duvardaki elektrik kablolarına (Alt Seviye) lehimlemezsiniz. Araya bir "Priz (Interface)" koyarsınız. Priz sayesinde, lambayı söküp yerine televizyon takabilirsiniz. Yazılımda da nesneler birbirine Interface'ler (Prizler) ile bağlanmalıdır.
