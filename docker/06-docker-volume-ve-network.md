# Docker Bölüm 06: Volume ve Network Derinlemesine Bakış

Bu bölümde Docker'ın en çok kafa karıştıran iki kritik konusunun (Veri Kalıcılığı ve Ağ İletişimi) perde arkasını inceleyeceğiz.

---

## 1. Veri Kalıcılığı (Data Persistence) Tipleri

Konteynerler geçicidir (stateless). Bir konteyner silindiğinde içindeki tüm veriler (veritabanı kayıtları, yüklenen fotoğraflar vb.) kalıcı olarak yok olur. Bunu önlemek için 3 farklı montaj (mount) türü vardır:

### A. Named Volumes (İsimlendirilmiş Volümler)
**En iyi ve en güvenli yöntemdir.** Dosyalar host (sizin bilgisayarınız) makinesinde Docker'ın kendi yönettiği, gizli ve korumalı bir klasörde (`/var/lib/docker/volumes/`) saklanır.

```bash
# Volume oluştur
docker volume create benim-veritabanim

# Konteynere bağla
docker run -d -v benim-veritabanim:/var/lib/mysql mysql:latest
```

### B. Bind Mounts (Klasör Bağlama)
Host makinenizdeki spesifik bir klasörü, konteynerin içindeki bir klasöre doğrudan senkronize eder. Özellikle **geliştirme (development)** ortamında, kodda yaptığınız değişikliğin konteyner yeniden başlamadan anında yansıması için (Hot Reload) kullanılır.

```bash
# Kendi bilgisayarımdaki /projem/src klasörünü, konteynerin /app klasörüne bağla
docker run -d -v /projem/src:/app node:latest
```

### C. Tmpfs Mounts (Geçici Bellek)
Veri hiçbir zaman diske yazılmaz, sadece **RAM'de (Memory)** tutulur. Konteyner durduğunda silinir. Yüksek hız gerektiren ama kalıcı olması gerekmeyen geçici şifreleme anahtarları veya önbellekler için kullanılır.

---

## 2. Docker Network Tipleri

Docker'da konteynerlerin birbirleriyle veya dış dünyayla nasıl haberleşeceğini Network (Ağ) yapıları belirler.

### A. Bridge Network (Varsayılan)
Aksi belirtilmedikçe tüm konteynerler bu ağa dahil olur. Konteynerler kendi aralarında izole bir özel ağ kurarlar.
- IP adresleriyle değil, **Konteyner İsimleri** ile birbirleriyle haberleşebilirler (Docker DNS).
- Dışarıya açılmak için Port Mapping (`-p 8080:80`) zorunludur.

```bash
docker network create projem-agi
docker run -d --net projem-agi --name veritabani mysql
docker run -d --net projem-agi --name backend sunucu
# Backend uygulaması, veritabanına bağlanmak için IP yerine "veritabani" yazabilir!
```

### B. Host Network
Konteynerin ağ izolasyonunu tamamen kaldırır. Konteyner doğrudan sizin bilgisayarınızın ağını ve portlarını kullanır.
- Port mapping (`-p`) yapmanıza gerek kalmaz.
- Çok yüksek performanslı ağ işlemlerinde kullanılır (Sadece Linux'ta tam performans çalışır).

```bash
docker run -d --network host nginx
# Nginx, direkt bilgisayarınızın localhost:80 portunu ele geçirir.
```

### C. None Network
Konteynerin hiçbir ağ erişimi yoktur. İnternete veya diğer konteynerlere bağlanamaz. Yalnızca aşırı güvenli (izole) hesaplama işlemleri için kullanılır.

### D. Macvlan
Konteynerinize ağınızdaki gerçek bir fiziksel cihazmış gibi statik bir IP veya MAC adresi atamanızı sağlar. Genellikle eski ağ (legacy network) mimarileriyle zorunlu entegrasyon durumlarında kullanılır.

---

## Özet Tablo

| İhtiyaç | Çözüm Önerisi |
| :--- | :--- |
| Veritabanı verilerim silinmesin | **Named Volume** kullan. |
| Kod yazıyorum, kaydettiğim an çalışsın | **Bind Mount** kullan. |
| Uygulamam ve veritabanım konuşsun | Kendi **Bridge Network**'ünü oluştur. |
