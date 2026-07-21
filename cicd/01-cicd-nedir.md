# Bölüm 01: CI/CD ve DevOps Felsefesi (Boru Hattı)

Eskiden (Şelale - Waterfall döneminde) Yazılımcı takımı 6 ay boyunca kod yazar, sonra "Benim işim bitti!" diyerek kodu Sistem Yöneticisi (Ops) takımına fırlatırdı. Sistemci kodu sunucuya kurmaya çalışır ama kodlar çalışmazdı. Geliştirici "Benim makinemde çalışıyor" derdi. Canlıya çıkış (Deployment) günleri kabustu, sabahlara kadar stres yaşanırdı.

İşte Yazılım Takımı (Dev) ile Operasyon Takımının (Ops) aralarındaki bu kanlı savaşı bitirip, onları tek bir odaya kapatan ve kültürü değiştiren o devrimin adı **DevOps (Development & Operations)**'tur.

DevOps felsefesinin atan kalbi, yazdığınız kodun klavyeden çıkıp internette canlıya alınmasını (Sunucuya ulaşmasını) "İnsanın elinden alarak tamamen OTOMATİK bir Robota (Boru Hattına - Pipeline)" teslim eden **CI/CD** sürecidir.

## 1. CI (Continuous Integration - Sürekli Entegrasyon)
5 kişilik bir ekip aynı projede çalışıyor. Ali, sepet modülünü yazıyor. Ayşe, ödeme modülünü.
- **Eski Sorun:** Herkes kodunu kendi makinesinde yazar, 1 ay sonra "Hadi şu kodları birleştirelim (Merge)" dediklerinde yüzlerce çakışma (Conflict) çıkar ve sistem patlardı (Integration Hell).
- **CI Çözümü:** "Kodunuzu 1 ay tutmayın, HER GÜN (hatta günde 5 kez) Ortak Depoya (GitHub/GitLab vb.) gönderin!" 
- Siz kodu Ortak depoya yolladığınız (Push) O SANİYE, arkaplanda uyuyan bir Robot (Pipeline) uyanır. Sizin kodunuzu alır, derler (Build), kendi içindeki sanal sunucusunda ayağa kaldırır ve yazdığınız BÜTÜN UNIT TESTLERİ (Otomatik testleri) çalıştırır. Eğer testlerden 1 tanesi bile kırılırsa (Kırmızı yanarsa), Robot size bir tokat atıp "Kodun bozuk, projeye EKLENMESİNE (Merge) izin vermiyorum!" diyerek kodu çöpe atar. Eğer her şey yeşilse, kod ana koldaki kodla GÜVENLİ bir şekilde birleştirilir (Entegrasyon).

## 2. CD (Continuous Delivery/Deployment - Sürekli Teslimat/Dağıtım)
CI adımı bitti, kodunuz testleri geçti ve çalışıyor (Yeşil). Peki bu kod müşteriye nasıl ulaşacak?
- **Delivery (Teslimat):** Robot (Pipeline) kodunuzu alır, canlı ortama (Production) KUSURSUZCA çıkmaya hazır bir PAKET (Örn: Docker Image, .Zip) haline getirir ve bir rafa koyar. Canlıya almak için "İnsan (Yönetici) Onayı (Bir butona basılması)" gereklidir. Onay verilince çıkar.
- **Deployment (Dağıtım - Nihai Otomasyon):** Robot o kadar güvenilirdir ki, İNSAN ONAYINI DA ORTADAN KALDIRIR. Siz Cuma akşamı kodu Push'ladığınız an, testler geçer, paket hazırlanır ve siz kahvenizden bir yudum alana kadar kod Saniyeler içinde Kubernetes (Canlı) sunucusuna kendiliğinden Yüklenir (Deploy)! Netflix veya Amazon günde 10.000 defa canlıya kod çıkar (Deployment), kimsenin ruhu duymaz.
