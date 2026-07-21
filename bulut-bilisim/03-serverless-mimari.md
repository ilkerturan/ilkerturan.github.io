# Bölüm 03: Sunucusuz Mimari (Serverless) Felsefesi

Bulut bilişimin (PaaS'ın) geldiği en ileri nokta **Serverless (Sunucusuz)** mimarisidir. İsmine aldanmayın; elbette arka planda kodlarınızın çalıştığı Amazon veya Google'a ait devasa fiziksel sunucular (Serverlar) vardır. 

Buradaki "Sunucusuz" kelimesi, "Yazılımcı olarak SİZİN bir sunucu kiralama, yönetme, güncel tutma veya 7/24 açık bırakma derdinizin OLMAMASI" anlamına gelir.

## 1. Geleneksel Sunucu vs Serverless Paradigması

**Geleneksel Bulut (Örn: AWS EC2 - IaaS):**
Bir alışveriş sitesi kurduğunuzda, aylık 50$ ödeyerek bir sunucu kiralarsınız. Gece saat 04:00'te sitenize hiçbir müşteri girmese bile, o sunucu arka planda açık beklemek zorundadır ve Amazon sizden boş beklediği o saatlerin de parasını keser. Kampanya döneminde 10.000 kişi gelirse, sunucuyu yetmeyeceği için manuel olarak veya kurallarla çoğaltmanız gerekir. Bu ciddi bir yönetim yüküdür.

**Serverless (Örn: AWS Lambda, Google Cloud Functions):**
Kodu yazıp buluta fırlatırsınız. Sunucu falan seçmezsiniz. Gece saat 04:00'te sitenize kimse girmiyorsa, Amazon uygulamanızı TAMAMEN KAPATIR ve o an **Sıfır Dolar ($0)** ödersiniz. Sabah 08:00'de sisteme 1 kullanıcı tıkladığında, Amazon kodu milisaniyeler içinde uykudan uyandırır (Buna Cold Start denir) çalıştırır ve kapatır. Sadece 1 tıklamanın (Örn: 0.0001 kuruş) parasını ödersiniz.
Kampanya oldu ve anlık 500.000 kişi mi girdi? Sizin hiçbir tuşa basmanıza gerek kalmadan Amazon bu kodu 500.000 kez paralel olarak otomatik kopyalar ve kimse hata almaz.

## 2. Neden Serverless (FaaS - Function as a Service) Kullanılır?

Serverless mimaride kodlar devasa projeler (Monolithic) halinde atılmaz. Çok küçük Fonksiyonlar halinde atılır. (Örn: Sadece "Sepete Ekleme" fonksiyonu, sadece "Mail Gönderme" fonksiyonu).
- **Gerçek Anlamda Kullandıkça Öde:** Sunucunun açık kalma süresine değil, fonksiyonun sadece çalışma "milisaniyesine" (Milyonda bir saniye) ve RAM tüketimine para ödersiniz. Mükemmel bir maliyet tasarrufudur.
- **Sonsuz Ölçeklenme (Infinite Scalability):** Sunucu kapasitesi düşünmeye son. İster 1 kişi tıklasın, ister tüm dünya aynı anda tıklasın, kod çökmez.
- **Operasyonel Yük Yok:** İşletim sistemine format atmak, güvenlik yaması yapmak (Patching) gibi dertler tarihe karışır.

## 3. Serverless'in Dezavantajları (Her Yerde Kullanılmaz!)

Harika görünmesine rağmen her projeyi Serverless yapamazsınız:
1. **Soğuk Başlangıç (Cold Start):** Gece kimse kullanmadığı için uykuya dalan fonksiyon, ilk tıklayan şanssız kullanıcıda uykudan uyanıp ayağa kalkmak için 1-2 saniye gecikme yaşatır (Cold Start). E-Spor oyunları veya borsa uygulamaları gibi anlık milisaniye tepkisi gerektiren (Real-Time) sistemlerde asla kullanılmaz.
2. **Vendor Lock-in (Sağlayıcıya Bağlanma):** Kodlarınızı tamamen AWS Lambda'nın mimarisine göre yazdığınız için, yarın "Ben Microsoft Azure'a taşınacağım" derseniz bütün mimariyi ve kodları baştan yazmak zorunda kalabilirsiniz. Bağımlılık yaratır.
3. **Uzun Süren İşlemler:** Çoğu Serverless sisteminin zaman limiti vardır (Örn: AWS Lambda maksimum 15 dakika çalışabilir). Eğer 3 saat sürecek bir video render/işleme algoritmanız varsa, 15. dakikada Amazon fişi çeker, işlem yarım kalır.
