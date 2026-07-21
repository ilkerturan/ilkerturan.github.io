# Bölüm 02: Kubernetes Temel Objeleri (Pod, Deployment, Service)

Kubernetes'te "Docker Konteyneri" diye bir şey K8s'in direkt muhatap olduğu bir kavram değildir. Kubernetes, her şeyi kendi özel soyut "Objeleri (Bileşenleri)" içine sarar. Her şey YAML (Yamel - Ayar dosyası) ile tanımlanır.

## 1. Pod (Bakla / Kozadan Gelen En Küçük Birim)
Kubernetes dünyasının EN KÜÇÜK VE EN TEMEL yapı taşıdır.
Kubernetes asla çıplak bir Docker Konteynerini direkt yönetmez. O konteyneri alır, etrafına bir "Zarf (Kılıf)" geçirir. O kılıfın adına **Pod** denir.
- Bir Pod'un içinde genelde 1 tane Docker konteyneri çalışır (Bazen sıkı sıkıya bağlı 2 tane de olabilir).
- Pod'lar fani'dir (Ölümlüdür). Bir Pod çökerse (Ölürse), K8s gidip onu "tamir etmeye" çalışmaz! Onu çöpe atar ve onun Tıpatıp aynısından YEPYENİ BİR POD (Klon) yaratır.

## 2. ReplicaSet ve Deployment (Yönetim Katmanı)

Siz sisteme direkt "Pod" yarat derseniz, o Pod ölünce kimse onu geri diriltmez. Bu yüzden Pod'ların üzerine bir Katman giydiririz.

- **ReplicaSet (Kopya Kümesi):** Tek görevi, "Bana söylenen sayıda Pod ayakta duruyor mu?" diye nöbet tutmaktır (Örn: Replicas=3). 3'ten 2'ye düşerse, 1 tane daha yaratır.
- **Deployment (Dağıtım):** Modern K8s'te ReplicaSet'i de içine alan en yetkili "Uygulama yöneticisidir." Geliştiriciler YAML dosyasına **Deployment** yazar.
  - Deployment'ın asıl gücü **Rolling Update (Kesintisiz Güncelleme)** dir. Uygulamanın v1.0 sürümünden v2.0 sürümüne geçerken, K8s eski Pod'ları bir anda ÖLDÜRMEZ! Önce yeni versiyondan 1 tane yaratır (Müşteriye test ettirir), başarılı olursa eskiden 1 tane siler. Müşteri web sitesine girerken arkaplanda sistemin güncellendiğini RUHU BİLE DUYMAZ (Zero-Downtime).

## 3. Service (Servis / Santral) Modülü

**Büyük Problem:** Pod'lar ölümlü olduğu için, bir Pod çöküp yerine yenisi doğduğunda onun IP ADRESİ DEĞİŞİR. IP'si sürekli değişen arka plandaki 5 adet web sunucusuna, ön taraftaki kullanıcılar "Hangi IP'den" bağlanacak? Sürekli IP ezberlemek imkansızdır.

**Çözüm:** Araya bir **Service (Sanal Sabit Santral)** objesi konur. 
Service'in SIFIRLANMAYAN ve SABİT (Statik) bir IP'si (ve DNS adı) vardır. 
İnsanlar `Siparis-Servisi` adresine bağlanır. Servis o isteği alır, arka tarafta IP'si ne olursa olsun o an hayatta olan 5 Pod'dan en müsait olanına "Yük Dağıtımı (Load Balancing)" yaparak aktarır. Pod'lar ölse de dirilse de Servis'in IP'si hep aynı kalır. Tüketici mağdur olmaz.
