# Dockerfile ve Pratik Uygulamalar

---

## Dockerfile Nedir?

### Basit Anlatım

**Dockerfile = Kendi image'imizi oluşturmak için yazdığımız tarif defteri****Normal Image (Hazır):**
```bash
docker pull nginx  # Hazır nginx image'i
```

**Özel Image (Kendimiz yaparız):**
```dockerfile
# Dockerfile

FROM nginx
COPY website.html /usr/share/nginx/html/index.html
```

### Dockerfile Neden Gerekli?

**Senaryolar:****Senaryo 1:** Basit Python scripti çalıştırmak istiyorsunuz
```bash
docker run python python script.py
# ❌ Hata: script.py bulunamadı!

```

**Çözüm:**Dockerfile ile script'i image'e dahil ederiz!**Senaryo 2:** Node.js projenizi sunucuya deploy edeceksiniz
- El ile kurmak: 30 dakika, hataya açık ❌
- Dockerfile ile: 2 dakika, her yerde aynı ✅

---

## İlk Dockerfile'ımız

### Proje Klasörü Oluşturalım

**Adım 1: Klasör oluştur**
```bash
mkdir ilk-dockerfile
cd ilk-dockerfile
```

**Adım 2: Basit bir HTML dosyası oluştur**

`index.html` dosyası:
```html
<!DOCTYPE html>
<html>
<head>
    <title>İlk Docker Projesi</title>
</head>
<body>
    <h1>Merhaba Docker!</h1>
    <p>Bu sayfa Docker ile çalışıyor!</p>
</body>
</html>
```

**Adım 3: Dockerfile oluştur**

`Dockerfile` dosyası (uzantısız!):
```dockerfile
# Temel image olarak nginx kullan

FROM nginx:alpine

# HTML dosyamızı nginx'in varsayılan klasörüne kopyala

COPY index.html /usr/share/nginx/html/index.html
```

**Klasör yapısı:**
```bash
ilk-dockerfile/
├── Dockerfile
└── index.html
```

### Image'i Build Edelim (Oluşturalım)

```bash
docker build -t ilk-websitem .
```

**💡 Açıklama:**
- `docker build`: Image oluştur komutu
- `-t ilk-websitem`: Image'e isim ver (tag)
- `.`: Dockerfile'ın bulunduğu klasör (şu anki klasör)

**Çıktı:**
```bash
[+] Building 2.3s (7/7) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load .dockerignore
 => [internal] load metadata for docker.io/library/nginx:alpine
 => [1/2] FROM docker.io/library/nginx:alpine
 => [internal] load build context
 => [2/2] COPY index.html /usr/share/nginx/html/index.html
 => exporting to image
 => => writing image sha256:abc123...
 => => naming to docker.io/library/ilk-websitem
```

**Kontrol:**
```bash
docker images
```

**Göreceksiniz:**
```bash
REPOSITORY      TAG       SIZE
ilk-websitem    latest    42MB
```

### Image'den Container Oluşturalım

```bash
docker run -d -p 8080:80 --name websitem ilk-websitem
```

**Tarayıcıda açın:**
```bash
http://localhost:8080
```

**Kendi web siteniz Docker'da çalışıyor!**

---

## Dockerfile Komutları (Detaylı)

### 1. FROM - Temel Image Seçimi

**Ne işe yarar?**Her Dockerfile bir temel image ile başlar.**Syntax:**
```dockerfile
FROM [image-adı]:[versiyon]
```

**Örnekler:**
```dockerfile
# Node.js 18 (Alpine Linux - küçük boyut)

FROM node:18-alpine

# Python 3.11 (Slim - orta boyut)

FROM python:3.11-slim

# Ubuntu (Tam işletim sistemi - büyük boyut)

FROM ubuntu:22.04

# Nginx (Özel web sunucusu)

FROM nginx:alpine
```

**💡 Hangi versiyonu seçmeli?**
- `alpine` → En küçük, en hızlı (önerilir) 
- `slim` → Orta boyut, daha fazla araç
- Tag yok → En büyük, her şey dahil

**⚠️ Önemli:** Her Dockerfile mutlaka FROM ile başlar!

### 2. WORKDIR - Çalışma Dizini

**Ne işe yarar?**Container içinde hangi klasörde çalışacağımızı belirtir.**Syntax:**
```dockerfile
WORKDIR /yol/dizin
```

**Örnek:**
```dockerfile
FROM node:18-alpine

# /app klasörüne geç (yoksa oluşturur)

WORKDIR /app

# Artık tüm komutlar /app içinde çalışır

COPY package.json .
# Bu dosya /app/package.json olarak kopyalanır

```

**WORKDIR olmadan:**
```dockerfile
FROM node:18-alpine
COPY package.json /uygulama/package.json
COPY index.js /uygulama/index.js
# Her seferinde tam yol yazmak gerekir ❌

```

**WORKDIR ile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY index.js .
# Daha temiz ve kolay ✅

```

**💡 İpucu:** Genellikle `/app` klasörü kullanılır.

### 3. COPY - Dosya Kopyalama

**Ne işe yarar?**Bilgisayarınızdaki dosyaları container'a kopyalar.**Syntax:**
```dockerfile
COPY [kaynak] [hedef]
```

**Örnekler:****Tek dosya kopyalama:**
```dockerfile
COPY index.html /usr/share/nginx/html/
```

**Tüm klasörü kopyalama:**
```dockerfile
WORKDIR /app
COPY . .
# İlk nokta: Bilgisayarınızdaki tüm dosyalar
# İkinci nokta: Container'daki mevcut klasör (/app)

```

**Seçici kopyalama:**
```dockerfile
COPY package*.json ./
# package.json ve package-lock.json'u kopyalar

```

**Birden fazla dosya:**
```dockerfile
COPY file1.txt file2.txt /app/
```

**⚠️ Önemli:** COPY her zaman Dockerfile'ın bulunduğu klasörden başlar!

### 4. RUN - Komut Çalıştırma

**Ne işe yarar?**Image oluşturulurken komut çalıştırır.**Syntax:**
```dockerfile
RUN [komut]
```

**Örnekler:****Node.js bağımlılıklarını kurma:**
```dockerfile
RUN npm install
```

**Python paketleri kurma:**
```dockerfile
RUN pip install -r requirements.txt
```

**Sistem paketleri kurma:**
```dockerfile
RUN apt-get update && apt-get install -y curl
```

**Birden fazla komut:**
```dockerfile
# ❌ Kötü yöntem (her RUN yeni katman oluşturur)

RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git

# ✅ İyi yöntem (tek katman)

RUN apt-get update && \
    apt-get install -y curl git && \
    apt-get clean
```

**💡 RUN vs CMD farkı:**
- `RUN`: Image oluşturulurken çalışır (tek sefer)
- `CMD`: Container her başladığında çalışır

### 5. CMD - Başlangıç Komutu

**Ne işe yarar?**Container başladığında ne çalışacağını belirtir.**Syntax:**
```dockerfile
CMD ["executable", "param1", "param2"]
```

**Örnekler:****Node.js uygulaması:**
```dockerfile
CMD ["node", "index.js"]
# Container başlatınca: node index.js çalışır

```

**Python scripti:**
```dockerfile
CMD ["python", "app.py"]
```

**NPM script:**
```dockerfile
CMD ["npm", "start"]
```

**⚠️ Önemli:**Dockerfile'da sadece bir CMD olabilir! Birden fazla varsa sonuncusu geçerlidir.**Shell form vs Exec form:**
```dockerfile
# Exec form (önerilir) ✅

CMD ["npm", "start"]

# Shell form

CMD npm start
```

### 6. EXPOSE - Port Bildirimi

**Ne işe yarar?**Container'ın hangi portu kullandığını belirtir (dokümantasyon amaçlı).**Syntax:**
```dockerfile
EXPOSE [port]
```

**Örnekler:**
```dockerfile
# Web sunucusu

EXPOSE 80

# Node.js uygulaması

EXPOSE 3000

# Birden fazla port

EXPOSE 8080 9090
```

**⚠️ Dikkat:** EXPOSE sadece bilgilendirme amaçlıdır! Portu gerçekten açmak için `-p` kullanmalısınız:

```bash
docker run -p 3000:3000 myapp
```

### 7. ENV - Çevre Değişkenleri

**Ne işe yarar?**Container içinde kullanılacak değişkenleri tanımlar.**Syntax:**
```dockerfile
ENV [KEY]=[VALUE]
```

**Örnekler:**
```dockerfile
# Tek değişken

ENV NODE_ENV=production

# Birden fazla değişken

ENV PORT=3000 \
    DB_HOST=localhost \
    DB_PORT=5432

# Uygulama içinde kullanım

ENV APP_NAME="Benim Uygulamam"
```

**Node.js'de kullanım:**
```javascript
console.log(process.env.NODE_ENV); // "production"
console.log(process.env.PORT);     // "3000"
```

### 8. ARG - Build-time Değişkenler

**Ne işe yarar?**Image oluşturulurken kullanılan geçici değişkenler.**Syntax:**
```dockerfile
ARG [KEY]=[DEFAULT_VALUE]
```

**Örnek:**
```dockerfile
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}-alpine

ARG APP_NAME=myapp
WORKDIR /app/${APP_NAME}
```

**Build sırasında değer verme:**
```bash
docker build --build-arg NODE_VERSION=20 -t myapp .
```

**💡 ARG vs ENV:**
- `ARG`: Sadece build sırasında var
- `ENV`: Container çalışırken de var

### 9. USER - Kullanıcı Değiştirme

**Ne işe yarar?**Container'ı root kullanıcı yerine başka kullanıcı ile çalıştırır (güvenlik).**Syntax:**
```dockerfile
USER [kullanıcı-adı]
```

**Örnek:**
```dockerfile
FROM node:18-alpine

# Kullanıcı oluştur

RUN addgroup -g 1001 appgroup && \
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /app
COPY . .

# Root yerine appuser ile çalıştır

USER appuser

CMD ["node", "index.js"]
```

**⚠️ Güvenlik:** Production ortamında mutlaka root olmayan kullanıcı kullanın!

---

## Gerçek Proje: Node.js Uygulaması

### Proje Yapısı

```bash
nodejs-app/
├── Dockerfile
├── package.json
├── index.js
└── .dockerignore
```

### 1. package.json

```json
{
  "name": "docker-nodejs-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 2. index.js

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: '🐳 Merhaba Docker!',
    timestamp: new Date().toISOString(),
    nodeVersion: process.version
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portunda çalışıyor`);
});
```

### 3. Dockerfile (En İyi Pratikler)

```dockerfile
# 1. Temel image (Alpine - küçük boyut)

FROM node:18-alpine

# 2. Metadata (opsiyonel ama faydalı)

LABEL maintainer="senin@email.com"
LABEL description="Node.js Express API"

# 3. Çalışma dizini oluştur

WORKDIR /app

# 4. Package dosyalarını kopyala (önce bunlar!)
# Neden önce? Cache optimizasyonu için

COPY package*.json ./

# 5. Bağımlılıkları kur

RUN npm install --production

# 6. Uygulama kodlarını kopyala

COPY . .

# 7. Güvenlik: Root olmayan kullanıcı

RUN addgroup -g 1001 nodejs && \
    adduser -D -u 1001 -G nodejs nodejs && \
    chown -R nodejs:nodejs /app
USER nodejs

# 8. Port bildirimi

EXPOSE 3000

# 9. Health check (opsiyonel)

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 10. Başlangıç komutu

CMD ["npm", "start"]
```

### Build ve Çalıştırma

```bash
# 1. Image oluştur

docker build -t nodejs-app .

# 2. Container çalıştır

docker run -d -p 3000:3000 --name myapp nodejs-app

# 3. Test et

curl http://localhost:3000
```

**Çıktı:**
```json
{
  "message": "Merhaba Docker!",
  "timestamp": "2024-01-14T10:30:00.000Z",
  "nodeVersion": "v18.19.0"
}
```

### Neden Önce package.json Kopyalanır?

**❌ Kötü Yöntem:**
```dockerfile
COPY . .
RUN npm install
# Her kod değişikliğinde npm install tekrar çalışır!

```

**✅ İyi Yöntem:**
```dockerfile
COPY package*.json ./
RUN npm install
# npm install sadece package.json değişince çalışır!

COPY . .
# Kod değişiklikleri sadece son katmanı etkiler

```

**Docker Cache Mantığı:**
```bash
Katman 1: FROM node:18-alpine          ✅ Cache'den (değişmedi)
Katman 2: COPY package.json            ✅ Cache'den (değişmedi)
Katman 3: RUN npm install              ✅ Cache'den (değişmedi)
Katman 4: COPY . .                     ❌ Yeniden (kod değişti)
Katman 5: CMD npm start                ✅ Cache'den (değişmedi)
```

**Sonuç:** Build süresi 5 dakikadan 5 saniyeye düşer! 🚀

---

## Container İçine Girmek

### docker exec Komutu

**Container çalışırken içine girmek:**

```bash
docker exec -it [container-adi] sh
# veya

docker exec -it [container-adi] bash
```

**💡 Açıklama:**
- `-i`: Interactive (etkileşimli)
- `-t`: Terminal (tty)
- `sh`: Shell (Alpine'de bash yoktur)
- `bash`: Bash shell (Ubuntu/Debian'da)

### Pratik Örnekler

**1. Node.js container'ına girelim:**
```bash
docker exec -it myapp sh
```

**İçerideyken:**
```sh
# Dosyaları listele

ls -la

# Node versiyonunu öğren

node --version

# Package'ları gör

npm list

# Çalışan processleri gör

ps aux

# Çıkmak için

exit
```

**2. Tek komut çalıştırma (içeri girmeden):**
```bash
# Logları göster

docker exec myapp cat /app/logs/app.log

# Node versiyonunu öğren

docker exec myapp node --version

# Environment değişkenlerini göster

docker exec myapp printenv
```

**3. Root kullanıcı olarak gir:**
```bash
docker exec -it -u root myapp sh
```

**4. Birden fazla terminal:**
```bash
# Terminal 1

docker exec -it myapp sh

# Terminal 2 (aynı container)

docker exec -it myapp sh
# İki terminal aynı anda çalışır!

```

### Container Loglarını İzleme

```bash
# Tüm logları göster

docker logs myapp

# Canlı log takibi (Ctrl+C ile çık)

docker logs -f myapp

# Son 50 satır

docker logs --tail 50 myapp

# Timestamp ile

docker logs -t myapp

# Belirli tarihten sonra

docker logs --since 2024-01-14 myapp

# Son 1 saat

docker logs --since 1h myapp
```

---

## Volume Kullanımı

### Problem: Veri Kaybı

```bash
# Container oluştur ve dosya ekle

docker run -it --name test alpine sh
echo "Önemli veri" > /data.txt
exit

# Container'ı sil

docker rm test

# ❌ data.txt kayboldu!

```

### ✅ Çözüm: Volume

**Volume Türleri:**### 1. Named Volume (Önerilir)**Volume oluştur:**
```bash
docker volume create uygulama-verileri
```

**Volume'ü kullan:**
```bash
docker run -d \
  --name myapp \
  -v uygulama-verileri:/app/data \
  nodejs-app
```

**Açıklama:**
```bash
-v [volume-adi]:[container-icindeki-yol]
```

**Volume'deki verileri görmek:**
```bash
# Volume listele

docker volume ls

# Volume detaylarını göster

docker volume inspect uygulama-verileri
```

**Çıktı:**
```json
{
  "Name": "uygulama-verileri",
  "Driver": "local",
  "Mountpoint": "/var/lib/docker/volumes/uygulama-verileri/_data"
}
```

### 2. Bind Mount (Development için)

**Ne işe yarar?** Bilgisayarınızdaki klasörü doğrudan container'a bağlar.

```bash
docker run -d \
  --name myapp \
  -v $(pwd)/src:/app/src \
  -p 3000:3000 \
  nodejs-app
```

**Windows'ta:**
```bash
docker run -d --name myapp -v %cd%/src:/app/src -p 3000:3000 nodejs-app
```

**Fayda:**Kod değişikliği yaptığınızda container içinde de değişir! (Hot reload)**Şema:**
```bash
Bilgisayarınız              Container
┌────────────┐             ┌────────────┐
│  /proje    │             │   /app     │
│    ├─src/  │ ◄═══════►  │   ├─src/   │
│    └─...   │   (Bind)    │   └─...    │
└────────────┘             └────────────┘
```

### 3. Pratik Örnek: MongoDB

```bash
# Volume oluştur

docker volume create mongo-data

# MongoDB container'ı başlat

docker run -d \
  --name mongodb \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  mongo:latest

# Container'ı silin

docker rm -f mongodb

# Yeniden başlatın

docker run -d \
  --name mongodb \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  mongo:latest

# ✅ Veriler hala orada!

```

### Volume Temizleme

```bash
# Volume sil

docker volume rm uygulama-verileri

# Kullanılmayan tüm volume'leri sil

docker volume prune
```

---

## .dockerignore Dosyası

### Neden Gerekli?

**Problem:**
```dockerfile
COPY . .
# node_modules, .git, logs gibi gereksiz dosyalar da kopyalanır!

```

**Sonuç:**
- ❌ Image boyutu büyür (1 GB+)
- ❌ Build süresi uzar
- ❌ Güvenlik riski (.env dosyası kopyalanır!)

### .dockerignore Dosyası

**Proje klasörünüzde `.dockerignore` oluşturun:**

```bash
# Bağımlılıklar

node_modules/
npm-debug.log
yarn.lock

# Environment dosyaları

.env
.env.local
.env.*.local

# Git

.git/
.gitignore
.gitattributes

# IDE

.vscode/
.idea/
*.swp
*.swo

# Test ve dokümantasyon

test/
tests/
__tests__/
*.test.js
*.spec.js
README.md
CHANGELOG.md

# Log dosyaları

logs/
*.log

# Geçici dosyalar

tmp/
temp/
*.tmp

# Build dosyaları

dist/
build/
coverage/

# OS dosyaları

.DS_Store
Thumbs.db

# Docker dosyaları

Dockerfile
docker-compose.yml
.dockerignore
```

### ✅ Sonuç

**Önce:**
```bash
Image boyutu: 1.2 GB
Build süresi: 45 saniye
```

**Sonra:**
```bash
Image boyutu: 180 MB
Build süresi: 8 saniye
```
