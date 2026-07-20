# Docker Bölüm 05: İleri Seviye ve Optimizasyon

Docker'ı sadece yerel bilgisayarda çalıştırmakla, sunucularda (Production) çalıştırmak arasında büyük farklar vardır. Bu bölümde, Docker imajlarımızı nasıl daha küçük, daha güvenli ve daha profesyonel hale getireceğimizi öğreneceğiz.

---

## 1. Multi-Stage Build (Çok Aşamalı İnşa)

C#, Java, Go, React gibi teknolojilerde kodun çalışması için önce **derlenmesi (build)** gerekir. Ancak derleme araçları (SDK'ler) devasa boyutlardadır. *Multi-stage build* sayesinde, derleme işlemini ağır bir imajda yapıp, sadece ortaya çıkan "çıktıyı (dll, exe, build klasörü)" çok hafif bir çalışma zamanı (runtime) imajına aktarabiliriz.

### Örnek: C# (ASP.NET Core) Multi-Stage Build

```dockerfile
# 1. AŞAMA: Build (Derleme) - SDK içerir, boyutu çok büyüktür (~800MB)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS builder
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app/publish

# 2. AŞAMA: Runtime (Çalıştırma) - Sadece kodu çalıştırmaya yarar (~150MB)
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
# Sadece 'builder' aşamasında üretilen nihai dosyaları bu imaja kopyala
COPY --from=builder /app/publish .

ENTRYPOINT ["dotnet", "Uygulamam.dll"]
```
**Sonuç:** GB'larca yer kaplayan kaynak kodlar, SDK'ler ve gereksiz dosyalar çöpe gider. Sunucuya sadece ~150MB'lık, ışık hızında açılan bir imaj gönderilir.

---

## 2. `.dockerignore` Dosyası (Unutulmaması Gereken Kahraman)

Tıpkı Git'teki `.gitignore` gibi çalışır. `COPY . .` komutu çalıştırıldığında Docker'ın gereksiz dosyaları (loglar, derlenmiş bin/obj klasörleri, node_modules) konteynerin içine kopyalamasını engeller.

**Örnek `.dockerignore` dosyası:**
```text
node_modules
bin/
obj/
.git
.env
*.log
```
Bunu eklemek `docker build` süresini inanılmaz derecede hızlandırır.

---

## 3. Güvenlik: Non-Root User Kullanımı

Konteynerler varsayılan olarak **root** (en yetkili süper kullanıcı) haklarıyla çalışır. Bir hacker uygulamanızda bir güvenlik açığı bulup konteynerin içine sızarsa, host makineye zarar verme ihtimali vardır.

Production ortamlarında konteynerler daima kısıtlı bir kullanıcıyla çalıştırılmalıdır.

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Konteyner içinde 'node' adında yetkisiz bir kullanıcı zaten vardır. Ona geçiş yapıyoruz.
USER node

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 4. İmajı Docker Hub'a (Registry) Yüklemek (Push)

Oluşturduğunuz imajı bir sunucuda çalıştırmak için önce onu merkezi bir depoya yüklemelisiniz.

**1. Giriş Yapın:**
```bash
docker login
```

**2. İmajı Etiketleyin (Tag):**
Docker Hub kullanıcı adınızı (örn: `ahmet123`) ve versiyonu belirtin.
```bash
docker tag my-app:latest ahmet123/my-app:v1.0
```

**3. İmajı Gönderin (Push):**
```bash
docker push ahmet123/my-app:v1.0
```

Artık dünyanın herhangi bir yerindeki bir sunucudan `docker run -d ahmet123/my-app:v1.0` diyerek projenizi saniyeler içinde yayına alabilirsiniz!
