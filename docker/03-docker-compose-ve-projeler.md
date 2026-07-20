# Docker Compose ve Gerçek Projeler

---

## Docker Compose Nedir?

### Problem: Çoklu Container Yönetimi

**Klasik bir web uygulaması:**
```bash
┌─────────────┐
│  Frontend   │ → React/Vue
├─────────────┤
│   Backend   │ → Node.js/Python
├─────────────┤
│  Database   │ → PostgreSQL
├─────────────┤
│    Redis    │ → Cache
└─────────────┘
```

**Docker ile manuel başlatmak:**
```bash
# 1. Network oluştur

docker network create app-network

# 2. Database başlat

docker run -d --name db --network app-network \
  -e POSTGRES_PASSWORD=secret postgres

# 3. Redis başlat

docker run -d --name redis --network app-network redis

# 4. Backend başlat

docker run -d --name backend --network app-network \
  -p 3000:3000 -e DB_HOST=db backend-image

# 5. Frontend başlat

docker run -d --name frontend --network app-network \
  -p 80:80 frontend-image
```

**❌ Sorunlar:**
- Karmaşık ve hata yapmaya açık
- Her şeyi sırayla yazmak gerekir
- Durdurmak ve silmek zor
- Başkasına paylaşmak imkansız

### Çözüm: Docker Compose

**Tek bir dosya: `docker-compose.yml`**
```yaml
services:
  frontend:
    # Frontend ayarları
  backend:
    # Backend ayarları
  database:
    # Database ayarları
  redis:
    # Redis ayarları
```

**Tek komut:**
```bash
docker compose up    # Hepsini başlat
docker compose down  # Hepsini durdur ve sil
```

**Avantajlar:**
- Tek dosyada tüm yapılandırma
- Tek komutla başlatma/durdurma
- Kolay paylaşım ve versiyon kontrolü
- Dependency yönetimi (sıralama)

---

## docker-compose.yml Dosyası

### Temel Yapı

```yaml
version: '3.8'  # Compose dosya versiyonu (opsiyonel artık)

services:       # Container'lar burada tanımlanır
  servis1:
    # Container ayarları
  servis2:
    # Container ayarları

volumes:        # Named volume'ler (opsiyonel)
  volume1:
  volume2:

networks:       # Özel network'ler (opsiyonel)
  network1:
```

### Servis Tanımlama Seçenekleri

#### 1. image - Hazır Image Kullanma

```yaml
services:
  database:
    image: postgres:15  # Docker Hub'dan
    # veya
    image: mycompany/myapp:1.0  # Özel registry'den
```

#### 2. build - Dockerfile'dan Oluşturma

```yaml
services:
  backend:
    build: .  # Mevcut klasördeki Dockerfile
    # veya
    build:
      context: ./backend  # Dockerfile'ın olduğu klasör
      dockerfile: Dockerfile.dev  # Özel Dockerfile ismi
```

#### 3. ports - Port Bağlama

```yaml
services:
  web:
    ports:
      - "8080:80"      # HOST:CONTAINER
      - "3000:3000"    # Birden fazla port
      - "127.0.0.1:5000:5000"  # Sadece localhost
```

#### 4. environment - Çevre Değişkenleri

```yaml
services:
  app:
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DB_HOST=database
    # veya
    environment:
      NODE_ENV: production
      PORT: 3000
```

#### 5. volumes - Volume Bağlama

```yaml
services:
  app:
    volumes:
      - ./src:/app/src           # Bind mount
      - node_modules:/app/node_modules  # Named volume
      - /app/logs                # Anonymous volume
```

#### 6. depends_on - Başlatma Sırası

```yaml
services:
  backend:
    depends_on:
      - database  # Database önce başlasın
      - redis
  
  database:
    image: postgres
```

#### 7. restart - Yeniden Başlatma Politikası

```yaml
services:
  app:
    restart: always
    # Seçenekler:
    # no          → Asla yeniden başlatma (varsayılan)
    # always      → Her zaman yeniden başlat
    # on-failure  → Hata durumunda başlat
    # unless-stopped → Manuel durdurulmadıkça başlat
```

#### 8. networks - Network Bağlama

```yaml
services:
  web:
    networks:
      - frontend
      - backend

networks:
  frontend:
  backend:
```

#### 9. container_name - Container İsmi

```yaml
services:
  db:
    container_name: uygulama-veritabani
    # Yoksa: [proje-adi]_db_1 şeklinde olur
```

#### 10. command - Başlatma Komutu

```yaml
services:
  app:
    command: npm run dev  # CMD'yi override eder
    # veya
    command: ["npm", "run", "dev"]
```

---

## Docker Compose Komutları

### Temel Komutlar

#### Container'ları Başlatma

```bash
# Tüm servisleri başlat

docker compose up

# Arka planda başlat

docker compose up -d

# Build edip başlat

docker compose up --build

# Belirli servisleri başlat

docker compose up web database

# Tek servis başlat

docker compose up -d backend
```

#### Container'ları Durdurma

```bash
# Durdur (container'lar kalır)

docker compose stop

# Durdur ve sil

docker compose down

# Volume'leri de sil

docker compose down -v

# Image'leri de sil

docker compose down --rmi all
```

### İzleme ve Debug

```bash
# Çalışan servisleri listele

docker compose ps

# Logları göster (tüm servisler)

docker compose logs

# Belirli servis logları

docker compose logs backend

# Canlı log takibi

docker compose logs -f

# Son 50 satır

docker compose logs --tail 50 web

# Servis içinde komut çalıştır

docker compose exec web sh
docker compose exec backend npm test

# Yeni container başlatıp komut çalıştır

docker compose run web npm install express
```

### Diğer Komutlar

```bash
# Image'leri build et

docker compose build

# Tek servis build et

docker compose build backend

# Cache kullanmadan build et

docker compose build --no-cache

# Container'ları yeniden başlat

docker compose restart

# Tek servisi yeniden başlat

docker compose restart web

# Servisi durdur

docker compose stop backend

# Servisi başlat (durmuşsa)

docker compose start backend

# Konfigürasyonu doğrula

docker compose config

# Servis sayısını artır (scale)

docker compose up -d --scale worker=3
```

---

## Gerçek Proje 1: Web + Database

### Proje Yapısı

```bash
todo-app/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
└── .env
```

### 1. Backend Uygulaması

**backend/package.json:**
```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.0"
  }
}
```

**backend/index.js:**
```javascript
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// PostgreSQL bağlantısı
const pool = new Pool({
  host: process.env.DB_HOST || 'database',
  port: 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'todos'
});

// Database hazırla
pool.query(`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
  )
`);

// API Endpoints
app.get('/', (req, res) => {
  res.json({ message: 'API çalışıyor!' });
});

app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (title) VALUES ($1) RETURNING *',
    [title]
  );
  res.json(result.rows[0]);
});

app.delete('/todos/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
  res.json({ message: 'Silindi' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
});
```

**backend/Dockerfile:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### 2. Docker Compose Dosyası

**docker-compose.yml:**
```yaml
services:
  # Backend servis
  backend:
    build: ./backend
    container_name: todo-backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=database
      - DB_USER=postgres
      - DB_PASSWORD=secret123
      - DB_NAME=todos
    depends_on:
      - database
    restart: unless-stopped
    networks:
      - app-network

  # PostgreSQL servis
  database:
    image: postgres:15-alpine
    container_name: todo-db
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret123
      - POSTGRES_DB=todos
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    networks:
      - app-network

# Named volume tanımı

volumes:
  postgres-data:

# Network tanımı

networks:
  app-network:
    driver: bridge
```

### 3. Environment Dosyası (Opsiyonel)

**.env:**
```env
# Database

POSTGRES_USER=postgres
POSTGRES_PASSWORD=secret123
POSTGRES_DB=todos

# Backend

PORT=3000
NODE_ENV=development
```

**Compose dosyasında kullanım:**
```yaml
services:
  database:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
```

### Projeyi Çalıştırma

```bash
# 1. Proje klasörüne git

cd todo-app

# 2. Başlat

docker compose up -d

# 3. Logları kontrol et

docker compose logs -f

# 4. Test et

curl http://localhost:3000
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Docker öğren"}'

curl http://localhost:3000/todos
```

### Debug ve Kontrol

```bash
# Çalışan container'ları göster

docker compose ps

# Backend logları

docker compose logs backend

# Database'e bağlan

docker compose exec database psql -U postgres -d todos

# SQL sorguları çalıştır

SELECT * FROM todos;
```

### Projeyi Durdurma

```bash
# Durdur ama verileri sakla

docker compose stop

# Durdur ve container'ları sil (veriler kalır)

docker compose down

# Her şeyi sil (veriler dahil)

docker compose down -v
```

---

## Gerçek Proje 2: Full Stack Uygulama

### Proje Yapısı

```bash
fullstack-app/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── nginx/
    └── nginx.conf
```

### docker-compose.yml (Full Stack)

```yaml
services:
  # Frontend (React/Vue)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: app-frontend
    volumes:
      - ./frontend/src:/app/src  # Hot reload için
    depends_on:
      - backend
    networks:
      - frontend-network

  # Backend (Node.js/Express)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: app-backend
    environment:
      - NODE_ENV=development
      - DB_HOST=database
      - REDIS_HOST=redis
      - JWT_SECRET=supersecret
    volumes:
      - ./backend/src:/app/src
    depends_on:
      - database
      - redis
    networks:
      - frontend-network
      - backend-network
    restart: unless-stopped

  # PostgreSQL Database
  database:
    image: postgres:15-alpine
    container_name: app-database
    environment:
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=apppass
      - POSTGRES_DB=appdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: app-redis
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    networks:
      - backend-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5

  # Nginx (Reverse Proxy)
  nginx:
    image: nginx:alpine
    container_name: app-nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend
    networks:
      - frontend-network
    restart: unless-stopped

volumes:
  postgres-data:
  redis-data:

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
```

### Nginx Konfigürasyonu

**nginx/nginx.conf:**
```nginx
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:4000;
    }

    server {
        listen 80;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        # Backend API
        location /api/ {
            proxy_pass http://backend/;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}
```

### Önemli Noktalar

**1. Çoklu Network Kullanımı:**
```bash
Frontend ←→ Frontend Network ←→ Backend ←→ Backend Network ←→ Database
                                            ↓
                                          Redis
```

**Güvenlik:**Frontend, database'e direkt erişemez!**2. Health Check:**
```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U appuser"]
  interval: 10s
  timeout: 5s
  retries: 5
```

Container'ın sağlıklı olup olmadığını kontrol eder.

**3. Dependency ile Sıralama:**
```yaml
backend:
  depends_on:
    - database
    - redis
```

Backend, database ve redis başladıktan sonra başlar.

**4. Volume Bind Mount (Development):**
```yaml
volumes:
  - ./frontend/src:/app/src
```

Kod değişiklikleri anında yansır!

---

## Docker Network

### Network Neden Gerekli?

**Problem:**
```bash
Container A  →  Container B
    ❌ Birbirini göremez!
```

**Çözüm: Network**
```bash
Network: "app-network"
┌──────────────────────────┐
│  Container A ←→ Container B
└──────────────────────────┘
    ✅ İletişim var!
```

### Network Türleri

#### 1. Bridge (Varsayılan)

En yaygın kullanılan network türü.

```yaml
networks:
  app-network:
    driver: bridge
```

**Özellikler:**- Container'lar birbirini**isim ile** bulur
- İzole edilmiş network
- Dışarıya port ile çıkış

#### 2. Host

Container, host'un network'ünü kullanır.

```yaml
services:
  app:
    network_mode: host
```

**⚠️ Dikkat:** Port çakışması olabilir!

#### 3. None

Network yok (izole).

```yaml
services:
  app:
    network_mode: none
```

### Network Kullanımı

**Manuel network oluşturma:**
```bash
docker network create app-network
docker network create --driver bridge my-network
```

**Container'ı network'e bağlama:**
```bash
docker run -d --name web --network app-network nginx
```

**Network listesi:**
```bash
docker network ls
```

**Network detayları:**
```bash
docker network inspect app-network
```

**Container'ları görme:**
```bash
docker network inspect app-network | grep Name
```

### Compose ile Network

**Otomatik:**
```yaml
services:
  web:
    image: nginx
  db:
    image: postgres
```

Compose otomatik `[proje-adi]_default` network'ü oluşturur.

**Manuel:**
```yaml
services:
  web:
    networks:
      - frontend
  api:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend

networks:
  frontend:
  backend:
```

**Şema:**
```bash
┌─ Frontend Network ─────┐
│  web ←→ api            │
└────────────────────────┘
         │
┌─ Backend Network ──────┐
│  api ←→ db             │
└────────────────────────┘
```

---

## Environment Variables Yönetimi

### .env Dosyası

**Proje klasöründe `.env` oluşturun:**
```env
# Database

DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=mydb

# Application

NODE_ENV=development
PORT=3000
SECRET_KEY=supersecret

# Redis

REDIS_PASSWORD=redispass
```

**GİTİGNORE'a ekleyin:**
```bash
.env
.env.local
```

### Compose ile Kullanım

**Yöntem 1: env_file**
```yaml
services:
  backend:
    image: myapp
    env_file:
      - .env
```

**Yöntem 2: environment + ${VAR}**
```yaml
services:
  database:
    image: postgres
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
```

**Yöntem 3: .env (otomatik)**
```yaml
services:
  backend:
    environment:
      - DB_USER
      - DB_PASSWORD
```

Compose otomatik `.env`'den alır.

### Farklı Ortamlar

**Development:**
```bash
docker compose --env-file .env.dev up
```

**Production:**
```bash
docker compose --env-file .env.prod up
```

**.env.dev:**
```env
NODE_ENV=development
DEBUG=true
```

**.env.prod:**
```env
NODE_ENV=production
DEBUG=false
```
