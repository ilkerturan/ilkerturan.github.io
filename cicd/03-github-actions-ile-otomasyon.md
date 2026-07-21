# Bölüm 03: GitHub Actions (Boru Hattı İnşası)

CI/CD robotumuzu (Pipeline) kurmak için günümüzde Jenkins gibi ayrı ve ağır bir sunucu kurmaya gerek kalmadı. Eğer kodunuz GitHub üzerindeyse, GitHub'ın içine gömülü (ücretsiz) gelen devasa otomasyon fabrikası **GitHub Actions** emrinizdedir.

## 1. Çalışma Mantığı (Olay Güdümlü - Event Driven)
GitHub Actions, "Ben ne zaman çalışayım?" sorusuna bir **Event (Olay)** bekleyerek cevap verir. 
Siz bir dosya oluşturursunuz: `.github/workflows/deploy.yml`

İçine şunları yazarsınız (Tetikleyici):
*"Eğer bir yazılımcı 'Main' isimli branch'e PUSH komutu yaparsa, hemen uyan ve aşağıdaki Görevleri (Jobs) başlat!"*
Veya: *"Her gece saat 03:00'da (Cron) uyan ve veritabanı yedeğini al!"*

## 2. YAML Dosyasının Anatomisi (Bir Pipeline Mimarisi)

Bir CI/CD sürecinin C# (.NET) uygulaması için örnek adımları (Steps) şöyledir:

```yaml
# 1. Pipeline'ın Adı
name: .NET Canliya Alma Boru Hatti (CI/CD)

# 2. Ne Zaman Çalışacak? (Tetikleyici/Event)
on:
  push:
    branches: [ "main" ] # Main dalına her kod atıldığında tetiklen!

# 3. İşler (Jobs)
jobs:
  build-and-test: # 1. İş: Derle ve Test Et (CI)
    runs-on: ubuntu-latest # GitHub'ın bize 2 dakikalığına verdiği kiralık (sanal) Linux bilgisayarı

    steps: # Bu sanal bilgisayarda sırasıyla hangi komutlar çalışsın?
    
    # Adım 1: Yazılımcının kodlarını (Depoyu) bu sanal Linux bilgisayarına kopyala (İndir)
    - name: Kodu Klonla
      uses: actions/checkout@v3

    # Adım 2: Bilgisayara C# (Dotnet) SDK'sını kur (Çünkü boş bilgisayar)
    - name: .NET Kurulumu
      uses: actions/setup-dotnet@v3
      with:
        dotnet-version: '8.0.x'

    # Adım 3: Kütüphaneleri (NuGet paketlerini) İndir
    - name: Bagimliliklari (Restore) Yukle
      run: dotnet restore

    # Adım 4: Kodu Derle (Build) (Eğer hata varsa (Sytnax vs) Robot burada kırılır ve iptal olur)
    - name: Projeyi Derle (Build)
      run: dotnet build --no-restore

    # Adım 5: UNIT TESTLERİ ÇALIŞTIR! (Burası Kalptir)
    # Eğer testlerden 1'i bile hata verirse (Assert), robot ilerlemeyi durdurur! Canlıya ÇIKAMAZSINIZ.
    - name: Testleri Kostur
      run: dotnet test --no-build --verbosity normal

    # Adım 6: Eğer Testler YEŞİL yandıysa (CD), kodun son paket (DLL) halini Publish et.
    # Sonra bu paketi AWS'ye veya Kubernetes Sunucusuna FTP/SSH ile kopyala (Dağıtım-Deploy).
```

İşte modern yazılım şirketlerinde bir uygulamanın "Canlıya Alınması (Deploy)" bu 6 adımlık dosyanın saniyeler içinde Otomatik çalışmasından ibarettir!
