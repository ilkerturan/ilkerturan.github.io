# Bölüm 06: Mükemmel Deployment (Dağıtım) Stratejileri

Yazdığınız e-ticaret sitesinin v1.0 sürümü şu an internette çalışıyor ve saniyede binlerce müşteri alışveriş yapıyor (Sepete ekleme, Kredi kartı çekimi devam ediyor). Siz yepyeni bir özellik eklediniz ve v2.0 sürümünü "Canlıya alacaksınız (Deploy edeceksiniz)".

Eski usülde: Gece 03:00 beklenir, "Sistem Bakımda" yazısı konur, eski sunucu kapatılır (İnsanlar atılır), yenisi kopyalanır, açılır. Bu **Downtime (Kesintili)** dağıtımdır ve modern dünyada Kabul Edilemez! Modern DevOps, Müşterinin (Müzik dinlerken bile) haberi olmadan uygulamanın alttan güncellenmesini (Zero-Downtime) sağlar.

İşte en ünlü 3 KESİNTİSİZ Dağıtım Stratejisi:

## 1. Rolling Update (Aşamalı / Yuvarlanan Güncelleme)
En klasik modern Kubernetes stratejisidir.
**Senaryo:** Arka tarafta çalışan ve yükü taşıyan 4 adet v1.0 Sunucusu (Pod) var.
**Nasıl Çalışır?** 
- Kubernetes bir anda dördünü de FİŞTEN ÇEKMEZ.
- Önce Yeni v2.0 sürümünden **1 adet yeni sunucu (Pod)** başlatır. (Toplam sunucu 5 olur).
- Yeni 2.0 sunucusunun sağlıklı çalıştığından (Health Check) emin olur.
- Sonra eski v1.0 sunucularından 1 tanesini (Trafik bittikten sonra) kibarca öldürür. (Kaldı 3 eski, 1 yeni).
- Tekrar 1 tane yeni (2.0) yaratır, 1 tane eskiyi öldürür. 
Böylece çark (Rolling) döne döne, müşteriler "hiçbir hata almadan" sistem yeni versiyona geçirilir. Kademelidir.

## 2. Blue-Green Deployment (Mavi-Yeşil Dağıtım / Anında Geçiş)
Risk faktörü yüksek (Hemen geri dönülmesi gereken) kurumsal işlerde kullanılır. Bankacılık için harikadır.
**Senaryo:** Şu an canlıda v1.0 (Mavi Renk) çalışıyor.
**Nasıl Çalışır?**
- Kubernetes, canlıdaki Mavi sunuculara HİÇ DOKUNMAZ.
- Arka planda (Müşterinin görmediği izole bir alanda), v2.0 sürümünün çalışacağı yepyeni bir altyapı (Yeşil Renk) ayağa kaldırılır.
- Test ekipleri gizlice Yeşil sürüme bağlanır ve her şeyi test eder (Canlı veritabanıyla). Her şey mükemmeldir.
- **Geçiş Anı:** Yük dengeleyicide (Load Balancer / Ingress) tek bir düğmeye (Switch) basılır! Yüzde yüz trafik ANINDA (Saliseyle) Mavi'den Yeşil'e yönlendirilir.
- **Avantajı (Geri Dönüş - Rollback):** Yeni sürümde (Yeşil) aniden bir hata mı patladı? Hiç sorun yok! Mavi sürüm arka planda hala ayaktadır (Silinmedi). Salisesinde şalteri tekrar Maviye çevirirsiniz ve hayat kaldığı yerden devam eder.

## 3. Canary Deployment (Kanarya Dağıtımı / Kobay Kullanımı)
Adını, eski madencilerin kömür madenindeki zehirli gazı (riskleri) tespit etmek için madene önden bir "Kanarya Kuşu" göndermelerinden alır. (Kuş bayılırsa madene inmezler).
**Senaryo:** Facebook'un tasarımı değişti (v2.0). 3 Milyar insanın aynı anda tasarımını değiştirirseniz (Blue-Green gibi) ve hata varsa sistem çöker.
**Nasıl Çalışır?**
- Yeni v2.0 sürümünden 1 tane sunucu ayağa kaldırılır.
- Yük Dengeleyiciye (Router) şu ayar girilir: **"Trafiğin %95'ini eski sürümde (v1.0) tut, Dünya'daki rastgele insanların (Kanaryaların) sadece %5'ini yeni sürüme (v2.0) yönlendir!"**
- Şirket bu %5'lik kobay kullanıcıyı 1 saat boyunca monitörlerden (Hata (Log) var mı? Satış düştü mü?) diye izler.
- Her şey iyi gidiyorsa trafik %10'a, sonra %50'ye, en son %100'e çekilerek yavaş yavaş ve RİSKSİZ şekilde canlıya çıkılır. Hata varsa sadece o %5'lik kesim etkilenmiştir, hemen geri (v1.0'a) alınır.
