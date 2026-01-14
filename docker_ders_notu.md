# 🐳 Docker Eğitimi - Bölüm 1: Temeller ve İlk Adımlar

> **Bu doküman kimler için?** Yazılım geliştirmeye yeni başlayanlar, Docker'ı hiç kullanmamış ya da temel seviyede öğrenmek isteyen junior yazılımcılar için hazırlanmıştır.

---

## 📚 İçindekiler
- [Docker Nedir? Neden Kullanırız?](#docker-nedir-neden-kullanırız)
- [Sanal Makine vs Container](#sanal-makine-vs-container)
- [Temel Kavramlar (Basit Anlatım)](#temel-kavramlar-basit-anlatım)
- [Docker Kurulumu](#docker-kurulumu)
- [İlk Docker Komutlarımız](#ilk-docker-komutlarımız)

---

## Docker Nedir? Neden Kullanırız?

### 🤔 Günlük Hayattan Bir Örnek

Diyelim ki bir Node.js projesi geliştirdiniz:
- Sizin bilgisayarınızda **Node.js 18** var → Çalışıyor ✅
- Arkadaşınızın bilgisayarında **Node.js 16** var → Hata veriyor ❌
- Sunucuda **Node.js 20** var → Farklı davranıyor ⚠️

**Klasik Problem:** "Benim bilgisayarımda çalışıyordu ama!"

### ✨ Docker'ın Çözümü

Docker, uygulamanızı ve tüm ihtiyaçlarını (Node.js versiyonu, paketler, ayarlar) bir **paket** içine koyar. Bu paketi:
- Kendi bilgisayarınızda çalıştırabilirsiniz
- Arkadaşınıza gönderebilirsiniz
- Sunucuya yükleyebilirsiniz

**Sonuç:** Her yerde aynı şekilde çalışır! 🎉

### 📦 Gerçek Hayattan Benzetme

Bir kargo paketi düşünün:
- **İçindeki eşyalar** → Uygulamanız ve bağımlılıkları
- **Paket kutusu** → Docker Container
- **Paket şablonu** → Docker Image
- **Kargo deposu** → Docker Hub (image'lerin toplandığı yer)

Kutuyu nereye gönderirseniz gönderin, içindekiler aynı kalır!

---

## Sanal Makine vs Container

### 🖥️ Sanal Makine (Eski Yöntem)

```
┌─────────────────────────────────────┐
│     Bilgisayarınız (Host)          │
│  ┌───────────────────────────────┐ │
│  │  Sanal Makine 1               │ │
│  │  ┌─────────────────┐          │ │
│  │  │ Tüm İşletim     │          │ │
│  │  │ Sistemi         │          │ │
│  │  │ (3-4 GB)        │          │ │
│  │  │                 │          │ │
│  │  │ Uygulama        │          │ │
│  │  └─────────────────┘          │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Dezavantajları:**
- ❌ Çok yer kaplar (her VM için 3-4 GB)
- ❌ Yavaş başlar (dakikalar)
- ❌ Çok kaynak tüketir

### 🐳 Docker Container (Yeni Yöntem)

```
┌─────────────────────────────────────┐
│     Bilgisayarınız (Host)          │
│  ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ C1  │ │ C2  │ │ C3  │          │
│  │ App │ │ App │ │ App │          │
│  │50MB │ │30MB │ │40MB │          │
│  └─────┘ └─────┘ └─────┘          │
│  ────────────────────────          │
│     Docker Engine                   │
│  ────────────────────────          │
│     İşletim Sistemi                │
└─────────────────────────────────────┘
```

**Avantajları:**
- ✅ Çok hafif (MB seviyesinde)
- ✅ Saniyeler içinde başlar
- ✅ Az kaynak tüketir
- ✅ Aynı sistemde onlarca container çalışabilir

---

## Temel Kavramlar (Basit Anlatım)

### 1️⃣ Image (İmaj) - Tarif Kitabı 📖

**Ne demek?** Uygulamanızı çalıştırmak için gereken her şeyin **tarifi**.

**Örnekle anlayalım:**
```
🍰 Pasta Tarifi:
- Un
- Yumurta
- Şeker
- Fırın sıcaklığı: 180°C
- Pişirme süresi: 45 dakika
```

Bu tarif = **Docker Image**

**Docker'da:**
```
🐳 Node.js Uygulaması Image'i:
- Ubuntu işletim sistemi
- Node.js 18
- NPM paketleri
- Uygulama kodları
- Başlangıç komutu: npm start
```

**ÖNEMLİ:** Image bir kez oluşturulur, **değiştirilemez** (read-only).

### 2️⃣ Container - Pişmiş Pasta 🍰

**Ne demek?** Image'den üretilen **çalışan** kopya.

Pasta tarifinden (image) birden fazla pasta (container) yapabilirsiniz!

```
Image (Tarif)  ──┬──> Container 1 (Pasta 1) ✅ Çalışıyor
                 ├──> Container 2 (Pasta 2) ✅ Çalışıyor  
                 └──> Container 3 (Pasta 3) ⏸️ Durmuş
```

**ÖNEMLİ:** Bir image'den istediğiniz kadar container oluşturabilirsiniz!

### 3️⃣ Docker Hub - Tarif Deposu 🗄️

**Ne demek?** Hazır Docker image'lerinin bulunduğu **ücretsiz** depo.

**Gerçek örnekler:**
- `nginx` → Web sunucusu
- `mysql` → Veritabanı
- `node` → Node.js çalışma ortamı
- `python` → Python çalışma ortamı

**Kullanımı:**
```bash
docker pull nginx
# "nginx" tarifini indirdik
```

### 4️⃣ Dockerfile - Kendi Tarifimiz 📝

**Ne demek?** Kendi image'imizi oluşturmak için yazdığımız **talimat dosyası**.

**Basit örnek:**
```dockerfile
# Temel tarif olarak Node.js kullan
FROM node:18

# Çalışma klasörü oluştur
WORKDIR /app

# Projemizi kopyala
COPY . .

# Bağımlılıkları kur
RUN npm install

# Uygulamayı başlat
CMD npm start
```

### 5️⃣ Volume - Kalıcı Depolama 💾

**Problem:** Container silindiğinde içindeki veriler kaybolur!

**Çözüm:** Volume kullanarak verileri **dışarıda** tutarız.

**Örnek:**
```
Container (Geçici)          Volume (Kalıcı)
┌────────────────┐          ┌──────────────┐
│  Uygulama      │          │              │
│                │ ←───────→│  Veritabanı  │
│  /app/data ────┼─────────→│  Dosyaları   │
└────────────────┘          │              │
                            └──────────────┘
```

Container silince: Uygulama gider ❌, Veriler kalır ✅

### 6️⃣ Network - Container'lar Arası İletişim 🔗

**Problem:** Bir container'daki web uygulaması, başka bir container'daki veritabanına nasıl bağlanacak?

**Çözüm:** Docker Network!

**Örnek:**
```
Network: "uygulama-agi"
┌──────────────────────────────────────┐
│                                      │
│  ┌──────────┐      ┌──────────┐    │
│  │   Web    │ ────>│ Database │    │
│  │Container │      │Container │    │
│  └──────────┘      └──────────┘    │
│                                      │
└──────────────────────────────────────┘
```

---

## Docker Kurulumu

### 🪟 Windows Kullanıcıları

**Adım 1:** [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/) sayfasına gidin

**Adım 2:** "Download for Windows" butonuna tıklayın

**Adım 3:** İndirilen dosyayı çalıştırın

**Adım 4:** Kurulum bittikten sonra bilgisayarı yeniden başlatın

**⚠️ Önemli Notlar:**
- Windows 10/11 64-bit olmalı
- WSL 2 (Windows Subsystem for Linux) kurulu olmalı
- Kurulum sırasında "Use WSL 2" seçeneği seçili olmalı

### 🍎 macOS Kullanıcıları

**Adım 1:** [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/) sayfasına gidin

**Adım 2:** Chip türünüze göre indirin:
- **Apple Chip (M1/M2/M3)** → "Apple Silicon" versiyonu
- **Intel Chip** → "Intel Chip" versiyonu

**Adım 3:** .dmg dosyasını açın ve Docker'ı Applications klasörüne sürükleyin

**Adım 4:** Docker'ı açın ve izin verin

### 🐧 Linux (Ubuntu/Debian) Kullanıcıları

**Terminal'i açın ve sırasıyla çalıştırın:**

```bash
# Sistem güncellemesi
sudo apt-get update

# Gerekli paketleri kur
sudo apt-get install ca-certificates curl gnupg

# Docker'ın GPG anahtarını ekle
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Docker repository'sini ekle
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Sistemi güncelle
sudo apt-get update

# Docker'ı kur
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Kullanıcıyı docker grubuna ekle (sudo kullanmamak için)
sudo usermod -aG docker $USER

# Değişikliklerin geçerli olması için çıkış yapıp tekrar girin
```

### ✅ Kurulum Kontrolü

**Terminal/Command Prompt'u açın ve çalıştırın:**

```bash
docker --version
```

**Görmeniz gereken:**
```
Docker version 24.0.x, build xxxxx
```

**İlk test:**
```bash
docker run hello-world
```

**Başarılı ise şunu göreceksiniz:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

**🎉 Tebrikler! Docker kurulumunuz tamamlandı!**

---

## İlk Docker Komutlarımız

### 🎯 Komut Yapısını Anlamak

Docker komutları şu yapıya sahiptir:

```bash
docker [KOMUT] [SEÇENEKLER] [ARGÜMANLAR]
```

**Örnek:**
```bash
docker run -d --name web nginx
│      │   │    │     │    └─> Image adı
│      │   │    │     └──────> Container ismi
│      │   │    └────────────> Seçenek (isim ver)
│      │   └─────────────────> Seçenek (arka planda çalıştır)
│      └─────────────────────> Komut (çalıştır)
└────────────────────────────> Docker komutu
```

### 📥 1. İlk Image'imizi İndirelim

**Nginx (Web sunucusu) indirelim:**

```bash
docker pull nginx
```

**Ne oldu?**
- Docker Hub'dan nginx image'i indirildi
- Bilgisayarınızda saklandı
- Henüz çalıştırılmadı!

**Kontrol edelim:**
```bash
docker images
```

**Çıktı:**
```
REPOSITORY   TAG       IMAGE ID       CREATED        SIZE
nginx        latest    a72860cb95fd   2 weeks ago    188MB
```

**💡 Açıklama:**
- `REPOSITORY`: Image adı
- `TAG`: Versiyon (latest = en güncel)
- `IMAGE ID`: Benzersiz kimlik
- `SIZE`: Boyut

### 🚀 2. İlk Container'ımızı Çalıştıralım

**Nginx'i çalıştıralım:**

```bash
docker run nginx
```

**⚠️ Problem:** Terminal kitlendi! Çıkmak için `Ctrl+C` yapın.

**✅ Doğru kullanım (Arka planda çalıştırma):**

```bash
docker run -d nginx
```

**Çıktı:**
```
a7f8d9e6c5b4a2f1d9e8c7b6a5f4d3c2b1a0e9d8c7b6a5f4d3c2b1a0
```

Bu uzun metin = Container ID

**💡 `-d` nedir?** "Detached mode" - Arka planda çalıştır

### 👀 3. Çalışan Container'ları Görelim

```bash
docker ps
```

**Çıktı:**
```
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
a7f8d9e6c5b4   nginx     "/docker-entrypoint.…"   10 seconds ago   Up 9 seconds    80/tcp    funny_einstein
```

**💡 Açıklama:**
- `CONTAINER ID`: İlk 12 karakter (yeter)
- `IMAGE`: Hangi image'den oluştu
- `STATUS`: Çalışma durumu
- `PORTS`: Hangi portları kullanıyor
- `NAMES`: Docker'ın otomatik verdiği isim

**🤔 Neden web sayfasını göremiyoruz?**

Çünkü porta bağlamadık! Container içinde çalışıyor ama dışarıdan erişemiyoruz.

### 🔌 4. Port Bağlama (Port Mapping)

**Container'ı durduralım:**

```bash
docker stop a7f8d9e6c5b4
```

**💡 Kısayol:** İlk 3-4 karakteri yazmak yeter: `docker stop a7f`

**Şimdi port bağlayarak çalıştıralım:**

```bash
docker run -d -p 8080:80 nginx
```

**💡 `-p 8080:80` nedir?**
```
-p [BİLGİSAYARINIZIN PORTU]:[CONTAINER'IN PORTU]
   └─> 8080                  └─> 80
```

**Şema:**
```
Tarayıcınız        Bilgisayarınız       Container
    │                   │                   │
    └──> localhost:8080 ──> Port 8080 ──────> Port 80 ──> Nginx
```

**Tarayıcıda test edelim:**

```
http://localhost:8080
```

**🎉 "Welcome to nginx!" yazısını görmelisiniz!**

### 🏷️ 5. Container'a İsim Verelim

**Otomatik isimler karışık:**

```bash
docker run -d -p 8080:80 --name web-sunucum nginx
```

**Kontrol:**
```bash
docker ps
```

**Çıktı:**
```
NAMES
web-sunucum
```

**Artık isim ile komut verebiliriz:**
```bash
docker stop web-sunucum
docker start web-sunucum
docker restart web-sunucum
```

### 🗑️ 6. Container'ı Silelim

**Önce durdurun:**
```bash
docker stop web-sunucum
```

**Sonra silin:**
```bash
docker rm web-sunucum
```

**💡 Kısayol:** Çalışan container'ı zorla silin:
```bash
docker rm -f web-sunucum
```

### 📋 7. Tüm Container'ları Görelim (Durmuş olanlar dahil)

```bash
docker ps -a
```

**Çıktı:**
```
CONTAINER ID   IMAGE     STATUS                      NAMES
a7f8d9e6c5b4   nginx     Exited (0) 5 minutes ago    funny_einstein
b8e9c7d6a5f4   nginx     Exited (0) 10 minutes ago   web-sunucum
```

**STATUS açıklaması:**
- `Up`: Çalışıyor ✅
- `Exited`: Durmuş ❌

---

## 🎓 İlk Bölüm Özeti

### ✅ Öğrendiklerimiz

1. **Docker nedir?** → Uygulamaları paketleme ve çalıştırma aracı
2. **Image nedir?** → Tarif kitabı (read-only şablon)
3. **Container nedir?** → Image'den oluşturulan çalışan kopya
4. **Docker Hub nedir?** → Hazır image'lerin bulunduğu depo

### 📝 Temel Komutlar

```bash
docker pull nginx           # Image indir
docker images              # Image'leri listele
docker run -d nginx        # Container çalıştır (arka planda)
docker run -d -p 8080:80 nginx  # Port bağlayarak çalıştır
docker ps                  # Çalışan container'ları göster
docker ps -a               # Tüm container'ları göster
docker stop [ID]           # Container'ı durdur
docker start [ID]          # Container'ı başlat
docker rm [ID]             # Container'ı sil
docker rmi [IMAGE]         # Image'i sil
```

### 🎯 Pratik Yapın

**Alıştırma 1:**
```bash
# 1. Python image'ini indirin
docker pull python

# 2. Çalıştırın ve Python versiyonunu öğrenin
docker run python python --version
```

**Alıştırma 2:**
```bash
# 1. MySQL veritabanı çalıştırın
docker run -d --name veritabanim -e MYSQL_ROOT_PASSWORD=sifre123 mysql

# 2. Çalıştığını kontrol edin
docker ps

# 3. Durdurun ve silin
docker stop veritabanim
docker rm veritabanim
```

---

## 📚 Sıradaki Bölüm

**Bölüm 2'de öğrenecekleriniz:**
- Dockerfile nasıl yazılır?
- Kendi image'inizi nasıl oluşturursunuz?
- Container içine nasıl girilir?
- Volume kullanımı
- Network oluşturma
- Pratik bir Node.js/Python projesi containerize etme

**🚀 Hazır mısınız? Bölüm 2'ye geçelim!**