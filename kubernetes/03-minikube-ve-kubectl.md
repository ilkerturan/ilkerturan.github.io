# Bölüm 03: Minikube ve Kubectl Kullanımı

Kubernetes'in teorisini öğrendik. Peki bunu kendi bilgisayarımızda (Windows, Mac, Linux) nasıl çalıştıracağız? Bunun için binlerce dolarlık sunucular kiralayacak mıyız? Tabii ki hayır.

---

## 1. Minikube Nedir?
Gerçek Kubernetes, Master ve Worker olmak üzere en az 2-3 sunucu ister. Ancak **Minikube**, tüm bu Kubernetes mimarisini tek bir sanal makine (veya Docker konteyneri) içerisine sıkıştırıp yerel bilgisayarınızda (localhost) çalıştırmanızı sağlayan muazzam bir eğitim ve test aracıdır.

*(Minikube kurulumu işletim sisteminize göre değişir, [resmi sitesinden](https://minikube.sigs.k8s.io/docs/start/) tek satırlık komutla kurabilirsiniz).*

**Minikube'u Başlatmak:**
```bash
minikube start
```
*Bu komut arka planda K8s mimarisini (Apiserver, Kubelet vs.) sizin için ayağa kaldırır.*

---

## 2. Kubectl Nedir?
Kubernetes kümesiyle (Cluster) konuşmamızı, ona emirler (Örn: 3 tane Pod aç) vermemizi sağlayan Komut Satırı (CLI) aracıdır. 
*(Eğer Minikube'u kurduysanız, kubectl komutları da genelde otomatik gelir).*

### En Sık Kullanılan `kubectl` Komutları

```bash
# Sistemdeki tüm node'ları (sunucuları) göster
kubectl get nodes

# Sistemdeki çalışan tüm Pod'ları göster
kubectl get pods

# Sistemdeki servisleri göster
kubectl get svc

# Detaylı bilgi alma (Örn: Hata veren bir Pod'un neden çöktüğünü anlamak için)
kubectl describe pod <pod-ismi>

# İçinde bulunduğunuz sistemi tamamen silmek (kaldırmak)
kubectl delete pod <pod-ismi>
```

---

## 3. İlk Uygulamamızı (Nginx) Çalıştıralım

Kubernetes'te her şey **YAML** adı verilen deklaratif (ne istediğimizi anlatan) konfigürasyon dosyalarıyla yaratılır.

**`nginx-deployment.yaml` dosyası oluşturalım:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: benim-nginx-sitem
spec:
  replicas: 3 # Lütfen bana 3 kopya ver (Self-healing)
  selector:
    matchLabels:
      app: nginx
  template: # Buradan aşağısı Pod'un tarifidir
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx-konteyneri
        image: nginx:latest # Docker Hub'dan nginx indir
        ports:
        - containerPort: 80
```

**Bu YAML dosyasını Kubernetes'e göndermek (Uygulamak) için:**
```bash
kubectl apply -f nginx-deployment.yaml
```

Kubernetes bu komutu (Kube-apiserver) alır, okur ve saniyeler içinde 3 adet Nginx konteynerini (Pod) ayağa kaldırır.
Test etmek için: `kubectl get pods` komutunu çalıştırırsanız, 3 adet Nginx pod'unun `Running` durumunda olduğunu görebilirsiniz!
