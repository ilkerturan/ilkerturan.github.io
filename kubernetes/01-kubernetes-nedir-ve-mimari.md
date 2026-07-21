# Bölüm 01: Kubernetes (K8s) Nedir ve Neden İhtiyacımız Var?

Docker kullanarak uygulamamızı bir "Konteyner (Kutu)" içine hapsederiz. Bu harika bir şeydir; geliştiricinin bilgisayarında çalışan şey, sunucuda da tıkır tıkır çalışır. (Bkz: `Benim makinemde çalışıyordu` efsanesinin sonu).

Peki ya projeniz büyürse? Dünyaca ünlü bir E-Ticaret sitesisiniz (Amazon, Trendyol) ve Cuma İndirimleri başladı. Sunucudaki 1 adet Docker konteyneri gelen 1 milyon müşteriyi kaldıramaz! Sizin acilen, o küçük kutudan arka arkaya 500 tane daha üretmeniz (Scale/Ölçekleme) gerekir. Eğer o sunuculardan birinin donanımı yanarsa (çökerse), oradaki 50 kutuyu anında silip sağlam sunucuda o kutuları SIFIRDAN BAŞLATMANIZ gerekir.

İşte binlerce Docker konteynerini İNSAN ELİYLE yönetmenin imkansız olduğu o noktada, sahneye **Kubernetes (Kısaca K8s)** çıkar.

## 1. Kubernetes'in Görevi (Orkestra Şefi)
Google tarafından yaratılmış açık kaynaklı bir **Konteyner Orkestrasyon** (Yönetim) sistemidir.
Siz Kubernetes'e (Şefe) bir "Beyanname/Dilekçe (YAML dosyası)" verirsiniz: *"Sevgili K8s, ben e-ticaret sitemin ana sayfa kutusundan SÜREKLİ OLARAK AYAKTA 10 TANE İSTİYORUM. Bunu nasıl yapacağın beni ilgilendirmez."*

- K8s bakar, 10 tane kutuyu çalıştırır.
- Gece saat 3'te sunucunun biri alev alır ve içindeki 3 kutu ölür. K8s bunu *saniyeler içinde* fark eder.
- K8s, hiçbir insan müdahalesi olmadan, otomatik olarak başka bir sağlam sunucuda o 3 kutuyu saniyesinde yeniden yaratır ve sayıyı hep 10'da (İstediğiniz durumda) tutar. Buna **Self-Healing (Kendi Kendini İyileştirme)** denir.

## 2. Cluster (Küme) Mimarisi: Master ve Worker Düğümler

Kubernetes'in kurulu olduğu tüm sunucuların (bilgisayarların) toplamına **Cluster (Küme)** denir. Bir cluster iki farklı tür bilgisayardan oluşur:

1. **Master Node (Kontrol Düzlemi / Yönetici Beyin):** 
   Sistemin beynidir. İş yüklerini dağıtır, karar verir, durumları izler. İçinde iş (Konteyner) çalışmaz. Sadece yönetir. (API Server, Scheduler gibi parçaları vardır). Müşteriler Master'a bağlanmaz.
2. **Worker Node (İşçi Düğümler):** 
   Gerçek yükü çeken, asıl uygulamanızın (Web sitenizin, veritabanınızın) kutularının çalıştığı amele bilgisayarlardır. (Genelde Node 1, Node 2, Node 3 diye sıralanırlar).
