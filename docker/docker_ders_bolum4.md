# 🐳 İleri Seviye ve Production

---

## 📚 İçindekiler
- [Docker Desktop Kullanımı](#docker-desktop-kullanımı)
- [Docker Hub ve Image Paylaşımı](#docker-hub-ve-image-paylaşımı)
- [Multi-Stage Build](#multi-stage-build)
- [Production Best Practices](#production-best-practices)
- [Güvenlik](#güvenlik)
- [Troubleshooting](#troubleshooting)
- [Performance Optimizasyonu](#performance-optimizasyonu)

---

## Docker Desktop Kullanımı

### 🖥️ Docker Desktop Nedir?

Docker'ı **görsel arayüz** ile yönetmenizi sağlayan masaüstü uygulaması.

**İçeriği:**
- Docker Engine
- Docker CLI
- Docker Compose
- Kubernetes (opsiyonel)
- Görsel arayüz (GUI)

### 🎯 Docker Desktop Ana Ekranı

**Sol Menü:**
```
📦 Containers → Çalışan/durmuş container'lar
🖼️ Images     → Lokal image'leriniz
📚 Volumes    → Volume yönetimi
🔌 Builds     → Build history
🌐 Extensions → Eklentiler
⚙️ Settings   → Ayarlar
```

### 📦 Containers Bölümü

**Görebilecekleriniz:**

```
┌─────────────────────────────────────────────┐
│ Container Adı  │ Status  │ Port    │ Image │
├─────────────────────────────────────────────┤
│ web-server     │ Running │ 80→8080 │ nginx │
│ my-database    │ Stopped │ -       │ mysql │
└─────────────────────────────────────────────┘
```

**Yapabilecekleriniz:**
- ▶️ Start/Stop/Restart
- 🗑️ Delete
- 📋 Logs görüntüleme
- 🔍 Inspect (detaylı bilgi)
- 💻 Terminal/CLI açma
- 📊 Stats (CPU, RAM kullanımı)

### 🎮 Container İşlemleri (GUI)

**1. Container Başlatma:**
```
Containers → Run butonu → Image seçin
→ Port mapping ekleyin
→ Volume bağlayın
→ Environment variables ekleyin
→ Run
```

**2. Container Loglarını Görme:**
```
Container'a tıklayın → Logs sekmesi
→ Canlı log akışı
→ Search (arama yapabilirsiniz)
→ Download logs
```

**3. Container İçine Girme:**
```
Container'a tıklayın → Exec sekmesi
→ /bin/sh veya /bin/bash seçin
→ Terminal açılır
```

**4. Stats (İzleme):**
```
Container'a tıklayın → Stats sekmesi
→ CPU kullanımı
→ Memory kullanımı
→ Network I/O
→ Disk I/O
```

### 🖼️ Images Bölümü

**Görebilecekleriniz:**
```
┌────────────────────────────────────┐
│ Image       │ Tag    │ Size │ Age │
├────────────────────────────────────┤
│ nginx       │ latest │ 142M │ 2d  │
│ myapp       │ 1.0.0  │ 350M │ 1h  │
│ postgres    │ 15     │ 379M │ 5d  │
└────────────────────────────────────┘
```

**Yapabilecekleriniz:**
- 🔍 Inspect image layers
- 🗑️ Delete (kullanılmayan image'leri temizleyin)
- ▶️ Run (yeni container oluştur)
- 🏷️ Tag (isim değiştir)
- 📤 Push (Docker Hub'a yükle)

### 📚 Volumes Bölümü

**Volume Oluşturma (GUI):**
```
Volumes → Create
→ İsim verin: "app-data"
→ Create
```

**Volume Yedekleme:**
```
Volume'a tıklayın → Export
→ .tar dosyası indirilir
```

### ⚙️ Settings (Ayarlar)

#### General
```
✅ Start Docker Desktop when you log in
✅ Use Docker Compose V2
⬜ Send usage statistics
```

#### Resources (Kaynaklar)

**CPU:**
```
Slider: 2 ←─────────→ 8 cores
```

**Memory:**
```
Slider: 2GB ←─────────→ 16GB
```

**Disk:**
```
Slider: 32GB ←─────────→ 128GB
```

**💡 Öneriler:**
- **CPU:** Toplam çekirdeklerin %50-%70'i
- **Memory:** Toplam RAM'in %25-%50'si
- **Disk:** En az 50GB

#### Docker Engine

JSON formatında yapılandırma:

```json
{
  "builder": {
    "gc": {
      "enabled": true,
      "defaultKeepStorage": "20GB"
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  }
}
```

### 🔌 Extensions (Eklentiler)

**Faydalı Eklentiler:**

**1. Disk Usage**
- Disk kullanımını görselleştirir
- Gereksiz dosyaları gösterir

**2. Resource Usage**
- CPU, RAM grafikleri
- Gerçek zamanlı izleme

**3. Logs Explorer**
- Tüm container loglarını tek yerde
- Gelişmiş arama ve filtreleme

**Eklenti Kurma:**
```
Extensions → Browse → Arama yapın → Install
```

---

## Docker Hub ve Image Paylaşımı

### 🌐 Docker Hub Nedir?

**GitHub'ın Docker versiyonu!**

- Ücretsiz public image'ler
- Private repository'ler (ücretli)
- Otomatik build'ler
- Webhook'lar

**Adres:** https://hub.docker.com

### 📝 Docker Hub'a Kayıt

**1. Hesap oluşturun:**
```
hub.docker.com → Sign Up
→ Username: johnsmith
→ Email, şifre...
```

**2. Terminal'den login:**
```bash
docker login
# Username: johnsmith
# Password: ******
```

**Çıktı:**
```
Login Succeeded
```

### 📤 Image Yükleme (Push)

**Adım 1: Image'e doğru isim verin**

```bash
# Format: [dockerhub-username]/[image-adi]:[tag]
docker tag myapp johnsmith/myapp:latest
docker tag myapp johnsmith/myapp:1.0.0
```

**💡 Açıklama:**
- `johnsmith` → Docker Hub kullanıcı adınız
- `myapp` → Repository adı
- `1.0.0` → Versiyon etiketi

**Adım 2: Push edin**

```bash
docker push johnsmith/myapp:latest
docker push johnsmith/myapp:1.0.0
```

**Çıktı:**
```
The push refers to repository [docker.io/johnsmith/myapp]
5f70bf18a086: Pushed
f1d3e2a4b7c8: Pushed
latest: digest: sha256:abc123... size: 1234
```

**Adım 3: Docker Hub'da kontrol edin**

```
hub.docker.com → Repositories → myapp görünecek
```

### 📥 Başkasının Image'ini Çekme

```bash
# Public image
docker pull johnsmith/myapp:latest

# Belirli versiyon
docker pull johnsmith/myapp:1.0.0

# Çalıştırma
docker run -d -p 3000:3000 johnsmith/myapp:latest
```

### 🏷️ Image Tag Stratejisi

**Best Practice:**

```bash
# Latest (en güncel)
docker tag myapp johnsmith/myapp:latest

# Versiyon numarası
docker tag myapp johnsmith/myapp:1.2.3

# Git commit hash
docker tag myapp johnsmith/myapp:a7f8d9e

# Environment
docker tag myapp johnsmith/myapp:prod
docker tag myapp johnsmith/myapp:staging

# Hepsini push et
docker push johnsmith/myapp --all-tags
```

### 🔒 Private Repository

**Docker Hub'da:**
```
Create Repository → Private seçin
```

**Push/Pull:**
```bash
# Push (login gerekli)
docker push johnsmith/private-app:latest

# Pull (login gerekli)
docker pull johnsmith/private-app:latest
```

### 🤖 README ve Dokümantasyon

**Docker Hub'da README oluşturun:**

```markdown
# My Awesome App

## Kullanım

```bash
docker run -d -p 3000:3000 johnsmith/myapp
```

## Environment Variables

- `PORT` - Uygulama portu (default: 3000)
- `DB_HOST` - Database host
- `DB_PASSWORD` - Database şifresi

## Örnekler

### PostgreSQL ile
```bash
docker run -d \
  -e DB_HOST=localhost \
  -e DB_PASSWORD=secret \
  johnsmith/myapp
```
```

---

## Multi-Stage Build

### 🤔 Problem: Büyük Image Boyutu

**Klasik Dockerfile:**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

**Sonuç:**
```
Image boyutu: 1.2 GB ❌
- Node.js source files
- Development dependencies
- Build tools
- Git history
```

### ✅ Çözüm: Multi-Stage Build

**2 aşamalı build:**
1. **Builder stage:** Uygulamayı derle
2. **Production stage:** Sadece çalıştırılabilir dosyaları kopyala

### 📝 Multi-Stage Dockerfile Örneği

**Node.js Uygulaması:**

```dockerfile
# ============================================
# STAGE 1: Build (Derleme Aşaması)
# ============================================
FROM node:18 AS builder

WORKDIR /app

# Bağımlılıkları kur
COPY package*.json ./
RUN npm install

# Uygulamayı derle
COPY . .
RUN npm run build
# Build çıktısı: /app/dist klasöründe

# ============================================
# STAGE 2: Production (Çalıştırma Aşaması)
# ============================================
FROM node:18-alpine

# Güvenlik: Root olmayan kullanıcı
RUN addgroup -g 1001 nodejs && \
    adduser -D -u 1001 -G nodejs nodejs

WORKDIR /app

# Production bağımlılıklarını kur
COPY package*.json ./
RUN npm install --production

# Builder stage'den sadece build çıktısını kopyala
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.js"]
```

**Sonuç:**
```
Builder stage: 1.2 GB (silinir!)
Production stage: 180 MB ✅
Tasarruf: %85 daha küçük!
```

### 🎯 Başka Örnekler

**Python Uygulaması:**

```dockerfile
# Build stage
FROM python:3.11 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "app.py"]
```

**React Uygulaması:**

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage (Nginx ile serve)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Go Uygulaması:**

```dockerfile
# Build stage
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage (scratch - boş image!)
FROM scratch
COPY --from=builder /app/main /main
EXPOSE 8080
CMD ["/main"]
```

**Sonuç:** Sadece 10 MB! 🚀

---

## Production Best Practices

### 1️⃣ Küçük Base Image Kullanın

```dockerfile
# ❌ Kötü (1.1 GB)
FROM node:18

# ✅ İyi (180 MB)
FROM node:18-slim

# ✅✅ En iyi (120 MB)
FROM node:18-alpine
```

### 2️⃣ .dockerignore Kullanın

**.dockerignore:**
```
node_modules
npm-debug.log
.git
.env
.env.local
*.md
.vscode
.idea
coverage
dist
build
test
tests
__tests__
*.test.js
logs
*.log
```

**Fayda:** Build süresini %50-70 azaltır!

### 3️⃣ Layer Caching Optimizasyonu

```dockerfile
# ✅ İyi: Dependency layer önce
COPY package*.json ./
RUN npm install

# Kod değişiklikleri sadece son katmanı etkiler
COPY . .
```

### 4️⃣ Multi-Stage Build

```dockerfile
FROM node:18 AS builder
# ... build işlemleri

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
```

### 5️⃣ Güvenlik: Root Kullanmayın

```dockerfile
# Kullanıcı oluştur
RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

# Dosya sahipliği
RUN chown -R appuser:appgroup /app

# Kullanıcı değiştir
USER appuser
```

### 6️⃣ Health Check Ekleyin

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

**docker-compose.yml ile:**
```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
      start_period: 40s
```

### 7️⃣ Resource Limits

**docker-compose.yml:**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

**CLI ile:**
```bash
docker run -d \
  --memory="512m" \
  --cpus="1.0" \
  --memory-reservation="256m" \
  myapp
```

### 8️⃣ Restart Policy

```yaml
services:
  app:
    restart: unless-stopped
    # Seçenekler:
    # no             → Yeniden başlatma
    # always         → Her zaman başlat
    # on-failure     → Hata durumunda başlat
    # unless-stopped → Manuel durdurmadıkça başlat
```

### 9️⃣ Logging Configuration

```yaml
services:
  app:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

**⚠️ Önemli:** Log dosyaları disk doldurabilir!

### 🔟 Environment Management

```yaml
services:
  app:
    env_file:
      - .env.prod
    environment:
      - NODE_ENV=production
```

**.env.prod:**
```env
DB_HOST=production-db.example.com
DB_PASSWORD=${SECRET_DB_PASSWORD}
REDIS_URL=redis://prod-redis:6379
```

---

## Güvenlik

### 🔒 1. Image Güvenliği

**Official Image Kullanın:**
```dockerfile
# ✅ Güvenli
FROM node:18-alpine

# ❌ Riskli
FROM randomuser/node:18
```

**Image Vulnerability Scan:**
```bash
# Docker Desktop ile
docker scout quickview myapp

# Snyk ile
docker scan myapp
```

### 🔐 2. Secret Yönetimi

**❌ Asla Yapmayın:**
```dockerfile
# Dockerfile'da password!
ENV DB_PASSWORD=secret123

# Image'de .env dosyası!
COPY .env .
```

**✅ Doğru Yöntemler:**

**A. Environment Variables:**
```bash
docker run -e DB_PASSWORD=secret123 myapp
```

**B. Docker Secrets (Swarm):**
```yaml
secrets:
  db_password:
    external: true

services:
  app:
    secrets:
      - db_password
```

**C. .env dosyası (run-time):**
```bash
docker run --env-file .env.prod myapp
```

**.env.prod:**
```env
DB_PASSWORD=secret123
API_KEY=abcd1234
```

### 👤 3. User Privileges

```dockerfile
# Root kullanmayın!
USER root  # ❌

# Düşük privilegeli kullanıcı
RUN adduser -D appuser
USER appuser  # ✅
```

### 🔓 4. Port ve Network Güvenliği

**Sadece gerekli portları açın:**
```dockerfile
# ❌ Hepsini açma
EXPOSE 1-65535

# ✅ Sadece gerekli port
EXPOSE 3000
```

**Internal network kullanın:**
```yaml
services:
  backend:
    networks:
      - backend  # Sadece internal

  database:
    networks:
      - backend  # Frontend'den erişilemez
    # Port mapping YOK!
```

### 🛡️ 5. Read-Only Filesystem

```bash
docker run --read-only --tmpfs /tmp myapp
```

**docker-compose.yml:**
```yaml
services:
  app:
    read_only: true
    tmpfs:
      - /tmp
```

### 📋 6. Image Imzalama

```bash
# Content trust enable et
export DOCKER_CONTENT_TRUST=1

# Sign et ve push et
docker push johnsmith/myapp:latest
```

---

## Troubleshooting

### 🐛 1. Container Başlamıyor

**Problem:** Container hemen çıkıyor

**Debug:**
```bash
# Son container loglarını göster
docker logs [container-id]

# Çalışan processleri göster
docker top [container-id]

# Container detaylarını göster
docker inspect [container-id]

# Interaktif başlat
docker run -it myapp sh
```

**Yaygın Sebepler:**
- CMD/ENTRYPOINT hatalı
- Port çakışması
- Volume permission hatası
- Environment variable eksik

### 🔌 2. Port Bağlanamıyor

**Hata:**
```
Error: bind: address already in use
```

**Çözüm:**
```bash
# Hangi process kullanıyor?
# Linux/Mac:
sudo lsof -i :3000

# Windows:
netstat -ano | findstr :3000

# Process'i öldür veya farklı port kullan
docker run -p 3001:3000 myapp
```

### 🌐 3. Network Sorunları

**Container'lar birbirini göremiyor:**

```bash
# Network kontrol
docker network ls
docker network inspect [network-name]

# Container'ın network'ünü kontrol
docker inspect [container] | grep NetworkMode

# Ping test
docker exec container1 ping container2
```

**Çözüm:**
```bash
# Aynı network'e bağla
docker network create mynetwork
docker run --network mynetwork --name web nginx
docker run --network mynetwork --name db postgres
```

### 💾 4. Volume Sorunları

**Permission denied hatası:**

```bash
# Volume sahipliğini kontrol
docker exec myapp ls -la /app/data

# Çözüm: Dockerfile'da
RUN chown -R appuser:appuser /app/data
```

### 📊 5. Performance Sorunları

**Container yavaş çalışıyor:**

```bash
# Resource kullanımını kontrol
docker stats

# CPU limit
docker update --cpus="1.0" [container]

# Memory limit
docker update --memory="512m" [container]
```

### 🧹 6. Disk Dolu

```bash
# Disk kullanımını göster
docker system df

# Kullanılmayan her şeyi temizle
docker system prune -a

# Sadece volume'leri temizle
docker volume prune

# Build cache temizle
docker builder prune
```

### 📝 7. Build Hataları

**Cache problemi:**
```bash
# Cache kullanmadan build
docker build --no-cache -t myapp .
```

**Layer hataları:**
```bash
# Detaylı build output
docker build --progress=plain -t myapp .
```

---

## Performance Optimizasyonu

### ⚡ 1. BuildKit Kullanın

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1

# Build
docker build -t myapp .
```

**Faydalar:**
- %50 daha hızlı build
- Paralel layer işleme
- Daha iyi cache yönetimi

### 🚀 2. Build Cache Optimizasyonu

```dockerfile
# ✅ İyi sıralama
FROM node:18-alpine
WORKDIR /app

# 1. En az değişen
COPY package*.json ./
RUN npm install

# 2. Daha sık değişen
COPY src/ ./src/
COPY public/ ./public/

# 3. En sık değişen
COPY . .
```

### 📦 3. Layer Birleştirme

```dockerfile
# ❌ Kötü: Her RUN yeni layer
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get clean

# ✅ İyi: Tek layer
RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 🎯 4. Multi-Stage Build

```dockerfile
FROM node:18 AS builder
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/dist ./dist
```

**Sonuç:** %80 daha küçük image!

### 📈 5. Resource Monitoring

```bash
# Sürekli monitoring
docker stats

# Belirli container
docker stats myapp

# JSON format
docker stats --format "{{json .}}" --no-stream
```

---

## 🎓 Final Özeti

### ✅ Tüm Seride Öğrendiklerimiz

**Bölüm 1:**
- Docker nedir, nasıl çalışır?
- Image, Container, Volume, Network
- Temel CLI komutları
- İlk container'ımız

**Bölüm 2:**
- Dockerfile yazımı
- Gerçek projeler (Node.js, Python)
- Container içine girme
- Volume kullanımı

**Bölüm 3:**
- Docker Compose
- Çoklu container yönetimi
- Network stratejileri
- Full-stack uygulamalar

**Bölüm 4:**
- Docker Desktop
- Image paylaşımı (Docker Hub)
- Multi-stage build
- Production best practices
- Güvenlik
- Troubleshooting

### 📝 Komut Cheat Sheet

```bash
# ===== IMAGE =====
docker pull nginx
docker images
docker rmi nginx
docker build -t myapp .
docker tag myapp johnsmith/myapp:1.0
docker push johnsmith/myapp:1.0

# ===== CONTAINER =====
docker run -d -p 8080:80 --name web nginx
docker ps
docker ps -a
docker stop web
docker start web
docker restart web
docker rm web
docker exec -it web sh
docker logs -f web

# ===== VOLUME =====
docker volume create mydata
docker volume ls
docker volume rm mydata
docker run -v mydata:/app/data myapp

# ===== NETWORK =====
docker network create mynetwork
docker network ls
docker network inspect mynetwork

# ===== COMPOSE =====
docker compose up -d
docker compose down
docker compose logs -f
docker compose ps
docker compose exec web sh

# ===== SYSTEM =====
docker system df
docker system prune -a
docker stats
docker version
docker info
```

### 🎯 Sonraki Adımlar

1. **Kubernetes öğrenin** → Container orkestrasyon
2. **CI/CD pipeline** → Otomatik deployment
3. **Monitoring tools** → Prometheus, Grafana
4. **Cloud platforms** → AWS ECS, Azure Container Instances
5. **Docker Swarm** → Basit orkestrasyon

### 📚 Faydalı Kaynaklar

- **Resmi Docs:** https://docs.docker.com
- **Docker Hub:** https://hub.docker.com
- **Play with Docker:** https://labs.play-with-docker.com (ücretsiz deneme)
- **Awesome Docker:** https://github.com/veggiemonk/awesome-docker
