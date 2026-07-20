# Bölüm 05: GitLab CI/CD

GitLab, hem bir kod deposu (GitHub gibi) hem de içinde dahili (built-in) CI/CD sistemi barındıran devasa bir DevOps platformudur. Özellikle kurum içi (On-Premise) ağlarda kodunu tutmak isteyen şirketlerin 1 numaralı tercihidir.

---

## 1. Temel Kavramlar

- **`.gitlab-ci.yml`:** Tüm otomasyonun yazıldığı, projenin ana dizininde duran yapılandırma dosyasıdır.
- **GitLab Runner:** GitHub Actions'taki "Runner" veya Jenkins'teki "Agent" ile aynı mantıktır. Sizin kendi sunucunuza veya bilgisayarınıza kurduğunuz küçük bir ajandır. GitLab sunucusu bu ajanlara "Al şu kodu test et" diye komut gönderir.
- **Stages (Aşamalar):** Kodun geçeceği evreleri (Örn: Build -> Test -> Deploy) sıralı olarak belirler. Bir aşama tamamen bitmeden (tüm testler geçmeden) diğerine (Deploy'a) geçilmez.

## 2. Örnek .gitlab-ci.yml (.NET için)

```yaml
# Pipeline aşamalarının sırası
stages:
  - build
  - test
  - deploy

# Ortak değişkenler
variables:
  DOTNET_VERSION: "8.0"

# 1. Aşama: Build
build_job:
  stage: build
  image: mcr.microsoft.com/dotnet/sdk:8.0 # Docker Container içinde çalıştır
  script:
    - echo "Kod derleniyor..."
    - dotnet restore
    - dotnet build --no-restore
  artifacts:
    paths:
      - bin/ # Derlenmiş dosyaları bir sonraki aşamaya (test'e) aktar

# 2. Aşama: Test
test_job:
  stage: test
  image: mcr.microsoft.com/dotnet/sdk:8.0
  script:
    - echo "Birim testleri çalışıyor..."
    - dotnet test --no-build

# 3. Aşama: Deploy
deploy_production:
  stage: deploy
  script:
    - echo "Uygulama canlı sunucuya kopyalanıyor..."
    - scp -r bin/ user@production-server:/var/www/html/
  only:
    - main # Sadece main branch'e kod geldiğinde bu adımı çalıştır
```

## Neden GitLab CI?
Çok temiz bir YAML yapısı vardır ve özellikle Kubernetes entegrasyonu (Auto DevOps) konusunda rakiplerinden daha yetenekli ve otomatize edilmiş araçlar sunar.
