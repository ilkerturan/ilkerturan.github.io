# Bölüm 03: Yapısal Kalıplar (Structural Patterns)

Yapısal kalıplar, farklı sınıfların veya modüllerin (bazen hiç tanımadığınız dışarıdan aldığınız kütüphanelerin) bir araya gelerek nasıl daha büyük yapılar oluşturacağını organize eder. Farklı parçaları birbirine "uydurmak" veya "giydirmek" için kullanılır.

## 1. Adapter (Adaptör) Kalıbı
Tam olarak gerçek dünyadaki priz dönüştürücü adaptörleri (Örn: Avrupa fişini, Amerikan prizine takmak) gibi çalışır.

- **Problem:** Kendi sisteminize dışarıdan, eski veya farklı formatta veri dönen bir kütüphane (Third-Party Library) dahil ettiniz. Sizin sisteminiz XML verisi bekliyor ama yeni kütüphane JSON formatında veri dönüyor. Yeni kütüphanenin kaynak kodlarına dokunamazsınız, kendi sisteminizi de ona göre baştan yazamazsınız.
- **Çözüm:** Araya bir Çevirmen (Adapter) sınıfı yazılır. Adaptör, dış kütüphaneden JSON'ı alır, kendi içinde sizin anlayacağınız XML'e çevirip sizin sisteminize besler. İki farklı dünyanın uyum içinde çalışmasını sağlar.

## 2. Facade (Ön Yüz / Cephe) Kalıbı
Karmaşıklığı halının altına süpürme ve kullanıcıya tek bir basit düğme sunma sanatıdır.

- **Problem:** Bilgisayarı açmak (Başlat tuşuna basmak) aslında arkada yüzlerce işlem gerektirir (Güç kaynağına elektrik gönder, anakarta sinyal yolla, RAM'leri kontrol et, BIOS'u yükle, Harddiski çevir vs.). Eğer bilgisayar kullanıcısına bu 5 adımı manuel yaptırsaydık kimse bilgisayar kullanamazdı.
- **Yazılım Karşılığı:** Sizin de arkada 5 farklı sınıfı sırayla çalıştırmanız gereken karmaşık bir mimariniz var (Siparişi Al, Stok Kontrol Et, Kredi Kartı Çek, Fatura Kes, Kargoya İlet).
- **Çözüm:** Tüm bu karmaşık alt sistem sınıflarını kucaklayan tek bir `SiparisFacade` adında sınıf (Cephe) oluşturursunuz. İçine sadece `SiparisiTamamla()` adında tek bir fonksiyon koyarsınız. Geliştiriciler diğer sayfadan sadece `Facade.SiparisiTamamla()` çağırır, arkadaki 5 karmaşık adım Facade içinde gizlice halledilir. Sistemi inanılmaz basitleştirir.

## 3. Decorator (Dekoratör) Kalıbı
Mevcut bir nesnenin davranışını, orijinal kodunu hiç değiştirmeden, üzerine "kıyafetler" (yeni özellikler) giydirerek (dinamik olarak) genişletme mantığıdır.

- **Problem:** Bir Kahve Dükkanı otomasyonu yazıyorsunuz. `FiltreKahve` sınıfı var (Fiyatı: 50 TL). Müşteri Sütlü Filtre Kahve istedi. Süt için ayrı bir alt sınıf (Inheritance) oluşturmak (`SutluFiltreKahve`) saçmadır, çünkü Karamel Şuruplu Sütlü Filtre Kahve isteyince de onun için mi yeni sınıf açacağız? Sınıf patlaması yaşanır.
- **Çözüm:** İç içe geçen dekoratörler tasarlanır.
  ```csharp
  // Temel nesnemiz (50 TL)
  IKahve kahvem = new FiltreKahve(); 
  
  // Süt dekoratörü kahvenin üzerine giydirilir (+10 TL ekler)
  kahvem = new SutDekoratoru(kahvem);
  
  // Karamel dekoratörü Sütlü kahvenin üzerine giydirilir (+15 TL ekler)
  kahvem = new KaramelDekoratoru(kahvem);
  
  // Sistem kahvenin fiyatını sorduğunda sırayla hepsi toplanır: 50 + 10 + 15 = 75 TL. Alt sınıf açılmaktan kurtulunur.
  Console.WriteLine(kahvem.FiyatHesapla()); 
  ```
