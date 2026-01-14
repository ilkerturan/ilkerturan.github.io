# 🐳 Teknik Terimler

> Docker ile ilgili siklikla kullanilan terim ve kavramlar.

---

## 📑 İçindekiler

- [A](#a) | [B](#b) | [C](#c) | [D](#d) | [E](#e) | [F](#f) | [G](#g) | [H](#h) | [I](#i) | [J](#j) | [K](#k) | [L](#l) | [M](#m)
- [N](#n) | [O](#o) | [P](#p) | [R](#r) | [S](#s) | [T](#t) | [U](#u) | [V](#v) | [W](#w)

---

## A

### Alpine
**Ne:** Çok hafif (5 MB) bir Linux dağıtımı.  
**Kullanım:** Docker image'lerinde temel image olarak kullanılır.  
**Örnek:** `FROM node:18-alpine`  
**Fayda:** Image boyutunu %80-90 azaltır.  
**Not:** `apk` paket yöneticisi kullanır (apt-get değil).

### Anonymous Volume
**Ne:** İsimsiz, geçici volume.  
**Oluşturma:** `docker run -v /app/data myapp`  
**Özellik:** Container silinince volume da silinir.  
**Kullanım:** Geçici cache veya build dosyaları için.

### ARG
**Ne:** Build-time (derleme zamanı) değişkeni.  
**Syntax:** `ARG NODE_VERSION=18`  
**Kullanım:** Dockerfile'da `${NODE_VERSION}` ile erişilir.  
**Fark:** ENV'den farkı sadece build sırasında var olması.  
**Örnek:**
```dockerfile
ARG VERSION=1.0
FROM node:${VERSION}
```

### Artifact
**Ne:** Build işlemi sonucu oluşan çıktı dosyaları.  
**Örnek:** Derlenmiş JavaScript, minified CSS, binary dosyalar.  
**Multi-stage build'de:** Builder stage'den production stage'e kopyalanır.

---

## B

### Base Image
**Ne:** Dockerfile'ın FROM komutunda belirtilen temel image.  
**Örnekler:** `ubuntu:22.04`, `node:18`, `python:3.11`  
**Özellik:** Her Dockerfile bir base image ile başlar.  
**Scratch:** Boş base image (en minimal).

### Bind Mount
**Ne:** Host sistemdeki bir klasörü container'a direkt bağlama.  
**Syntax:** `-v /host/yol:/container/yol`  
**Kullanım:** Development ortamında kod değişikliklerini anında yansıtmak.  
**Örnek:** `docker run -v $(pwd):/app myapp`  
**Risk:** Host dosyalarına tam erişim (güvenlik).

### Bridge Network
**Ne:** Docker'ın varsayılan network türü.  
**Özellik:** Container'lar birbirini isim ile bulabilir.  
**Kullanım:** Aynı host'taki container'lar arası iletişim.  
**Komut:** `docker network create --driver bridge mynet`

### Build
**Ne:** Dockerfile'dan image oluşturma işlemi.  
**Komut:** `docker build -t myapp .`  
**BuildKit:** Modern, hızlı build motoru.  
**Cache:** Değişmeyen layer'lar yeniden kullanılır.

### Build Context
**Ne:** `docker build` komutunda belirtilen klasör.  
**Örnek:** `docker build .` → Mevcut klasör context'tir.  
**Önemli:** Context'teki tüm dosyalar Docker daemon'a gönderilir.  
**Optimizasyon:** .dockerignore ile gereksiz dosyaları hariç tutun.

### BuildKit
**Ne:** Docker'ın yeni nesil build motoru.  
**Özellikler:**
- Paralel build
- Gelişmiş cache yönetimi
- Secrets desteği
- SSH forward
**Aktif etme:** `export DOCKER_BUILDKIT=1`

---

## C

### Cache
**Ne:** Build sırasında değişmeyen layer'ların saklanması.  
**Fayda:** Build süresini 10x hızlandırabilir.  
**Bozulma:** Bir layer değişirse sonraki tüm cache geçersiz olur.  
**No-cache:** `docker build --no-cache -t myapp .`

### cgroup (Control Groups)
**Ne:** Linux kernel özelliği; kaynak sınırlama.  
**Docker kullanımı:** CPU, memory, I/O limitlerini uygular.  
**Örnek:** `--memory="512m" --cpus="1.0"`

### CMD
**Ne:** Container başladığında çalışacak varsayılan komut.  
**Syntax:** `CMD ["executable", "param1", "param2"]`  
**Özellik:** Runtime'da override edilebilir.  
**Fark:** ENTRYPOINT'ten farkı override edilebilir olması.  
**Örnek:**
```dockerfile
CMD ["npm", "start"]
# docker run myapp npm test  → CMD override edildi
```

### Compose (Docker Compose)
**Ne:** Çoklu container uygulamaları tanımlama ve çalıştırma aracı.  
**Dosya:** `docker-compose.yml` (YAML formatı)  
**Komut:** `docker compose up`  
**Sürüm:** v2 artık Docker CLI'ya entegre.

### Container
**Ne:** Image'den oluşturulan çalışan/duran izole edilmiş işlem.  
**Özellikler:**
- Kendi dosya sistemi
- Kendi network interface
- İzole process space
**Lifecycle:** Create → Start → Stop → Remove

### Container ID
**Ne:** Her container'ın benzersiz 64 karakterlik tanımlayıcısı.  
**Görüntüleme:** `docker ps` (ilk 12 karakter)  
**Kullanım:** `docker stop a7f8d9e6c5b4`  
**Kısayol:** İlk 3-4 karakter yeterlidir.

### Container Runtime
**Ne:** Container'ları çalıştıran düşük seviye yazılım.  
**Örnekler:** containerd, CRI-O, runc  
**Docker:** containerd kullanır.

### COPY
**Ne:** Host'tan container'a dosya kopyalama komutu.  
**Syntax:** `COPY [kaynak] [hedef]`  
**Özellik:** Sadece lokal dosyaları kopyalar.  
**Fark ADD'den:** URL indirme ve tar açma yapmaz.  
**Örnek:** `COPY package.json /app/`

---

## D

### Daemon (Docker Daemon)
**Ne:** Docker işlemlerini yöneten arka plan servisi.  
**İsim:** `dockerd`  
**Görev:** Container'ları çalıştırır, image'leri yönetir.  
**İletişim:** Docker CLI ile REST API üzerinden.  
**Konum:** 
- Linux: `/var/run/docker.sock`
- Windows/Mac: Docker Desktop içinde

### Dangling Image
**Ne:** Tag'i olmayan (ismi yok) image.  
**Oluşumu:** Yeni build ile eski image'in tag'i kaybolur.  
**Görüntüleme:** `docker images -f "dangling=true"`  
**Temizleme:** `docker image prune`

### Detached Mode
**Ne:** Container'ı arka planda çalıştırma modu.  
**Flag:** `-d` veya `--detach`  
**Kullanım:** `docker run -d nginx`  
**Karşıt:** Foreground mode (varsayılan)  
**Log:** `docker logs` ile görüntülenebilir.

### Dockerfile
**Ne:** Docker image'i oluşturmak için talimatlar içeren dosya.  
**Format:** Metin dosyası, her satır bir komut.  
**İsim:** Genellikle `Dockerfile` (uzantısız)  
**Özel isim:** `docker build -f Dockerfile.dev`

### Docker CLI
**Ne:** Docker komut satırı arayüzü.  
**Komutlar:** `docker [command] [options]`  
**İletişim:** Docker daemon ile REST API üzerinden.  
**Versiyon:** `docker --version`

### Docker Compose
**Bkz:** [Compose](#compose-docker-compose)

### Docker Desktop
**Ne:** Windows ve macOS için Docker'ın grafik arayüzü.  
**İçerik:** Docker Engine + CLI + Compose + GUI  
**Özellikler:** Dashboard, Extensions, Kubernetes  
**Alternatif:** Podman Desktop, Rancher Desktop

### Docker Engine
**Ne:** Docker'ın ana bileşeni (daemon + CLI + API).  
**Mimari:**
```
Docker CLI → REST API → Docker Daemon → containerd → runc
```

### Docker Hub
**Ne:** Docker image'lerinin bulunduğu resmi registry.  
**URL:** https://hub.docker.com  
**Özellikler:**
- Ücretsiz public repository
- Private repository (ücretli)
- Official images
- Verified publisher
**Kullanım:** `docker pull nginx` (Docker Hub'dan)

### Docker Registry
**Ne:** Docker image'lerinin depolandığı sunucu.  
**Türleri:**
- Docker Hub (public)
- Private registry (şirket içi)
- Cloud registry (AWS ECR, GCP GCR)
**Kurulum:** `docker run -d -p 5000:5000 registry`

### Docker Scout
**Ne:** Image güvenlik tarama aracı.  
**Komut:** `docker scout quickview myapp`  
**Fayda:** Vulnerability (güvenlik açıkları) tespit eder.

### Docker Swarm
**Ne:** Docker'ın yerleşik container orkestrasyon aracı.  
**Kullanım:** Çoklu host'ta container yönetimi.  
**Alternatif:** Kubernetes (daha popüler)  
**Komut:** `docker swarm init`

---

## E

### ENTRYPOINT
**Ne:** Container'ın ana çalıştırılabilir dosyası.  
**Syntax:** `ENTRYPOINT ["executable", "param1"]`  
**Özellik:** Override edilemez (sadece parametre eklenebilir).  
**Kullanım:** CMD ile birlikte kullanılır.  
**Örnek:**
```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
# Çalışan: python app.py
# docker run myapp test.py → python test.py
```

### ENV
**Ne:** Container içinde kullanılacak environment variable.  
**Syntax:** `ENV KEY=value`  
**Kullanım:** Uygulama konfigürasyonu.  
**Erişim:** `process.env.KEY` (Node.js), `os.getenv('KEY')` (Python)  
**Override:** `docker run -e KEY=newvalue`

### Environment Variable
**Ne:** İşletim sistemi seviyesinde tanımlı değişken.  
**Docker'da:** Container'a dışarıdan konfigürasyon geçmek için.  
**Güvenlik:** Hassas veriler için güvenli değil (.env dosyası kullanın).  
**Örnek:** `docker run -e DB_HOST=localhost myapp`

### Exec
**Ne:** Çalışan container içinde komut çalıştırma.  
**Komut:** `docker exec [options] [container] [command]`  
**Yaygın:** `docker exec -it myapp sh` (container'a giriş)  
**Özellik:** Container'ı durdurmaz.

### EXPOSE
**Ne:** Container'ın hangi portu dinlediğini belirtir.  
**Syntax:** `EXPOSE 3000`  
**Özellik:** Dokümantasyon amaçlı (port otomatik açılmaz).  
**Gerçek açma:** `-p` flag'i ile: `docker run -p 3000:3000`

---

## F

### Foreground Mode
**Ne:** Container'ı ön planda çalıştırma (varsayılan).  
**Kullanım:** `docker run nginx` (terminal kitlenir)  
**Çıkış:** Ctrl+C ile durdurulur.  
**Karşıt:** Detached mode (`-d`)

### FROM
**Ne:** Dockerfile'ın ilk komutu; base image belirtir.  
**Syntax:** `FROM image:tag`  
**Zorunlu:** Her Dockerfile FROM ile başlar.  
**Örnekler:**
```dockerfile
FROM ubuntu:22.04
FROM node:18-alpine
FROM scratch  # Boş image
```

---

## G

### Garbage Collection (GC)
**Ne:** Kullanılmayan kaynakları otomatik temizleme.  
**Docker'da:** Dangling image, unused volume temizliği.  
**Komut:** `docker system prune`

### Graph Driver
**Ne:** Docker'ın dosya sistemini yönetme yöntemi.  
**Türleri:** overlay2, aufs, btrfs, zfs  
**Varsayılan:** overlay2 (en hızlı)  
**Kontrol:** `docker info | grep "Storage Driver"`

---

## H

### Health Check
**Ne:** Container'ın sağlığını kontrol eden test.  
**Dockerfile:**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost/health || exit 1
```
**Compose:**
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost/health"]
  interval: 30s
```
**Durum:** healthy, unhealthy, starting

### Host Network
**Ne:** Container'ın host'un network'ünü kullanması.  
**Kullanım:** `docker run --network host myapp`  
**Özellik:** Port mapping gerekmez (direkt host portu).  
**Risk:** Güvenlik (izolasyon yok).

### Hub
**Bkz:** [Docker Hub](#docker-hub)

---

## I

### Image
**Ne:** Container'ı oluşturmak için kullanılan read-only şablon.  
**İçerik:** Uygulama kodu + bağımlılıklar + konfigürasyon.  
**Format:** Katmanlı (layered) dosya sistemi.  
**Boyut:** 10 MB (Alpine) - 2 GB (tam Ubuntu).  
**Depolama:** Lokal veya registry'de.

### Image ID
**Ne:** Her image'in benzersiz SHA-256 hash değeri.  
**Format:** 64 karakter (görüntülenen: 12 karakter)  
**Kullanım:** `docker rmi abc123def456`

### Image Layer
**Ne:** Image'i oluşturan her bir değişiklik katmanı.  
**Oluşum:** Her Dockerfile komutu (FROM, RUN, COPY) yeni layer.  
**Özellik:** Layer'lar paylaşılabilir ve cache'lenebilir.  
**Görüntüleme:** `docker history myapp`

### Interactive Mode
**Ne:** Container ile etkileşimli çalışma modu.  
**Flag:** `-i` (interactive) ve `-t` (tty/terminal)  
**Kullanım:** `docker run -it ubuntu bash`  
**Çıkış:** `exit` veya Ctrl+D

---

## J

### JSON File Driver
**Ne:** Docker'ın varsayılan log driver'ı.  
**Özellik:** Logları JSON formatında saklar.  
**Konum:** `/var/lib/docker/containers/[container-id]/[container-id]-json.log`  
**Problem:** Log dosyası sınırsız büyüyebilir.  
**Çözüm:** Log rotation yapılandırın.

---

## K

### Kernel
**Ne:** İşletim sisteminin çekirdeği.  
**Docker:** Tüm container'lar host'un kernel'ini paylaşır.  
**Namespace:** Container izolasyonu için kernel özelliği.  
**Versiyon:** Linux 3.10+ gerekli (Docker için).

### Kill
**Ne:** Container'ı zorla sonlandırma.  
**Komut:** `docker kill [container]`  
**Fark stop'tan:** SIGKILL sinyali gönderir (graceful değil).  
**Signal:** `docker kill --signal=SIGTERM [container]`

### Kubernetes (K8s)
**Ne:** Container orkestrasyon platformu (Docker Swarm alternatifi).  
**Kullanım:** Yüzlerce/binlerce container yönetimi.  
**Popülerlik:** Endüstri standardı.  
**Docker:** Kubernetes Docker container'larını çalıştırabilir.

---

## L

### Label
**Ne:** Image veya container'a metadata ekleme.  
**Dockerfile:** `LABEL version="1.0" maintainer="you@email.com"`  
**Runtime:** `docker run --label env=prod myapp`  
**Filtreleme:** `docker ps --filter "label=env=prod"`

### Layer
**Bkz:** [Image Layer](#image-layer)

### Logging Driver
**Ne:** Container loglarının nasıl saklanacağını belirler.  
**Türleri:**
- json-file (varsayılan)
- syslog
- journald
- gelf (Graylog)
- fluentd
- awslogs
**Değiştirme:** `docker run --log-driver=syslog`

### Logs
**Ne:** Container'ın stdout ve stderr çıktıları.  
**Komut:** `docker logs [container]`  
**Canlı:** `docker logs -f [container]`  
**Son N satır:** `docker logs --tail 50 [container]`

---

## M

### Manifest
**Ne:** Image'in metadata bilgileri (platformlar, layer'lar).  
**Kullanım:** Multi-platform image'ler için.  
**Komut:** `docker manifest inspect nginx`

### Mount
**Ne:** Host dosya sisteminin container'a bağlanması.  
**Türleri:**
- Bind mount: Host klasörü direkt bağlama
- Volume mount: Docker volume bağlama
- tmpfs mount: Geçici bellek bağlama

### Multi-platform
**Ne:** Farklı CPU mimarilerine uygun image'ler.  
**Örnekler:** amd64 (Intel/AMD), arm64 (Apple Silicon, Raspberry Pi)  
**Build:** `docker buildx build --platform linux/amd64,linux/arm64`

### Multi-stage Build
**Ne:** Dockerfile'da birden fazla FROM kullanarak build ve production aşaması ayırma.  
**Fayda:** Image boyutunu %80-90 azaltır.  
**Örnek:**
```dockerfile
FROM node:18 AS builder
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
```

---

## N

### Namespace
**Ne:** Linux kernel özelliği; izolasyon sağlar.  
**Türleri:**
- PID: Process izolasyonu
- NET: Network izolasyonu
- MNT: Mount izolasyonu
- UTS: Hostname izolasyonu
- IPC: Inter-process communication
- USER: User izolasyonu

### Named Volume
**Ne:** İsimli, kalıcı Docker volume.  
**Oluşturma:** `docker volume create mydata`  
**Kullanım:** `docker run -v mydata:/app/data`  
**Konum:** `/var/lib/docker/volumes/mydata/_data`  
**Fayda:** Container silinse de veriler kalır.

### Network
**Ne:** Container'lar arası iletişim altyapısı.  
**Türleri:** bridge, host, overlay, macvlan, none  
**Varsayılan:** bridge  
**Oluşturma:** `docker network create mynet`

### Node
**Ne:** Docker Swarm cluster'daki bir makine.  
**Türleri:** Manager node, Worker node  
**Kullanım:** Swarm modu için gerekli.

---

## O

### Official Image
**Ne:** Docker Hub'da resmi olarak desteklenen image'ler.  
**Örnekler:** nginx, mysql, redis, node, python  
**Güvenlik:** Düzenli güncellenir, güvenilirdir.  
**İşaret:** Docker Hub'da "Official Image" badge'i.

### Orchestration
**Ne:** Çoklu container ve host yönetimi.  
**Araçlar:** Kubernetes, Docker Swarm, Nomad  
**Özellikler:** Auto-scaling, load balancing, self-healing.

### Overlay Network
**Ne:** Farklı host'lardaki container'ları bağlayan network.  
**Kullanım:** Docker Swarm veya Kubernetes  
**Özellik:** Multi-host iletişim.

---

## P

### Pause
**Ne:** Container'ı geçici olarak durdurma (process freeze).  
**Komut:** `docker pause [container]`  
**Devam:** `docker unpause [container]`  
**Fark stop'tan:** Process duraklatılır (arka planda çalışmaya devam eder).

### Port Mapping
**Ne:** Host portunun container portuna yönlendirilmesi.  
**Syntax:** `-p [HOST_PORT]:[CONTAINER_PORT]`  
**Örnek:** `docker run -p 8080:80 nginx`  
**Şema:** `localhost:8080 → container:80`

### Private Registry
**Ne:** Şirket içi Docker registry.  
**Kurulum:** `docker run -d -p 5000:5000 registry`  
**Kullanım:** Hassas/ticari image'ler için.  
**Alternatifler:** Harbor, Nexus, AWS ECR

### Prune
**Ne:** Kullanılmayan kaynakları temizleme.  
**Komutlar:**
- `docker system prune` - Tümü
- `docker image prune` - Dangling image'ler
- `docker volume prune` - Kullanılmayan volume'ler
- `docker container prune` - Durmuş container'lar

### Pull
**Ne:** Registry'den image indirme.  
**Komut:** `docker pull nginx:latest`  
**Varsayılan:** Docker Hub'dan indirilir.  
**Özel registry:** `docker pull myregistry.com/myapp:1.0`

### Push
**Ne:** Image'i registry'e yükleme.  
**Komut:** `docker push username/myapp:latest`  
**Ön koşul:** `docker login` yapılmış olmalı.  
**Tag:** Image username ile tag'lenmeli.

---

## R

### Registry
**Bkz:** [Docker Registry](#docker-registry)

### Repository
**Ne:** İlgili image'lerin toplandığı grup.  
**Örnek:** `nginx` repository'si → nginx:latest, nginx:1.24, nginx:alpine  
**Format:** `[registry]/[username]/[name]`  
**Docker Hub:** `docker.io/library/nginx`

### Restart Policy
**Ne:** Container durduğunda yeniden başlatma kuralı.  
**Seçenekler:**
- `no` - Başlatma (varsayılan)
- `always` - Her zaman başlat
- `on-failure` - Hata durumunda başlat
- `unless-stopped` - Manuel durdurmadıkça başlat
**Kullanım:** `docker run --restart=always myapp`

### Root User
**Ne:** Tüm yetkilere sahip kullanıcı (UID 0).  
**Risk:** Güvenlik açığı (container escape durumunda host risk altında).  
**Best practice:** Root olmayan kullanıcı kullanın.  
**Dockerfile:**
```dockerfile
RUN adduser -D appuser
USER appuser
```

### RUN
**Ne:** Image build sırasında komut çalıştırma.  
**Syntax:** `RUN [command]`  
**Özellik:** Her RUN yeni layer oluşturur.  
**Best practice:** Komutları `&&` ile birleştirin.  
**Örnek:**
```dockerfile
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean
```

### Runtime
**Bkz:** [Container Runtime](#container-runtime)

---

## S

### Scratch
**Ne:** Boş Docker image (hiçbir şey yok).  
**Kullanım:** Minimal binary'ler için (Go, Rust).  
**Örnek:**
```dockerfile
FROM scratch
COPY myapp /
CMD ["/myapp"]
```
**Boyut:** 1-10 MB (sadece binary)

### Secret
**Ne:** Hassas verilerin güvenli saklanması (şifre, API key).  
**Docker Swarm:** `docker secret create`  
**Compose v3.1+:**
```yaml
secrets:
  db_password:
    file: ./db_password.txt
```
**⚠️ Not:** Docker Compose'da gerçek secret yok (dosya mount edilir).

### Service
**Ne:** Docker Swarm'da bir uygulamanın tanımı.  
**Compose'da:** docker-compose.yml'deki her bir container tanımı.  
**Örnek:**
```yaml
services:
  web:
    image: nginx
  db:
    image: postgres
```

### Shell Form vs Exec Form
**Shell form:**
```dockerfile
CMD npm start
# /bin/sh -c npm start şeklinde çalışır
```
**Exec form (önerilir):**
```dockerfile
CMD ["npm", "start"]
# Direkt çalışır, shell yok
```
**Fark:** Signal handling, PID 1 problemi.

### Slim
**Ne:** Küçültülmüş base image versiyonu.  
**Örnekler:** `python:3.11-slim`, `node:18-slim`  
**Boyut:** Alpine ile normal arasında (orta).  
**İçerik:** Gereksiz paketler kaldırılmış ama glibc var.

### Socket (Docker Socket)
**Ne:** Docker daemon ile iletişim için UNIX socket.  
**Konum:** `/var/run/docker.sock`  
**Kullanım:** Docker CLI daemon'a buradan bağlanır.  
**Risk:** Container'a socket verme = root erişim.

### Swarm
**Bkz:** [Docker Swarm](#docker-swarm)

### System Prune
**Bkz:** [Prune](#prune)

---

## T

### Tag
**Ne:** Image'e verilen isim:versiyon etiketi.  
**Format:** `[name]:[tag]`  
**Varsayılan:** `:latest`  
**Örnekler:** `nginx:1.24`, `myapp:v1.0.0`, `node:18-alpine`  
**Komut:** `docker tag source_image:tag target_image:tag`

### tmpfs
**Ne:** RAM'de geçici dosya sistemi (disk değil).  
**Kullanım:** Hassas/geçici veriler için.  
**Özellik:** Container durdukça veriler kaybolur.  
**Komut:** `docker run --tmpfs /tmp myapp`

### TTY (Teletype)
**Ne:** Terminal emülasyonu.  
**Flag:** `-t` veya `--tty`  
**Kullanım:** İnteraktif shell için gerekli.  
**Örnek:** `docker run -it ubuntu bash` (`-i` + `-t`)

---

## U

### UnionFS (Union File System)
**Ne:** Birden fazla dosya sistemini tek bir görünümde birleştirme.  
**Docker'da:** Layer'ları üst üste koyma tekniği.  
**İmplementasyon:** overlay2, aufs, btrfs

### USER
**Ne:** Dockerfile'da çalışacak kullanıcıyı belirleme.  
**Syntax:** `USER [username]` veya `USER [UID]`  
**Best practice:** Root kullanmayın.  
**Örnek:**
```dockerfile
RUN adduser -D appuser
USER appuser
```

---

## V

### Volume
**Ne:** Container'ın verilerini kalıcı olarak saklama mekanizması.  
**Türleri:**
- Named volume: `docker volume create mydata`
- Anonymous volume: `docker run -v /app/data`
- Bind mount: `docker run -v /host/path:/container/path`
**Konum:** `/var/lib/docker/volumes/`

### Volume Driver
**Ne:** Volume'lerin nasıl saklanacağını belirler.  
**Varsayılan:** local  
**Diğerleri:** nfs, aws-ebs, azure-disk, vieux/sshfs  
**Kullanım:** `docker volume create --driver local mydata`

### Vulnerability
**Ne:** Güvenlik açığı.  
**Tarama:** `docker scout quickview myapp`  
**Kategoriler:** Critical, High, Medium, Low  
**Önlem:** Official image kullan, güncel tut.

---

## W

### WORKDIR
**Ne:** Container içinde çalışma dizini belirleme.  
**Syntax:** `WORKDIR /path/to/directory`  
**Özellik:** Klasör yoksa oluşturur.  
**Kullanım:** Sonraki COPY, RUN, CMD komutları bu dizinde çalışır.  
**Örnek:**
```dockerfile
WORKDIR /app
COPY . .  # /app içine kopyalar
```

### WSL2 (Windows Subsystem for Linux)
**Ne:** Windows'ta Linux çalıştırma ortamı.  
**Docker Desktop:** WSL2 backend kullanır (Hyper-V yerine).  
**Performans:** Native'e yakın hız.  
**Gereksinim:** Windows 10/11 için Docker Desktop.
