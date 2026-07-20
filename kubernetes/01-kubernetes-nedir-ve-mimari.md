# Bölüm 01: Kubernetes (K8s) Nedir ve Temel Mimarisi

Docker ile uygulamalarımızı izole kutulara (konteynerlere) koymayı öğrendik. Ancak gerçek dünyada (Production), Amazon veya Google sunucularında binlerce konteyner aynı anda çalışır. Bu binlerce konteynerin çökmemesini, ağ ayarlarını, güncellemelerini ve yük dağılımını kim yönetecek?

İşte bu sorunun cevabı: **Kubernetes (Kısaca K8s)**.

> *K8s kısaltması, "K" ile "s" harfleri arasındaki 8 harften (ubernete) gelir.*

---

## 1. Neden Kubernetes'e İhtiyaç Duyarız? (Docker vs K8s)

- **Docker:** Tek bir konteyner oluşturur ve çalıştırır (Örn: Arabanın motorunu üretir).
- **Kubernetes:** Yüzlerce konteyneri aynı anda yöneten orkestra şefidir (Örn: Otonom sürüş sistemi, trafik lambaları, tamirci). 
  - Bir konteyner çökerse (Crash), K8s anında yenisini başlatır (Self-healing).
  - Web sitenize aniden 10.000 kişi girerse, K8s otomatik olarak 5 yeni konteyner daha açıp yükü dağıtır (Auto-scaling).
  - Kullanıcılar fark etmeden (sıfır kesintiyle) uygulamanızın yeni versiyonunu günceller (Rolling Updates).

---

## 2. Kubernetes Mimarisi (Nasıl Çalışır?)

Kubernetes temel olarak iki ana donanım/sunucu grubundan oluşur: **Master Node** (Patron) ve **Worker Node** (İşçiler).

### A. Master Node (Control Plane)
Sistemin beynidir. Kararları verir, işçileri yönetir, uygulamanın sağlıklı çalışıp çalışmadığını denetler. İçinde kendi bileşenleri vardır:
- **Kube-apiserver:** K8s'in kalbidir. Bizim (veya diğer bileşenlerin) K8s ile konuşmasını sağlayan kapıdır.
- **Etcd:** Cluster'ın tüm verilerinin (durum, konfigürasyon) tutulduğu yüksek erişilebilirliğe sahip anahtar-değer (Key-Value) veritabanıdır. K8s'in hafızasıdır.
- **Kube-scheduler:** Yeni oluşturulacak bir uygulamanın (konteynerin) hangi işçi (Worker) sunucuda çalışacağına karar verir (RAM/CPU durumuna göre).
- **Kube-controller-manager:** Sistemin istediğimiz durumda olup olmadığını sürekli kontrol eder. (Örn: "3 konteyner açık olmalı" dedik ama biri çöktü. Controller Manager bunu fark edip Scheduler'a yenisini açmasını emreder).

### B. Worker Node (İşçi Sunucular)
Asıl yükü çeken, uygulamalarımızın (konteynerlerimizin) fiziksel olarak çalıştığı sunuculardır.
- **Kubelet:** Master Node ile konuşan ve Worker'ın içinde çalışan ajandır (ajan yazılım). Master'dan "Şu uygulamayı çalıştır" emrini alır ve uygular. Durumu Master'a raporlar.
- **Kube-proxy:** Sunucular içindeki ağ ve IP trafiğini yönlendiren trafik polisidir. İnternetten gelen bir isteğin doğru konteynere gitmesini sağlar.
- **Container Runtime:** Konteyneri çalıştıran motor (Örn: Docker, containerd).
