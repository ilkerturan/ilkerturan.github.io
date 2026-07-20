# Bölüm 02: Temel Kubernetes Objeleri

Kubernetes, "Her şey bir objedir (nesne)" mantığıyla çalışır. Biz Kubernetes'e (YAML dosyaları aracılığıyla) ne istediğimizi söyleriz, o da arka planda bu nesneleri oluşturur.

En çok kullanacağınız 3 temel obje şunlardır: **Pod**, **Deployment** ve **Service**.

---

## 1. Pod (Bezelye Kabuğu)
Kubernetes dünyasındaki **en küçük yapıtaşıdır.** Kubernetes doğrudan konteynerleri (Docker) yönetmez; konteynerleri bir **Pod**'un içine koyar ve Pod'u yönetir.
- Bir Pod'un içinde genelde 1 adet konteyner bulunur. (Bazen aynı kaynakları paylaşması gereken birbirine yapışık 2 konteyner de bulunabilir).
- Pod'lar ölümlüdür (Ephemeral). Çökerse tamir edilmez, silinip yerine yepyeni (farklı IP'ye sahip) bir Pod açılır.

---

## 2. Deployment (Yönetici)
Eğer Pod'lar ölümlüyse, sitemizin ayakta kalmasını kim garanti ediyor? **Deployment**.
Deployment, Pod'ların yöneticisidir (Patronu). 

- **Replikasyon (Replica):** Deployment'a "Bana her zaman aynı Nginx uygulamasından 3 adet Pod (kopya) ver" derseniz, o her saniye sayar. Biri çökerse, hemen 3'e tamamlamak için yeni bir Pod yaratır.
- **Sıfır Kesintili Güncelleme (Rolling Update):** Uygulamanızın v2 versiyonu çıktığında, Deployment eski Pod'ları tek tek silerken, yenilerini yavaş yavaş ayağa kaldırır. Müşteri hiçbir kesinti hissetmez.

*Örnek: "Nginx uygulamasının v1.0 versiyonunu çalıştır ve her zaman 3 kopyası (Pod) hayatta olsun."* (Bunu Deployment sağlar).

---

## 3. Service (Trafik Polisi)
Pod'lar öldüğünde yerine gelen yeni Pod'ların IP adresleri farklıdır. Peki kullanıcılar sitemize (veri tabanımıza) hangi IP'den bağlanacak? IP sürekli değişirse iletişim nasıl kurulacak?
İşte burada **Service** devreye girer.

Service, arkasında kaç tane Pod olursa olsun, o Pod grubuna (Deployment'a) **sabit, hiç değişmeyen bir IP adresi** verir. Ayrıca gelen yükü arkadaki 3 Pod'a eşit dağıtır (Load Balancer).

Service Tipleri:
1. **ClusterIP (Varsayılan):** Sadece K8s içindeki uygulamaların birbiriyle konuşmasını sağlar (Dışarıdan girilemez). *Örn: Backend'in Veritabanına bağlanması.*
2. **NodePort:** Uygulamayı K8s sunucusunun (Node) belirli bir IP'si ve Port'u (30000-32767 arası) üzerinden dış dünyaya açar. Geliştirme ortamlarında kullanılır.
3. **LoadBalancer:** Uygulamayı (AWS, Google Cloud gibi) bulut servislerinin yük dengeleyicisi (gerçek bir dış IP) üzerinden tüm internete açar.

---

### Akılda Kalıcı Bir Metafor
- **Container (Docker):** Sahnede şarkı söyleyen sanatçı.
- **Pod:** Sanatçının durduğu sahne ve mikrofon sistemi.
- **Deployment:** Menajer. Sanatçı hastalanırsa anında yerine aynısından yeni bir sanatçı bulup sahneye koyar.
- **Service:** Tiyatronun gişesi. Seyirciler (Kullanıcılar) içeride hangi sanatçının (IP'nin) olduğuna bakmaz, doğrudan gişeye gider, gişe seyirciyi doğru sahneye yönlendirir.
