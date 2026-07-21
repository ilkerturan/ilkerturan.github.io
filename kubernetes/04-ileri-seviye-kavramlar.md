# Bölüm 04: İleri Seviye K8s Kavramları (Ingress, ConfigMap, Namespaces)

Artık Pod'lar çalışıyor, Servislerle sabit IP atadık. Ancak gerçek bir büyük şirket mimarisinde ihtiyaçlar daha karmaşıktır. Ayar dosyalarınızı nereye koyacaksınız? İki farklı ortamı (Test ve Canlı) aynı sunucuda nasıl ayıracaksınız? 

İşte İleri seviye kavramlar burada imdada yetişir.

## 1. Ingress (Dış Dünyaya Açılan Akıllı Kapı)

**Problem:** İçerideki uygulamalara Service objesi IP verir dedik ama o IP'ler "Sistemin İç Ağına (Internal)" aittir. Dünyanın öbür ucundaki bir adam tarayıcıya `www.sitem.com` yazdığında o Pod'lara nasıl ulaşacak?
**Çözüm:** Dış dünya ile iç dünya arasındaki kapıya (API Gateway) **Ingress** adı verilir. Ingress, tek bir dış IP adresi kullanarak, adresin sonundaki URL'ye göre istekleri içerideki doğru servise yönlendiren AKILLI bir Trafik Polisidir.
- Örn: Kullanıcı `sitem.com/api` yazarsa, Ingress bunu alır ve arka plandaki `Backend-Servisine` yönlendirir.
- Kullanıcı `sitem.com/admin` yazarsa, Ingress bunu alır ve `Admin-Panel-Servisine` yönlendirir. (Ve bedavadan HTTPS sertifikası - SSL Termination yapar).

## 2. ConfigMap ve Secret (Ayarları Koddan Ayırmak)

**Kötü Yaklaşım:** Veritabanı şifrenizi veya bağlantı cümlenizi C# kodunun içine gömüp (Hardcode) Docker Image'ına çevirirseniz, şifre değiştiğinde koca Image'ı baştan oluşturmak zorunda kalırsınız.
**K8s Çözümü:** 
- **ConfigMap:** Kodunuz için gereken çevresel değişkenleri (Örn: `MAKS_SİPARİS_LİMİTİ=50`, `TEMA_RENGİ=Mavi`) Kubernetes'in hafızasında tutan bir dosyadır. Pod yaratılırken K8s bu değerleri Pod'un içine enjekte eder. Değer değişince kodu değil, sadece ConfigMap'i değiştirirsiniz.
- **Secret (Sır):** ConfigMap'in aynısıdır ancak sadece "Hassas ve Gizli" veriler (Veritabanı şifreleri, API Token'lar) için kullanılır. Değerler Base64 ile şifrelenerek sistemde gizli tutulur.

## 3. Namespaces (Sanal Mahalleler)

**Problem:** Şirketinize tek bir devasa K8s Cluster (Sunucu kümesi) kurdunuz. Ama şirketinizde "Muhasebe Uygulaması Ekibi", "Mobil Uygulama Ekibi" ve "Web Sitesi Ekibi" aynı yeri kullanıyor. Ayrıca "Test (Dev)" ortamı ve "Canlı (Prod)" ortamı var. Bütün Pod'ları aynı yere atarsınız her şey birbirine karışır. Bir ekip yanlışlıkla diğerinin uygulamasını siler.
**Çözüm (Namespace):** Kubernetes cluster'ını fiziksel değil, **Sanal (Mantıksal)** olarak odalara (Namespace'lere) bölmektir.
- `kube-system` : K8s'in kendi beyin dosyalarının çalıştığı dokunulmaz odadır.
- `dev-ortami` ve `canli-ortam` diye odalar açarsınız.
Her odanın (Namespace) içindeki isimler, Servisler ve Pod'lar DİĞERİNİ GÖRMEZ (İzole edilir). Hatta odalara "Kota" bile koyabilirsiniz ("Muhasebe takımı sadece maksimum 10 GB RAM kullansın" gibi).
