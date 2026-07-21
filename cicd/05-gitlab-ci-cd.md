# Bölüm 05: GitLab CI/CD (Hepsi Bir Arada Platform)

Sektörde kodları (Git) saklamak için GitHub, CI/CD pipeline'ı çalıştırmak için Jenkins, Docker imajlarını (Kutuları) saklamak için DockerHub, Güvenlik (Sec) testleri için SonarQube kullanılarak 4 farklı program birbirine bağlanmaya (Derme çatma Frankenstein yaratılmaya) çalışılırdı.

İşte **GitLab**, "DevOps döngüsünün (Planla, Kodla, Test Et, Paketle, Canlıya Al, İzle) TAMAMINI TTEK BİR UYGULAMAYA SIĞDIRAN" pazarın devrimsel ve en bütünleşik (All-in-One) platformudur.

## 1. Neden GitLab CI/CD Tercih Edilir?

- **Entegre (Gömülü) Yapı:** Ayrı bir CI/CD aracı (Örn: Jenkins) kurmanıza, ayarlamanıza ve Git ile bağlamak için Webhook'lar atmanıza GEREK YOKTUR. GitLab repinize (kod deponuza) kod attığınız saniye, kendi içindeki CI/CD zaten emre amadedir.
- **Güçlü "GitLab Runner" Sistemi:** GitHub Actions'taki gibi "Kendi sunucunuzu kiralama" dertleri olmadan, "GitLab Runner" adındaki minik bir Go programını kendi şirketinizdeki bir bilgisayara kurarsınız. Artık GitLab o sizin kendi bilgisayarınızı bir "Ameliyathane (Pipeline Test makinesi)" olarak ücretsiz kullanmaya başlar.

## 2. `.gitlab-ci.yml` Anatomisi (Aşamalar ve İşler)

GitLab'ın CI/CD konfigürasyon dosyası YAML (Yaml) formatındadır. En belirgin özelliği, sistemin aşamalarını (Stages) en başta bir dizi olarak NET BİR ŞEKİLDE tanımlamasıdır.

*(Örnek GitLab CI/CD Dosyası)*
```yaml
# 1. Pipeline'ın Aşamalarını (Sırasını) Belirler (Önce Build, biterse Test, biterse Deploy)
stages:
  - build
  - test
  - deploy

# İş 1: Projeyi Derleme
derleme_job:
  stage: build        # Bu iş "build" aşamasına ait
  image: node:16      # Görevi yapmak için hazır bir "Node.js" Docker kutusu (Ameliyathanesi) kullan
  script:
    - echo "Kodlar npm install ile kütüphaneleri yüklüyor..."
    - npm install
    - npm run build

# İş 2: Otomatik Testleri Koşma
test_job:
  stage: test         # Eğer build başarılı olmazsa BURAYA ASLA GEÇİLMEZ (Kalkan)
  image: node:16
  script:
    - echo "Unit testler çalıştırılıyor..."
    - npm test

# İş 3: Canlı Sunucuya Gönderme (Production)
canli_deploy_job:
  stage: deploy       # Testler başarıyla geçerse bura tetiklenir
  script:
    - echo "Sunucuya (AWS veya K8s) kopyalanıyor..."
    - ./deploy-to-server.sh
  only:
    - main            # YALNIZCA 'main' isimli ana branch'e birleştirme olduğunda canlıya çık! Feature branchleri canlıya çıkmasın.
```
GitLab'ın harika Web arayüzü sayesinde, bu adımların yeşil/kırmızı ilerleyişini çok şık grafikler (Pipeline Graph) üzerinden saniye saniye izleyebilirsiniz.
