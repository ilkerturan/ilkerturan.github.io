# Bölüm 03: Minikube ile Yerel Ortam ve Kubectl Komutları

Kubernetes öğrenmek için gidip Amazon AWS'den 5 tane devasa sunucu kiralamanıza gerek yoktur. Kubernetes'i kendi yerel (Local) dizüstü bilgisayarınıza kurup, ufak bir laboratuvar oluşturabilirsiniz.

## 1. Minikube Nedir?
Gerçek K8s cluster'ları en az 3-4 bilgisayardan oluşur. **Minikube** ise, tüm bu devasa Kubernetes "Master" ve "Worker" mimarisini küçültüp (sıkıştırıp), sizin bilgisayarınızın içindeki **TEK BİR Sanal Makineye (Virtual Machine / Docker Container)** kuran bir simülasyon aracıdır.
Geliştiriciler testlerini ve K8s öğrenme süreçlerini Minikube üzerinde yaparlar.

**Kurulum / Başlatma:**
Sadece terminale `minikube start` yazarsınız ve birkaç dakika içinde bilgisayarınızda hazır bir Kubernetes Cluster'ı kurulmuş olur.

## 2. Kubectl (Kube-Control) Nedir?
Kubernetes (Master Node), kendisine terminal (Komut satırı) üzerinden gönderilen komutları anlayan devasa bir API'dir.
Sizin, o API ile konuşabilmeniz için (K8s'e emirler verebilmeniz için) kullandığınız aracı komut satırı programının adına **`kubectl`** (Küüp-Si-Ti-El diye okunur) denir. K8s'in kumandasıdır.

## 3. En Çok Kullanılan (Hayat Kurtaran) Kubectl Komutları

*Yazılımcıların ezbere bildiği temel komut seti:*

1. **Sistem Durumu ve Bilgi Alma:**
   - `kubectl get nodes` : Kümedeki çalışan sunucuları (Bilgisayarları) listeler.
   - `kubectl get pods` : Çalışan tüm konteyner kutularını (Pod'ları) listeler.
   - `kubectl get services` : Açık olan sabit IP'leri (Servisleri) listeler.

2. **İçeriye Dalma ve İnceleme (Troubleshooting):**
   - `kubectl describe pod pod-ismi` : Bir Pod çöktüğünde "Neden çöktü, nerede hata verdi, IP'si ne?" gibi devasa bir dedektif raporu çıkarır (Hata bulmanın en iyi yoludur).
   - `kubectl logs pod-ismi` : Uygulamanızın konsoluna basılan (Console.WriteLine) mesajlarını ve hata loglarını canlı olarak görmenizi sağlar.
   - `kubectl exec -it pod-ismi -- /bin/sh` : Docker'da olduğu gibi, canlı çalışan o Pod'un İÇİNE SIZARAK (SSH gibi) bir terminal penceresi açar. Dosyaları kurcalayabilirsiniz.

3. **Uygulama Çalıştırma ve Silme:**
   - `kubectl apply -f proje.yaml` : "Al bu dilekçeyi (Yaml dosyasını) oku ve içindeki her şeyi çalıştır/uygula" komutudur. En tehlikeli ve en çok kullanılan komuttur.
   - `kubectl delete pod pod-ismi` : Seçili objeyi acımasızca siler. (Silseniz bile eğer arkasında Deployment varsa, 1 saniye sonra yenisi doğacaktır).
