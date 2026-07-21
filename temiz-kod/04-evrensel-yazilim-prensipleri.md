# Bölüm 04: Evrensel Yazılım Felsefeleri (KISS, YAGNI, DRY)

Yazılım sektöründe SOLID kadar resmi ve katı olmasa da, deneyimli yazılımcıların (Senior) sohbetlerinde sürekli kullandıkları, projeleri hantallıktan kurtaran harika kısaltma ve felsefeler vardır.

## 1. KISS (Keep It Simple, Stupid)
*Anlamı: Onu basit (aptalca olacak kadar basit) tut!*

Yazılımcıların (özellikle ara seviye Mid-Level geliştiricilerin) en büyük hastalığı, çok şey bildiklerini kanıtlamak için basit bir problemi çözerken aşırı karmaşık (Over-engineering), 5 farklı tasarım kalıbı içeren, kimsenin okuyamayacağı soyut yapılar kurmalarıdır.

KISS prensibi bağırır: **"Bir problemi çözmenin en iyi yolu, çalışan EN BASİT koddur."** 
Karmaşık kod yazmak zeka göstergesi değildir; karmaşık problemi basit (Junior birinin bile 5 dakikada okuyup anlayabileceği) koda dökebilmek gerçek ustalığın göstergesidir. Basit kodun hatası çabuk bulunur ve bakımı kolaydır.

## 2. YAGNI (You Aren't Gonna Need It)
*Anlamı: Ona (İleride) İhtiyacın Olmayacak!*

"Şimdi bu sepete ürün ekleme fonksiyonunu yazdım ama, ileride kesin müşteri 'sepetteki ürünü favorilere alalım' da der. Dur ben o fonksiyonun altyapısını da şimdiden koda ekleyeyim, veritabanına boş alan açayım ki 6 ay sonra işim kolaylaşsın."

Bunu yazılım hayatınızda yapabileceğiniz EN BÜYÜK ZAMAN İSRAFI olarak nitelendiren YAGNI kuralı der ki:
**"Şu an sizden İSTENMEYEN ve şu an İHTİYAÇ OLMAYAN hiçbir satır kodu 'İleride lazım olur' mantığıyla projenize E-KLE-ME-YİN!"**
Çünkü %99 ihtimalle o özellik sizden hiçbir zaman istenmeyecek ve o ölü/kullanılmayan kodlar projenin mimarisini hantallaştıran, başka yazılımcıların kafasını karıştıran bir hayalete dönüşecektir. Lazım olduğunda, o günün şartlarına göre eklersiniz.

## 3. DRY (Don't Repeat Yourself)
*Anlamı: Kendini Tekrar Etme!*

Kod kokularında (Code Smells) da bahsettiğimiz gibi, yazılım dünyasındaki en kutsal günahlardan biri **Kopyala-Yapıştır** (Copy-Paste) yapmaktır.
Eğer bir formülü veya kuralı (Örn: Vergi hesaplama oranı) projenizin içinde 2'den fazla yerde yazdıysanız, DRY kuralını çiğniyorsunuz demektir.
- Çözüm her zaman Merkezileştirmektir (Centralization). O kuralı tek bir ortak fonksiyona veya sınıfa taşıyıp, diğer yerlerden sadece çağırmanız gerekir. Bu sayede vergi kuralı değiştiğinde sadece o 1 satırı değiştirerek 50 farklı ekranı aynı anda güncelleyebilirsiniz.

## 4. Boy Scout Rule (İzci Kuralı)
*Anlamı: Kamp alanını, bulduğundan daha temiz bırak.*

Bir dosyaya hata çözmek veya yeni bir özellik eklemek için girdiğinizde, kendi işinizi yapıp çıkmakla yetinmeyin. Etrafta saçma sapan bir değişken adı mı var? Düzeltin. Uzamış bir metot mu gördünüz? İkiye bölün. Açıklama satırları eskiyip yalan mı söylüyor? Silin.

Eğer şirketteki her yazılımcı, girdiği her dosyada kendi işine ek olarak koddaki ufak bir pisliği temizlerse, zamanla kod tabanı harika bir yere dönüşür (Sürekli Refactoring). Aksi halde kod çürümeye (Code Rot) ve "Kırık Cam Teorisine" kurban giderek kimsenin dokunmak istemediği bir canavara dönüşür.
