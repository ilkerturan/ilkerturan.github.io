# Bölüm 03: S.O.L.I.D. Prensiplerinin Anatomisi

Clean Code (Temiz Kod) yazmanın mikroskobik kurallarını (isimler, uzunluklar) öğrendikten sonra, sıra Kodun Makroskobik Mimarisine gelir. 
Eğer bir uygulama 3-4 yıl yaşadıktan sonra "Buraya yeni buton eklemek için tüm yapıyı baştan yazmamız lazım, kod çökmüş" noktasına geliyorsa, o yazılımcı (veya ekip) S.O.L.I.D prensiplerini ihlal etmiş demektir.

SOLID, Robert C. Martin tarafından derlenen ve Nesne Yönelimli Programlama'da (OOP) esnekliği, sürdürülebilirliği ve modülerliği garanti eden 5 kutsal kuralın baş harflerinden oluşur.

## 1. [S] Single Responsibility Principle (Tek Sorumluluk Prensibi)
> "Bir sınıfın (veya fonksiyonun) değişmek için SADECE TEK BİR NEDENİ olmalıdır."

**Açıklama:** Sınıflar "İsviçre Çakısı" olmamalıdır. Eğer `FaturaIslemleri` adında bir sınıfınız varsa, bu sınıfın içine Faturayı hesaplama, PDF'e çevirme ve Müşteriye E-Mail atma fonksiyonlarını bir arada koyarsanız SRP'yi katletmiş olursunuz. 
E-Mail yollama sistemini değiştirmek istediğinizde Fatura Sınıfına müdahale etmek zorunda kalırsınız (Faturanın Mail ile ne ilgisi var?). Fatura sınıfı hesaplar, PDF oluşturucu ayrı sınıf olmalıdır, Mail atıcı ayrı sınıf olmalıdır.

## 2. [O] Open/Closed Principle (Açık/Kapalı Prensibi)
> "Yazılım varlıkları (sınıflar) GELİŞTİRMEYE AÇIK, fakat DEĞİŞTİRMEYE KAPALI olmalıdır."

**Açıklama:** Sisteme yeni bir özellik ekleyeceğiniz zaman, halihazırda yazılmış ve çalışan (test edilmiş) eski kodları açıp "if-else" ile değiştirmek zorundaysanız bu kuralı çiğniyorsunuz demektir.
**Örnek:** Banka sisteminde "Kredi Kartı ile Öde" vardı. Müşteri "Bitcoin ile Öde" istedi. Eğer gidip `OdemeIslemi(string tip)` içindeki `if(tip=="Kart") ... else if(tip=="Bitcoin")` koduna ekleme yaparsanız sistem bozulur. Çözümü `IOdemeTipi` adında bir Interface (Arayüz/Sözleşme) yapıp, eski karta dokunmadan, sadece `BitcoinOdeme` adlı YENİ bir sınıf açıp sisteme dahil etmektir. Sisteme kod EKLENDİ (Open), ancak eski kodlar DEĞİŞTİRİLMEDİ (Closed).

## 3. [L] Liskov Substitution Principle (Liskov'un Yerine Geçme Prensibi)
> "Bir alt sınıf, türetildiği üst sınıfın (veya interface'in) yerine GÜVENLE kullanılabilmeli, ana sistem hiçbir farklılık hissetmeden çalışmaya devam etmelidir."

**Açıklama:** Barbara Liskov'un kuramıdır. Klasik örnek: Kare, bir Dikdörtgen midir? Geometride evet. Ama yazılımda `Dikdörtgen` sınıfından bir `Kare` sınıfı türetir (Miras/Inheritance) ve sisteme yollarsanız sistem çöker. Çünkü Dikdörtgenin (En ve Boy) iki özelliği bağımsız değişirken, Karenin tek boyutu değiştiğinde ikisi de değişmek zorundadır. Beklentiler bozulur, kod hata verir.
Kural: Sırf içindeki 3-5 metodu beleş kullanmak (Kod tekrarını engellemek) için, anlamsal olarak tam uymayan şeyleri birbirinden Miras Alarak (Inheritance) bağlamayın. (Kuşlardan Pengueni türetirseniz, sistem `Uç()` dediğinde penguen uçamaz ve patlar).

## 4. [I] Interface Segregation Principle (Arayüz Ayrıştırma Prensibi)
> "Sınıflar (Müşteriler), ASLA kullanmadıkları ve ihtiyaçları olmayan metotları (fonksiyonları) içermeye/uygulamaya zorlanmamalıdır."

**Açıklama:** İçinde `Yazdir()`, `Tara()`, `FaksGonder()` olan devasa bir `IMakine` interface'i (sözleşmesi) yaptınız. Elinize sadece eski tip, dümdüz bir "Yazıcı" cihazı geldiğinde `Yazdir()` kısmını doldurursunuz, ama sistem sizi mecburen `Tara()` ve `FaksGonder()` fonksiyonlarını da sınıf içine yazmaya mecbur bırakır (İçlerini boş bırakıp `NotImplementedException` atarsınız).
**Çözüm:** Şişman interfaceleri parçalayın! `IYazdirabilir`, `ITarayabilir`, `IFaksYollayabilir` diye 3 küçük arayüz yapın. Çok fonksiyonlu modern yazıcıya üçünü birden entegre edin, eski yazıcıya sadece 1'ini entegre edin. Kimse gereksiz koda zorlanmasın.

## 5. [D] Dependency Inversion Principle (Bağımlılıkların Tersine Çevrilmesi Prensibi)
> "Üst seviye modüller, alt seviye modüllere BAĞIMLI OLMAMALIDIR. İkisi de soyutlamalara (Interfacelere) bağımlı olmalıdır."

**Açıklama:** En kritik mimari kuraldır. Eğer sizin `KullaniciYonetimi` sınıfınız, gidip de `MySQLVeritabani` isimli sınıfa doğrudan `new` anahtar kelimesiyle (Somut/Concrete) bağlanırsa felaket olur. Yarın şirket "Biz MySQL'den Oracle'a geçtik" derse, Kullanıcı yönetimini ve 50 farklı sınıfı tek tek MySQL yazan yerleri silip Oracle yapmakla uğraşırsınız.
**Çözüm:** Araya bir SOYUTLAMA duvarı (`IVeritabani` isimli bir Interface sözleşmesi) örersiniz. Kullanıcı yönetimi sadece "Ben bir IVeritabani'na yazarım, ne olduğuna karışmam" der. Alt sınıflar ise "Ben bu IVeritabani sözleşmesine uyarım" der. İkisi de aradaki kontrata (Interface) güvenir, birbirlerini hiç tanımazlar. Veritabanını fişten çeker değiştirirsiniz, üst sınıfın ruhu bile duymaz.
