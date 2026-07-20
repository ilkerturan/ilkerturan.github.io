# Bölüm 04: İleri Seviye (Ingress, ConfigMap, Secret)

Temel K8s yetenekleri ile bir uygulamayı ayağa kaldırıp, kopyalarını yönetmeyi öğrendik. Ancak Production (Canlı) ortamlarında çok daha ince ayarlara ihtiyaç duyarız.

---

## 1. Ingress (Gelişmiş Yönlendirici)

Önceki bölümlerde **Service (LoadBalancer)** kullanarak uygulamamızı dışarı açtık. Ancak şirketinizin 10 farklı mikroservisi (API'si) varsa, her biri için bulut sisteminden ayrı bir LoadBalancer (Ayrı bir IP) satın alırsanız ayda binlerce dolar fatura gelir. 

Ayrıca "Service", alan adları (`api.sitem.com` veya `sitem.com/admin`) üzerinden yönlendirme yapamaz. Sadece port ve IP yönlendirir.

**Ingress**, Cluster'ın tek bir kapısıdır (Tek bir IP'si vardır). Kullanıcıların hangi adrese (`URL` veya `Domain`) girdiğine bakarak trafiği arkadaki doğru Service'lere dağıtır (Reverse Proxy gibi).

*Örnek Akış:*
- Kullanıcı `app.sitem.com` adresine girer -> Ingress -> Frontend Service -> Frontend Pod'ları
- Kullanıcı `api.sitem.com` adresine girer -> Ingress -> Backend API Service -> Backend Pod'ları

---

## 2. ConfigMap (Ayarları Koddan Ayırmak)

Uygulamanızın renk teması, log seviyesi veya bir API Endpoint URL'si gibi ayarları kodun içine (hardcoded) yazmak büyük bir hatadır. Çünkü URL değiştiğinde kodu tekrar derleyip yeni bir Docker imajı çıkartmanız gerekir.

**ConfigMap**, konfigürasyon değişkenlerini K8s içinde saklar. 

- K8s, ConfigMap'in içindeki veriyi Pod'a bir **Çevre Değişkeni (Environment Variable)** olarak (örn: `process.env.API_URL`) veya bir dosya olarak verir.
- Böylece sadece ConfigMap'i güncelleyerek aynı Docker imajını (kodu değiştirmeden) Dev, Test ve Production ortamlarında çalıştırabilirsiniz.

```bash
# Hızlıca bir ConfigMap oluşturalım
kubectl create configmap benim-ayarim --from-literal=TEMA_RENGI=Koyu
```

---

## 3. Secret (Sır Tutucu)

ConfigMap ile aynı işi yapar ancak **Şifreler** içindir. (Veritabanı şifresi, AWS API Key'leri, SSL Sertifikaları).

Farkları:
- ConfigMap'teki veriler düz metin (Plain Text) olarak tutulur.
- Secret'taki veriler Base64 formatında kodlanır (Encode) ve diske şifrelenerek yazılabilir (Etcd Encryption).

> *Önemli: Secret verileri Base64 ile kodlandığı için tam anlamıyla "şifrelenmiş" değildir, çok kolay çözülür (Decode). Temel amaç, şifrenin GitHub'daki YAML kodları arasında düz metin olarak dolaşmasını engellemektir.*

```bash
kubectl create secret generic db-sifresi --from-literal=sifre=SuperGizli123
```
Bu secret'ı bir Pod'a bağladığınızda, uygulamanız veritabanı şifresini güvenle okuyabilir ve kimse GitHub deponuzda şifreyi göremez.
